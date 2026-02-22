import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'
import { questionnaireSteps } from '../config/questionnaire-steps'
import { useLocalStorage } from '../composables/useLocalStorage'

export const useComprehensiveQuestionnaireStore = defineStore('comprehensive-questionnaire', () => {
  // Initialize localStorage composable
  const localStorage = useLocalStorage()
  
  // State
  const currentStep = ref(0)
  const answers = ref<Array<any>>([])
  const isCompleted = ref(false)
  const petCount = ref(1)
  
  // UI state for individual/shared modes
  const uiState = ref({
    showIndividualGenders: false,
    showIndividualBirthDates: false,
    showIndividualBodyShapes: false,
    showIndividualActivityLevels: false,
    showIndividualPathologies: false,
    showIndividualGastronomicProfiles: false
  })
  
  // Auto-save state
  let saveTimeout: NodeJS.Timeout | null = null
  const AUTO_SAVE_DELAY = 1000 // 1 second debounce

  // Getters
  const answeredQuestions = computed(() => {
    // Only calculate if store is initialized and has answers
    if (!answers.value || answers.value.length === 0) return 0
    
    const uniqueQuestions = new Set(answers.value.map(a => a.questionId))
    return uniqueQuestions.size
  })

  const progressPercentage = computed(() => {
    // Only calculate if store is initialized and has answers
    if (!answers.value || answers.value.length === 0) return 0
    
    const totalQuestions = questionnaireSteps.reduce((total, step) => {
      return total + (step.questions?.length || 0)
    }, 0)
    
    const uniqueQuestions = new Set(answers.value.map(a => a.questionId))
    return Math.round((uniqueQuestions.size / (totalQuestions - 1)) * 100)
  })

  // Enhanced getters for data restoration
  const completionStatus = computed(() => {
    let totalRequiredQuestions = 0
    let completedRequiredQuestions = 0
    
    questionnaireSteps.forEach(step => {
      step.questions?.forEach(questionId => {
        // Get question from questionnaireQuestions to check if it's required
        const allQuestions = questionnaireSteps.flatMap(s => s.questions || [])
        const questionIndex = allQuestions.findIndex(q => q === questionId)
        
        // For now, assume all questions are required except optional ones
        const isOptional = questionId === 'pet_expecting' || questionId === 'pet_pathology'
        
        if (!isOptional) {
          totalRequiredQuestions++
          
          if (petCount.value === 1) {
            // Single pet: check if question has any answer
            const hasAnswer = answers.value.some(a => a.questionId === questionId && a.value)
            if (hasAnswer) completedRequiredQuestions++
          } else {
            // Multiple pets: check if question has answers for all pets OR shared answer
            const petIds = Array.from({ length: petCount.value }, (_, i) => `pet_${i + 1}`)
            const allPetsAnswered = petIds.every(petId => 
              answers.value.some(a => a.questionId === questionId && a.petId === petId && a.value) ||
              answers.value.some(a => a.questionId === questionId && !a.petId && a.value) // shared answer
            )
            if (allPetsAnswered) completedRequiredQuestions++
          }
        }
      })
    })
    
    return {
      totalQuestions: totalRequiredQuestions,
      answeredQuestions: completedRequiredQuestions,
      completionPercentage: totalRequiredQuestions > 0 ? Math.round((completedRequiredQuestions / totalRequiredQuestions) * 100) : 0
    }
  })

  const lastAnsweredStep = computed(() => {
    // Find the furthest step with any answered questions
    let furthestStep = 0
    
    for (let stepIndex = questionnaireSteps.length - 1; stepIndex >= 0; stepIndex--) {
      const step = questionnaireSteps[stepIndex]
      const stepHasAnswers = step.questions?.some((question: any) => 
        answers.value.some(answer => answer.questionId === question.id)
      )
      
      if (stepHasAnswers) {
        furthestStep = stepIndex
        break
      }
    }
    
    return furthestStep
  })

  const nextUnansweredStep = computed(() => {
    // Find the first step with unanswered questions
    for (let stepIndex = 0; stepIndex < questionnaireSteps.length; stepIndex++) {
      const step = questionnaireSteps[stepIndex]
      const stepQuestions = step.questions || []
      
      const hasUnansweredQuestions = stepQuestions.some((question: any) => {
        // Check if question has any answer (shared or individual)
        return !answers.value.some(answer => answer.questionId === question.id)
      })
      
      if (hasUnansweredQuestions) {
        return stepIndex
      }
    }
    
    return questionnaireSteps.length - 1 // Return last step if all are answered
  })

  // Actions
  const setStep = (step: number) => {
    currentStep.value = step
    triggerAutoSave()
  }

  const setPetCount = (count: number) => {
    const validCount = Math.max(1, Math.min(2, count)) // Ensure between 1-2 pets
    petCount.value = validCount
    addAnswer('pet_count', validCount)
  }
  
  // UI state setters
  const setUiState = (key: keyof typeof uiState.value, value: boolean) => {
    uiState.value[key] = value
    triggerAutoSave()
  }
  
  // Auto-save functionality
  const triggerAutoSave = () => {
    if (saveTimeout) {
      clearTimeout(saveTimeout)
    }
    
    saveTimeout = setTimeout(() => {
      saveToLocalStorage()
    }, AUTO_SAVE_DELAY)
  }
  
  const saveToLocalStorage = () => {
    if (!localStorage.isLocalStorageAvailable.value) return false
    
    return localStorage.saveToLocalStorage({
      currentStep: currentStep.value,
      answers: answers.value,
      petCount: petCount.value,
      isCompleted: isCompleted.value,
      uiState: uiState.value
    })
  }
  
  const loadFromLocalStorage = () => {
    if (!localStorage.isLocalStorageAvailable.value) return false
    
    const data = localStorage.loadFromLocalStorage()
    if (!data) return false
    
    // Restore state
    currentStep.value = data.currentStep
    answers.value = data.answers
    petCount.value = data.petCount
    isCompleted.value = data.isCompleted
    uiState.value = data.uiState
    
    return true
  }
  
  // Initialize state from localStorage after function declaration
  loadFromLocalStorage()
  
  const clearAllData = () => {
    clearAnswers()
    uiState.value = {
      showIndividualGenders: false,
      showIndividualBirthDates: false,
      showIndividualBodyShapes: false,
      showIndividualActivityLevels: false,
      showIndividualPathologies: false,
      showIndividualGastronomicProfiles: false
    }
    localStorage.clearLocalStorage()
  }
  
  const hasPersistedData = () => {
    return localStorage.hasPersistedData()
  }

  const addAnswer = (questionId: string, value: any, petId?: string | null) => {
    const existingIndex = answers.value.findIndex(
      a => a.questionId === questionId && a.petId === petId
    )

    const answer = {
      questionId,
      value,
      petId,
      timestamp: new Date().toISOString()
    }

    if (existingIndex >= 0) {
      answers.value[existingIndex] = answer
    } else {
      answers.value.push(answer)
    }
    
    // Trigger auto-save
    triggerAutoSave()
  }

  const addSmartAnswer = (questionId: string, value: any, petId?: string | null) => {
    if (!petId && petCount.value > 1) {
      // Multiple pets with same answer - store as shared
      addAnswer(questionId, value, null)
      setPetCount(petCount.value)
      setUiState('showIndividualGenders', false)
      differentiateAnswers(questionId)
    } else {
      // Single pet or individual mode - store with petId
      addAnswer(questionId, value, petId)
      setPetCount(petCount.value)
      setUiState('showIndividualGenders', false)
    }
  }

  const differentiateAnswers = (questionId: string) => {
    const sharedAnswer = answers.value.find(a => a.questionId === questionId && !a.petId)
    
    // Always create individual answers for all pets, even if no shared answer exists
    for (let i = 1; i <= petCount.value; i++) {
      const existingPetAnswer = answers.value.find(a => a.questionId === questionId && a.petId === `pet_${i}`)
      if (!existingPetAnswer) {
        // Use shared answer if it exists, otherwise create empty answer
        const value = sharedAnswer ? sharedAnswer.value : null
        addAnswer(questionId, value, `pet_${i}`)
      }
    }
    
    // Remove shared answer if it exists
    if (sharedAnswer) {
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
    petCount.value = 1
    triggerAutoSave()
  }

  const submitQuestionnaire = () => {
    isCompleted.value = true
    triggerAutoSave()
    return {
      answers: answers.value,
      petCount: petCount.value,
      submittedAt: new Date().toISOString()
    }
  }

  return {
    // State
    currentStep,
    answers,
    isCompleted,
    petCount,
    uiState,
    
    // Getters
    answeredQuestions,
    progressPercentage,
    completionStatus,
    lastAnsweredStep,
    nextUnansweredStep,
    
    // Actions
    setStep,
    setPetCount,
    setUiState,
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
    clearAllData,
    submitQuestionnaire,
    
    // Persistence methods
    loadFromLocalStorage,
    saveToLocalStorage,
    hasPersistedData
  }
})
