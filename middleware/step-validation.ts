import { useComprehensiveQuestionnaireStore } from '~/stores/comprehensive-questionnaire'

// Helper functions for URL conversion
const urlToInternalStep = (urlStep: number): number => {
  // Convert 1-based URL to 0-based internal
  return urlStep - 1
}

const internalToUrlStep = (internalStep: number): number => {
  // Convert 0-based internal to 1-based URL
  return internalStep + 1
}

export default defineNuxtRouteMiddleware((to) => {
  const questionnaire = useComprehensiveQuestionnaireStore()
  
  // Get the step parameter from the route (1-based URL)
  const stepParam = to.params.step as string
  const urlStep = parseInt(stepParam) || 1
  const internalStep = urlToInternalStep(urlStep)
  
  // Validate step range (0-8 internally, 1-9 in URL)
  if (internalStep < 0 || internalStep > 8) {
    // Redirect to first step if invalid
    return navigateTo('/step/1')
  }
  
  // Check if user can access this step
  if (internalStep > 0) {
    // For step 1 (names), need breed selection
    if (internalStep === 1) {
      const breedAnswer = questionnaire.answers.find(a => a.questionId === 'pet_breed' && a.petId)
      if (!breedAnswer || !breedAnswer.value) {
        return navigateTo('/step/1')
      }
    }
    
    // For step 2 (gender), need pet names
    if (internalStep === 2) {
      const currentPetCount = questionnaire.petCount || 1
      const petNames = questionnaire.answers.filter(a => 
        a.questionId === 'pet_name' && 
        a.petId && 
        a.value && 
        a.value.trim() !== ''
      )
      if (petNames.length !== currentPetCount) {
        return navigateTo('/step/2')
      }
    }
    
    // For step 3 (birth date), need gender answers
    if (internalStep === 3) {
      const currentPetCount = questionnaire.petCount || 1
      const petGenders = questionnaire.answers.filter(a => 
        a.questionId === 'pet_gender' && 
        a.petId && 
        a.value && 
        a.value.trim() !== ''
      )
      if (petGenders.length !== currentPetCount) {
        return navigateTo('/step/3')
      }
    }
    
    // For step 4 (body shape), need birth date answers
    if (internalStep === 4) {
      const currentPetCount = questionnaire.petCount || 1
      const petBirthYears = questionnaire.answers.filter(a => 
        a.questionId === 'pet_birth_year' && 
        a.petId && 
        a.value && 
        a.value.trim() !== ''
      )
      if (petBirthYears.length !== currentPetCount) {
        return navigateTo('/step/4')
      }
    }
    
    // For step 5 (activity level), need body shape and weight answers
    if (internalStep === 5) {
      const currentPetCount = questionnaire.petCount || 1
      const petBodyShapes = questionnaire.answers.filter(a => 
        a.questionId === 'pet_body_shape' && 
        a.petId && 
        a.value && 
        a.value.trim() !== ''
      )
      if (petBodyShapes.length !== currentPetCount) {
        return navigateTo('/step/5')
      }
    }
    
    // For step 6 (pathology), need activity level answers
    if (internalStep === 6) {
      const currentPetCount = questionnaire.petCount || 1
      const petActivityLevels = questionnaire.answers.filter(a => 
        a.questionId === 'pet_activity_level' && 
        a.petId && 
        a.value && 
        a.value.trim() !== ''
      )
      if (petActivityLevels.length !== currentPetCount) {
        return navigateTo('/step/6')
      }
    }
    
    // For step 7 (gastronomic profile), need pathology answers
    if (internalStep === 7) {
      const currentPetCount = questionnaire.petCount || 1
      const petHasPathology = questionnaire.answers.filter(a => 
        a.questionId === 'pet_has_pathology' && 
        a.petId && 
        a.value && 
        a.value.trim() !== ''
      )
      if (petHasPathology.length !== currentPetCount) {
        return navigateTo('/step/7')
      }
    }
  // For step 8 (user contact), need gastronomic profile answers
    if (internalStep === 8) {
      const currentPetCount = questionnaire.petCount || 1
      const petGastronomicProfiles = questionnaire.answers.filter(a => 
        a.questionId === 'pet_gastronomic_profile' && 
        a.petId && 
        a.value && 
        a.value.trim() !== ''
      )
      if (petGastronomicProfiles.length !== currentPetCount) {
        return navigateTo('/step/8')
      }
    }
  }
  
  // Update store with current step (0-based internally)
  questionnaire.setStep(internalStep)
})
