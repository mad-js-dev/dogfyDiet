import type { StepConfig } from '~/config/steps'
import { questionnaireQuestions } from './questionnaire-questions'

export const questionnaireSteps: StepConfig[] = [
  {
    id: 0,
    title: 'Pet Count',
    description: 'How many pets do you have?',
    questions: ['pet_count'],
    canSkip: false
  },
  {
    id: 1,
    title: 'Pet Names',
    description: 'Tell us your pets\' names',
    questions: ['pet_name'],
    canSkip: false,
    dependsOn: [0]
  },
  {
    id: 2,
    title: 'Pet Race',
    description: 'What is your pet\'s race?',
    questions: ['pet_race'],
    canSkip: false,
    dependsOn: [1]
  }
]

export const getStepQuestions = (stepId: number): any[] => {
  const step = questionnaireSteps.find(s => s.id === stepId)
  if (!step) return []
  
  return questionnaireQuestions.filter(question => 
    step.questions.includes(question.id)
  )
}

export const shouldShowQuestion = (question: any, allAnswers: any[]): boolean => {
  if (!question.dependencies || question.dependencies.length === 0) return true
  
  return question.dependencies.every((dependency: any) => {
    const dependentAnswer = allAnswers.find(a => a.questionId === dependency.questionId)
    if (!dependentAnswer) return false
    
    switch (dependency.operator) {
      case 'equals':
        return dependentAnswer.value === dependency.value
      case 'notEquals':
        return dependentAnswer.value !== dependency.value
      case 'contains':
        return Array.isArray(dependentAnswer.value) ? 
          dependentAnswer.value.includes(dependency.value) : 
          String(dependentAnswer.value).includes(dependency.value)
      case 'greaterThan':
        return Number(dependentAnswer.value) > Number(dependency.value)
      case 'lessThan':
        return Number(dependentAnswer.value) < Number(dependency.value)
      default:
        return false
    }
  })
}

export const isStepAccessible = (stepId: number, completedSteps: Set<number>): boolean => {
  const step = questionnaireSteps.find(s => s.id === stepId)
  if (!step) return false
  if (!step.dependsOn || step.dependsOn.length === 0) return true
  
  return step.dependsOn.every(dependency => completedSteps.has(dependency))
}

export const canProceedToStep = (stepId: number, allAnswers: any[]): boolean => {
  const step = questionnaireSteps.find(s => s.id === stepId)
  if (!step) return false
  
  return step.questions.every(qId => {
    const answer = allAnswers.find(a => a.questionId === qId)
    return answer && answer.value !== null && answer.value !== undefined && answer.value !== ''
  })
}
