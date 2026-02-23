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
  const getAnswerValue = (questionId: string, petId?: string | null) => {
    const answer = questionnaire.getAnswer(questionId, petId)
    return answer?.value
  }
  
  // Helper function to check if answer exists and is valid
  const hasValidAnswer = (questionId: string, petId?: string | null) => {
    const value = getAnswerValue(questionId, petId)
    return value !== undefined && value !== null && value !== ''
  }
  
  const canProceed = computed(() => {
    const step = currentStep.value
    const group = abTesting.getExperimentGroup('activity_level_removal')
    
    console.log('=== VALIDATION DEBUG ===')
    console.log('step value:', step)
    console.log('group value:', group)
    console.log('step === 7:', step === 7)
    console.log('group === "control":', group === 'control')
    console.log('eating habits condition:', (step === 7 && group === 'control'))
    console.log('contact condition:', (step === 8 && group === 'control'))
    console.log('========================')
    
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
      
      console.log('=== GENDER VALIDATION DEBUG ===')
      console.log('currentPetCount:', currentPetCount)
      console.log('all answers:', JSON.stringify(questionnaire.answers, null, 2))
      
      if (currentPetCount === 1) {
        // Single pet - check for answers with pet_1
        const gender = getAnswerValue('pet_gender', 'pet_1')
        const neutered = getAnswerValue('pet_neutered', 'pet_1')
        console.log('Single pet - gender:', gender, 'neutered:', neutered)
        if (!gender || !neutered) {
          console.log('Single pet validation FAILED')
          return false
        }
      } else {
        // Multiple pets - check for shared answers first (one answer mode)
        const sharedGender = getAnswerValue('pet_gender', null)
        const sharedNeutered = getAnswerValue('pet_neutered', null)
        console.log('Shared answers - gender:', sharedGender, 'neutered:', sharedNeutered)
        
        if (sharedGender && sharedNeutered) {
          console.log('Using shared answers - validation PASSED')
          return true
        }
        
        // If no shared answers, check for individual pet answers
        for (let i = 1; i <= currentPetCount; i++) {
          const gender = getAnswerValue('pet_gender', `pet_${i}`)
          const neutered = getAnswerValue('pet_neutered', `pet_${i}`)
          console.log('Pet ' + i + ' - gender:', gender, 'neutered:', neutered)
          
          if (!gender || !neutered) {
            console.log('Pet ' + i + ' validation FAILED')
            return false
          }
        }
      }
      console.log('Gender validation PASSED')
      return true
    }
    
    // Step 3: Pet Birth Date (required for each pet)
    if (step === 3) {
      const currentPetCount = petCount.value
      
      console.log('=== BIRTH DATE VALIDATION DEBUG ===')
      console.log('currentPetCount:', currentPetCount)
      console.log('all answers:', JSON.stringify(questionnaire.answers, null, 2))
      
      if (currentPetCount === 1) {
        // Single pet - check for answers with pet_1
        const years = getAnswerValue('pet_birth_year', 'pet_1')
        const months = getAnswerValue('pet_birth_month', 'pet_1')
        console.log('Single pet - years:', years, 'months:', months)
        if (!years || !months) {
          console.log('Single pet validation FAILED')
          return false
        }
      } else {
        // Multiple pets - check for shared answers first (one answer mode)
        const sharedYears = getAnswerValue('pet_birth_year', null)
        const sharedMonths = getAnswerValue('pet_birth_month', null)
        console.log('Shared answers - years:', sharedYears, 'months:', sharedMonths)
        
        if (sharedYears && sharedMonths) {
          console.log('Using shared answers - validation PASSED')
          return true
        }
        
        // If no shared answers, check for individual pet answers
        for (let i = 1; i <= currentPetCount; i++) {
          const years = getAnswerValue('pet_birth_year', `pet_${i}`)
          const months = getAnswerValue('pet_birth_month', `pet_${i}`)
          console.log('Pet ' + i + ' - years:', years, 'months:', months)
          
          if (!years || !months) {
            console.log('Pet ' + i + ' validation FAILED')
            return false
          }
        }
      }
      console.log('Birth date validation PASSED')
      return true
    }
    
    // Step 4: Pet Body Shape (required for each pet)
    if (step === 4) {
      const currentPetCount = petCount.value
      
      console.log('=== BODY SHAPE VALIDATION DEBUG ===')
      console.log('currentPetCount:', currentPetCount)
      console.log('all answers:', JSON.stringify(questionnaire.answers, null, 2))
      
      if (currentPetCount === 1) {
        // Single pet - check for answers with pet_1
        const bodyShape = getAnswerValue('pet_body_shape', 'pet_1')
        const weight = getAnswerValue('pet_weight', 'pet_1')
        console.log('Single pet - bodyShape:', bodyShape, 'weight:', weight)
        if (!bodyShape || !weight || isNaN(Number(weight)) || Number(weight) <= 0) {
          console.log('Single pet validation FAILED')
          return false
        }
      } else {
        // Multiple pets - check for shared answers first (one answer mode)
        const sharedBodyShape = getAnswerValue('pet_body_shape', null)
        const sharedWeight = getAnswerValue('pet_weight', null)
        console.log('Shared answers - bodyShape:', sharedBodyShape, 'weight:', sharedWeight)
        
        if (sharedBodyShape && sharedWeight && !isNaN(Number(sharedWeight)) && Number(sharedWeight) > 0) {
          console.log('Using shared body shape answers - validation PASSED')
          return true
        }
        
        // If no shared answers, check for individual pet answers
        for (let i = 1; i <= currentPetCount; i++) {
          const bodyShape = getAnswerValue('pet_body_shape', `pet_${i}`)
          const weight = getAnswerValue('pet_weight', `pet_${i}`)
          console.log('Pet ' + i + ' - bodyShape:', bodyShape, 'weight:', weight)
          if (!bodyShape || !weight || isNaN(Number(weight)) || Number(weight) <= 0) {
            console.log('Pet ' + i + ' validation FAILED')
            return false
          }
        }
      }
      console.log('Body shape validation PASSED')
      return true
    }
    
    // Step 5: Pet Activity Level (only for control group)
    if (step === 5) {
      // Only validate activity level if user is in control group
      if (group === 'control') {
        const currentPetCount = petCount.value
        
        console.log('=== ACTIVITY LEVEL VALIDATION DEBUG ===')
        console.log('currentPetCount:', currentPetCount)
        console.log('all answers:', JSON.stringify(questionnaire.answers, null, 2))
        
        if (currentPetCount === 1) {
          // Single pet - check for answer with pet_1
          const activityLevel = getAnswerValue('pet_activity_level', 'pet_1')
          console.log('Single pet - activityLevel:', activityLevel)
          if (!activityLevel) {
            console.log('Single pet validation FAILED')
            return false
          }
        } else {
          // Multiple pets - check for shared answers first (one answer mode)
          const sharedActivityLevel = getAnswerValue('pet_activity_level', null)
          console.log('Shared activityLevel:', sharedActivityLevel)
          
          if (sharedActivityLevel) {
            console.log('Using shared activity answer - validation PASSED')
            return true
          }
          
          // If no shared answers, check for individual pet answers
          for (let i = 1; i <= currentPetCount; i++) {
            const activityLevel = getAnswerValue('pet_activity_level', `pet_${i}`)
            console.log('Pet ' + i + ' - activityLevel:', activityLevel)
            if (!activityLevel) {
              console.log('Pet ' + i + ' validation FAILED')
              return false
            }
          }
        }
        console.log('Activity level validation PASSED')
      }
      return true
    }
    
    // Step 6: Pet Pathology (control group) OR Step 5: Pet Pathology (test group)
    // Note: This handles the pathology step which appears at different positions depending on the group
    if ((step === 6 && group === 'control') || (step === 5 && group === 'test')) {
      const currentPetCount = petCount.value
      
      console.log(`Pathology validation - step: ${step}, group: ${group}, petCount: ${currentPetCount}`)
      console.log('Pathology validation - all answers:', JSON.stringify(questionnaire.answers, null, 2))
      
      if (currentPetCount === 1) {
        // Single pet - check for answers with pet_1
        const hasPathology = getAnswerValue('pet_has_pathology', 'pet_1')
        console.log('Pathology validation - hasPathology (pet_1):', hasPathology)
        
        // Also try without petId for single pet
        const hasPathologyNoPet = getAnswerValue('pet_has_pathology', null)
        console.log('Pathology validation - hasPathology (no petId):', hasPathologyNoPet)
        
        if (!hasPathology && !hasPathologyNoPet) {
          console.log('Pathology validation - FAILED: no pathology answer found')
          return false
        }
        
        // Use whichever answer exists
        const pathologyAnswer = hasPathology || hasPathologyNoPet
        console.log('Pathology validation - using answer:', pathologyAnswer)
        
        // If pet has pathology, check specific pathologies
        if (pathologyAnswer === 'Yes') {
          const pathologies = getAnswerValue('pet_pathology', 'pet_1')
          const pathologiesNoPet = getAnswerValue('pet_pathology', null)
          const finalPathologies = pathologies || pathologiesNoPet
          
          console.log('Pathology validation - pathologies (pet_1):', pathologies)
          console.log('Pathology validation - pathologies (no petId):', pathologiesNoPet)
          
          if (!finalPathologies || (Array.isArray(finalPathologies) && finalPathologies.length === 0)) {
            console.log('Pathology validation - FAILED: pet has pathology but no specific pathologies selected')
            return false
          }
        }
      } else {
        // Multiple pets - check for shared answers first (one answer mode)
        const sharedHasPathology = getAnswerValue('pet_has_pathology', null)
        console.log('Shared hasPathology:', sharedHasPathology)
        
        if (sharedHasPathology) {
          // If pet has pathology, check specific pathologies
          if (sharedHasPathology === 'Yes') {
            const pathologies = getAnswerValue('pet_pathology', null)
            console.log('Shared pathologies:', pathologies)
            
            if (!pathologies || (Array.isArray(pathologies) && pathologies.length === 0)) {
              console.log('Pathology validation - FAILED: pet has pathology but no specific pathologies selected')
              return false
            }
          }
          console.log('Using shared pathology answers - validation PASSED')
          return true
        }
        
        // If no shared answers, check for individual pet answers
        for (let i = 1; i <= currentPetCount; i++) {
          const hasPathology = getAnswerValue('pet_has_pathology', `pet_${i}`)
          console.log(`Pathology validation - hasPathology (pet_${i}):`, hasPathology)
          
          if (!hasPathology) {
            console.log(`Pathology validation - FAILED: pet_${i} has no pathology answer`)
            return false
          }
          
          // If pet has pathology, check specific pathologies
          if (hasPathology === 'Yes') {
            const pathologies = getAnswerValue('pet_pathology', `pet_${i}`)
            console.log(`Pathology validation - pathologies (pet_${i}):`, pathologies)
            
            if (!pathologies || (Array.isArray(pathologies) && pathologies.length === 0)) {
              console.log(`Pathology validation - FAILED: pet_${i} has pathology but no specific pathologies selected`)
              return false
            }
          }
        }
      }
      
      console.log('Pathology validation - PASSED')
      return true
    }
    
    // Step 7: Pet Gastronomic Profile (control group) OR Step 6: Pet Gastronomic Profile (test group)
    // Note: This handles the eating habits step which appears at different positions depending on the group
    if ((step === 7 && group === 'control') || (step === 6 && group === 'test')) {
      const currentPetCount = petCount.value
      
      console.log('Gastronomic validation - step: ' + step + ', group: ' + group + ', petCount: ' + currentPetCount)
      console.log('Gastronomic validation - all answers:', JSON.stringify(questionnaire.answers, null, 2))
      
      if (currentPetCount === 1) {
        // Single pet - check for answers with pet_1
        const gastronomicProfile = getAnswerValue('pet_gastronomic_profile', 'pet_1')
        console.log('Gastronomic validation - gastronomicProfile (pet_1):', gastronomicProfile)
        
        // Also try without petId for single pet
        const gastronomicProfileNoPet = getAnswerValue('pet_gastronomic_profile', null)
        console.log('Gastronomic validation - gastronomicProfile (no petId):', gastronomicProfileNoPet)
        
        if (!gastronomicProfile && !gastronomicProfileNoPet) {
          console.log('Gastronomic validation - FAILED: no gastronomic answer found')
          return false
        }
      } else {
        // Multiple pets - check for shared answers first (one answer mode)
        const sharedGastronomicProfile = getAnswerValue('pet_gastronomic_profile', null)
        console.log('Shared gastronomicProfile:', sharedGastronomicProfile)
        
        if (sharedGastronomicProfile) {
          console.log('Using shared gastronomic answer - validation PASSED')
          return true
        }
        
        // If no shared answers, check for individual pet answers
        for (let i = 1; i <= currentPetCount; i++) {
          const gastronomicProfile = getAnswerValue('pet_gastronomic_profile', 'pet_' + i)
          console.log('Gastronomic validation - gastronomicProfile (pet_' + i + '):', gastronomicProfile)
          
          if (!gastronomicProfile) {
            console.log('Gastronomic validation - FAILED: pet_' + i + ' has no gastronomic answer')
            return false
          }
        }
      }
      
      console.log('Gastronomic validation - PASSED')
      return true
    }
    
    // Final step: User contact information (step 8 for control group, step 7 for test group)
    // Note: This handles the contact step which appears at different positions depending on the group
    if ((step === 8 && group === 'control') || (step === 7 && group === 'test')) {
      const currentPetCount = petCount.value
      
      console.log('=== CONTACT VALIDATION DEBUG ===')
      console.log('step value:', step)
      console.log('group value:', group)
      console.log('currentPetCount:', currentPetCount)
      console.log('all answers:', JSON.stringify(questionnaire.answers, null, 2))
      
      if (currentPetCount === 1) {
        // Single pet - check for answers with pet_1
        const userEmail = getAnswerValue('user_email', 'pet_1')
        const userPhone = getAnswerValue('user_phone', 'pet_1')
        console.log('Single pet - userEmail:', userEmail, 'userPhone:', userPhone)
        
        // Also try without petId for single pet
        const userEmailNoPet = getAnswerValue('user_email', null)
        const userPhoneNoPet = getAnswerValue('user_phone', null)
        console.log('Single pet - userEmail (null):', userEmailNoPet, 'userPhone (null):', userPhoneNoPet)
        
        const finalEmail = userEmail || userEmailNoPet
        const finalPhone = userPhone || userPhoneNoPet
        
        console.log('Single pet - finalEmail:', finalEmail, 'finalPhone:', finalPhone)
        
        if (!finalEmail) {
          console.log('Single pet validation FAILED - no email found')
          return false
        }
        
        // Basic email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(finalEmail)) {
          console.log('Single pet validation FAILED - email format invalid')
          return false
        }
      } else {
        // Multiple pets - check for shared answers first (one answer mode)
        const sharedUserEmail = getAnswerValue('user_email', null)
        const sharedUserPhone = getAnswerValue('user_phone', null)
        console.log('Shared answers - userEmail:', sharedUserEmail, 'userPhone:', sharedUserPhone)
        
        if (sharedUserEmail) {
          // Basic email validation
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
          if (!emailRegex.test(sharedUserEmail)) {
            console.log('Shared validation FAILED - email format invalid')
            return false
          }
          console.log('Using shared contact answers - validation PASSED')
          return true
        }
        
        // If no shared answers, check for individual pet answers
        for (let i = 1; i <= currentPetCount; i++) {
          const userEmail = getAnswerValue('user_email', `pet_${i}`)
          const userPhone = getAnswerValue('user_phone', `pet_${i}`)
          console.log('Pet ' + i + ' - userEmail:', userEmail, 'userPhone:', userPhone)
          
          if (!userEmail) {
            console.log('Pet ' + i + ' validation FAILED - no email found')
            return false
          }
          
          // Basic email validation
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
          if (!emailRegex.test(userEmail)) {
            console.log('Pet ' + i + ' validation FAILED - email format invalid')
            return false
          }
        }
      }
      
      console.log('Contact validation PASSED')
      return true
    }
    
    console.log('=== FINAL VALIDATION CHECK ===')
    console.log('step value:', step)
    console.log('group value:', group)
    console.log('No validation condition matched for this step')
    console.log('Returning false - this might be the issue')
    return false
  })
  
  return {
    answers,
    petCount,
    currentStep,
    canProceed
  }
}
