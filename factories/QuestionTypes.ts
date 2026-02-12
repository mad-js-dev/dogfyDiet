import type { QuestionConfig } from '~/types/questionnaire'
import { BaseQuestion } from './BaseQuestion'
import TextAnswer from '~/components/TextAnswer.vue'
import SelectAnswer from '~/components/SelectAnswer.vue'
import BoolAnswer from '~/components/BoolAnswer.vue'
import AgeAnswer from '~/components/AgeAnswer.vue'
import RangeAnswer from '~/components/RangeAnswer.vue'
import MultiSelectAnswer from '~/components/MultiSelectAnswer.vue'

export class TextQuestion extends BaseQuestion {
  constructor(config: QuestionConfig) {
    super(config)
  }

  validate(value: any): boolean {
    if (!this.config.required) return true
    return value !== null && value !== undefined && value !== ''
  }

  getAnswerComponent() {
    return TextAnswer
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
