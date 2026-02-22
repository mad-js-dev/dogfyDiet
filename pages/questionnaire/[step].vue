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
        <StepRenderer :step-data="currentStepData" />
      </div>

      <!-- Add/Remove Pet Button - Only show in names step (step 1) -->
      <div v-if="currentStep === 0" class="add-pet-section">
        <button @click="togglePetCount" :class="['add-pet-btn', { 'remove-mode': petCount > 1 }]">
          {{ petCount === 1 ? 'Have more than one pet?' : 'Remove second pet' }}
        </button>
        <p class="add-pet-description">
          {{ petCount === 1 ? 'Add a second pet to get personalized recommendations for both' : 'Remove the second pet and continue with one pet' }}
        </p>
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
          :disabled="!canProceed"
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
import { useComprehensiveQuestionnaireStore } from '~/stores/comprehensive-questionnaire'
import { questionnaireService } from '~/services/questionnaire'
import StepRenderer from '~/components/organisms/StepRenderer/StepRenderer.vue'

// Store
const questionnaire = useComprehensiveQuestionnaireStore()

// Route params
const route = useRoute()
const router = useRouter()

// Computed properties
const currentStep = computed(() => questionnaire.currentStep)
const currentStepData = computed(() => {
  return questionnaireService.getStepById(currentStep.value)
})
const totalSteps = computed(() => questionnaireService.getSteps().length)
const progressPercentage = computed(() => 
  ((currentStep.value + 1) / totalSteps.value) * 100
)
const isFirstStep = computed(() => currentStep.value === 0)
const isLastStep = computed(() => {
  const steps = questionnaireService.getSteps()
  return currentStep.value >= steps.length - 1
})
const canProceed = computed(() => {
  // TEMPORARY BYPASS: Always allow proceeding to test results page
  return true
})
const petCount = computed(() => questionnaire.petCount)

// Navigation methods
const goBack = () => {
  const newStep = Math.max(0, currentStep.value - 1)
  questionnaire.setStep(newStep)
  // Update URL to reflect new step - convert to 1-based for URL
  nextTick(() => {
    router.push(`/questionnaire/${newStep + 1}`)
  })
}

const goNext = () => {
  if (isLastStep.value) {
    // Handle questionnaire completion - go to results page instead of thank-you
    questionnaire.submitQuestionnaire()
    questionnaire.isCompleted = true
    router.push('/results')
  } else {
    const newStep = currentStep.value + 1
    questionnaire.setStep(newStep)
    // Update URL to reflect new step - convert to 1-based for URL
    nextTick(() => {
      router.push(`/questionnaire/${newStep + 1}`)
    })
  }
}

// Toggle pet count method
const togglePetCount = () => {
  if (petCount.value === 1) {
    questionnaire.setPetCount(2)
  } else {
    questionnaire.setPetCount(1)
  }
}

// Initialize step from URL
onMounted(() => {
  const stepFromUrl = parseInt(route.params.step as string) || 1
  questionnaire.setStep(stepFromUrl - 1) // Convert to 0-based index
})

// Debug: Print questionnaire data
console.log('=== Questionnaire Data ===')
console.log('Current Step:', currentStep.value)
console.log('Current Step Data:', currentStepData.value)
console.log('Total Steps:', totalSteps.value)
console.log('All Steps:', questionnaireService.getSteps())
console.log('Answers:', questionnaire.answers)
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

.add-pet-section {
  text-align: center;
  margin: 2rem 0;
  padding: 2rem;
  background: linear-gradient(135deg, #f8f9fa, #e9ecef);
  border-radius: 12px;
  border: 2px dashed #0a7373;
}

.add-pet-btn {
  background: transparent;
  border: none;
  color: #0a7373;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  position: relative;
  padding: 12px 24px;
  border-radius: 8px;
  transition: all 0.3s ease;
  text-decoration: underline;
  text-decoration-color: #0a7373;
  text-decoration-style: solid;
  text-decoration-thickness: 2px;
}

.add-pet-btn:hover {
  background-color: rgba(10, 115, 115, 0.1);
  color: #085858;
  transform: translateY(-2px);
}

.add-pet-btn.remove-mode {
  color: #dc3545;
  text-decoration-color: #dc3545;
}

.add-pet-btn.remove-mode:hover {
  background-color: rgba(220, 53, 69, 0.1);
  color: #c82333;
}

.add-pet-description {
  margin-top: 1rem;
  color: #666;
  font-size: 0.9rem;
  font-style: italic;
}
</style>
