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
  
  console.log('=== Middleware Navigation ===')
  console.log('From:', from.path)
  console.log('To:', to.path)
  
  // Get the step parameter from the route (1-based URL)
  const stepParam = to.params.step as string
  const urlStep = parseInt(stepParam) || 1
  
  // Check if user is in test group (Activity Level removed)
  const excludeActivityLevel = abTesting.isInTestGroup('activity_level_removal')
  
  // Convert URL step to internal step considering A/B testing
  console.log('Before getInternalStepFromUrl:', { urlStep, excludeActivityLevel })
  const internalStep = getInternalStepFromUrl(urlStep, excludeActivityLevel)
  console.log('After getInternalStepFromUrl:', { internalStep })
  
  console.log('Middleware validation:', {
    urlStep,
    internalStep,
    excludeActivityLevel,
    group: abTesting.getExperimentGroup('activity_level_removal')
  })
  
  // Validate step range (0-7 for test group, 0-8 for control group)
  // Note: Even though test group has 8 steps, the internal step IDs go up to 8
  const maxStep = excludeActivityLevel ? 8 : 8 // Both groups allow up to internal step 8
  console.log('Step range validation:', { internalStep, maxStep, excludeActivityLevel, condition: internalStep > maxStep })
  if (internalStep < 0 || internalStep > maxStep) {
    console.log('Invalid step range, redirecting to step 1')
    return navigateTo('/step/1')
  }
  
  // Check if user can access this step
  if (internalStep > 0) {
    // For step 1 (names), need breed selection
    if (internalStep === 1) {
      const breedAnswer = questionnaire.answers.find(a => a.questionId === 'pet_breed' && a.petId)
      if (!breedAnswer || !breedAnswer.value) {
        console.log('Missing breed answer, redirecting to step 1')
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
        console.log('Missing pet names, redirecting to step 2')
        return navigateTo('/step/2')
      }
    }
    
    // For step 3 (birth date), need gender answers
    if (internalStep === 3) {
      const currentPetCount = questionnaire.petCount || 1
      
      // Check for shared gender answer first
      const sharedGender = questionnaire.answers.find(a => a.questionId === 'pet_gender' && !a.petId)
      
      if (sharedGender && sharedGender.value) {
        // Shared mode - gender answer exists, allow access
        console.log('Middleware: Found shared gender answer, allowing access to step 3')
      } else {
        // Individual mode - check for individual gender answers
        const petGenders = questionnaire.answers.filter(a => 
          a.questionId === 'pet_gender' && 
          a.petId && 
          a.value && 
          a.value.trim() !== ''
        )
        if (petGenders.length !== currentPetCount) {
          console.log('Missing individual gender answers, redirecting to step 3')
          return navigateTo('/step/3')
        }
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
        console.log('Missing birth date answers, redirecting to step 4')
        return navigateTo('/step/4')
      }
    }
    
    // Activity Level Step (only exists in control group)
    if (!excludeActivityLevel && internalStep === 5) {
      // For step 5 (activity level), need body shape and weight answers
      const currentPetCount = questionnaire.petCount || 1
      const petBodyShapes = questionnaire.answers.filter(a => 
        a.questionId === 'pet_body_shape' && 
        a.petId && 
        a.value && 
        a.value.trim() !== ''
      )
      if (petBodyShapes.length !== currentPetCount) {
        console.log('Missing body shape answers for activity level, redirecting to step 5')
        return navigateTo('/step/5')
      }
    }
    
    // Pathology Step (step 5 in test group, step 6 in control group)
    const pathologyStep = excludeActivityLevel ? 6 : 6 // Both use internal step 6, but different URL steps
    if (internalStep === pathologyStep) {
      console.log('Validating pathology step:', { internalStep, pathologyStep, excludeActivityLevel })
      // For pathology step, need previous step answers
      const currentPetCount = questionnaire.petCount || 1
      
      if (excludeActivityLevel) {
        // Test group: need body shape answers
        const petBodyShapes = questionnaire.answers.filter(a => 
          a.questionId === 'pet_body_shape' && 
          a.petId && 
          a.value && 
          a.value.trim() !== ''
        )
        console.log('Test group pathology validation:', { bodyShapeCount: petBodyShapes.length, petCount: currentPetCount })
        if (petBodyShapes.length !== currentPetCount) {
          console.log('Missing body shape answers for pathology, redirecting to step', pathologyStep)
          return navigateTo(`/step/6`) // Always redirect to URL step 6 for pathology
        }
      } else {
        // Control group: need activity level answers
        const petActivityLevels = questionnaire.answers.filter(a => 
          a.questionId === 'pet_activity_level' && 
          a.petId && 
          a.value && 
          a.value.trim() !== ''
        )
        if (petActivityLevels.length !== currentPetCount) {
          console.log('Missing activity level answers for pathology, redirecting to step', pathologyStep)
          return navigateTo(`/step/6`)
        }
      }
    }
    
    // Gastronomic Profile Step (step 6 in test group, step 7 in control group)
    const gastronomicStep = excludeActivityLevel ? 7 : 7 // Both use internal step 7, but different URL steps
    if (internalStep === gastronomicStep) {
      const currentPetCount = questionnaire.petCount || 1
      const petHasPathology = questionnaire.answers.filter(a => 
        a.questionId === 'pet_has_pathology' && 
        a.petId && 
        a.value && 
        a.value.trim() !== ''
      )
      if (petHasPathology.length !== currentPetCount) {
        console.log('Missing pathology answers for gastronomic, redirecting to step', excludeActivityLevel ? 6 : 7)
        return navigateTo(`/step/${excludeActivityLevel ? 6 : 7}`)
      }
    }
    
    // User Contact Step (step 7 in test group, step 8 in control group)
    const contactStep = excludeActivityLevel ? 8 : 8 // Both use internal step 8, but different URL steps
    if (internalStep === contactStep) {
      const currentPetCount = questionnaire.petCount || 1
      const petGastronomicProfiles = questionnaire.answers.filter(a => 
        a.questionId === 'pet_gastronomic_profile' && 
        a.petId && 
        a.value && 
        a.value.trim() !== ''
      )
      if (petGastronomicProfiles.length !== currentPetCount) {
        console.log('Missing gastronomic answers for contact, redirecting to step', excludeActivityLevel ? 7 : 8)
        return navigateTo(`/step/${excludeActivityLevel ? 7 : 8}`)
      }
    }
  }
  
  console.log('Middleware validation passed, allowing access')
  
  // Update store with current step (0-based internally)
  questionnaire.setStep(internalStep)
})
