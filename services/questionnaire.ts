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
  setTestGroup(group: 'control' | 'test'): void
  clearTestGroup(): void
}

// A/B Testing: Check URL parameter first, then localStorage, then random assignment
const getTestGroup = (): 'control' | 'test' => {
  if (typeof window !== 'undefined') {
    // Check URL parameter first (highest priority)
    const urlParams = new URLSearchParams(window.location.search)
    const urlGroup = urlParams.get('ab_test')
    if (urlGroup === 'control' || urlGroup === 'test') {
      // Save URL override to localStorage for persistence
      localStorage.setItem('ab_test_group', urlGroup)
      console.log('A/B Test Group from URL parameter:', urlGroup)
      return urlGroup
    }
    
    // Check localStorage for existing assignment
    const storedGroup = localStorage.getItem('ab_test_group')
    if (storedGroup === 'control' || storedGroup === 'test') {
      console.log('A/B Test Group from localStorage:', storedGroup)
      return storedGroup
    }
    
    // Assign new user to random group (50/50 split)
    const randomGroup = Math.random() < 0.5 ? 'control' : 'test'
    localStorage.setItem('ab_test_group', randomGroup)
    console.log('A/B Test Group randomly assigned:', randomGroup)
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
  },

  setTestGroup(group: 'control' | 'test'): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem('ab_test_group', group)
      console.log('A/B Test Group manually set to:', group)
      // Force page reload to apply new group
      window.location.reload()
    }
  },

  clearTestGroup(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('ab_test_group')
      console.log('A/B Test Group cleared - will be randomly reassigned on next load')
      // Force page reload to apply random assignment
      window.location.reload()
    }
  }
}
