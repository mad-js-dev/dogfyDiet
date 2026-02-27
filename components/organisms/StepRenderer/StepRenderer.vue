<template>
  <div class="step-renderer">
    <div 
      v-for="question in filteredQuestions" 
      :key="question.id"
      class="question-item"
    >
      <h3>{{ question.title }}</h3>
      <p>{{ question.description }}</p>
      
      <!-- Dynamic question renderers based on question.type and pet count -->
      <div class="question-input">
        <!-- Shared mode (one set of answers for both pets) -->
        <div v-if="petCount > 1 && isSharedMode" class="pet-section">
          <component 
            :is="getQuestionComponent(question.type)"
            :config="question"
            :model-value="getSharedQuestionValue(question.id)"
            @update:model-value="handleSharedQuestionUpdate(question.id, $event)"
          />
        </div>
        
        <!-- Single pet mode -->
        <div v-else-if="petCount === 1" class="pet-section">
          <component 
            :is="getQuestionComponent(question.type)"
            :config="question"
            :model-value="getQuestionValue(question.id, 'pet_1')"
            @update:model-value="handleQuestionUpdate(question.id, $event, 'pet_1')"
          />
        </div>
        
        <!-- Multiple pets mode (separate answers) -->
        <div v-else class="pets-grid">
          <div v-for="petNum in petCount" :key="petNum" class="pet-section">
            <h4>{{ getPetDisplayName(petNum) }}</h4>
            <component 
              v-if="shouldShowQuestionForPet(question, `pet_${petNum}`)"
              :is="getQuestionComponent(question.type)"
              :config="question"
              :model-value="getQuestionValue(question.id, `pet_${petNum}`)"
              @update:model-value="handleQuestionUpdate(question.id, $event, `pet_${petNum}`)"
            />
          </div>
        </div>
        
        <!-- Multiple pets mode with toggle - after question -->
      </div>
    </div>
    <div v-if="petCount > 1 && currentStep >= 2 && !isContactStep" class="multi-pet-controls mb-6">
      <button 
        @click="toggleSharedMode" 
        :class="['shared-mode-btn button small outline', { active: isSharedMode }]"
      >
        {{ isSharedMode ? 'Edit pets separately' : 'Use same answers for both pets' }}
      </button>
    </div>
    <!-- Debug info for toggle button visibility -->
    <div v-if="petCount > 1" style="background: #f0f0f0; padding: 10px; margin: 10px 0; font-size: 12px;">
      <strong>Toggle Debug:</strong><br>
      petCount: {{ petCount }}<br>
      currentStep: {{ currentStep }}<br>
      isContactStep: {{ isContactStep }}<br>
      shouldShowToggle: {{ petCount > 1 && currentStep >= 2 && !isContactStep }}<br>
      isSharedMode: {{ isSharedMode }}<br>
      stepTitle: "{{ currentStepData?.title }}"
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useComprehensiveQuestionnaireStore } from '~/stores/comprehensive-questionnaire'
import TextInput from '~/components/atoms/TextInput/TextInput.vue'
import SelectAnswer from '~/components/molecules/SelectAnswer/SelectAnswer.vue'
import SegmentedAnswer from '~/components/molecules/SegmentedAnswer/SegmentedAnswer.vue'
import SegmentedButtons from '~/components/atoms/SegmentedButtons/SegmentedButtons.vue'
import RangeAnswer from '~/components/atoms/RangeAnswer/RangeAnswer.vue'
import RangeSlider from '~/components/atoms/RangeSlider/RangeSlider.vue'

// Define types locally since we removed the service
interface ConditionalLogic {
  questionId: string
  operator: 'equals' | 'notEquals' | 'contains' | 'greaterThan' | 'lessThan'
  value: any
  and?: ConditionalLogic
  or?: ConditionalLogic
}

interface Question {
  id: string
  title: string
  description: string
  type: string
  required: boolean
  options?: string[]
  rangeOptions?: Array<{ value: string; label: string; min?: number; max?: number }>
  conditional?: {
    showIf: ConditionalLogic
  }
}

interface Props {
  stepData?: any
}

const props = defineProps<Props>()
const questionnaire = useComprehensiveQuestionnaireStore()

const currentStepData = computed(() => props.stepData)
const petCount = computed(() => questionnaire.petCount)
const currentStep = computed(() => questionnaire.currentStep)

// Check if current step is contact information (owner-specific, not pet-specific)
const isContactStep = computed(() => {
  const title = currentStepData.value?.title?.toLowerCase() || ''
  const isContact = title.includes('contact') || title.includes('user')
  console.log('🔍 isContactStep check - title:', title, 'isContact:', isContact)
  return isContact
})

// Auto-set shared mode based on step and pet count
const isSharedMode = computed({
  get: () => {
    // Force separate mode for steps 0 and 1 when multiple pets
    if (petCount.value > 1 && (currentStep.value === 0 || currentStep.value === 1)) {
      return false
    }
    // For other steps with multiple pets, use the stored value (default to true)
    if (petCount.value > 1) {
      return storedSharedMode.value
    }
    // Single pet - not applicable
    return false
  },
  set: (value) => {
    storedSharedMode.value = value
  }
})

// Store the actual shared mode preference
const storedSharedMode = ref(true)

// Filter questions based on conditional logic
const filteredQuestions = computed(() => {
  console.log('🔍 StepRenderer - currentStepData.value:', currentStepData.value)
  
  if (!currentStepData.value?.questions) {
    console.log('🔍 StepRenderer - no questions found')
    return []
  }
  
  console.log('🔍 StepRenderer - raw questions:', currentStepData.value.questions)
  
  const filtered = currentStepData.value.questions.filter((question: Question) => {
    // If no conditional logic, always show
    if (!question.conditional) return true
    
    // Check conditional logic for each pet
    if (petCount.value === 1) {
      return shouldShowQuestionForPet(question, 'pet_1')
    } else {
      // For multiple pets, check shared mode first
      if (isSharedMode.value) {
        return shouldShowQuestionForPet(question, null) // Check shared answer
      } else {
        // For individual mode, show if ANY pet meets the condition
        for (let i = 1; i <= petCount.value; i++) {
          if (shouldShowQuestionForPet(question, `pet_${i}`)) {
            return true
          }
        }
        return false
      }
    }
  })
  
  console.log('🔍 StepRenderer - filtered questions:', filtered)
  return filtered
})

// Check if a question should be shown for a specific pet based on conditional logic
const shouldShowQuestionForPet = (question: Question, petId: string | null) => {
  if (!question.conditional?.showIf) return true
  
  const condition = question.conditional.showIf
  return evaluateCondition(condition, petId)
}

// Evaluate conditional logic
const evaluateCondition = (condition: ConditionalLogic, petId: string | null): boolean => {
  const { questionId, operator, value, and, or } = condition
  
  // Get the answer for the condition question
  const answer = questionnaire.getAnswer(questionId, petId)
  const answerValue = answer?.value
  
  // If no answer exists, don't show the conditional question
  if (answerValue === undefined || answerValue === null || answerValue === '') {
    return false
  }
  
  // Evaluate the primary condition
  let result = evaluateOperator(answerValue, operator, value)
  
  // Evaluate AND condition if present
  if (and && result) {
    result = result && evaluateCondition(and, petId)
  }
  
  // Evaluate OR condition if present
  if (or && !result) {
    result = result || evaluateCondition(or, petId)
  }
  
  return result
}

// Evaluate individual operators
const evaluateOperator = (answerValue: any, operator: string, conditionValue: any): boolean => {
  switch (operator) {
    case 'equals':
      return answerValue === conditionValue
    case 'not_equals':
      return answerValue !== conditionValue
    case 'contains':
      return Array.isArray(answerValue) ? answerValue.includes(conditionValue) : false
    case 'not_contains':
      return Array.isArray(answerValue) ? !answerValue.includes(conditionValue) : true
    default:
      return false
  }
}

// Map question types to components
const questionComponents = {
  text: TextInput,
  select: SelectAnswer,
  single: SegmentedAnswer,
  multiple: SegmentedButtons,
  range: RangeAnswer,
  'range-slider': RangeSlider
}

const getQuestionComponent = (type: string) => {
  const component = questionComponents[type as keyof typeof questionComponents] || TextInput
  console.log('🎯 Component mapping:', type, '→', component.__name || component.name || 'Unknown')
  return component
}

const getQuestionValue = (questionId: string, petId?: string) => {
  const answer = questionnaire.getAnswer(questionId, petId)
  return answer?.value || ''
}

const handleQuestionUpdate = (questionId: string, value: any, petId: string) => {
  questionnaire.addAnswer(questionId, value, petId)
}

const toggleSharedMode = () => {
  console.log('🔄 Toggle clicked! Before:', isSharedMode.value)
  isSharedMode.value = !isSharedMode.value
  console.log('🔄 Toggle clicked! After:', isSharedMode.value)
}

const getSharedQuestionValue = (questionId: string) => {
  // Get shared answer (no petId)
  const answer = questionnaire.getAnswer(questionId, null)
  return answer?.value || ''
}

const handleSharedQuestionUpdate = (questionId: string, value: any) => {
  // Update as shared answer (no petId)
  questionnaire.addAnswer(questionId, value, null)
}

const getPetDisplayName = (petNum: number) => {
  const petNameAnswer = questionnaire.getAnswer('pet_name', `pet_${petNum}`)
  return petNameAnswer ? petNameAnswer.value : `Pet ${petNum}`
}

const getQuestionForPet = (question: Question, petNum: number) => {
  const petName = getPetDisplayName(petNum)
  const originalQuestion = question.title || `Question for ${petName}`
  const finalQuestion = originalQuestion.includes('{petName}') ? 
    originalQuestion.replaceAll('{petName}', petName) : 
    originalQuestion
    
  // Ensure all properties are preserved, including rangeOptions
  return { ...question, title: finalQuestion }
}
</script>

<style lang="scss" scoped>
@use '~/assets/styles/_variables' as *;
@use '~/assets/styles/_mixins' as *;

.step-renderer {
  @include card-base(true, false);
  padding: $questionnaire-step-padding;
  margin-bottom: $spacing-6;
  
  @include respond-to(md) {
    padding: $questionnaire-step-padding * 1.5;
  }
}

.step-header {
  margin-bottom: $spacing-8;
  text-align: center;
  
  @include respond-to(md) {
    margin-bottom: $spacing-10;
  }
}

.step-title {
  @include typography(h2, semibold, primary);
  color: $neutral-darkest;
  margin-bottom: $spacing-4;
}

.step-description {
  @include typography(body-large, regular, secondary);
  color: $neutral-medium;
  max-width: 600px;
  margin: 0 auto $spacing-6;
}

.question-wrapper {
  margin-bottom: $form-field-gap;
  
  &:last-child {
    margin-bottom: 0;
  }
}

.question-text {
  @include typography(body, medium, secondary);
  color: $neutral-dark;
  margin-bottom: $spacing-3;
}

.question-help {
  @include typography(caption, regular, secondary);
  color: $neutral-medium;
  margin-top: $spacing-2;
}

.multi-pet-controls {
  @include flex-center;
  flex-direction: column;
  gap: $spacing-4;
  
  @include respond-to(md) {
    flex-direction: row;
    justify-content: center;
  }
}

.shared-mode-btn {
  width: 100%;
  max-width: 300px;
  
  @include respond-to(md) {
    width: auto;
  }
  
  &.active {
    @include button-base(sm, primary);
  }
}

.pets-grid {
  display: grid;
  gap: $questionnaire-card-gap;
  
  @include respond-to(md) {
    grid-template-columns: repeat(2, 1fr);
  }
}

.pet-section {
  @include card-base(false, true);
  padding: $spacing-6;
  background-color: $neutral-lightest;
  border: 2px solid $neutral-light;
  border-radius: $radius-lg;
  transition: all $transition-normal $ease-out;
  
  &:hover {
    border-color: $primary-green-light;
    background-color: rgba($primary-green, 0.02);
  }
  
  &.active {
    border-color: $primary-green;
    background-color: rgba($primary-green, 0.05);
    box-shadow: $shadow-primary;
  }
  
  h4 {
    @include typography(h4, semibold, primary);
    color: $primary-green;
    margin-bottom: $spacing-3;
  }
  
  .pet-info {
    @include typography(caption, regular, secondary);
    color: $neutral-medium;
    margin-bottom: $spacing-4;
  }
}

.shared-mode-section {
  @include card-base(false, false);
  padding: $spacing-6;
  background-color: rgba($primary-green, 0.02);
  border: 2px solid $primary-green;
  border-radius: $radius-lg;
  margin-bottom: $spacing-6;
}

// Component overrides for design system integration
:deep(.text-input) {
  @include input-base(md, default);
}

:deep(.select-answer) {
  @include input-base(md, default);
}

:deep(.segmented-answer) {
  display: flex;
  gap: $spacing-2;
  flex-wrap: wrap;
  
  button {
    @include button-base(sm, outline);
    flex: 1;
    min-width: 120px;
    
    &.active {
      @include button-base(sm, primary);
    }
  }
}

:deep(.range-slider) {
  margin: $spacing-4 0;
  
  .slider-track {
    height: 6px;
    background: $neutral-light;
    border-radius: $radius-full;
    position: relative;
    
    .slider-fill {
      height: 100%;
      background: $primary-green;
      border-radius: $radius-full;
      transition: width $transition-normal $ease-out;
    }
    
    .slider-thumb {
      width: 20px;
      height: 20px;
      background: $primary-green;
      border: 3px solid $neutral-white;
      border-radius: $radius-full;
      position: absolute;
      top: 50%;
      transform: translate(-50%, -50%);
      cursor: pointer;
      box-shadow: $shadow-md;
      transition: all $transition-normal $ease-out;
      
      &:hover {
        transform: translate(-50%, -50%) scale(1.1);
        box-shadow: $shadow-lg;
      }
    }
  }
  
  .slider-labels {
    display: flex;
    justify-content: space-between;
    margin-top: $spacing-2;
    
    span {
      @include typography(caption, regular, secondary);
      color: $neutral-medium;
    }
  }
}

// Responsive adjustments
@include respond-down-to(mobile) {
  .pets-grid {
    grid-template-columns: 1fr;
  }
  
  .segmented-answer {
    flex-direction: column;
    
    button {
      min-width: auto;
    }
  }
}

// Animation utilities
.question-wrapper {
  @include slide-up(16px, 0.3s);
  
  &:nth-child(2) {
    animation-delay: 0.1s;
  }
  
  &:nth-child(3) {
    animation-delay: 0.2s;
  }
  
  &:nth-child(4) {
    animation-delay: 0.3s;
  }
}

// Focus management
:deep(.text-input:focus),
:deep(.select-answer:focus),
:deep(.segmented-answer button:focus) {
  @include focus-visible;
}

// Error states
:deep(.text-input.error),
:deep(.select-answer.error) {
  @include input-base(md, error);
}

:deep(.form-error) {
  @include typography(caption, regular, secondary);
  color: $error;
  margin-top: $spacing-2;
}

// Success states
:deep(.text-input.success),
:deep(.select-answer.success) {
  @include input-base(md, success);
}

:deep(.form-success) {
  @include typography(caption, regular, secondary);
  color: $success;
  margin-top: $spacing-2;
}
</style>
