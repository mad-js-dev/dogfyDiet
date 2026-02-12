import { defineStore } from 'pinia'

export const useComprehensiveQuestionnaireStore = defineStore('comprehensive-questionnaire', () => {
  // State
  const currentStep = ref(0)
  const answers = ref<Array<any>>([])
  const isCompleted = ref(false)
  const petCount = ref(0)

  // Getters
  const answeredQuestions = computed(() => {
    const uniqueQuestions = new Set(answers.value.map(a => a.questionId))
    return uniqueQuestions.size
  })

  const progressPercentage = computed(() => {
    const totalSteps = 3 // Total number of steps (0-2)
    return Math.round((currentStep.value / (totalSteps - 1)) * 100)
  })

  const canProceedToNext = computed(() => {
    // Check if current step has required answers
    const stepRequirements = getStepRequirements(currentStep.value)
    return stepRequirements.every(qId => {
      // For pet names step, check if all pets have names
      if (qId === 'pet_name') {
        const petNames = answers.value.filter(a => 
          a.questionId.startsWith('pet_name_pet_') && 
          a.value && 
          a.value.trim() !== ''
        )
        return petNames.length === petCount.value
      }
      
      // For other questions, check normally
      const answer = answers.value.find(a => a.questionId === qId)
      return answer && answer.value !== null && answer.value !== undefined && answer.value !== ''
    })
  })

  // Helper function to get required questions for each step
  const getStepRequirements = (step: number): string[] => {
    const requirements: Record<number, string[]> = {
      0: ['pet_race'], // Pet Race
      1: ['pet_name'], // Pet Names (at least one pet name)
      2: ['pet_gender'] // Pet Gender
    }
    return requirements[step] || []
  }

  // Actions
  const setStep = (step: number) => {
    currentStep.value = step
  }

  const setPetCount = (count: number) => {
    petCount.value = count
    addAnswer('pet_count', count)
  }

  const addAnswer = (questionId: string, value: any, petId?: string) => {
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

  const getAnswer = (questionId: string, petId?: string) => {
    return answers.value.find(a => 
      a.questionId === questionId && a.petId === petId
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
    canProceedToNext,
    
    // Actions
    setStep,
    setPetCount,
    addAnswer,
    getAnswer,
    getPetAnswers,
    getGlobalAnswers,
    clearAnswers,
    submitQuestionnaire
  }
})
