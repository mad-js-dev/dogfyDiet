import type { Meta, StoryObj } from '@storybook/vue3'
import RangeSlider from './RangeSlider.vue'

const meta: Meta<typeof RangeSlider> = {
  title: 'Components/RangeSlider',
  component: RangeSlider,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A horizontal slider component for selecting values from discrete options. Perfect for range-based questions like body shape selection.'
      }
    }
  },
  argTypes: {
    config: {
      description: 'Question configuration object',
      control: 'object'
    },
    modelValue: {
      description: 'Currently selected value',
      control: 'text'
    },
    disabled: {
      description: 'Whether the slider is disabled',
      control: 'boolean'
    },
    showLabels: {
      description: 'Whether to show step labels',
      control: 'boolean'
    },
    showValue: {
      description: 'Whether to show the selected value display',
      control: 'boolean'
    }
  }
}

export default meta
type Story = StoryObj<typeof meta>

// Default story with body shape options
export const Default: Story = {
  args: {
    config: {
      id: 'body_shape',
      type: 'range-slider',
      question: 'Which silhouette best represents your pet?',
      options: [
        'A bit thin - Narrow waist and ribs are clearly visible',
        'In good shape - Waist is visible and ribs are easy to feel',
        'A bit chubby - Waist is not visible and ribs are hard to feel'
      ],
      required: true,
      appliesTo: 'individual'
    },
    showLabels: true,
    showValue: true
  }
}

// With initial value
export const WithInitialValue: Story = {
  args: {
    config: {
      id: 'body_shape',
      type: 'range-slider',
      question: 'Which silhouette best represents your pet?',
      options: [
        'A bit thin - Narrow waist and ribs are clearly visible',
        'In good shape - Waist is visible and ribs are easy to feel',
        'A bit chubby - Waist is not visible and ribs are hard to feel'
      ],
      required: true,
      appliesTo: 'individual'
    },
    modelValue: 'In good shape - Waist is visible and ribs are easy to feel',
    showLabels: true,
    showValue: true
  }
}

// Disabled state
export const Disabled: Story = {
  args: {
    config: {
      id: 'body_shape',
      type: 'range-slider',
      question: 'Which silhouette best represents your pet?',
      options: [
        'A bit thin - Narrow waist and ribs are clearly visible',
        'In good shape - Waist is visible and ribs are easy to feel',
        'A bit chubby - Waist is not visible and ribs are hard to feel'
      ],
      required: true,
      appliesTo: 'individual'
    },
    modelValue: 'In good shape - Waist is visible and ribs are easy to feel',
    disabled: true,
    showLabels: true,
    showValue: true
  }
}

// Without labels
export const WithoutLabels: Story = {
  args: {
    config: {
      id: 'body_shape',
      type: 'range-slider',
      question: 'Which silhouette best represents your pet?',
      options: [
        'A bit thin - Narrow waist and ribs are clearly visible',
        'In good shape - Waist is visible and ribs are easy to feel',
        'A bit chubby - Waist is not visible and ribs are hard to feel'
      ],
      required: true,
      appliesTo: 'individual'
    },
    showLabels: false,
    showValue: true
  }
}

// Without value display
export const WithoutValueDisplay: Story = {
  args: {
    config: {
      id: 'body_shape',
      type: 'range-slider',
      question: 'Which silhouette best represents your pet?',
      options: [
        'A bit thin - Narrow waist and ribs are clearly visible',
        'In good shape - Waist is visible and ribs are easy to feel',
        'A bit chubby - Waist is not visible and ribs are hard to feel'
      ],
      required: true,
      appliesTo: 'individual'
    },
    showLabels: true,
    showValue: false
  }
}

// More options (5 steps)
export const FiveSteps: Story = {
  args: {
    config: {
      id: 'activity_level',
      type: 'range-slider',
      question: 'What is your pet\'s activity level?',
      options: [
        'Very Low - Mostly sleeps, minimal activity',
        'Low - Short walks, mostly calm',
        'Moderate - Daily walks, some play time',
        'High - Very active, loves to run and play',
        'Very High - Extremely active, needs constant exercise'
      ],
      required: true,
      appliesTo: 'individual'
    },
    showLabels: true,
    showValue: true
  }
}

// Custom labels
export const CustomLabels: Story = {
  args: {
    config: {
      id: 'pet_size',
      type: 'range-slider',
      question: 'What is your pet\'s size?',
      options: [
        'Extra Small - Under 5 lbs',
        'Small - 5-15 lbs',
        'Medium - 15-40 lbs',
        'Large - 40-80 lbs',
        'Extra Large - Over 80 lbs'
      ],
      required: true,
      appliesTo: 'individual'
    },
    showLabels: true,
    showValue: true
  }
}
