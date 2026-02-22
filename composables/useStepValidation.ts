import { computed, ref } from 'vue'
import { useComprehensiveQuestionnaireStore } from '~/stores/comprehensive-questionnaire'
import { useAbTestingStore } from '~/stores/ab-testing'

export const useStepValidation = () => {
  const questionnaire = useComprehensiveQuestionnaireStore()
  const abTesting = useAbTestingStore()
  
  const answers = computed(() => questionnaire.answers)
  const petCount = computed(() => questionnaire.petCount)
  const currentStep = computed(() => questionnaire.currentStep)
  
  // Helper function to get answer value
  const getAnswerValue = (questionId: string, petId?: string) => {
    const answer = questionnaire.getAnswer(questionId, petId)
    return answer?.value
  }
  
  // Helper function to check if answer exists and is valid
  const hasValidAnswer = (questionId: string, petId?: string) => {
    const value = getAnswerValue(questionId, petId)
    return value !== undefined && value !== null && value !== ''
  }
  
  const canProceed = computed(() => {
    const step = currentStep.value
    
    // Step 0: Pet Breed (required for all pets)
    if (step === 0) {
      const currentPetCount = petCount.value
      
      if (currentPetCount === 1) {
        // Single pet - check for answer with pet_1 (since it's stored with petId even for single pet)
        if (!hasValidAnswer('pet_breed', 'pet_1')) {
          return false
        }
      } else {
        // Multiple pets - check for each pet
        for (let i = 1; i <= currentPetCount; i++) {
          if (!hasValidAnswer('pet_breed', `pet_${i}`)) {
            return false
          }
        }
      }
      return true
    }
    
    // Step 1: Pet Names (required for each pet)
    if (step === 1) {
      const currentPetCount = petCount.value
      
      console.log('Step 1 validation - checking pet names, petCount:', currentPetCount)
      console.log('Step 1 validation - all answers:', JSON.stringify(questionnaire.answers, null, 2))
      
      if (currentPetCount === 1) {
        // Single pet - check for answer with pet_1 (since breed is stored with petId)
        if (!hasValidAnswer('pet_name', 'pet_1')) {
          console.log('Step 1 validation - pet_name for pet_1 not found')
          return false
        }
      } else {
        // Multiple pets - check for each pet
        for (let i = 1; i <= currentPetCount; i++) {
          if (!hasValidAnswer('pet_name', `pet_${i}`)) {
            return false
          }
        }
      }
      return true
    }
    
    // Step 2: Pet Gender (required for each pet)
    if (step === 2) {
      const currentPetCount = petCount.value
      
      if (currentPetCount === 1) {
        // Single pet - check for answers with pet_1
        const gender = getAnswerValue('pet_gender', 'pet_1')
        const neutered = getAnswerValue('pet_neutered', 'pet_1')
        if (!gender || !neutered) {
          return false
        }
      } else {
        // Multiple pets - check for each pet
        for (let i = 1; i <= currentPetCount; i++) {
          const gender = getAnswerValue('pet_gender', `pet_${i}`)
          const neutered = getAnswerValue('pet_neutered', `pet_${i}`)
          if (!gender || !neutered) {
            return false
          }
        }
      }
      return true
    }
    
    // Step 3: Pet Birth Date (required for each pet)
    if (step === 3) {
      const currentPetCount = petCount.value
      
      if (currentPetCount === 1) {
        // Single pet - check for answers with pet_1
        const years = getAnswerValue('pet_birth_year', 'pet_1')
        const months = getAnswerValue('pet_birth_month', 'pet_1')
        if (!years || !months) {
          return false
        }
      } else {
        // Multiple pets - check for each pet
        for (let i = 1; i <= currentPetCount; i++) {
          const years = getAnswerValue('pet_birth_year', `pet_${i}`)
          const months = getAnswerValue('pet_birth_month', `pet_${i}`)
          if (!years || !months) {
            return false
          }
        }
      }
      return true
    }
    
    // Step 4: Pet Body Shape (required for each pet)
    if (step === 4) {
      const currentPetCount = petCount.value
      
      if (currentPetCount === 1) {
        // Single pet - check for answers with pet_1
        const bodyShape = getAnswerValue('pet_body_shape', 'pet_1')
        const weight = getAnswerValue('pet_weight', 'pet_1')
        if (!bodyShape || !weight || isNaN(Number(weight)) || Number(weight) <= 0) {
          return false
        }
      } else {
        // Multiple pets - check for each pet
        for (let i = 1; i <= currentPetCount; i++) {
          const bodyShape = getAnswerValue('pet_body_shape', `pet_${i}`)
          const weight = getAnswerValue('pet_weight', `pet_${i}`)
          if (!bodyShape || !weight || isNaN(Number(weight)) || Number(weight) <= 0) {
            return false
          }
        }
      }
      return true
    }
    
    // Step 5: Pet Pathology (required for each pet)
    if (step === 5) {
      const currentPetCount = petCount.value
      
      if (currentPetCount === 1) {
        // Single pet - check for answers with pet_1
        const hasPathology = getAnswerValue('pet_has_pathology', 'pet_1')
        if (!hasPathology) {
          return false
        }
        
        // If pet has pathology, check specific pathologies
        if (hasPathology === 'Yes') {
          const pathologies = getAnswerValue('pet_pathology', 'pet_1')
          if (!pathologies || (Array.isArray(pathologies) && pathologies.length === 0)) {
            return false
          }
        }
      } else {
        // Multiple pets - check for each pet
        for (let i = 1; i <= currentPetCount; i++) {
          const hasPathology = getAnswerValue('pet_has_pathology', `pet_${i}`)
          if (!hasPathology) {
            return false
          }
          
          // If pet has pathology, check specific pathologies
          if (hasPathology === 'Yes') {
            const pathologies = getAnswerValue('pet_pathology', `pet_${i}`)
            if (!pathologies || (Array.isArray(pathologies) && pathologies.length === 0)) {
              return false
            }
          }
        }
      }
      return true
    }
    
    // Final step: User contact information
    if (step === 6) {
      const userEmail = getAnswerValue('user_email', 'pet_1')
      const userPhone = getAnswerValue('user_phone', 'pet_1')
      
      console.log('Step 6 validation - userEmail:', userEmail)
      console.log('Step 6 validation - userPhone:', userPhone)
      console.log('Step 6 validation - all answers:', JSON.stringify(questionnaire.answers, null, 2))
      
      // Only email is required based on the JSON
      if (!userEmail) {
        console.log('Step 6 validation - email is required but missing')
        return false
      }
      
      // Basic email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(userEmail)) {
        console.log('Step 6 validation - email format is invalid')
        return false
      }
      
      console.log('Step 6 validation - passed')
      return true
    }
    
    return false
  })
  
  return {
    answers,
    petCount,
    currentStep,
    canProceed
  }
}
