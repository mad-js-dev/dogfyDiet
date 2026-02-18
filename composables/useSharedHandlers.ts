import { ref } from 'vue'
import type { ComputedRef } from 'vue'

export const useSharedHandlers = (questionnaire: any, petCount: ComputedRef<number>) => {
  // Shared state refs
  const sharedBirthYear = ref('')
  const sharedBirthMonth = ref('')
  const sharedBodyShape = ref('')
  const sharedWeight = ref('')
  const sharedActivityLevel = ref('')
  const sharedPathology = ref('')
  const sharedGastronomicProfile = ref('')
  const sharedHasPathology = ref('')

  const handleSharedBirthYearChange = (value: string) => {
    sharedBirthYear.value = value
    if (sharedBirthYear.value && sharedBirthMonth.value) {
      // Apply shared birth date to all pets
      const currentPetCount = petCount.value
      for (let i = 1; i <= currentPetCount; i++) {
        questionnaire.addAnswer('pet_birth_year', sharedBirthYear.value, `pet_${i}`)
        questionnaire.addAnswer('pet_birth_month', sharedBirthMonth.value, `pet_${i}`)
      }
    }
  }

  const handleSharedBirthMonthChange = (value: string) => {
    sharedBirthMonth.value = value
    if (sharedBirthYear.value && sharedBirthMonth.value) {
      // Apply shared birth date to all pets
      const currentPetCount = petCount.value
      for (let i = 1; i <= currentPetCount; i++) {
        questionnaire.addAnswer('pet_birth_year', sharedBirthYear.value, `pet_${i}`)
        questionnaire.addAnswer('pet_birth_month', sharedBirthMonth.value, `pet_${i}`)
      }
    }
  }

  const handleSharedBodyShapeChange = (value: string, questionId: string) => {
    sharedBodyShape.value = value
    if (sharedBodyShape.value) {
      // Apply shared body shape to all pets
      const currentPetCount = petCount.value
      for (let i = 1; i <= currentPetCount; i++) {
        questionnaire.addAnswer(questionId, sharedBodyShape.value, `pet_${i}`)
      }
    }
  }

  const handleSharedWeightChange = (value: string) => {
    sharedWeight.value = value
    if (sharedWeight.value) {
      // Apply shared weight to all pets
      const currentPetCount = petCount.value
      for (let i = 1; i <= currentPetCount; i++) {
        questionnaire.addAnswer('pet_weight', sharedWeight.value, `pet_${i}`)
      }
    }
  }

  const handleSharedActivityLevelChange = (value: string, questionId: string) => {
    console.log('handleSharedActivityLevelChange called:', { value, questionId, sharedActivityLevel: sharedActivityLevel.value })
    sharedActivityLevel.value = value
    if (sharedActivityLevel.value) {
      // Apply shared activity level to all pets
      const currentPetCount = petCount.value
      console.log('Adding activity level answers to pets:', { currentPetCount, value })
      for (let i = 1; i <= currentPetCount; i++) {
        questionnaire.addAnswer('pet_activity_level', sharedActivityLevel.value, `pet_${i}`)
      }
    }
  }

  const handleSharedPathologyChange = (value: string, questionId: string) => {
    // Update the appropriate shared value based on question ID
    if (questionId === 'shared_has_pathology') {
      sharedHasPathology.value = value
    } else if (questionId === 'shared_pathology') {
      sharedPathology.value = value
    }
    
    const currentPetCount = petCount.value
    for (let i = 1; i <= currentPetCount; i++) {
      questionnaire.addAnswer('pet_has_pathology', sharedHasPathology.value, `pet_${i}`)
      if (sharedHasPathology.value === 'Yes' && sharedPathology.value) {
        questionnaire.addAnswer('pet_pathology', sharedPathology.value, `pet_${i}`)
      }
    }
  }

  const handleSharedGastronomicProfileChange = (value: string, questionId: string) => {
    sharedGastronomicProfile.value = value
    if (sharedGastronomicProfile.value) {
      // Apply shared gastronomic profile to all pets
      const currentPetCount = petCount.value
      for (let i = 1; i <= currentPetCount; i++) {
        questionnaire.addAnswer('pet_gastronomic_profile', sharedGastronomicProfile.value, `pet_${i}`)
      }
    }
  }

  return {
    // Shared state
    sharedBirthYear,
    sharedBirthMonth,
    sharedBodyShape,
    sharedWeight,
    sharedActivityLevel,
    sharedPathology,
    sharedGastronomicProfile,
    sharedHasPathology,
    
    // Handler methods
    handleSharedBirthYearChange,
    handleSharedBirthMonthChange,
    handleSharedBodyShapeChange,
    handleSharedWeightChange,
    handleSharedActivityLevelChange,
    handleSharedPathologyChange,
    handleSharedGastronomicProfileChange
  }
}
