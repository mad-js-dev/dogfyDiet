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
        <ConditionalAnswerRenderer 
          :question="{
            id: 'pet_breed',
            type: 'select',
            question: 'What is your pet\'s breed?',
            appliesTo: 'individual',
            required: true,
            options: allBreeds,
            validation: [
              {
                type: 'required',
                message: 'Pet breed is required'
              }
            ]
          }"
          :initial-mode="'individual'"
        />
      </div>

      <!-- Pet Names Step -->
      <div v-else-if="currentStepId === 1" class="pet-names-section">
        <h2>What are your pets' names?</h2>
        <ConditionalAnswerRenderer 
          :question="{
            id: 'pet_name',
            type: 'text',
            question: 'What is your pet\'s name?',
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
          :initial-mode="'individual'"
        />
        
        <div class="add-pet-section">
          <button 
            @click="addPet"
            class="add-pet-btn"
          >
            + Add Another Pet
          </button>
        </div>
      </div>

      <!-- Pet Gender Step -->
      <div v-else-if="currentStepId === 2" class="pet-gender-section">
        <h2>What is your pet's gender?</h2>
        <ConditionalAnswerRenderer 
          :question="{
            id: 'pet_gender',
            type: 'select',
            question: 'What is your pet\'s gender?',
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
import { questionnaireSteps, getStepQuestions, shouldShowQuestion, urlToInternalStep, internalToUrlStep } from '~/config/questionnaire-steps'
import { questionnaireQuestions } from '~/config/questionnaire-questions'
import QuestionRenderer from '~/components/QuestionRenderer.vue'
import StepNavigation from '~/components/StepNavigation.vue'
import ConditionalAnswerRenderer from '~/components/ConditionalAnswerRenderer.vue'

const questionnaire = useComprehensiveQuestionnaireStore()
const route = useRoute()
const router = useRouter()

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
    // Breed step - check for breed answers
    const currentPetCount = Math.max(petCount.value, 1)
    const breedAnswers = answers.value.filter(a => 
      a.questionId === 'pet_breed' && 
      a.petId && 
      a.value && 
      a.value.trim() !== ''
    )
    const result = breedAnswers.length === currentPetCount
    return result
  }
  
  if (currentStepId.value === 1) {
    // Names step - need pet names (always individual since names are unique)
    // and breeds for pets 2+ (pet 1 breed is from step 1)
    const currentPetCount = Math.max(petCount.value, 1) // Ensure at least 1
    
    // Check pet names
    const petNames = answers.value.filter(a => 
      a.questionId === 'pet_name' && 
        a.petId && 
        a.value && 
        a.value.trim() !== ''
    )
    
    // Check breeds for pets 2+
    const petBreeds = answers.value.filter(a => 
      a.questionId === 'pet_breed' && 
        a.petId && 
        a.value && 
        a.value.trim() !== ''
    )
    
    // For single pet: just need name (breed from step 1)
    if (currentPetCount === 1) {
      return petNames.length === currentPetCount
    }
    
    // For multiple pets: need names for all + breeds for pets 2+
    const hasAllNames = petNames.length === currentPetCount
    const hasBreedsForPets2Plus = petBreeds.length >= (currentPetCount - 1)
    
    return hasAllNames && hasBreedsForPets2Plus
  }
  
  if (currentStepId.value === 2) {
    // Gender step - check for either shared answer or individual answers
    const hasSharedGender = questionnaire.hasSharedAnswer('pet_gender')
    
    if (hasSharedGender) {
      return true // Shared answer is sufficient
    }
    
    // Check individual answers
    const currentPetCount = petCount.value || 1
    const petGenders = answers.value.filter(a => 
      a.questionId === 'pet_gender' && 
      a.petId && 
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

const addPet = () => {
  const newPetCount = petCount.value + 1
  questionnaire.setPetCount(newPetCount)
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
  
  // Ensure pet count is at least 1 when starting questionnaire
  if (questionnaire.petCount === 0) {
    questionnaire.setPetCount(1)
  }
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

.add-pet-section {
  margin-top: 2rem;
  text-align: center;
}

.add-pet-btn {
  padding: 0.75rem 1.5rem;
  background: linear-gradient(135deg, #28a745, #20c997);
  border: none;
  border-radius: 8px;
  color: white;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 600;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(40, 167, 69, 0.3);
}

.add-pet-btn:hover {
  background: linear-gradient(135deg, #218838, #1ea085);
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(40, 167, 69, 0.4);
}

.add-pet-btn:active {
  transform: translateY(0);
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
