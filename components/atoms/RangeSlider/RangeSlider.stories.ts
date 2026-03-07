import type { Meta, StoryObj } from '@storybook/vue3'
import RangeSlider from './RangeSlider.vue'

const meta: Meta<typeof RangeSlider> = {
  title: 'Atoms/RangeSlider',
  component: RangeSlider,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    modelValue: {
      control: 'text',
      description: 'Current selected value',
    },
    config: {
      control: 'object',
      description: 'Question configuration with options',
    },
    disabled: {
      control: 'boolean',
      description: 'Disable the slider',
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    modelValue: 'ideal',
    config: {
      id: 'pet_body_shape',
      type: 'range-slider',
      question: 'Select your pet\'s body shape',
      appliesTo: 'individual',
      required: true,
      rangeOptions: [
        {
          value: 'underweight',
          label: 'Underweight',
          min: 0,
          max: 33
        },
        {
          value: 'ideal',
          label: 'Ideal Weight',
          min: 34,
          max: 66
        },
        {
          value: 'overweight',
          label: 'Overweight',
          min: 67,
          max: 100
        }
      ]
    },
    disabled: false,
  },
}
