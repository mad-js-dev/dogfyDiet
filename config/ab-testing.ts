// A/B Testing Configuration and Utilities

export interface ExperimentConfig {
  name: string
  description: string
  enabled: boolean
  trafficSplit: number // 0.0 to 1.0 (e.g., 0.5 for 50% traffic)
  variants: {
    control: {
      name: string
      description: string
      weight: number // 0.0 to 1.0
    }
    test: {
      name: string
      description: string
      weight: number // 0.0 to 1.0
    }
  }
}

export const ACTIVITY_LEVEL_EXPERIMENT: ExperimentConfig = {
  name: 'activity_level_removal',
  description: 'Test if removing Activity Level step improves completion rates',
  enabled: true,
  trafficSplit: 0.5, // 50% of users get the test variant
  variants: {
    control: {
      name: 'full_questionnaire',
      description: 'Complete 9-step questionnaire with Activity Level',
      weight: 0.5
    },
    test: {
      name: 'reduced_questionnaire', 
      description: '8-step questionnaire without Activity Level',
      weight: 0.5
    }
  }
}

// Experiment group types
export type ExperimentGroup = 'control' | 'test'

// Experiment tracking interface
export interface ExperimentEvent {
  experiment: string
  group: ExperimentGroup
  event: string
  timestamp: Date
  data?: Record<string, any>
}
