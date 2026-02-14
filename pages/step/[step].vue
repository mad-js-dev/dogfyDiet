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
      </div>

      <!-- Pet Gender Step -->
      <div v-else-if="currentStepId === 2" class="pet-gender-section">
        <h2>What is your pet's gender?</h2>
        <div class="pet-answers-grid">
          <div 
            v-for="petNum in Math.max(petCount, 1)" 
            :key="petNum" 
            class="pet-answer-section"
          >
            <h3>{{ petDisplayName(petNum) }}</h3>
            
            <!-- Gender Question -->
            <QuestionRenderer 
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
              :pet-id="`pet_${petNum}`"
              :model-value="getAnswerValue('pet_gender', petNum)"
              @answer="handleAnswer"
            />
            
            <!-- Neutered Question -->
            <QuestionRenderer 
              :question="{
                id: 'pet_neutered',
                type: 'select',
                question: 'Is ' + petDisplayName(petNum) + ' neutered/spayed?',
                appliesTo: 'individual',
                required: true,
                options: ['Yes', 'No'],
                validation: [
                  {
                    type: 'required',
                    message: 'Neutered status is required'
                  }
                ]
              }"
              :pet-id="`pet_${petNum}`"
              :model-value="getAnswerValue('pet_neutered', petNum)"
              @answer="handleAnswer"
            />
            
            <!-- Expecting Question - Conditional -->
            <QuestionRenderer 
              v-if="shouldShowExpectingQuestion(petNum)"
              :question="{
                id: 'pet_expecting',
                type: 'select',
                question: 'Is ' + petDisplayName(petNum) + ' expecting?',
                appliesTo: 'individual',
                required: true,
                options: ['Yes', 'No'],
                validation: [
                  {
                    type: 'required',
                    message: 'Expecting status is required'
                  }
                ]
              }"
              :pet-id="`pet_${petNum}`"
              :model-value="getAnswerValue('pet_expecting', petNum)"
              @answer="handleAnswer"
            />
          </div>
        </div>
      </div>

      <!-- Pet Birth Date Step -->
      <div v-else-if="currentStepId === 3" class="pet-birth-date-section">
        <h2>When was your pet{{ Math.max(petCount, 1) > 1 ? 's' : '' }} born?</h2>
        
        <!-- Shared Birth Date Mode (Default) -->
        <div v-if="!showIndividualBirthDates" class="shared-birth-date-mode">
          <div class="birth-date-inputs">
            <div class="birth-date-field">
              <label>Year:</label>
              <select v-model="sharedBirthYear" @change="handleSharedBirthDateChange" class="birth-date-select">
                <option value="" disabled>Year</option>
                <option v-for="year in yearOptions" :key="year" :value="year">
                  {{ year }}
                </option>
              </select>
            </div>
            
            <div class="birth-date-field">
              <label>Month:</label>
              <select v-model="sharedBirthMonth" @change="handleSharedBirthDateChange" class="birth-date-select">
                <option value="" disabled>Month</option>
                <option v-for="month in monthOptions" :key="month" :value="month">
                  {{ month }}
                </option>
              </select>
            </div>
          </div>
          
          <button 
            @click="showIndividualBirthDates = true"
            class="differentiate-btn"
          >
            Are your pets different in this aspect?
          </button>
        </div>
        
        <!-- Individual Birth Date Mode -->
        <div v-else class="individual-birth-date-mode">
          <div class="pet-answers-grid">
            <div 
              v-for="petNum in Math.max(petCount, 1)" 
              :key="petNum" 
              class="pet-answer-section"
            >
              <h3>{{ petDisplayName(petNum) }}</h3>
              
              <!-- Birth Year Question -->
              <QuestionRenderer 
                :question="{
                  id: 'pet_birth_year',
                  type: 'select',
                  question: 'What year was ' + petDisplayName(petNum) + ' born?',
                  appliesTo: 'individual',
                  required: true,
                  options: yearOptions,
                  validation: [
                    {
                      type: 'required',
                      message: 'Birth year is required'
                    }
                  ]
                }"
                :pet-id="`pet_${petNum}`"
                :model-value="getAnswerValue('pet_birth_year', petNum)"
                @answer="handleAnswer"
              />
              
              <!-- Birth Month Question -->
              <QuestionRenderer 
                :question="{
                  id: 'pet_birth_month',
                  type: 'select',
                  question: 'What month was ' + petDisplayName(petNum) + ' born?',
                  appliesTo: 'individual',
                  required: true,
                  options: monthOptions,
                  validation: [
                    {
                      type: 'required',
                      message: 'Birth month is required'
                    }
                  ]
                }"
                :pet-id="`pet_${petNum}`"
                :model-value="getAnswerValue('pet_birth_month', petNum)"
                @answer="handleAnswer"
              />
            </div>
          </div>
          
          <button 
            @click="showIndividualBirthDates = false"
            class="merge-btn"
          >
            Apply same birth date to all pets
          </button>
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
          {{ currentStepId === 3 ? 'Submit' : 'Next' }}
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

// Birth date options
const yearOptions = computed(() => {
  const currentYear = new Date().getFullYear()
  const years = []
  for (let year = currentYear; year >= currentYear - 20; year--) {
    years.push(year.toString())
  }
  return years
})

const monthOptions = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
]

// Birth date mode state
const showIndividualBirthDates = ref(false)
const sharedBirthYear = ref('')
const sharedBirthMonth = ref('')

// Get step from URL parameter (convert 1-based URL to 0-based internal)
const currentStepId = computed(() => {
  const urlStep = parseInt(route.params.step as string) || 1
  const internalStep = urlToInternalStep(urlStep)
  return Math.max(0, Math.min(internalStep, 3)) // Clamp between 0 and 3
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
    // Gender step - check for gender, neutered, and expecting answers
    const currentPetCount = Math.max(petCount.value, 1)
    
    // Check gender answers
    const petGenders = answers.value.filter(a => 
      a.questionId === 'pet_gender' && 
        a.petId && 
        a.value && 
        a.value.trim() !== ''
    )
    
    // Check neutered answers
    const petNeutered = answers.value.filter(a => 
      a.questionId === 'pet_neutered' && 
        a.petId && 
        a.value && 
        a.value.trim() !== ''
    )
    
    // Check expecting answers (only for female pets that are not neutered)
    const petExpecting = answers.value.filter(a => 
      a.questionId === 'pet_expecting' && 
        a.petId && 
        a.value && 
        a.value.trim() !== ''
    )
    
    const hasAllGenders = petGenders.length === currentPetCount
    const hasAllNeutered = petNeutered.length === currentPetCount
    
    // For expecting: only check female pets that are not neutered
    const femaleNotNeuteredCount = answers.value.filter(a => 
      a.questionId === 'pet_gender' && 
        a.petId && 
        a.value === 'Female'
    ).length
    
    const hasRequiredExpecting = petExpecting.length === femaleNotNeuteredCount
    
    return hasAllGenders && hasAllNeutered && hasRequiredExpecting
  }
  
  if (currentStepId.value === 3) {
    // Birth date step - check for birth year and month answers
    const currentPetCount = Math.max(petCount.value, 1)
    
    // Check birth year answers
    const petBirthYears = answers.value.filter(a => 
      a.questionId === 'pet_birth_year' && 
        a.petId && 
        a.value && 
        a.value.trim() !== ''
    )
    
    // Check birth month answers
    const petBirthMonths = answers.value.filter(a => 
      a.questionId === 'pet_birth_month' && 
        a.petId && 
        a.value && 
        a.value.trim() !== ''
    )
    
    const hasAllBirthYears = petBirthYears.length === currentPetCount
    const hasAllBirthMonths = petBirthMonths.length === currentPetCount
    
    // For shared mode: just need shared values to be set
    if (!showIndividualBirthDates.value) {
      return sharedBirthYear.value !== '' && sharedBirthMonth.value !== ''
    }
    
    // For individual mode: need all pets to have answers
    return hasAllBirthYears && hasAllBirthMonths
  }
  
  return false
})

// Methods
const setPetCount = (count: number) => {
  questionnaire.setPetCount(count)
}

const petDisplayName = (petNum: number) => {
  const petNameAnswer = questionnaire.getAnswer('pet_name', `pet_${petNum}`)
  return petNameAnswer ? petNameAnswer.value : `Pet ${petNum}`
}

const calculatePetAge = (petNum: number) => {
  const yearAnswer = questionnaire.getAnswer('pet_birth_year', `pet_${petNum}`)
  const monthAnswer = questionnaire.getAnswer('pet_birth_month', `pet_${petNum}`)
  
  if (!yearAnswer?.value || !monthAnswer?.value) return null
  
  const birthYear = parseInt(yearAnswer.value)
  const birthMonth = new Date(monthAnswer.value + ' 1').getMonth() + 1
  
  const currentDate = new Date()
  const currentYear = currentDate.getFullYear()
  const currentMonth = currentDate.getMonth() + 1
  
  let years = currentYear - birthYear
  let months = currentMonth - birthMonth
  
  if (months < 0) {
    years--
    months += 12
  }
  
  return { years, months }
}

const handleSharedBirthDateChange = () => {
  if (sharedBirthYear.value && sharedBirthMonth.value) {
    // Apply shared birth date to all pets
    const currentPetCount = Math.max(petCount.value, 1)
    for (let i = 1; i <= currentPetCount; i++) {
      questionnaire.addAnswer('pet_birth_year', sharedBirthYear.value, `pet_${i}`)
      questionnaire.addAnswer('pet_birth_month', sharedBirthMonth.value, `pet_${i}`)
    }
  }
}

const shouldShowExpectingQuestion = (petNum: number) => {
  const genderAnswer = questionnaire.getAnswer('pet_gender', `pet_${petNum}`)
  const neuteredAnswer = questionnaire.getAnswer('pet_neutered', `pet_${petNum}`)
  
  // Show expecting question only for female pets that are not neutered
  return genderAnswer?.value === 'Female' && neuteredAnswer?.value === 'No'
}

const getAnswerValue = (questionId: string, petNum: number) => {
  // For pet-specific questions, include petId in the search
  const answer = questionnaire.getAnswer(questionId, `pet_${petNum}`)
  return answer ? answer.value : null
}

const handleAnswer = (value: any, questionId: string, petId?: string) => {
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
    if (currentStepId.value < 3) {
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
  questionnaire.setStep(Math.max(0, Math.min(internalStep, 3)))
  
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
.pet-gender-section h2,
.pet-birth-date-section h2,
.pet-sterilization-section h2 {
  color: #0066cc;
  margin-bottom: 1.5rem;
  font-size: 1.5rem;
  font-weight: 600;
  text-align: center;
}

.pet-answers-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  margin-top: 1rem;
}

.pet-answer-section {
  flex: 1;
  min-width: 300px;
  max-width: 400px;
  margin-bottom: 2rem;
  padding: 1.5rem;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  background: #f8f9fa;
}

.pet-section {
  margin-bottom: 2rem;
  padding: 1.5rem;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  background: #f8f9fa;
}

.pet-answer-section h3 {
  color: #0066cc;
  margin-bottom: 1rem;
  font-size: 1.1rem;
  font-weight: 600;
}

.birth-date-inputs {
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  justify-content: center;
}

.birth-date-field {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.birth-date-field label {
  font-weight: 600;
  color: #333;
}

.birth-date-select {
  padding: 0.75rem;
  border: 2px solid #e0e0e0;
  border-radius: 6px;
  font-size: 1rem;
  background: white;
  min-width: 150px;
}

.birth-date-select:focus {
  outline: none;
  border-color: #0066cc;
}

.differentiate-btn,
.merge-btn {
  background: #6c757d;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 6px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin: 0 auto;
  display: block;
}

.differentiate-btn:hover,
.merge-btn:hover {
  background: #545b62;
}

.shared-birth-date-mode {
  text-align: center;
  padding: 2rem;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  background: #f8f9fa;
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
