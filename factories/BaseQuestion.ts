import type { QuestionConfig } from '~/types/questionnaire'

// Base Question Interface
export interface IQuestion {
  config: QuestionConfig
  validate(value: any): boolean
  render(): any
  getAnswerComponent(): any
}

// Base Question Class
export abstract class BaseQuestion implements IQuestion {
  public config: QuestionConfig

  constructor(config: QuestionConfig) {
    this.config = config
  }

  abstract validate(value: any): boolean
  abstract getAnswerComponent(): any

  render() {
    return {
      component: this.getAnswerComponent(),
      props: {
        config: this.config,
        key: this.config.id
      }
    }
  }

  protected isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  protected isRequired(value: any): boolean {
    if (!this.config.required) return true
    return value !== null && value !== undefined && value !== ''
  }
}
