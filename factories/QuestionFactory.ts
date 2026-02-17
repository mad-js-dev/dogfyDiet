import { BaseQuestion } from './BaseQuestion'
import { TextQuestion, SelectQuestion, BoolQuestion, AgeQuestion, RangeQuestion, EmailQuestion, TelQuestion, SegmentedQuestion, RangeSliderQuestion } from './QuestionTypes'
import type { QuestionConfig } from '~/types/questionnaire'

export class QuestionFactory {
  private static componentCache = new Map<string, any>()

  static createQuestion(config: QuestionConfig): BaseQuestion {
    let question: BaseQuestion

    switch (config.type) {
      case 'text':
        question = new TextQuestion(config)
        break
      case 'select':
        question = new SelectQuestion(config)
        break
      case 'bool':
        question = new BoolQuestion(config)
        break
      case 'age':
        question = new AgeQuestion(config)
        break
      case 'range':
        question = new RangeQuestion(config)
        break
      case 'email':
        question = new EmailQuestion(config)
        break
      case 'tel':
        question = new TelQuestion(config)
        break
      case 'segmented':
        question = new SegmentedQuestion(config)
        break
      case 'range-slider':
        question = new RangeSliderQuestion(config)
        break
      default:
        throw new Error(`Unknown question type: ${config.type}`)
    }

    // Cache the component for better performance
    const component = question.getAnswerComponent()
    if (component && !this.componentCache.has(config.id)) {
      this.componentCache.set(config.id, component)
    }

    return question
  }

  static createQuestions(configs: QuestionConfig[]): BaseQuestion[] {
    return configs.map(config => this.createQuestion(config))
  }

  static getComponent(questionId: string): any {
    return this.componentCache.get(questionId)
  }

  static clearCache(): void {
    this.componentCache.clear()
  }

  // Factory method for creating question configurations
  static createConfig(config: Partial<QuestionConfig>): QuestionConfig {
    return {
      id: config.id || '',
      type: config.type || 'text',
      question: config.question || '',
      appliesTo: config.appliesTo || 'all',
      required: config.required || false,
      ...config
    }
  }

  // Batch creation with validation
  static createValidatedQuestions(configs: Partial<QuestionConfig>[]): BaseQuestion[] {
    const validConfigs = configs.filter(config => {
      if (!config.id || !config.type || !config.question) {
        console.warn('Invalid question config:', config)
        return false
      }
      return true
    })

    return this.createQuestions(validConfigs as QuestionConfig[])
  }
}
