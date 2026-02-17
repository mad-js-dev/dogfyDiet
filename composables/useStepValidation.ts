import { computed, ref } from 'vue'
import { useQuestionnaire } from '~/stores/questionnaire'
import { useAbTesting } from '~/composables/ab-testing'

export const useStepValidation = () => {
  const questionnaire = useQuestionnaire()
  const { excludeActivityLevel } = useAbTesting()
  
  const answers = computed(() => questionnaire.answers)
  const petCount = computed(() => questionnaire.petCount)
  
  const canProceed = computed(() => {
    const currentStepId = questionnaire.currentStepId
    
    // Breed step validation
    if (currentStepId === 0) {
      const breedAnswer = questionnaire.getAnswer('pet_breed')
      return !!breedAnswer?.value
    }
    
    // Names step validation
    if (currentStepId === 1) {
      const currentPetCount = petCount.value
      let hasAllNames = true
      
      for (let i = 1; i <= currentPetCount; i++) {
        const nameAnswer = questionnaire.getAnswer('pet_name', `pet_${i}`)
        if (!nameAnswer?.value || nameAnswer.value.trim() === '') {
          hasAllNames = false
          break
        }
      }
      
      return hasAllNames
    }
    
    // Add more step validations as we migrate them...
    
    return false
  })
  
  return {
    answers,
    petCount,
    canProceed
  }
}
