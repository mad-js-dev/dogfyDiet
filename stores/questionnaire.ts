import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { questionnaireService, type QuestionnaireStep } from '~/services/questionnaire'

export const useQuestionnaireStore = defineStore('questionnaire', () => {
  // State
  const currentStep = ref(0)
  const answers = ref<Array<any>>([])
  const isCompleted = ref(false)
  const petCount = ref(1)
  
  // Getters
  const getCurrentStep = computed(() => currentStep.value)
  const getAnswers = computed(() => answers.value)
  const getIsCompleted = computed(() => isCompleted.value)
  const getPetCount = computed(() => petCount.value)
  const getCurrentStepData = computed(() => questionnaireService.getStepById(currentStep.value))
  const getAllSteps = computed(() => questionnaireService.getSteps())
  const isLastStep = computed(() => {
    const steps = questionnaireService.getSteps()
    return currentStep.value >= steps.length - 1
  })

  const canCompleteQuestionnaire = computed(() => {
    // Check if all required questions are answered
    const allSteps = questionnaireService.getSteps()
    const totalQuestions = allSteps.reduce((total, step) => {
      return total + (step.questions?.length || 0)
    }, 0)
    
    // Count unique question IDs that have answers
    const answeredQuestions = answers.value ? new Set(answers.value.map(a => a.questionId)).size : 0
    
    // Simple completion check - if we've answered as many questions as exist, we can complete
    return answeredQuestions >= totalQuestions
  })
  const isFirstStep = computed(() => currentStep.value === 0)
  
  // Actions
  const setStep = (step: number) => {
    currentStep.value = step
  }
  
  const setAnswers = (newAnswers: Array<any>) => {
    answers.value = newAnswers
  }
  
  const addAnswer = (answer: any) => {
    answers.value.push(answer)
  }
  
  const updateAnswer = (questionId: string, petId: string, value: any) => {
    const existingIndex = answers.value.findIndex(
      a => a.questionId === questionId && a.petId === petId
    )
    
    if (existingIndex >= 0) {
      answers.value[existingIndex].value = value
    } else {
      answers.value.push({
        questionId,
        petId,
        value,
        timestamp: new Date().toISOString()
      })
    }
  }
  
  const getAnswer = (questionId: string, petId?: string) => {
    return answers.value.find(
      a => a.questionId === questionId && (!petId || a.petId === petId)
    )
  }
  
  const setCompleted = (completed: boolean) => {
    isCompleted.value = completed
  }
  
  const setPetCount = (count: number) => {
    petCount.value = count
  }
  
  const reset = () => {
    currentStep.value = 0
    answers.value = []
    isCompleted.value = false
    petCount.value = 1
  }
  
  const nextStep = () => {
    const nextStepData = questionnaireService.getNextStep(currentStep.value)
    if (nextStepData) {
      currentStep.value = nextStepData.id
    }
  }
  
  const previousStep = () => {
    const prevStepData = questionnaireService.getPreviousStep(currentStep.value)
    if (prevStepData) {
      currentStep.value = prevStepData.id
    }
  }
  
  const goToStep = (stepId: number) => {
    const stepData = questionnaireService.getStepById(stepId)
    if (stepData) {
      currentStep.value = stepData.id
    }
  }
  
  return {
    // State
    currentStep,
    answers,
    isCompleted,
    petCount,
    
    // Getters
    getCurrentStep,
    getAnswers,
    getIsCompleted,
    getPetCount,
    getCurrentStepData,
    getAllSteps,
    isLastStep,
    isFirstStep,
    canCompleteQuestionnaire,
    
    // Actions
    setStep,
    setAnswers,
    addAnswer,
    updateAnswer,
    getAnswer,
    setCompleted,
    setPetCount,
    reset,
    nextStep,
    previousStep,
    goToStep
  }
})