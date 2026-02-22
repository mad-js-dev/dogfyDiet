import type { Meta, StoryObj } from '@storybook/vue3'
import RangeAnswer from './RangeAnswer.vue'

const meta: Meta<typeof RangeAnswer> = {
  title: 'Atoms/RangeAnswer',
  component: RangeAnswer,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    config: {
      control: 'object',
      description: 'Question configuration object'
    },
    modelValue: {
      control: 'text',
      description: 'Current selected value'
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the component is disabled'
    }
  }
}

export default meta

type Story = StoryObj<typeof meta>

// Default story
export const Default: Story = {
  args: {
    config: {
      id: 'pet_activity_level',
      question: 'What is your pet\'s activity level?',
      type: 'range',
      required: true,
      rangeOptions: [
        {
          value: 'low',
          label: 'Low Activity',
          min: 'Less than 30 mins',
          max: 'per day'
        },
        {
          value: 'moderate',
          label: 'Moderate Activity',
          min: '30-60 mins',
          max: 'per day'
        },
        {
          value: 'high',
          label: 'High Activity',
          min: 'More than 60 mins',
          max: 'per day'
        }
      ]
    },
    modelValue: '',
    disabled: false
  }
}

// With selected value story
export const WithSelectedValue: Story = {
  args: {
    config: {
      id: 'pet_activity_level',
      question: 'What is your pet\'s activity level?',
      type: 'range',
      required: true,
      rangeOptions: [
        {
          value: 'low',
          label: 'Low Activity',
          min: 'Less than 30 mins',
          max: 'per day'
        },
        {
          value: 'moderate',
          label: 'Moderate Activity',
          min: '30-60 mins',
          max: 'per day'
        },
        {
          value: 'high',
          label: 'High Activity',
          min: 'More than 60 mins',
          max: 'per day'
        }
      ]
    },
    modelValue: 'moderate',
    disabled: false
  }
}

// Disabled story
export const Disabled: Story = {
  args: {
    config: {
      id: 'pet_activity_level',
      question: 'What is your pet\'s activity level?',
      type: 'range',
      required: true,
      rangeOptions: [
        {
          value: 'low',
          label: 'Low Activity',
          min: 'Less than 30 mins',
          max: 'per day'
        },
        {
          value: 'moderate',
          label: 'Moderate Activity',
          min: '30-60 mins',
          max: 'per day'
        },
        {
          value: 'high',
          label: 'High Activity',
          min: 'More than 60 mins',
          max: 'per day'
        }
      ]
    },
    modelValue: '',
    disabled: true
  }
}

// Without range options story
export const WithoutRangeOptions: Story = {
  args: {
    config: {
      id: 'simple_question',
      question: 'Simple question without range options',
      type: 'range',
      required: false
    },
    modelValue: '',
    disabled: false
  }
}
