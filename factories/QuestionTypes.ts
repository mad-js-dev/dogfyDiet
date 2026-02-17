import type { QuestionConfig } from '~/types/questionnaire'
import { BaseQuestion } from './BaseQuestion'
import TextInput from '~/components/text-input/textInput.vue'
import SelectAnswer from '~/components/select-answer/SelectAnswer.vue'
import BoolAnswer from '~/components/BoolAnswer.vue'
import AgeAnswer from '~/components/AgeAnswer.vue'
import RangeAnswer from '~/components/RangeAnswer.vue'
import MultiSelectAnswer from '~/components/MultiSelectAnswer.vue'
import SegmentedAnswer from '~/components/SegmentedAnswer.vue'
import RangeSlider from '~/components/range-slider/RangeSlider.vue'

export class TextQuestion extends BaseQuestion {
  constructor(config: QuestionConfig) {
    super(config)
  }

  validate(value: any): boolean {
    if (!this.config.required) return true
    return value !== null && value !== undefined && value !== ''
  }

  getAnswerComponent() {
    return TextInput
  }
}

export class SelectQuestion extends BaseQuestion {
  constructor(config: QuestionConfig) {
    super(config)
  }

  validate(value: any): boolean {
    if (!this.config.required) return true
    return value !== null && value !== undefined && value !== ''
  }

  getAnswerComponent() {
    return SelectAnswer
  }
}

export class MultiSelectQuestion extends BaseQuestion {
  constructor(config: QuestionConfig) {
    super(config)
  }

  validate(value: any): boolean {
    if (!this.config.required) return true
    return Array.isArray(value) && value.length > 0
  }

  getAnswerComponent() {
    return MultiSelectAnswer
  }
}

export class BoolQuestion extends BaseQuestion {
  constructor(config: QuestionConfig) {
    super(config)
  }

  validate(value: any): boolean {
    if (!this.config.required) return true
    return value === true || value === false
  }

  getAnswerComponent() {
    return BoolAnswer
  }
}

export class AgeQuestion extends BaseQuestion {
  constructor(config: QuestionConfig) {
    super(config)
  }

  validate(value: any): boolean {
    if (!this.config.required) return true
    
    if (!value || typeof value !== 'object') return false
    if (typeof value.years !== 'number' || typeof value.months !== 'number') return false
    if (value.years < 0 || value.months < 0 || value.months > 11) return false
    
    return true
  }

  getAnswerComponent() {
    return AgeAnswer
  }
}

export class RangeQuestion extends BaseQuestion {
  constructor(config: QuestionConfig) {
    super(config)
  }

  validate(value: any): boolean {
    if (!this.config.required) return true
    return value !== null && value !== undefined && value !== ''
  }

  getAnswerComponent() {
    return RangeAnswer
  }
}

export class EmailQuestion extends BaseQuestion {
  constructor(config: QuestionConfig) {
    super(config)
  }

  validate(value: any): boolean {
    if (!this.config.required) return true
    if (!value || value.trim() === '') return false
    
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(value)
  }

  getAnswerComponent() {
    return TextInput // Use TextInput component for email input
  }
}

export class TelQuestion extends BaseQuestion {
  constructor(config: QuestionConfig) {
    super(config)
  }

  validate(value: any): boolean {
    if (!this.config.required) return true
    if (!value || value.trim() === '') return false
    
    // Basic phone validation - allow digits, spaces, dashes, parentheses, plus
    const phoneRegex = /^[\d\s\-\(\)\+]+$/
    return phoneRegex.test(value) && value.replace(/\D/g, '').length >= 7
  }

  getAnswerComponent() {
    return TextInput // Use TextInput component for phone input
  }
}

export class SegmentedQuestion extends BaseQuestion {
  constructor(config: QuestionConfig) {
    super(config)
  }

  validate(value: any): boolean {
    if (!this.config.required) return true
    return value !== null && value !== undefined && value !== ''
  }

  getAnswerComponent() {
    return SegmentedAnswer
  }
}

export class RangeSliderQuestion extends BaseQuestion {
  constructor(config: QuestionConfig) {
    super(config)
  }

  validate(value: any): boolean {
    if (!this.config.required) return true
    return value !== null && value !== undefined && value !== ''
  }

  getAnswerComponent() {
    return RangeSlider
  }
}
