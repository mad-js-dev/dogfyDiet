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
        <div v-if="!questionnaireData || questionnaireData.length === 0" class="loading">
          Loading questionnaire...
        </div>
        <div v-else-if="!currentStepData" class="error">
          Step data not found
        </div>
        <StepRenderer v-else :step-data="currentStepData" />
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
import { computed, nextTick, onMounted } from 'vue'
import { useComprehensiveQuestionnaireStore } from '~/stores/comprehensive-questionnaire'
import { useAbTestingStore } from '~/stores/ab-testing'
import { useStepValidation } from '~/composables/useStepValidation'
import StepRenderer from '~/components/organisms/StepRenderer/StepRenderer.vue'

// Store
const questionnaire = useComprehensiveQuestionnaireStore()

// Route params
const route = useRoute()
const router = useRouter()

// Load questionnaire data based on environment
const questionnaireData = ref<any[]>([])

onMounted(async () => {
  // Load questionnaire data based on A/B test group
  const abTesting = useAbTestingStore()
  
  // Force URL parameter processing before getting group
  console.log('🔍 URL params before processing:', window.location.search)
  
  // Also check URL parameter directly as backup
  const urlParams = new URLSearchParams(window.location.search)
  const urlGroup = urlParams.get('group')
  console.log('🔍 Direct URL group param:', urlGroup)
  
  // Small delay to ensure URL parameters are processed
  await nextTick()
  
  const group = abTesting.getExperimentGroup('activity_level_removal')
  
  console.log('🔍 A/B Test Group from store:', group)
  console.log('🔍 User assignments:', abTesting.userAssignments)
  
  // Use URL parameter directly if store doesn't have the right group
  const finalGroup = (urlGroup === 'control' || urlGroup === 'test') ? urlGroup : group
  console.log('🔍 Final group used:', finalGroup)
  
  // Determine which data file to load
  const dataFile = finalGroup === 'test' ? '/questionnaire-test.json' : '/questionnaire-control.json'
  console.log('🔍 Loading data from:', dataFile)
  
  try {
    // Add cache-busting timestamp
    const timestamp = Date.now()
    const cacheBustingFile = `${dataFile}?t=${timestamp}`
    console.log('🔍 Fetching with cache-busting:', cacheBustingFile)
    
    const response = await fetch(cacheBustingFile)
    console.log('🔍 Fetch response:', response)
    questionnaireData.value = await response.json()
    console.log('🔍 Loaded questionnaire data:', questionnaireData.value)
    console.log('🔍 Total steps loaded:', questionnaireData.value.length)
    
    // Log step titles to verify
    console.log('🔍 Step titles:', questionnaireData.value.map((step: any) => step.title))
  } catch (error) {
    console.error('❌ Failed to load questionnaire data:', error)
  }
})

// Computed properties
const currentStep = computed(() => questionnaire.currentStep)
const currentStepData = computed(() => {
  console.log('currentStep.value:', currentStep.value)
  console.log('questionnaireData.value length:', questionnaireData.value?.length)
  console.log('questionnaireData.value:', questionnaireData.value)
  
  if (!questionnaireData.value || questionnaireData.value.length === 0) return null
  
  const stepData = questionnaireData.value[currentStep.value] || null
  console.log('stepData:', stepData)
  return stepData
})
const totalSteps = computed(() => questionnaireData.value?.length || 0)
const progressPercentage = computed(() => 
  totalSteps.value > 0 ? ((currentStep.value + 1) / totalSteps.value) * 100 : 0
)
const isFirstStep = computed(() => currentStep.value === 0)
const isLastStep = computed(() => {
  return totalSteps.value > 0 && currentStep.value >= totalSteps.value - 1
})
const canProceed = computed(() => {
  // Import validation composable
  const { canProceed: stepCanProceed } = useStepValidation()
  return stepCanProceed.value
})
const petCount = computed(() => questionnaire.petCount)

// Navigation methods
const goBack = () => {
  const newStep = Math.max(0, currentStep.value - 1)
  questionnaire.setStep(newStep)
  // Update URL to reflect new step - convert to 1-based for URL and preserve query params
  nextTick(() => {
    const queryParams = route.query
    const queryString = Object.keys(queryParams).length > 0 ? `?${new URLSearchParams(queryParams as Record<string, string>).toString()}` : ''
    router.push(`/questionnaire/${newStep + 1}${queryString}`)
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
    // Update URL to reflect new step - convert to 1-based for URL and preserve query params
    nextTick(() => {
      const queryParams = route.query
      const queryString = Object.keys(queryParams).length > 0 ? `?${new URLSearchParams(queryParams as Record<string, string>).toString()}` : ''
      router.push(`/questionnaire/${newStep + 1}${queryString}`)
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
console.log('All Steps:', questionnaireData.value)
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
