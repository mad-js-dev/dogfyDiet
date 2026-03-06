import type { Meta, StoryObj } from '@storybook/vue3'
import M3RadioButtons from './M3RadioButtons.vue'

const meta: Meta<typeof M3RadioButtons> = {
  title: 'Atoms/M3RadioButtons',
  component: M3RadioButtons,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    modelValue: {
      control: 'text',
      description: 'Currently selected option value',
    },
    options: {
      control: 'object',
      description: 'Array of option objects with value and label',
    },
    name: {
      control: 'text',
      description: 'Name for form compatibility',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the radio buttons are disabled',
    },
    required: {
      control: 'boolean',
      description: 'Whether selection is required',
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    modelValue: 'option2',
    options: [
      { value: 'option1', label: 'Option 1' },
      { value: 'option2', label: 'Option 2' },
      { value: 'option3', label: 'Option 3' },
    ],
  },
}

export const NoSelection: Story = {
  args: {
    modelValue: undefined,
    options: [
      { value: 'small', label: 'Small' },
      { value: 'medium', label: 'Medium' },
      { value: 'large', label: 'Large' },
    ],
  },
}

export const Disabled: Story = {
  args: {
    modelValue: 'medium',
    options: [
      { value: 'small', label: 'Small' },
      { value: 'medium', label: 'Medium' },
      { value: 'large', label: 'Large' },
    ],
    disabled: true,
  },
}

export const TwoOptions: Story = {
  args: {
    modelValue: 'yes',
    options: [
      { value: 'yes', label: 'Yes' },
      { value: 'no', label: 'No' },
    ],
  },
}

export const LongLabels: Story = {
  args: {
    modelValue: 'standard',
    options: [
      { value: 'basic', label: 'Basic Plan with limited features' },
      { value: 'standard', label: 'Standard Plan with most features included' },
      { value: 'premium', label: 'Premium Plan with all features and priority support' },
    ],
  },
}

export const SingleOption: Story = {
  args: {
    modelValue: 'only',
    options: [
      { value: 'only', label: 'Only Option' },
    ],
  },
}
