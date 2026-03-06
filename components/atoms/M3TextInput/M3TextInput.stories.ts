import type { Meta, StoryObj } from '@storybook/vue3'
import M3TextInput from './M3TextInput.vue'

const meta: Meta<typeof M3TextInput> = {
  title: 'Atoms/M3TextInput',
  component: M3TextInput,
  parameters: {
    layout: 'centered',
  },
  tags: ['atoms', 'input'],
}

export default meta
type Story = StoryObj<typeof M3TextInput>

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
