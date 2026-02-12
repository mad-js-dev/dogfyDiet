import { useComprehensiveQuestionnaireStore } from '~/stores/comprehensive-questionnaire'

export default defineNuxtRouteMiddleware((to) => {
  const questionnaire = useComprehensiveQuestionnaireStore()
  
  // Get the step parameter from the route
  const stepParam = to.params.step as string
  const stepId = parseInt(stepParam) || 0
  
  // Validate step range
  if (stepId < 0 || stepId > 2) {
    // Redirect to first step if invalid
    return navigateTo('/step/0')
  }
  
  // Check if user can access this step
  if (stepId > 0) {
    // For step 1 (names), need pet count
    if (stepId === 1 && questionnaire.petCount === 0) {
      return navigateTo('/step/0')
    }
    
    // For step 2 (race), need pet names
    if (stepId === 2) {
      const petNames = questionnaire.answers.filter(a => 
        a.questionId.startsWith('pet_name_pet_') && 
        a.value && 
        a.value.trim() !== ''
      )
      if (petNames.length !== questionnaire.petCount) {
        return navigateTo('/step/1')
      }
    }
  }
  
  // Update store with current step
  questionnaire.setStep(stepId)
})
