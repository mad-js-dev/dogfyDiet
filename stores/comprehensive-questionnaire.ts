import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
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
  const getCurrentStep = computed(() => currentStep.value)
  const getAnswers = computed(() => answers.value)
  const getIsCompleted = computed(() => isCompleted.value)
  const getPetCount = computed(() => petCount.value)
  
  const uniqueAnswerCount = computed(() => {
    if (!answers.value || answers.value.length === 0) return 0
    const uniqueQuestions = new Set(answers.value.map(a => a.questionId))
    return uniqueQuestions.size
  })

  const progressPercentage = computed(() => {
    if (!answers.value || answers.value.length === 0) return 0
    
    const uniqueQuestions = new Set(answers.value.map(a => a.questionId))
    // For now, estimate total questions based on typical questionnaire structure
    const estimatedTotalQuestions = 20 // This can be made dynamic later
    
    return Math.round((uniqueQuestions.size / estimatedTotalQuestions) * 100)
  })

  // Actions
  const setStep = (step: number) => {
    currentStep.value = step
    triggerAutoSave()
  }
  
  const setAnswers = (newAnswers: Array<any>) => {
    answers.value = newAnswers
    triggerAutoSave()
  }
  
  const addAnswer = (questionId: string, value: any, petId?: string | null) => {
    // Remove existing answer for this question and pet
    answers.value = answers.value.filter(a => 
      !(a.questionId === questionId && (a.petId === petId || (!a.petId && !petId)))
    )
    
    // Add new answer
    answers.value.push({
      questionId,
      petId: petId || null,
      value,
      timestamp: new Date().toISOString()
    })
    
    triggerAutoSave()
  }

  const addSmartAnswer = (questionId: string, value: any, petId?: string | null) => {
    // Smart logic for adding answers based on context
    if (petCount.value === 1) {
      // Single pet - don't use petId
      addAnswer(questionId, value, null)
    } else {
      // Multiple pets - use provided petId or determine automatically
      const targetPetId = petId || 'pet_1'
      addAnswer(questionId, value, targetPetId)
    }
  }

  const getAnswer = (questionId: string, petId?: string | null) => {
    return answers.value.find(a => 
      a.questionId === questionId && (petId ? a.petId === petId : !a.petId)
    )
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

  const differentiateAnswers = (questionId: string) => {
    const sharedAnswer = answers.value.find(a => a.questionId === questionId && !a.petId)
    if (!sharedAnswer) return
    
    // Create individual answers for each pet from the shared answer
    for (let i = 1; i <= petCount.value; i++) {
      const petId = `pet_${i}`
      addAnswer(questionId, sharedAnswer.value, petId)
    }
    
    // Remove the shared answer
    answers.value = answers.value.filter(a => !(a.questionId === questionId && !a.petId))
  }

  const removeAnswer = (questionId: string, petId?: string) => {
    answers.value = answers.value.filter(a => 
      !(a.questionId === questionId && (!petId || a.petId === petId))
    )
    triggerAutoSave()
  }

  const setCompleted = (completed: boolean) => {
    isCompleted.value = completed
    triggerAutoSave()
  }
  
  const setPetCount = (count: number) => {
    petCount.value = count
    triggerAutoSave()
  }

  const reset = () => {
    currentStep.value = 0
    answers.value = []
    isCompleted.value = false
    petCount.value = 1
    triggerAutoSave()
  }

  const submitQuestionnaire = () => {
    isCompleted.value = true
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
    const state = {
      currentStep: currentStep.value,
      answers: answers.value,
      isCompleted: isCompleted.value,
      petCount: petCount.value,
      uiState: uiState.value
    }
    localStorage.saveToLocalStorage(state)
  }

  const loadFromLocalStorage = () => {
    const savedState = localStorage.loadFromLocalStorage()
    if (savedState) {
      currentStep.value = savedState.currentStep || 0
      answers.value = savedState.answers || []
      isCompleted.value = savedState.isCompleted || false
      petCount.value = savedState.petCount || 1
      uiState.value = { ...uiState.value, ...(savedState.uiState || {}) }
    }
  }

  // Initialize from localStorage on store creation
  loadFromLocalStorage()

  return {
    // State
    currentStep,
    answers,
    isCompleted,
    petCount,
    uiState,
    
    // Getters
    getCurrentStep,
    getAnswers,
    getIsCompleted,
    getPetCount,
    uniqueAnswerCount,
    progressPercentage,
    
    // Actions
    setStep,
    setAnswers,
    addAnswer,
    addSmartAnswer,
    getAnswer,
    getAnswerForPet,
    hasSharedAnswer,
    hasIndividualAnswers,
    differentiateAnswers,
    removeAnswer,
    setCompleted,
    setPetCount,
    reset,
    submitQuestionnaire,
    saveToLocalStorage,
    loadFromLocalStorage
  }
})
