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
  
  // Validate step range (0-2 internally, 1-3 in URL)
  if (internalStep < 0 || internalStep > 2) {
    // Redirect to first step if invalid
    return navigateTo('/step/1')
  }
  
  // Check if user can access this step
  if (internalStep > 0) {
    // For step 1 (names), need race selection
    if (internalStep === 1) {
      const raceAnswer = questionnaire.answers.find(a => a.questionId === 'pet_race')
      if (!raceAnswer || !raceAnswer.value) {
        return navigateTo('/step/1')
      }
    }
    
    // For step 2 (gender), need pet names
    if (internalStep === 2) {
      const currentPetCount = questionnaire.petCount || 1
      const petNames = questionnaire.answers.filter(a => 
        a.questionId.startsWith('pet_name_pet_') && 
        a.value && 
        a.value.trim() !== ''
      )
      if (petNames.length !== currentPetCount) {
        return navigateTo('/step/2')
      }
    }
  }
  
  // Update store with current step (0-based internally)
  questionnaire.setStep(internalStep)
})
