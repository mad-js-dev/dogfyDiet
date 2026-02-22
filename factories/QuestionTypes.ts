import type { QuestionConfig } from '~/types/questionnaire'
import { BaseQuestion } from './BaseQuestion'
import TextInput from '~/components/atoms/TextInput/TextInput.vue'
import SelectAnswer from '~/components/molecules/SelectAnswer/SelectAnswer.vue'
import RangeAnswer from '~/components/atoms/RangeAnswer/RangeAnswer.vue'
import RangeSlider from '~/components/atoms/RangeSlider/RangeSlider.vue'
import SegmentedAnswer from '~/components/molecules/SegmentedAnswer/SegmentedAnswer.vue'

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
    
    // Basic phone validation
    const phoneRegex = /^[\d\s\-\+\(\)]+$/
    return phoneRegex.test(value) && value.replace(/\D/g, '').length >= 10
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
