import { defineStore } from 'pinia'
import questionnaireControlData from '~/data/questionnaire-control.json'
import questionnaireTestData from '~/data/questionnaire-test.json'

export interface ConditionalLogic {
  questionId: string
  operator: 'equals' | 'not_equals' | 'contains' | 'not_contains'
  value: any
  and?: ConditionalLogic
  or?: ConditionalLogic
}

export interface QuestionConditional {
  showIf: ConditionalLogic
}

export interface Question {
  id: string
  title: string
  description: string
  type: 'text' | 'number' | 'select' | 'single' | 'multiple' | 'range'
  required: boolean
  options?: string[]
  conditional?: QuestionConditional
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
    try {
      // Check URL parameter first (highest priority)
      const urlParams = new URLSearchParams(window.location.search)
      const urlGroup = urlParams.get('ab_test')
      if (urlGroup === 'control' || urlGroup === 'test') {
        // Save URL override to both localStorage and sessionStorage for persistence
        localStorage.setItem('ab_test_group', urlGroup)
        sessionStorage.setItem('ab_test_group', urlGroup)
        console.log('A/B Test Group from URL parameter:', urlGroup)
        return urlGroup
      }
      
      // Check localStorage for existing assignment
      const storedGroup = localStorage.getItem('ab_test_group')
      const sessionGroup = sessionStorage.getItem('ab_test_group')
      
      // Prefer localStorage, fallback to sessionStorage
      const persistentGroup = storedGroup || sessionGroup
      if (persistentGroup === 'control' || persistentGroup === 'test') {
        // Sync both storage mechanisms
        localStorage.setItem('ab_test_group', persistentGroup)
        sessionStorage.setItem('ab_test_group', persistentGroup)
        console.log('A/B Test Group from persistent storage:', persistentGroup)
        return persistentGroup
      }
      
      // Assign new user to random group (50/50 split)
      const randomGroup = Math.random() < 0.5 ? 'control' : 'test'
      localStorage.setItem('ab_test_group', randomGroup)
      sessionStorage.setItem('ab_test_group', randomGroup)
      console.log('A/B Test Group randomly assigned:', randomGroup)
      return randomGroup
    } catch (error) {
      console.error('Error accessing A/B test group storage:', error)
      // Fallback to control group on error
      return 'control'
    }
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
      try {
        localStorage.setItem('ab_test_group', group)
        sessionStorage.setItem('ab_test_group', group)
        console.log('A/B Test Group manually set to:', group)
        // Force page reload to apply new group
        window.location.reload()
      } catch (error) {
        console.error('Error setting A/B test group:', error)
      }
    }
  },

  clearTestGroup(): void {
    if (typeof window !== 'undefined') {
      try {
        localStorage.removeItem('ab_test_group')
        sessionStorage.removeItem('ab_test_group')
        console.log('A/B Test Group cleared - will be randomly reassigned on next load')
        // Force page reload to apply random assignment
        window.location.reload()
      } catch (error) {
        console.error('Error clearing A/B test group:', error)
      }
    }
  }
}
