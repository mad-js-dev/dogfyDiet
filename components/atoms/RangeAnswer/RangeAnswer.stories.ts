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
      description: 'Question configuration',
    },
    modelValue: {
      control: 'text',
      description: 'Current selected value',
    },
    disabled: {
      control: 'boolean',
      description: 'Disable the component',
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    config: {
      id: 'pet_activity_level',
      type: 'range',
      question: 'How active is your pet?',
      appliesTo: 'individual',
      required: true,
      options: ['Low', 'Medium', 'High'],
      rangeOptions: [
        {
          value: 'low',
          label: 'Low',
          min: 0,
          max: 33
        },
        {
          value: 'moderate',
          label: 'Medium',
          min: 34,
          max: 66
        },
        {
          value: 'high',
          label: 'High',
          min: 67,
          max: 100
        }
      ]
    },
    modelValue: 'moderate',
    disabled: false
  }
}
