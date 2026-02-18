import { useComprehensiveQuestionnaireStore } from '~/stores/comprehensive-questionnaire'
import { useAbTestingStore } from '~/stores/ab-testing'
import { getInternalStepFromUrl } from '~/config/questionnaire-steps'

// Helper functions for URL conversion
const urlToInternalStep = (urlStep: number): number => {
  // Convert 1-based URL to 0-based internal
  return urlStep - 1
}

const internalToUrlStep = (internalStep: number): number => {
  // Convert 0-based internal to 1-based URL
  return internalStep + 1
}

export default defineNuxtRouteMiddleware((to, from) => {
  const questionnaire = useComprehensiveQuestionnaireStore()
  const abTesting = useAbTestingStore()
  
  // Get the step parameter from the route (1-based URL)
  const stepParam = to.params.step as string
  const urlStep = parseInt(stepParam) || 1
  
  // Check if user is in test group (Activity Level removed)
  const excludeActivityLevel = abTesting.isInTestGroup('activity_level_removal')
  
  // Convert URL step to internal step considering A/B testing
  const internalStep = getInternalStepFromUrl(urlStep, excludeActivityLevel)
  
  // Validate step range (0-7 for test group, 0-8 for control group)
  const maxStep = excludeActivityLevel ? 8 : 8 // Both groups allow up to internal step 8
  if (internalStep < 0 || internalStep > maxStep) {
    return navigateTo('/step/1')
  }
  
  // Check if user can access this step
  if (internalStep > 0) {
    // For step 1 (names), need breed selection
    if (internalStep === 1) {
      const breedAnswer = questionnaire.answers.find((a: { questionId: string; value: string }) => 
        (a.questionId === 'pet_breed' || a.questionId.startsWith('pet_breed_pet_')) && 
        a.value && 
        a.value.trim() !== ''
      )
      if (!breedAnswer || !breedAnswer.value) {
        return navigateTo('/step/1')
      }
    }
    
    // For step 2 (gender), need pet names
    else if (internalStep === 2) {
      const currentPetCount = questionnaire.petCount || 1
      
      // Check for both patterns: 'pet_name' and 'pet_name_pet_X'
      const petNames = questionnaire.answers.filter((a: { questionId: string; petId: any; value: string }) => 
        (a.questionId === 'pet_name' || a.questionId.startsWith('pet_name_pet_')) && 
        a.petId && 
        a.value && 
        a.value.trim() !== ''
      )
      if (petNames.length !== currentPetCount) {
        return navigateTo('/step/2')
      }
    }
    
    // For step 3 (birth date), need gender answers
    else if (internalStep === 3) {
      const hasSharedGenderAnswers = questionnaire.hasSharedAnswer('pet_gender')
      const hasIndividualGenderAnswers = questionnaire.hasIndividualAnswers('pet_gender')
      
      if (!hasSharedGenderAnswers && !hasIndividualGenderAnswers) {
        return navigateTo('/step/3')
      }
    }
    
    // For step 4 (body shape), need birth date answers
    else if (internalStep === 4) {
      const currentPetCount = questionnaire.petCount || 1
      
      const hasSharedBirthDateAnswers = questionnaire.answers.some((a: { questionId: string }) => 
        a.questionId === 'pet_birth_year' || a.questionId === 'pet_birth_month'
      )
      
      const hasIndividualBirthDateAnswers = questionnaire.answers.some((a: { questionId: string; petId: any }) => 
        (a.questionId === 'pet_birth_year' || a.questionId === 'pet_birth_month') && 
        a.petId
      )
      
      if (!hasSharedBirthDateAnswers && !hasIndividualBirthDateAnswers) {
        return navigateTo('/step/4')
      }
    }
    
    // For step 5 (activity level), need body shape and weight answers
    else if (internalStep === 5 && !excludeActivityLevel) {
      const currentPetCount = questionnaire.petCount || 1
      
      const hasSharedBodyShapeAnswers = questionnaire.answers.some((a: { questionId: string }) => 
        a.questionId === 'pet_body_shape' || a.questionId === 'pet_weight'
      )
      
      const hasIndividualBodyShapeAnswers = questionnaire.answers.some((a: { questionId: string; petId: any }) => 
        (a.questionId === 'pet_body_shape' || a.questionId === 'pet_weight') && 
        a.petId
      )
      
      if (!hasSharedBodyShapeAnswers && !hasIndividualBodyShapeAnswers) {
        return navigateTo('/step/5')
      }
    }
    
    // User Contact Step (step 7 in test group, step 8 in control group)
    const contactStep = excludeActivityLevel ? 8 : 8 // Both use internal step 8, but different URL steps
    if (internalStep === contactStep) {
      const currentPetCount = questionnaire.petCount || 1
      const petGastronomicProfiles = questionnaire.answers.filter((a: { questionId: string; petId: any; value: string }) => 
        a.questionId === 'pet_gastronomic_profile' && 
        a.petId && 
        a.value && 
        a.value.trim() !== ''
      )
      if (petGastronomicProfiles.length !== currentPetCount) {
        return navigateTo(`/step/${excludeActivityLevel ? 7 : 8}`)
      }
    }
  }
  
  // Update store with current step (0-based internally)
  questionnaire.setStep(internalStep)
})
