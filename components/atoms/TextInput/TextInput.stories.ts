import type { Meta, StoryObj } from '@storybook/vue3'

import TextInput from './TextInput.vue'

const meta: Meta<typeof TextInput> = {
  title: 'Atoms/TextInput',
  component: TextInput,
  parameters: {
    layout: 'centered',
  },
  tags: ['atoms', 'input'],
}

export default meta
type Story = StoryObj<typeof TextInput>

export const Default: Story = {
  args: {
    modelValue: '',
    placeholder: 'Enter your answer',
  },
}

export const WithValidation: Story = {
  args: {
    modelValue: '',
    placeholder: 'Enter your email',
    type: 'email',
    required: true,
    validation: [
      {
        type: 'required',
        message: 'Email is required'
      },
      {
        type: 'email',
        message: 'Please enter a valid email'
      }
    ],
  },
}

export const NumberInput: Story = {
  args: {
    modelValue: '',
    placeholder: 'Enter your age',
    type: 'number',
    required: true,
  },
}
