import type { StepConfig } from '~/types/questionnaire'
import { questionnaireQuestions } from './questionnaire-questions'

export const questionnaireSteps: StepConfig[] = [
  {
    id: 0, // Internal 0-based ID
    title: 'Pet Race',
    description: 'What is your pet\'s breed?',
    questions: ['pet_breed'],
    canSkip: false
  },
  {
    id: 1, // Internal 0-based ID
    title: 'Pet Names',
    description: 'Tell us your pets\' names',
    questions: ['pet_name'],
    canSkip: false,
    dependsOn: [0]
  },
  {
    id: 2, // Internal 0-based ID
    title: 'Pet Gender',
    description: 'What is your pet\'s gender?',
    questions: ['pet_gender', 'pet_neutered', 'pet_expecting'],
    canSkip: false,
    dependsOn: [1]
  },
  {
    id: 3, // Internal 0-based ID
    title: 'Pet Birth Date',
    description: 'When was your pet born?',
    questions: ['pet_birth_year', 'pet_birth_month'],
    canSkip: false,
    dependsOn: [2]
  },
  {
    id: 4, // Internal 0-based ID
    title: 'Pet Body Shape',
    description: 'Which silhouette best represents your pet?',
    questions: ['pet_body_shape', 'pet_weight'],
    canSkip: false,
    dependsOn: [3]
  },
  {
    id: 5, // Internal 0-based ID
    title: 'Pet Activity Level',
    description: 'What is your pet\'s activity level?',
    questions: ['pet_activity_level'],
    canSkip: false,
    dependsOn: [4]
  },
  {
    id: 6, // Internal 0-based ID
    title: 'Pet Pathology',
    description: 'Does your pet have any pathology?',
    questions: ['pet_has_pathology', 'pet_pathology'],
    canSkip: false,
    dependsOn: [5]
  },
  {
    id: 7, // Internal 0-based ID
    title: 'Pet Gastronomic Profile',
    description: 'What is your pet\'s gastronomic profile?',
    questions: ['pet_gastronomic_profile'],
    canSkip: false,
    dependsOn: [6]
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

// Helper functions for URL conversion
export const urlToInternalStep = (urlStep: number): number => {
  // Convert 1-based URL to 0-based internal
  return urlStep - 1
}

export const internalToUrlStep = (internalStep: number): number => {
  // Convert 0-based internal to 1-based URL
  return internalStep + 1
}
