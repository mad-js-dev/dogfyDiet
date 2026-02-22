// Core types for the questionnaire system
export interface StepConfig {
  id: number
  title: string
  description?: string
  questions?: string[]
  canSkip?: boolean
  dependsOn?: number[]
}

export interface QuestionConfig {
  id: string
  type: 'text' | 'select' | 'bool' | 'age' | 'range' | 'email' | 'tel' | 'segmented' | 'single' | 'range-slider'
  question?: string
  appliesTo: 'all' | 'individual'
  options?: (string | { value: string; label?: string })[] // for select questions
  rangeOptions?: RangeOption[] // for range questions
  validation?: ValidationRule[] | JsonValidation // Support both formats
  dependencies?: QuestionDependency[]
  required?: boolean
}

export interface RangeOption {
  label: string
  value: string
  min?: number
  max?: number
}

export interface ValidationRule {
  type: 'required' | 'minLength' | 'maxLength' | 'pattern' | 'email' | 'phone' | 'min' | 'max'
  value?: any
  message: string
}

// JSON validation format (simpler, used in questionnaire JSON files)
export interface JsonValidation {
  min?: number
  max?: number
  pattern?: string
  required?: boolean
}

export interface QuestionDependency {
  questionId: string
  operator: 'equals' | 'notEquals' | 'contains' | 'greaterThan' | 'lessThan'
  value: any
  action: 'show' | 'hide' | 'require'
}

export interface Answer {
  questionId: string
  petId?: string // if applies to individual pet
  value: any
  timestamp: Date
}

export interface Pet {
  id: string
  name: string
  type: string
  age?: { years: number; months: number }
}

export interface QuestionnaireState {
  currentStep: number
  answers: Answer[]
  pets: Pet[]
  isCompleted: boolean
  maxPets: number
}
