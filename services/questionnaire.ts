import { defineStore } from 'pinia'
import questionnaireControlData from '~/data/questionnaire-control.json'
import questionnaireTestData from '~/data/questionnaire-test.json'

export interface Question {
  id: string
  title: string
  description: string
  type: 'text' | 'number' | 'select' | 'single' | 'multiple' | 'range'
  required: boolean
  options?: string[]
  validation?: {
    min?: number
    max?: number
    pattern?: string
  }
}

export interface QuestionnaireStep {
  id: number
  title: string
  description?: string
  questions: Question[]
}

export interface QuestionnaireService {
  getSteps(): QuestionnaireStep[]
  getStepById(id: number): QuestionnaireStep | undefined
  getNextStep(currentStepId: number): QuestionnaireStep | undefined
  getPreviousStep(currentStepId: number): QuestionnaireStep | undefined
  getTestGroup(): 'control' | 'test'
}

// A/B Testing: Randomly assign user to control or test group
const getTestGroup = (): 'control' | 'test' => {
  // Check if user already has a test group assigned in localStorage
  if (typeof window !== 'undefined') {
    const storedGroup = localStorage.getItem('ab_test_group')
    if (storedGroup === 'control' || storedGroup === 'test') {
      return storedGroup
    }
    
    // Assign new user to random group
    const randomGroup = Math.random() < 0.5 ? 'control' : 'test'
    localStorage.setItem('ab_test_group', randomGroup)
    return randomGroup
  }
  
  // Fallback for server-side rendering
  return 'control'
}

export const questionnaireService: QuestionnaireService = {
  getSteps(): QuestionnaireStep[] {
    const testGroup = getTestGroup()
    console.log('A/B Test Group:', testGroup)
    
    // Return appropriate dataset based on test group
    return testGroup === 'control' 
      ? questionnaireControlData as QuestionnaireStep[]
      : questionnaireTestData as QuestionnaireStep[]
  },

  getStepById(id: number): QuestionnaireStep | undefined {
    const steps = this.getSteps()
    return steps.find(step => step.id === id)
  },

  getNextStep(currentStepId: number): QuestionnaireStep | undefined {
    const steps = this.getSteps()
    const currentIndex = steps.findIndex(step => step.id === currentStepId)
    return currentIndex >= 0 && currentIndex < steps.length - 1 
      ? steps[currentIndex + 1] 
      : undefined
  },

  getPreviousStep(currentStepId: number): QuestionnaireStep | undefined {
    const steps = this.getSteps()
    const currentIndex = steps.findIndex(step => step.id === currentStepId)
    return currentIndex > 0 
      ? steps[currentIndex - 1] 
      : undefined
  },

  getTestGroup(): 'control' | 'test' {
    return getTestGroup()
  }
}
