<template>
  <div class="step-page">
    <StepNavigation :current-step="currentStepId" />
    
    <div class="step-content">
      <!-- Pet Breed Step -->
      <div v-if="currentStepId === 0" class="pet-race-section">
        <PetBreedStep />
      </div>

      <!-- Pet Names Step -->
      <div v-else-if="currentStepId === 1" class="pet-names-section">
        <PetNamesStep />
      </div>

      <!-- Pet Gender Step -->
      <div v-else-if="currentStepId === 2" class="pet-gender-section">
        <PetGenderStep 
          :show-individual-genders="showIndividualGenders"
          :pet-count="petCount"
          :should-show-expecting-question-renderer="shouldShowExpectingQuestionRenderer"
          @toggle-gender-mode="toggleGenderMode"
        />
      </div>

      <!-- Pet Birth Date Step -->
      <div v-else-if="currentStepId === 3" class="pet-birth-date-section">
        <PetBirthDateStep 
          :show-individual-birth-dates="showIndividualBirthDates"
          :pet-count="petCount"
          :shared-birth-year="sharedBirthYear"
          :shared-birth-month="sharedBirthMonth"
          :get-answer-value="getAnswerValue"
          @toggle-individual-birth-dates="showIndividualBirthDates = $event"
          @handle-shared-birth-year-change="handleSharedBirthYearChange"
          @handle-shared-birth-month-change="handleSharedBirthMonthChange"
          @handle-answer="handleAnswer"
        />
      </div>

      <!-- Pet Body Shape Step -->
      <div v-else-if="currentStepId === 4" class="pet-body-shape-section">
        <PetBodyShapeStep 
          :show-individual-body-shapes="showIndividualBodyShapes"
          :pet-count="petCount"
          :shared-body-shape="sharedBodyShape"
          :shared-weight="sharedWeight"
          :get-answer-value="getAnswerValue"
          :pet-display-name="petDisplayName"
          @toggle-individual-body-shapes="showIndividualBodyShapes = $event"
          @handle-shared-body-shape-change="handleSharedBodyShapeChange"
          @handle-shared-weight-change="handleSharedWeightChange"
          @handle-answer="handleAnswer"
        />
      </div>

      <!-- Pet Activity Level Step -->
      <div v-else-if="!excludeActivityLevel && currentStepId === 5" class="pet-activity-level-section">
        <PetActivityLevelStep 
          :show-individual-activity-levels="showIndividualActivityLevels"
          :pet-count="petCount"
          :shared-activity-level="sharedActivityLevel"
          :get-answer-value="getAnswerValue"
          :pet-display-name="petDisplayName"
          @toggle-individual-activity-levels="showIndividualActivityLevels = $event"
          @handle-shared-activity-level-change="handleSharedActivityLevelChange"
          @handle-answer="handleAnswer"
        />
      </div>

          <!-- Pet Pathology Step -->
      <div v-else-if="currentStepId === 6" class="pet-pathology-section">
        <PetPathologyStep 
          :show-individual-pathologies="showIndividualPathologies"
          :pet-count="petCount"
          :model-value="sharedHasPathology"
          :shared-pathology="sharedPathology"
          :get-answer-value="getAnswerValue"
          :pet-display-name="petDisplayName"
          @toggle-individual-pathologies="showIndividualPathologies = $event"
          @handle-shared-pathology-change="handleSharedPathologyChange"
          @handle-answer="handleAnswer"
        />
      </div>

      <!-- Pet Gastronomic Profile Step -->
      <div v-else-if="currentStepId === 7" class="pet-gastronomic-profile-section">
        <PetGastronomicProfileStep 
          :show-individual-gastronomic-profiles="showIndividualGastronomicProfiles"
          :pet-count="petCount"
          :shared-gastronomic-profile="sharedGastronomicProfile"
          :get-answer-value="getAnswerValue"
          :pet-display-name="petDisplayName"
          @toggle-individual-gastronomic-profiles="showIndividualGastronomicProfiles = $event"
          @handle-shared-gastronomic-profile-change="handleSharedGastronomicProfileChange"
          @handle-answer="handleAnswer"
        />
      </div>

      <!-- User Contact Information Step -->
      <div v-else-if="currentStepId === 8" class="user-contact-section">
        <UserContactStep 
          :get-answer-value="getAnswerValue"
          @handle-answer="handleAnswer"
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
          {{ currentStepIndex === (getTotalSteps(excludeActivityLevel) - 1) ? 'Submit' : 'Next' }}
        </button>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useComprehensiveQuestionnaireStore } from '~/stores/comprehensive-questionnaire'
import { useAbTestingStore } from '~/stores/ab-testing'
import { getQuestionnaireSteps, getTotalSteps, getInternalStepFromUrl, getUrlStepFromInternal } from '~/config/questionnaire-steps'
import StepNavigation from '~/components/StepNavigation.vue'
import PetBreedStep from '~/components/steps/PetBreedStep.vue'
import PetNamesStep from '~/components/steps/PetNamesStep.vue'
import PetGenderStep from '~/components/steps/PetGenderStep.vue'
import PetBirthDateStep from '~/components/steps/PetBirthDateStep.vue'
import PetBodyShapeStep from '~/components/steps/PetBodyShapeStep.vue'
import PetActivityLevelStep from '~/components/steps/PetActivityLevelStep.vue'
import PetPathologyStep from '~/components/steps/PetPathologyStep.vue'
import PetGastronomicProfileStep from '~/components/steps/PetGastronomicProfileStep.vue'
import UserContactStep from '~/components/steps/UserContactStep.vue'
import { useRoute, useRouter } from 'vue-router'
import { usePetData } from '~/composables/usePetData'
import { usePetUtils } from '~/composables/usePetUtils'
import { useSharedHandlers } from '~/composables/useSharedHandlers'

const questionnaire = useComprehensiveQuestionnaireStore()
const abTesting = useAbTestingStore()
const route = useRoute()
const router = useRouter()

// Use composables
const { allBreeds, yearOptions, monthOptions } = usePetData()
const { petDisplayName, calculatePetAge, getAnswerValue } = usePetUtils(questionnaire)

// Initialize shared handlers with a temporary petCount that will be reactive
const petCount = computed(() => questionnaire.petCount)
const sharedHandlers = useSharedHandlers(questionnaire, petCount)

// Get shared state from composable
const {
  sharedBirthYear,
  sharedBirthMonth,
  sharedBodyShape,
  sharedWeight,
  sharedActivityLevel,
  sharedPathology,
  sharedGastronomicProfile,
  sharedHasPathology,
  handleSharedBirthYearChange,
  handleSharedBirthMonthChange,
  handleSharedBodyShapeChange,
  handleSharedWeightChange,
  handleSharedActivityLevelChange,
  handleSharedPathologyChange,
  handleSharedGastronomicProfileChange
} = sharedHandlers

// A/B Testing: Check if user is in test group (Activity Level removed)
const excludeActivityLevel = computed(() => {
  // Check for manual override via URL parameter first
  const urlGroup = route.query.group as string
  if (urlGroup === 'test') {
    abTesting.assignUserToGroup('activity_level_removal', 'test')
    return true
  }
  if (urlGroup === 'control') {
    abTesting.assignUserToGroup('activity_level_removal', 'control')
    return false
  }
  
  // Fall back to normal A/B testing logic
  return abTesting.isInTestGroup('activity_level_removal')
})

// Track experiment assignment
if (excludeActivityLevel.value !== null) {
  abTesting.trackEvent('activity_level_removal', 'questionnaire_started', {
    exclude_activity_level: excludeActivityLevel.value
  })
}

// Client-side initialization and data restoration
onMounted(() => {
  console.log('Step page onMounted - currentStep:', questionnaire.currentStep)
  console.log('Step page onMounted - hasPersistedData:', questionnaire.hasPersistedData?.())
  
  // Check for persisted data and restore if available
  if (questionnaire.hasPersistedData?.() === true) {
    const restored = questionnaire.loadFromLocalStorage()
    console.log('Step page - restored data:', restored)
    
    if (restored) {
      // Restore UI state from questionnaire store (with null checks)
      if (questionnaire.uiState) {
        showIndividualGenders.value = questionnaire.uiState.showIndividualGenders
        showIndividualBirthDates.value = questionnaire.uiState.showIndividualBirthDates
        showIndividualBodyShapes.value = questionnaire.uiState.showIndividualBodyShapes
        showIndividualActivityLevels.value = questionnaire.uiState.showIndividualActivityLevels
        showIndividualPathologies.value = questionnaire.uiState.showIndividualPathologies
        showIndividualGastronomicProfiles.value = questionnaire.uiState.showIndividualGastronomicProfiles
      }
      
      // Only auto-navigate if this appears to be a fresh page load
      // Check if user landed on step 1 (default entry point) but has progress elsewhere
      const savedStep = questionnaire.currentStep
      const urlStep = getUrlStepFromInternal(savedStep, excludeActivityLevel.value)
      const currentUrlStep = parseInt(route.params.step as string) || 1
      
      console.log('Step page - navigation check:', {
        savedStep,
        urlStep,
        currentUrlStep
      })
      
      // Only restore if user is on step 1 but has saved progress beyond step 1
      // This prevents interference with manual navigation
      if (currentUrlStep === 1 && savedStep > 0) {
        console.log('Step page - auto-navigating to:', urlStep)
        router.replace(`/step/${urlStep}`)
      }
    }
  }
})

// Gender mode state (synced with questionnaire store)
const showIndividualGenders = computed({
  get: () => questionnaire.uiState?.showIndividualGenders || false,
  set: (value) => questionnaire.setUiState('showIndividualGenders', value)
})

// Birth date mode state (synced with questionnaire store)
const showIndividualBirthDates = computed({
  get: () => questionnaire.uiState?.showIndividualBirthDates || false,
  set: (value) => questionnaire.setUiState('showIndividualBirthDates', value)
})

// Body shape mode state (synced with questionnaire store)
const showIndividualBodyShapes = computed({
  get: () => questionnaire.uiState?.showIndividualBodyShapes || false,
  set: (value) => questionnaire.setUiState('showIndividualBodyShapes', value)
})

// Activity level mode state (synced with questionnaire store)
const showIndividualActivityLevels = computed({
  get: () => questionnaire.uiState?.showIndividualActivityLevels || false,
  set: (value) => questionnaire.setUiState('showIndividualActivityLevels', value)
})

// Pathology mode state (synced with questionnaire store)
const showIndividualPathologies = computed({
  get: () => questionnaire.uiState?.showIndividualPathologies || false,
  set: (value) => questionnaire.setUiState('showIndividualPathologies', value)
})

// Gastronomic profile mode state (synced with questionnaire store)
const showIndividualGastronomicProfiles = computed({
  get: () => questionnaire.uiState?.showIndividualGastronomicProfiles || false,
  set: (value) => questionnaire.setUiState('showIndividualGastronomicProfiles', value)
})

// Get step from URL parameter (convert 1-based URL to 0-based internal)
const currentStepId = computed(() => {
  const urlStep = parseInt(route.params.step as string) || 1
  const internalStep = getInternalStepFromUrl(urlStep, excludeActivityLevel.value)
  const maxStep = 8 // Both groups allow up to internal step 8 (User Contact)
  const result = Math.max(0, Math.min(internalStep, maxStep))
  
  // Only update questionnaire store if it's different and not during initial restoration
  // This prevents overwriting the saved step during page load
  if (questionnaire.currentStep !== result) {
    questionnaire.setStep(result)
  }
  
  return result
})

// Make sure the computed property updates when route changes
watch(() => route.params.step, () => {
}, { immediate: true })

// State
const steps = computed(() => getQuestionnaireSteps(excludeActivityLevel.value))
const currentStep = computed(() => steps.value[currentStepId.value])
const currentStepIndex = computed(() => steps.value.findIndex(step => step.id === currentStepId.value))
const answers = computed(() => questionnaire.answers)

// Computed
const canProceed = computed(() => {
  if (currentStepId.value === 0) {
    // Breed step - check for breed answer (only 1 pet)
    const breedAnswer = answers.value.find((a: { questionId: string; petId: any; value: string }) => 
      a.questionId === 'pet_breed' && 
      a.petId === 'pet_1' && 
      a.value && 
      a.value.trim() !== ''
    )
    return !!breedAnswer
  }
  
  if (currentStepId.value === 1) {
    // Names step - need pet names (always individual since names are unique)
    // and breeds for pet 2 (pet 1 breed is from step 1)
    const currentPetCount = petCount.value
    
    // Check pet names (both patterns: 'pet_name' and 'pet_name_pet_X')
    const petNames = answers.value.filter((a: { questionId: string; petId: any; value: string }) => 
      (a.questionId === 'pet_name' || a.questionId.startsWith('pet_name_pet_')) && 
        a.petId && 
        a.value && 
        a.value.trim() !== ''
    )
    
    // For single pet: just need name (breed from step 1)
    if (currentPetCount === 1) {
      return petNames.length === 1
    }
    
    // For two pets: need names for both + breed for pet 2
    const hasBothNames = petNames.length === 2
    
    // Check breed for pet 2 (both patterns)
    const pet2Breed = answers.value.find((a: { questionId: string; petId: any; value: string }) => 
      (a.questionId === 'pet_breed' || a.questionId === 'pet_breed_pet_2') && 
      (a.petId === 'pet_2' || !a.petId) && 
      a.value && 
      a.value.trim() !== ''
    )
    
    const hasPet2Breed = !!pet2Breed
    
    return hasBothNames && hasPet2Breed
  }
  
  if (currentStepId.value === 2) {
    // Gender step - ConditionalAnswerRenderer handles validation internally
    // Just need to check if we have the basic required answers
    const currentPetCount = petCount.value
    
    // Check if we have gender answers (required)
    const hasGenderAnswers = questionnaire.hasSharedAnswer('pet_gender') || 
                             questionnaire.hasIndividualAnswers('pet_gender')
    
    // Check if we have neutered answers (required)  
    const hasNeuteredAnswers = questionnaire.hasSharedAnswer('pet_neutered') ||
                               questionnaire.hasIndividualAnswers('pet_neutered')
    
    // Check expecting answers only if the expecting question should be shown
    let hasExpectingAnswers = true
    if (shouldShowExpectingQuestionRenderer()) {
      hasExpectingAnswers = questionnaire.hasSharedAnswer('pet_expecting') ||
                             questionnaire.hasIndividualAnswers('pet_expecting')
    }
    
    return hasGenderAnswers && hasNeuteredAnswers && hasExpectingAnswers
  }
  
  if (currentStepId.value === 3) {
    // Birth date step - check for birth year and month answers
    const currentPetCount = petCount.value
    
    // Check birth year answers
    const petBirthYears = answers.value.filter((a: { questionId: string; petId: any; value: string }) => 
      a.questionId === 'pet_birth_year' && 
        a.petId && 
        a.value && 
        a.value.trim() !== ''
    )
    
    // Check birth month answers
    const petBirthMonths = answers.value.filter((a: { questionId: string; petId: any; value: string }) => 
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
  
  if (currentStepId.value === 4) {
    // Body shape step - check for body shape and weight answers
    const currentPetCount = petCount.value
    
    
    // Check body shape answers
    const petBodyShapes = answers.value.filter((a: { questionId: string; petId: any; value: string }) => 
      a.questionId === 'pet_body_shape' && 
        a.petId && 
        a.value && 
        a.value.trim() !== ''
    )
    
    // Check weight answers
    const petWeights = answers.value.filter((a: { questionId: string; petId: any; value: string }) => 
      a.questionId === 'pet_weight' && 
        a.petId && 
        a.value && 
        a.value.trim() !== ''
    )
    
    
    const hasAllBodyShapes = petBodyShapes.length === currentPetCount
    const hasAllWeights = petWeights.length === currentPetCount
    
    
    // For shared mode: just need shared values to be set
    if (!showIndividualBodyShapes.value) {
      const result = sharedBodyShape.value !== '' && sharedWeight.value !== ''
      return result
    }
    
    // For individual mode: need all pets to have answers
    return hasAllBodyShapes && hasAllWeights
  }
  
  if (currentStepId.value === 5 && !excludeActivityLevel.value) {
    // Activity level step - check for activity level answers
    const currentPetCount = petCount.value
    
    
    // Check activity level answers
    const petActivityLevels = answers.value.filter((a: { questionId: string; petId: any; value: string }) => 
      a.questionId === 'pet_activity_level' && 
        a.petId && 
        a.value && 
        a.value.trim() !== ''
    )
    
    const hasAllActivityLevels = petActivityLevels.length === currentPetCount
    
    
    // For shared mode: just need shared value to be set
    if (!showIndividualActivityLevels.value) {
      const result = sharedActivityLevel.value !== ''
      return result
    }
    
    // For individual mode: need all pets to have answers
    return hasAllActivityLevels
  }
  
  if (currentStepId.value === 6) {
    // Pathology step - check for pathology answers
    const currentPetCount = petCount.value
    
    // Check pathology boolean answers
    const petHasPathology = answers.value.filter((a: { questionId: string; petId: any; value: string }) => 
      a.questionId === 'pet_has_pathology' && 
        a.petId && 
        a.value && 
        a.value.trim() !== ''
    )
    
    const hasAllPathologyAnswers = petHasPathology.length === currentPetCount
    
    // For shared mode: just need shared value to be set
    if (!showIndividualPathologies.value) {
      return sharedHasPathology.value !== ''
    }
    
    // For individual mode: need all pets to have answers
    return hasAllPathologyAnswers
  }
  
  if (currentStepId.value === 7) {
    // Gastronomic profile step - check for gastronomic profile answers
    const currentPetCount = petCount.value
    
    // Check gastronomic profile answers
    const petGastronomicProfiles = answers.value.filter((a: { questionId: string; petId: any; value: string }) => 
      a.questionId === 'pet_gastronomic_profile' && 
        a.petId && 
        a.value && 
        a.value.trim() !== ''
    )
    
    const hasAllGastronomicProfileAnswers = petGastronomicProfiles.length === currentPetCount
    
    // For shared mode: just need shared value to be set
    if (!showIndividualGastronomicProfiles.value) {
      return sharedGastronomicProfile.value !== ''
    }
    
    // For individual mode: need all pets to have answers
    return hasAllGastronomicProfileAnswers
  }
  
  if (currentStepId.value === 8) {
    // User contact step - check for contact information
    const userName = answers.value.find((a: { questionId: string; value: string }) => a.questionId === 'user_name')
    const userEmail = answers.value.find((a: { questionId: string; value: string }) => a.questionId === 'user_email')
    const userPhone = answers.value.find((a: { questionId: string; value: string }) => a.questionId === 'user_phone')
    
    return userName?.value && userEmail?.value && userPhone?.value &&
           userName.value.trim() !== '' && 
           userEmail.value.trim() !== '' && 
           userPhone.value.trim() !== ''
  }
  
  return false
})

// Methods
const setPetCount = (count: number) => {
  questionnaire.setPetCount(count)
}

const shouldShowExpectingQuestionRenderer = () => {
  // Check if we should show the expecting question based on current mode and answers
  
  if (!showIndividualGenders.value) {
    // Shared mode: check shared answers
    return shouldShowSharedExpectingQuestion()
  } else {
    // Individual mode: show if any pet needs the expecting question
    for (let i = 1; i <= petCount.value; i++) {
      if (shouldShowExpectingQuestion(i)) {
        return true
      }
    }
    return false
  }
}

const shouldShowExpectingQuestion = (petNum: number) => {
  const genderAnswer = questionnaire.getAnswer('pet_gender', `pet_${petNum}`)
  const neuteredAnswer = questionnaire.getAnswer('pet_neutered', `pet_${petNum}`)
  
  // Show expecting question only for female pets that are not neutered
  return genderAnswer?.value === 'Female' && neuteredAnswer?.value === 'No'
}

const shouldShowSharedExpectingQuestion = () => {
  // For single pet, check individual answers since they're stored with petId
  if (petCount.value === 1) {
    const genderAnswer = questionnaire.getAnswer('pet_gender', 'pet_1')
    const neuteredAnswer = questionnaire.getAnswer('pet_neutered', 'pet_1')
    
    return genderAnswer?.value === 'Female' && neuteredAnswer?.value === 'No'
  }
  
  // For multiple pets, check shared answers
  const genderAnswer = questionnaire.getAnswer('pet_gender')
  const neuteredAnswer = questionnaire.getAnswer('pet_neutered')
  
  // Show expecting question only for female pets that are not neutered
  return genderAnswer?.value === 'Female' && neuteredAnswer?.value === 'No'
}

const handleAnswer = (value: any, questionId: string, petId?: string) => {
  console.log('handleAnswer called:', {
    questionId,
    value,
    petId
  })
  questionnaire.addAnswer(questionId, value, petId)
  
  // Auto-clear expecting answer when neutered is set to Yes
  if (questionId === 'pet_neutered' && value === 'Yes') {
    if (petId) {
      // Individual mode - clear expecting for this specific pet
      questionnaire.removeAnswer('pet_expecting', petId)
    } else {
      // Shared mode - clear shared expecting answer
      questionnaire.removeAnswer('pet_expecting')
    }
  }
}

const toggleGenderMode = () => {
  const wasIndividualMode = showIndividualGenders.value
  showIndividualGenders.value = !showIndividualGenders.value
  
  if (!wasIndividualMode) {
    // Switching to individual mode - differentiate all gender-related answers
    questionnaire.differentiateAnswers('pet_gender')
    questionnaire.differentiateAnswers('pet_neutered')
    questionnaire.differentiateAnswers('pet_expecting')
  } else {
    // Switching to shared mode - merge all answers to shared
    const genderAnswer = questionnaire.getAnswer('pet_gender', 'pet_1')
    const neuteredAnswer = questionnaire.getAnswer('pet_neutered', 'pet_1')
    const expectingAnswer = questionnaire.getAnswer('pet_expecting', 'pet_1')
    
    // Remove ALL individual answers for all pets
    for (let i = 1; i <= petCount.value; i++) {
      questionnaire.removeAnswer('pet_gender', `pet_${i}`)
      questionnaire.removeAnswer('pet_neutered', `pet_${i}`)
      questionnaire.removeAnswer('pet_expecting', `pet_${i}`)
    }
    
    // Create shared answers from pet_1's values
    if (genderAnswer) {
      questionnaire.addAnswer('pet_gender', genderAnswer.value, null)
    }
    
    if (neuteredAnswer) {
      questionnaire.addAnswer('pet_neutered', neuteredAnswer.value, null)
    }
    
    if (expectingAnswer) {
      questionnaire.addAnswer('pet_expecting', expectingAnswer.value, null)
    }
  }
}

const previousStep = () => {
  if (currentStepId.value > 0) {
    const prevUrlStep = getUrlStepFromInternal(currentStepId.value - 1, excludeActivityLevel.value)
    router.push(`/step/${prevUrlStep}`)
  }
}

const nextStep = () => {
  if (canProceed.value) {
    const steps = getQuestionnaireSteps(excludeActivityLevel.value)
    const currentStepIndex = steps.findIndex(step => step.id === currentStepId.value)
    const totalSteps = getTotalSteps(excludeActivityLevel.value)
    
    if (currentStepIndex < totalSteps - 1) {
      // Get the next step by index, not by ID
      const nextStep = steps[currentStepIndex + 1]
      const nextUrlStep = getUrlStepFromInternal(nextStep.id, excludeActivityLevel.value)
      
      // Track step completion for A/B testing
      abTesting.trackEvent('activity_level_removal', 'step_completed', {
        step_id: currentStepId.value,
        step_url: nextUrlStep,
        exclude_activity_level: excludeActivityLevel.value
      })
      
      router.push(`/step/${nextUrlStep}`)
    } else {
      // User contact is the last step, submit questionnaire
        
      // Track questionnaire completion for A/B testing
      abTesting.trackEvent('activity_level_removal', 'questionnaire_completed', {
        total_steps: totalSteps,
        exclude_activity_level: excludeActivityLevel.value
      })
      
      submitQuestionnaire()
    }
  } else {
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
  const internalStep = getInternalStepFromUrl(urlStep, excludeActivityLevel.value)
  const maxStep = excludeActivityLevel.value ? 7 : 8 // Max internal step (0-based)
  questionnaire.setStep(Math.max(0, Math.min(internalStep, maxStep)))
  
  // Ensure pet count is at least 1 when starting questionnaire
  if (questionnaire.petCount === 0) {
    questionnaire.setPetCount(1)
  }
}, { immediate: true })

// Reset pet count to 1 when entering breed step
watch(currentStepId, (newStepId) => {
  if (newStepId === 0) {
    // Reset to 1 pet for breed step
    questionnaire.setPetCount(1)
    }
})

// Page metadata
definePageMeta({
  title: 'Pet Questionnaire',
  description: 'Tell us about your pets to get personalized recommendations',
  ssr: false,
  middleware: 'step-validation'
})
</script>

<style scoped>
.step-page {
  min-height: 100vh;
  padding: 0;
}

.step-content {
  max-width: 800px;
  margin: 0 auto;
  background: white;
  border-radius: 16px 16px 0 0;
  padding: 2rem;
  margin-top: 2.4rem;
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
.pet-body-shape-section h2,
.pet-activity-level-section h2,
.pet-sterilization-section h2,
.user-contact-section h2 {
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

.data-management-section {
  margin-top: 2rem;
  padding: 1rem;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  background: #fafafa;
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
  position: relative;
}

.differentiate-btn:hover,
.merge-btn:hover {
  background: #545b62;
}

.master-differentiation-controls {
  text-align: center;
  padding: 1rem;
}

.master-differentiation-controls .differentiate-btn,
.master-differentiation-controls .merge-btn {
  display: inline-block;
  border-radius: 6px;
  color: #0a7373;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 500;
  transition: all 0.3s ease;
  position: relative;
  background: transparent;
  border: none;
  padding: 8px 0;

  &:before {
    display: block;
    content: '';
    width: 100%;
    height: 1px;
    background-color: #0a7373;
    position: absolute;
    bottom: -0.3rem;
    left: 0;
    transform: scaleX(0);
    transform-origin: 100% 50%;
    transition: transform 0.3s;
  }
  
  &:hover:before {
    transform: scaleX(1);
  }
}

.shared-birth-date-mode {
  text-align: center;
  border-radius: 8px;
  margin-bottom: 2rem;
}

.shared-body-shape-mode {
  text-align: center;
}

.shared-activity-level-mode {
  text-align: center;
  margin-bottom: 2rem;
}

.activity-level-inputs {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  margin-bottom: 2rem;
  align-items: center;
}

.activity-level-field {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  min-width: 400px;
  width: 100%;
  max-width: 500px;
}

.activity-level-field label {
  font-weight: 600;
  color: #333;
  margin-bottom: 0.5rem;
}

.activity-level-select {
  padding: 0.75rem;
  border: 2px solid #e0e0e0;
  border-radius: 6px;
  font-size: 1rem;
  background: white;
  width: 100%;
}

.activity-level-select:focus {
  outline: none;
  border-color: #0066cc;
}

.body-shape-inputs {
  display: flex;
  flex-direction: column;
  margin-bottom: 2rem;
  align-items: center;
}

.body-shape-field {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  min-width: 400px;
  width: 100%;
  max-width: 500px;
}

.body-shape-field label {
  font-weight: 600;
  color: #333;
  margin-bottom: 0.5rem;
}

.body-shape-select {
  padding: 0.75rem;
  border: 2px solid #e0e0e0;
  border-radius: 6px;
  font-size: 1rem;
  background: white;
  width: 100%;
}

.body-shape-select:focus {
  outline: none;
  border-color: #0066cc;
}

.weight-input {
  width: 100%;
  padding: 0.75rem;
  border: 2px solid #e0e0e0;
  border-radius: 6px;
  font-size: 1rem;
  transition: border-color 0.3s ease;
}

.weight-input:focus {
  outline: none;
  border-color: #0066cc;
  box-shadow: 0 0 3px rgba(0, 102, 204, 0.1);
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

/* Pathology Step Styles */
.pathology-bool-select,
.pathology-select {
  padding: 0.75rem;
  border: 2px solid #e0e0e0;
  border-radius: 6px;
  font-size: 1rem;
  background: white;
  width: 100%;
  min-width: 200px;
}

.pathology-bool-select:focus,
.pathology-select:focus {
  outline: none;
  border-color: #0066cc;
}

.pathology-field {
  margin-bottom: 1rem;
}

.pathology-field label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 600;
  color: #333;
}

.shared-pathology-mode {
  text-align: center;
}

.pathology-inputs {
  max-width: 400px;
  margin: 0 auto;
}

.individual-pathology-mode .pathology-select {
  margin-top: 1rem;
}

/* Gastronomic Profile Step Styles */
.gastronomic-profile-select {
  padding: 0.75rem;
  border: 2px solid #e0e0e0;
  border-radius: 6px;
  font-size: 1rem;
  background: white;
  width: 100%;
  min-width: 300px;
}

.gastronomic-profile-select:focus {
  outline: none;
  border-color: #0066cc;
}

.gastronomic-profile-field {
  margin-bottom: 1rem;
}

.gastronomic-profile-field label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 600;
  color: #333;
}

.shared-gastronomic-profile-mode {
  text-align: center;
}

.gastronomic-profile-inputs {
  max-width: 500px;
  margin: 0 auto;
}

.individual-gastronomic-profile-mode .gastronomic-profile-select {
  margin-top: 1rem;
}

/* User Contact Step Styles */
.contact-form {
  max-width: 600px;
  margin: 0 auto;
}

.contact-field {
  margin-bottom: 1.5rem;
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
