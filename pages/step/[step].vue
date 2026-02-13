<template>
  <div class="step-page">
    <StepNavigation :current-step="currentStepId" />
    
    <div class="step-content">
      <div class="step-header">
        <h1>{{ currentStep?.title }}</h1>
        <p v-if="currentStep?.description">{{ currentStep.description }}</p>
      </div>

      <!-- Pet Race Step -->
      <div v-if="currentStepId === 0" class="pet-race-section">
        <h2>What is your pet's race?</h2>
        <div class="breed-selection">
          <label class="breed-label">Select your pet's breed:</label>
          <select 
            v-model="selectedBreed"
            class="breed-select"
            @change="handleBreedSelection"
          >
            <option value="" disabled>Select a breed...</option>
            <option 
              v-for="breed in allBreeds" 
              :key="breed"
              :value="breed"
            >
              {{ breed }}
            </option>
          </select>
        </div>
      </div>

      <!-- Pet Names Step -->
      <div v-else-if="currentStepId === 1" class="pet-names-section">
        <h2>What are your pets' names?</h2>
        <div v-for="petNum in petCount" :key="petNum" class="pet-section">
          <h3>Pet {{ petNum }}</h3>
          <QuestionRenderer 
            :question="{
              id: `pet_name_pet_${petNum}`,
              type: 'text',
              question: `What is Pet ${petNum}'s name?`,
              appliesTo: 'individual',
              required: true,
              validation: [
                {
                  type: 'required',
                  message: 'Pet name is required'
                },
                {
                  type: 'minLength',
                  value: 2,
                  message: 'Pet name must be at least 2 characters'
                }
              ]
            }"
            :pet-id="`pet_${petNum}`"
            :model-value="getAnswerValue(`pet_name_pet_${petNum}`, `pet_${petNum}`)"
            @answer="handleAnswer"
          />
        </div>
      </div>

      <!-- Pet Gender Step -->
      <div v-else-if="currentStepId === 2" class="pet-gender-section">
        <h2>What is your pet's gender?</h2>
        <div v-for="petNum in petCount" :key="petNum" class="pet-section">
          <h3>Pet {{ petNum }}</h3>
          <QuestionRenderer 
            :question="{
              id: `pet_gender_pet_${petNum}`,
              type: 'select',
              question: `What is Pet ${petNum}'s gender?`,
              appliesTo: 'individual',
              required: true,
              options: ['Male', 'Female'],
              validation: [
                {
                  type: 'required',
                  message: 'Pet gender is required'
                }
              ]
            }"
            :pet-id="`pet_${petNum}`"
            :model-value="getAnswerValue(`pet_gender_pet_${petNum}`, `pet_${petNum}`)"
            @answer="handleAnswer"
          />
        </div>
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
import { questionnaireSteps, getStepQuestions, shouldShowQuestion, urlToInternalStep, internalToUrlStep } from '~/config/questionnaire-steps'
import { questionnaireQuestions } from '~/config/questionnaire-questions'
import QuestionRenderer from '~/components/QuestionRenderer.vue'
import StepNavigation from '~/components/StepNavigation.vue'

const questionnaire = useComprehensiveQuestionnaireStore()
const route = useRoute()
const router = useRouter()

// Breed selection state
const selectedBreed = ref('')

const allBreeds = [
  // Dog Breeds
  'Labrador Retriever',
  'German Shepherd', 
  'Golden Retriever',
  'French Bulldog',
  'Bulldog',
  'Poodle',
  'Beagle',
  'Rottweiler',
  'German Shorthaired Pointer',
  'Yorkshire Terrier',
  'Dachshund',
  'Siberian Husky',
  'Great Dane',
  'Boxer',
  'Chihuahua',
  // Cat Breeds
  'Persian',
  'Maine Coon',
  'British Shorthair',
  'Siamese',
  'American Shorthair',
  'Ragdoll',
  'Bengal',
  'Russian Blue',
  'Scottish Fold',
  'Birman',
  'Oriental Shorthair',
  'Devon Rex',
  'Himalayan',
  'American Curl',
  'Selkirk Rex'
]

const handleBreedSelection = () => {
  if (selectedBreed.value) {
    // Set pet count to 1 if not set
    if (questionnaire.petCount === 0) {
      questionnaire.setPetCount(1)
    }
    handleAnswer(selectedBreed.value, 'pet_breed_pet_1', 'pet_1')
  }
}

// Get step from URL parameter (convert 1-based URL to 0-based internal)
const currentStepId = computed(() => {
  const urlStep = parseInt(route.params.step as string) || 1
  const internalStep = urlToInternalStep(urlStep)
  return Math.max(0, Math.min(internalStep, 2)) // Clamp between 0 and 2
})

// State
const steps = computed(() => questionnaireSteps)
const currentStep = computed(() => steps.value[currentStepId.value])
const petCount = computed(() => questionnaire.petCount)
const answers = computed(() => questionnaire.answers)

// Computed
const canProceed = computed(() => {
  if (currentStepId.value === 0) {
    // Race step - need breed selection for each pet
    if (petCount.value === 1) {
      // Single pet mode - check for shared breed answer
      const breedAnswer = questionnaire.getAnswer('pet_breed_pet_1', 'pet_1')
      const singlePetResult = breedAnswer && breedAnswer.value && breedAnswer.value.trim() !== ''
      return singlePetResult
    } else {
      // Multiple pets mode - check for individual breed answers
      const currentPetCount = petCount.value || 1
      const breedAnswers = answers.value.filter(a => 
        a.questionId.startsWith('pet_breed_pet_') && 
          a.petId && 
          a.value && 
          a.value.trim() !== ''
      )
      
      // Allow proceeding if first pet has breed, even if new pets don't have breeds yet
      const firstPetHasBreed = answers.value.some(a => 
        a.questionId === 'pet_breed_pet_1' && 
        a.petId === 'pet_1' && 
        a.value && 
        a.value.trim() !== ''
      )
      
      const result = firstPetHasBreed || breedAnswers.length === currentPetCount
      return result
    }
  }
  
  if (currentStepId.value === 1) {
    // Names step - need pet names (default to 1 pet if not set)
    const currentPetCount = petCount.value || 1
    const petNames = answers.value.filter(a => 
      a.questionId.startsWith('pet_name_pet_') && 
        a.value && 
        a.value.trim() !== ''
    )
    const result = petNames.length === currentPetCount
    return result
  }
  
  if (currentStepId.value === 2) {
    // Gender step - need gender for each pet
    const currentPetCount = petCount.value || 1
    const petGenders = answers.value.filter(a => 
      a.questionId.startsWith('pet_gender_pet_') && 
        a.value && 
        a.value.trim() !== ''
    )
    const result = petGenders.length === currentPetCount
    return result
  }
  
  return false
})

// Methods
const setPetCount = (count: number) => {
  questionnaire.setPetCount(count)
}

const getAnswerValue = (questionId: string, petId?: string) => {
  // For pet-specific questions, include petId in the search
  const answer = questionnaire.getAnswer(questionId, petId)
  return answer ? answer.value : null
}

const handleAnswer = (value: any, questionId: string, petId?: string) => {
  console.log('handleAnswer called with:', { value, questionId, petId })
  questionnaire.addAnswer(questionId, value, petId)
}

const previousStep = () => {
  if (currentStepId.value > 0) {
    const prevUrlStep = internalToUrlStep(currentStepId.value - 1)
    router.push(`/step/${prevUrlStep}`)
  }
}

const nextStep = () => {
  if (canProceed.value) {
    if (currentStepId.value < 2) {
      const nextUrlStep = internalToUrlStep(currentStepId.value + 1)
      router.push(`/step/${nextUrlStep}`)
    } else {
      // Submit questionnaire
      submitQuestionnaire()
    }
  }
}

const submitQuestionnaire = () => {
  const result = questionnaire.submitQuestionnaire()
  
  // Navigate to results page
  router.push('/results')
}

// Watch for step parameter changes
watch(() => route.params.step, (newStep) => {
  const urlStep = parseInt(newStep as string) || 1
  const internalStep = urlToInternalStep(urlStep)
  questionnaire.setStep(Math.max(0, Math.min(internalStep, 2)))
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

.pet-race-section h2,
.pet-names-section h2,
.pet-gender-section h2 {
  color: #333;
  margin-bottom: 1rem;
  text-align: center;
}

.breed-selection {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.breed-label {
  font-weight: 600;
  color: #333;
  text-align: left;
}

.breed-select {
  padding: 0.75rem 1rem;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  font-size: 1rem;
  background: white;
  cursor: pointer;
  transition: all 0.3s ease;
}

.breed-select:focus {
  outline: none;
  border-color: #0066cc;
  box-shadow: 0 0 0 3px rgba(0, 102, 204, 0.1);
}

.breed-select:hover {
  border-color: #0066cc;
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
  
  .navigation {
    flex-direction: column;
    gap: 1rem;
  }
  
  .nav-btn {
    width: 100%;
  }
}
</style>
