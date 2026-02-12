<template>
  <div class="comprehensive-questionnaire">
    <!-- Progress Bar -->
    <div class="progress-bar">
      <div class="progress-steps">
        <div 
          v-for="step in steps" 
          :key="step.id"
          :class="getStepClass(step.id)"
          class="progress-step"
          @click="goToStep(step.id)"
        >
          <div class="step-number">{{ step.id + 1 }}</div>
          <div class="step-title">{{ step.title }}</div>
        </div>
      </div>
      <div class="progress-line">
        <div class="progress-fill" :style="{ width: `${progressPercentage}%` }"></div>
      </div>
    </div>

    <!-- Step Content -->
    <div class="step-content">
      <div class="step-header">
        <h1>{{ currentStep?.title }}</h1>
        <p v-if="currentStep?.description">{{ currentStep.description }}</p>
      </div>

      <!-- Pet Count Selection (First step) -->
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

const questionnaire = useComprehensiveQuestionnaireStore()

// State
const currentStepId = computed(() => questionnaire.currentStep)
const petCount = computed(() => questionnaire.petCount)

// Computed
const steps = computed(() => questionnaireSteps)
const currentStep = computed(() => steps.value[currentStepId.value])
const answers = computed(() => questionnaire.answers)
const globalAnswers = computed(() => answers.value.filter(a => !a.petId))

const progressPercentage = computed(() => {
  const totalSteps = 3 // Total number of steps (0-2)
  return Math.round((currentStepId.value / (totalSteps - 1)) * 100)
})

const canProceed = computed(() => questionnaire.canProceedToNext)

// Methods
const setPetCount = (count: number) => {
  questionnaire.setPetCount(count)
}

const getCurrentStepQuestions = () => {
  if (currentStepId.value === 0 && petCount.value === 0) {
    return [] // No questions until pet count is selected
  }
  
  const stepQuestions = getStepQuestions(currentStepId.value)
  return stepQuestions.filter(question => 
    shouldShowQuestion(question, answers.value)
  )
}

const getAnswerValue = (questionId: string) => {
  const answer = questionnaire.getAnswer(questionId)
  return answer ? answer.value : null
}

const getPetAnswers = (petNum: number) => {
  return questionnaire.getPetAnswers(petNum)
}

const getQuestionText = (questionId: string) => {
  const question = questionnaireQuestions.find(q => q.id === questionId.replace(/_pet_\d+/, ''))
  return question ? question.question : questionId
}

const formatAnswer = (questionId: string, value: any) => {
  if (Array.isArray(value)) return value.join(', ')
  if (typeof value === 'boolean') return value ? 'Yes' : 'No'
  if (typeof value === 'object' && value.years !== undefined) {
    return `${value.years} years, ${value.months} months`
  }
  return value
}

const handleAnswer = (questionId: string, value: any, petId?: string) => {
  questionnaire.addAnswer(questionId, value, petId)
}

const getStepClass = (stepId: number) => {
  return {
    'step-completed': stepId < currentStepId.value,
    'step-current': stepId === currentStepId.value,
    'step-future': stepId > currentStepId.value
  }
}

const goToStep = (stepId: number) => {
  if (stepId <= currentStepId.value) {
    questionnaire.setStep(stepId)
  }
}

const previousStep = () => {
  if (currentStepId.value > 0) {
    questionnaire.setStep(currentStepId.value - 1)
  }
}

const nextStep = () => {
  if (canProceed.value) {
    if (currentStepId.value < 2) {
      questionnaire.setStep(currentStepId.value + 1)
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
  navigateTo('/results')
}
</script>

<style scoped>
.comprehensive-questionnaire {
  max-width: 800px;
  margin: 2rem auto;
  padding: 2rem;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.progress-bar {
  margin-bottom: 3rem;
}

.progress-steps {
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
}

.progress-step {
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  transition: all 0.3s ease;
}

.step-number {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #e0e0e0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  margin-bottom: 0.5rem;
}

.step-current .step-number {
  background: #0066cc;
  color: white;
}

.step-completed .step-number {
  background: #4caf50;
  color: white;
}

.step-title {
  font-size: 0.875rem;
  text-align: center;
  color: #666;
}

.step-current .step-title {
  color: #0066cc;
  font-weight: 600;
}

.progress-line {
  height: 4px;
  background: #e0e0e0;
  border-radius: 2px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #0066cc, #0052a3);
  transition: width 0.5s ease;
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

.questions-section {
  margin-bottom: 2rem;
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

.review-section {
  margin-bottom: 2rem;
}

.review-pet, .review-global {
  margin-bottom: 2rem;
  padding: 1.5rem;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
}

.review-pet h3, .review-global h3 {
  color: #333;
  margin-bottom: 1rem;
}

.review-answers {
  display: grid;
  gap: 0.5rem;
}

.review-answer {
  padding: 0.5rem;
  background: #f8f9fa;
  border-radius: 4px;
}

.review-answer strong {
  color: #333;
  margin-right: 0.5rem;
}

.review-answer span {
  color: #666;
}
</style>
