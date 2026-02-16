import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { questionnaireSteps } from '~/config/questionnaire-steps'

export const useComprehensiveQuestionnaireStore = defineStore('comprehensive-questionnaire', () => {
  // State
  const currentStep = ref(0)
  const answers = ref<Array<any>>([])
  const isCompleted = ref(false)
  const petCount = ref(1)

  // Getters
  const answeredQuestions = computed(() => {
    const uniqueQuestions = new Set(answers.value.map(a => a.questionId))
    return uniqueQuestions.size
  })

  const progressPercentage = computed(() => {
    const totalSteps = questionnaireSteps.length // Total number of steps
    return Math.round((currentStep.value / (totalSteps - 1)) * 100)
  })

  // Actions
  const setStep = (step: number) => {
    currentStep.value = step
  }

  const setPetCount = (count: number) => {
    const validCount = Math.max(1, Math.min(2, count)) // Ensure between 1-2 pets
    petCount.value = validCount
    addAnswer('pet_count', validCount)
  }

  const addAnswer = (questionId: string, value: any, petId?: string | null) => {
    const existingIndex = answers.value.findIndex(
      a => a.questionId === questionId && a.petId === petId
    )

    const answer = {
      questionId,
      value,
      petId,
      timestamp: new Date()
    }

    if (existingIndex >= 0) {
      answers.value[existingIndex] = answer
    } else {
      answers.value.push(answer)
    }
  }

  const addSmartAnswer = (questionId: string, value: any, petId?: string | null) => {
    if (!petId && petCount.value > 1) {
      // Single answer for multiple pets - store as shared
      addAnswer(questionId, value, null)
    } else {
      // Pet-specific answer
      addAnswer(questionId, value, petId)
    }
  }

  const differentiateAnswers = (questionId: string) => {
    const sharedAnswer = answers.value.find(a => a.questionId === questionId && !a.petId)
    if (sharedAnswer) {
      // Propagate to all pets
      for (let i = 1; i <= petCount.value; i++) {
        const existingPetAnswer = answers.value.find(a => a.questionId === questionId && a.petId === `pet_${i}`)
        if (!existingPetAnswer) {
          addAnswer(questionId, sharedAnswer.value, `pet_${i}`)
        }
      }
      // Remove shared answer
      const sharedIndex = answers.value.findIndex(a => a.questionId === questionId && !a.petId)
      if (sharedIndex >= 0) {
        answers.value.splice(sharedIndex, 1)
      }
    }
  }

  const getAnswerForPet = (questionId: string, petId: string) => {
    // Check for pet-specific answer first
    const specific = answers.value.find(a => a.questionId === questionId && a.petId === petId)
    if (specific) return specific
    
    // Fall back to shared answer
    return answers.value.find(a => a.questionId === questionId && !a.petId)
  }

  const hasSharedAnswer = (questionId: string) => {
    return answers.value.some(a => a.questionId === questionId && !a.petId)
  }

  const hasIndividualAnswers = (questionId: string) => {
    return answers.value.some(a => a.questionId === questionId && a.petId)
  }

  const removeAnswer = (questionId: string, petId?: string | null) => {
    const index = answers.value.findIndex(a => a.questionId === questionId && a.petId === petId)
    if (index >= 0) {
      answers.value.splice(index, 1)
    }
  }

  const getAnswer = (questionId: string, petId?: string | null) => {
    return answers.value.find(a => 
      a.questionId === questionId && (petId ? a.petId === petId : !a.petId)
    )
  }

  const getPetAnswers = (petNum: number) => {
    return answers.value.filter(a => a.petId === `pet_${petNum}`)
  }

  const getGlobalAnswers = () => {
    return answers.value.filter(a => !a.petId)
  }

  const clearAnswers = () => {
    answers.value = []
    currentStep.value = 0
    isCompleted.value = false
    petCount.value = 0
  }

  const submitQuestionnaire = () => {
    isCompleted.value = true
    return {
      answers: answers.value,
      petCount: petCount.value,
      submittedAt: new Date()
    }
  }

  return {
    // State
    currentStep,
    answers,
    isCompleted,
    petCount,
    
    // Getters
    answeredQuestions,
    progressPercentage,
    
    // Actions
    setStep,
    setPetCount,
    addAnswer,
    addSmartAnswer,
    differentiateAnswers,
    getAnswer,
    getAnswerForPet,
    hasSharedAnswer,
    hasIndividualAnswers,
    removeAnswer,
    getPetAnswers,
    getGlobalAnswers,
    clearAnswers,
    submitQuestionnaire
  }
})
