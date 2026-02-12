<template>
  <div class="step-page">
    <StepNavigation :current-step="currentStepId" />
    
    <div class="step-content">
      <div class="step-header">
        <h1>{{ currentStep?.title }}</h1>
        <p v-if="currentStep?.description">{{ currentStep.description }}</p>
      </div>

      <!-- Pet Count Step -->
      <div v-if="currentStepId === 0" class="pet-count-section">
        <h2>How many pets do you have?</h2>
        <div class="pet-count-options">
          <button 
            v-for="count in [1, 2]" 
            :key="count"
            @click="setPetCount(count)"
            :class="{ selected: petCount === count }"
            class="pet-count-btn"
          >
            {{ count }} {{ count === 1 ? 'Pet' : 'Pets' }}
          </button>
        </div>
      </div>

      <!-- Pet Names Step -->
      <div v-else-if="currentStepId === 1" class="pet-names-section">
        <h2>What are your pets' names?</h2>
        <div v-for="petNum in petCount" :key="petNum" class="pet-section">
          <h3>Pet {{ petNum }}</h3>
          <QuestionRenderer 
            :question="{ 
              ...questionnaireQuestions.find(q => q.id === 'pet_name'), 
              id: `pet_name_pet_${petNum}`,
              type: 'text',
              question: `What is Pet ${petNum}'s name?`,
              appliesTo: 'individual',
              required: true
            }"
            :pet-id="`pet_${petNum}`"
            :model-value="getAnswerValue(`pet_name_pet_${petNum}`)"
            @answer="handleAnswer"
          />
        </div>
      </div>

      <!-- Pet Race Step -->
      <div v-else-if="currentStepId === 2" class="pet-race-section">
        <h2>What is your pet's race?</h2>
        <QuestionRenderer 
          :question="questionnaireQuestions.find(q => q.id === 'pet_race') || {
            id: 'pet_race',
            type: 'select',
            question: 'What is your pet\'s race?',
            appliesTo: 'all',
            required: true,
            options: ['Dog', 'Cat', 'Bird', 'Rabbit', 'Hamster', 'Fish', 'Other']
          }"
          :model-value="getAnswerValue('pet_race')"
          @answer="handleAnswer"
        />
      </div>

      <!-- Navigation -->
      <div class="navigation">
        <button 
          @click="previousStep" 
          :disabled="currentStepId === 0"
          class="nav-btn secondary"
        >
          Previous
        </button>
        
        <button 
          @click="nextStep" 
          :disabled="!canProceed"
          class="nav-btn primary"
        >
          {{ currentStepId === 2 ? 'Submit' : 'Next' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useComprehensiveQuestionnaireStore } from '~/stores/comprehensive-questionnaire'
import { questionnaireSteps, getStepQuestions, shouldShowQuestion } from '~/config/questionnaire-steps'
import { questionnaireQuestions } from '~/config/questionnaire-questions'
import QuestionRenderer from '~/components/QuestionRenderer.vue'
import StepNavigation from '~/components/StepNavigation.vue'

const questionnaire = useComprehensiveQuestionnaireStore()
const route = useRoute()
const router = useRouter()

// Get step from URL parameter
const currentStepId = computed(() => {
  const stepParam = parseInt(route.params.step as string) || 0
  return Math.max(0, Math.min(stepParam, 2)) // Clamp between 0 and 2
})

// State
const steps = computed(() => questionnaireSteps)
const currentStep = computed(() => steps.value[currentStepId.value])
const petCount = computed(() => questionnaire.petCount)
const answers = computed(() => questionnaire.answers)

// Computed
const canProceed = computed(() => {
  if (currentStepId.value === 0) {
    return petCount.value > 0
  }
  
  if (currentStepId.value === 1) {
    // Check if all pets have names
    const petNames = answers.value.filter(a => 
      a.questionId.startsWith('pet_name_pet_') && 
      a.value && 
      a.value.trim() !== ''
    )
    return petNames.length === petCount.value
  }
  
  if (currentStepId.value === 2) {
    const answer = answers.value.find(a => a.questionId === 'pet_race')
    return answer && answer.value !== null && answer.value !== undefined && answer.value !== ''
  }
  
  return false
})

// Methods
const setPetCount = (count: number) => {
  questionnaire.setPetCount(count)
}

const getAnswerValue = (questionId: string) => {
  const answer = questionnaire.getAnswer(questionId)
  return answer ? answer.value : null
}

const handleAnswer = (questionId: string, value: any, petId?: string) => {
  questionnaire.addAnswer(questionId, value, petId)
}

const previousStep = () => {
  if (currentStepId.value > 0) {
    router.push(`/step/${currentStepId.value - 1}`)
  }
}

const nextStep = () => {
  if (canProceed.value) {
    if (currentStepId.value < 2) {
      router.push(`/step/${currentStepId.value + 1}`)
    } else {
      // Submit questionnaire
      submitQuestionnaire()
    }
  }
}

const submitQuestionnaire = () => {
  const result = questionnaire.submitQuestionnaire()
  console.log('Questionnaire submitted:', result)
  
  // Navigate to results page
  router.push('/results')
}

// Watch for step parameter changes
watch(() => route.params.step, (newStep) => {
  const stepId = parseInt(newStep as string) || 0
  questionnaire.setStep(Math.max(0, Math.min(stepId, 2)))
}, { immediate: true })

// Page metadata
definePageMeta({
  title: 'Pet Questionnaire',
  description: 'Tell us about your pets to get personalized recommendations',
  middleware: 'step-validation'
})
</script>

<style scoped>
.step-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 0;
}

.step-content {
  max-width: 800px;
  margin: 0 auto;
  background: white;
  border-radius: 16px 16px 0 0;
  padding: 2rem;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
}

.step-header {
  text-align: center;
  margin-bottom: 2rem;
}

.step-header h1 {
  color: #333;
  margin-bottom: 0.5rem;
}

.step-header p {
  color: #666;
  font-size: 1.1rem;
}

.pet-count-section h2 {
  color: #333;
  margin-bottom: 1rem;
  text-align: center;
}

.pet-count-options {
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-bottom: 2rem;
}

.pet-count-btn {
  padding: 1rem 2rem;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  background: white;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 1.1rem;
}

.pet-count-btn:hover {
  border-color: #0066cc;
  background: rgba(0, 102, 204, 0.05);
}

.pet-count-btn.selected {
  border-color: #0066cc;
  background: #0066cc;
  color: white;
}

.pet-names-section h2,
.pet-race-section h2 {
  color: #333;
  margin-bottom: 1rem;
  text-align: center;
}

.pet-section {
  margin-bottom: 2rem;
  padding: 1.5rem;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  background: #f8f9fa;
}

.pet-section h3 {
  color: #0066cc;
  margin-bottom: 1rem;
}

.navigation {
  display: flex;
  justify-content: space-between;
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 1px solid #e0e0e0;
}

.nav-btn {
  padding: 0.75rem 2rem;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 600;
}

.nav-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.nav-btn.primary {
  background: #0066cc;
  color: white;
}

.nav-btn.primary:hover:not(:disabled) {
  background: #0052a3;
}

.nav-btn.secondary {
  background: #6c757d;
  color: white;
}

.nav-btn.secondary:hover:not(:disabled) {
  background: #545b62;
}

@media (max-width: 768px) {
  .step-content {
    padding: 1.5rem;
  }
  
  .pet-count-options {
    flex-direction: column;
    align-items: center;
  }
  
  .pet-count-btn {
    width: 100%;
    max-width: 200px;
  }
  
  .navigation {
    flex-direction: column;
    gap: 1rem;
  }
  
  .nav-btn {
    width: 100%;
  }
}
</style>
