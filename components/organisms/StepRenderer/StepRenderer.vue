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
    <div v-if="petCount > 1 && currentStep >= 2 && !isContactStep" class="multi-pet-controls" style="background: yellow; border: 2px solid red; padding: 10px; margin: 10px 0;">
      <button 
        @click="toggleSharedMode" 
        :class="['shared-mode-btn', { active: isSharedMode }]"
        style="background: blue; color: white; padding: 10px; border: none; cursor: pointer;"
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

<style scoped>
.step-renderer {
  width: 100%;
}

.question-item {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  margin-bottom: 2rem;
}

.question-item h3 {
  font-size: 1.3rem;
  color: #333;
  margin-bottom: 0.5rem;
}

.question-item p {
  color: #666;
  margin-bottom: 1.5rem;
}

.question-input {
  width: 100%;
}

.multi-pet-controls {
  margin-bottom: 1.5rem;
  text-align: center;
}

.shared-mode-btn {
  background: transparent;
  border: 2px solid #0066cc;
  color: #0066cc;
  font-size: 0.9rem;
  font-weight: 500;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.shared-mode-btn:hover {
  background-color: rgba(0, 102, 204, 0.1);
}

.shared-mode-btn.active {
  background-color: #0066cc;
  color: white;
}

.shared-mode-btn.active:hover {
  background-color: #0052a3;
}

.pet-section {
  margin-bottom: 1.5rem;
}

.pets-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 1rem;
}

.pet-section h4 {
  color: #0066cc;
  margin-bottom: 1rem;
  font-size: 1.1rem;
  font-weight: 600;
}
</style>
