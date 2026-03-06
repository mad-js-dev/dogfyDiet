import type { Meta, StoryObj } from '@storybook/vue3'
import M3Checkbox from './M3Checkbox.vue'

const meta: Meta<typeof M3Checkbox> = {
  title: 'Atoms/M3Checkbox',
  component: M3Checkbox,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    modelValue: {
      control: 'boolean',
      description: 'Whether the checkbox is checked',
    },
    label: {
      control: 'text',
      description: 'Label text for the checkbox',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the checkbox is disabled',
    },
    required: {
      control: 'boolean',
      description: 'Whether the checkbox is required',
    },
    errorMessage: {
      control: 'text',
      description: 'Error message to display',
    },
    'aria-label': {
      control: 'text',
      description: 'ARIA label for accessibility',
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    modelValue: false,
    label: 'I agree to the terms and conditions',
  },
}

export const Checked: Story = {
  args: {
    modelValue: true,
    label: 'I agree to the terms and conditions',
  },
}

export const Disabled: Story = {
  args: {
    modelValue: false,
    label: 'Disabled checkbox',
    disabled: true,
  },
}

export const DisabledChecked: Story = {
  args: {
    modelValue: true,
    label: 'Disabled checked checkbox',
    disabled: true,
  },
}

export const WithError: Story = {
  args: {
    modelValue: false,
    label: 'Accept privacy policy',
    required: true,
    errorMessage: 'You must accept the privacy policy to continue',
  },
}

export const NoLabel: Story = {
  args: {
    modelValue: false,
    'aria-label': 'Standalone checkbox without visible label',
  },
}

export const LongLabel: Story = {
  args: {
    modelValue: true,
    label: 'I have read and understood the comprehensive terms of service, privacy policy, and all associated legal documents that govern my use of this platform',
  },
}
