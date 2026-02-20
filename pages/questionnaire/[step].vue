<template>
  <div class="questionnaire-step">
    <div class="container">
      <div class="step-header">
        <h1>{{ currentStepData?.title }}</h1>
        <p>{{ currentStepData?.description }}</p>
        <div class="progress-bar">
          <div 
            class="progress-fill" 
            :style="{ width: `${progressPercentage}%` }"
          ></div>
        </div>
        <span class="step-counter">Step {{ currentStep + 1 }} of {{ totalSteps }}</span>
      </div>

      <div class="questions-container">
        <div 
          v-for="question in currentStepData?.questions" 
          :key="question.id"
          class="question-item"
        >
          <h3>{{ question.title }}</h3>
          <p>{{ question.description }}</p>
          
          <!-- Question renderers will go here based on question.type -->
          <div class="question-input">
            <p>Question Type: {{ question.type }}</p>
            <p>Required: {{ question.required ? 'Yes' : 'No' }}</p>
            <p v-if="question.options">Options: {{ question.options.join(', ') }}</p>
          </div>
        </div>
      </div>

      <div class="navigation">
        <button 
          @click="goBack" 
          :disabled="isFirstStep"
          class="nav-btn secondary"
        >
          Previous
        </button>
        <button 
          @click="goNext" 
          :disabled="isLastStep"
          class="nav-btn primary"
        >
          {{ isLastStep ? 'Complete' : 'Next' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, nextTick } from 'vue'
import { useQuestionnaireStore } from '~/stores/questionnaire'

// Store
const questionnaire = useQuestionnaireStore()

// Route params
const route = useRoute()
const router = useRouter()

// Computed properties
const currentStep = computed(() => questionnaire.currentStep)
const currentStepData = computed(() => questionnaire.getCurrentStepData)
const totalSteps = computed(() => questionnaire.getAllSteps.length)
const progressPercentage = computed(() => 
  ((currentStep.value + 1) / totalSteps.value) * 100
)
const isFirstStep = computed(() => questionnaire.isFirstStep)
const isLastStep = computed(() => questionnaire.isLastStep)

// Navigation methods
const goBack = () => {
  questionnaire.previousStep()
  // Update URL to reflect new step - convert to 1-based for URL
  nextTick(() => {
    router.push(`/questionnaire/${questionnaire.currentStep + 1}`)
  })
}

const goNext = () => {
  if (isLastStep.value) {
    // Handle questionnaire completion
    questionnaire.setCompleted(true)
    router.push('/thank-you')
  } else {
    questionnaire.nextStep()
    // Update URL to reflect new step - convert to 1-based for URL
    nextTick(() => {
      router.push(`/questionnaire/${questionnaire.currentStep + 1}`)
    })
  }
}

// Initialize step from URL
onMounted(() => {
  const stepFromUrl = parseInt(route.params.step as string) || 1
  questionnaire.goToStep(stepFromUrl - 1) // Convert to 0-based index
})

// Debug: Print questionnaire data
console.log('=== Questionnaire Data ===')
console.log('Current Step:', currentStep.value)
console.log('Current Step Data:', currentStepData.value)
console.log('Total Steps:', totalSteps.value)
console.log('All Steps:', questionnaire.getAllSteps)
console.log('Answers:', questionnaire.getAnswers)
console.log('Is First Step:', isFirstStep.value)
console.log('Is Last Step:', isLastStep.value)
console.log('Progress:', progressPercentage.value)
</script>

<style scoped>
.questionnaire-step {
  min-height: 100vh;
  padding: 2rem 0;
}

.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 0 1rem;
}

.step-header {
  text-align: center;
  margin-bottom: 3rem;
}

.step-header h1 {
  font-size: 2rem;
  color: #333;
  margin-bottom: 1rem;
}

.step-header p {
  font-size: 1.1rem;
  color: #666;
  margin-bottom: 2rem;
}

.progress-bar {
  width: 100%;
  height: 8px;
  background-color: #e0e0e0;
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: 1rem;
}

.progress-fill {
  height: 100%;
  background-color: #4CAF50;
  transition: width 0.3s ease;
}

.step-counter {
  font-size: 0.9rem;
  color: #666;
}

.questions-container {
  margin-bottom: 3rem;
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
  padding: 1rem;
  background-color: #f5f5f5;
  border-radius: 4px;
  font-family: monospace;
  font-size: 0.9rem;
}

.navigation {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
}

.nav-btn {
  padding: 1rem 2rem;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.nav-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.nav-btn.primary {
  background-color: #4CAF50;
  color: white;
}

.nav-btn.primary:hover:not(:disabled) {
  background-color: #45a049;
}

.nav-btn.secondary {
  background-color: #f0f0f0;
  color: #333;
}

.nav-btn.secondary:hover:not(:disabled) {
  background-color: #e0e0e0;
}
</style>
