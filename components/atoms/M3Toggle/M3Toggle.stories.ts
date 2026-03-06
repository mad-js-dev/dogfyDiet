import type { Meta, StoryObj } from '@storybook/vue3'
import M3Toggle from './M3Toggle.vue'

const meta: Meta<typeof M3Toggle> = {
  title: 'Atoms/M3Toggle',
  component: M3Toggle,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    modelValue: {
      control: 'boolean',
      description: 'Whether the toggle is on/off',
    },
    id: {
      control: 'text',
      description: 'Unique ID for the toggle',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the toggle is disabled',
    },
    label: {
      control: 'text',
      description: 'Label text for the toggle',
    },
    required: {
      control: 'boolean',
      description: 'Whether the toggle is required',
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
  },
}

export const On: Story = {
  args: {
    modelValue: true,
  },
}

export const Disabled: Story = {
  args: {
    modelValue: false,
    disabled: true,
  },
}

export const DisabledOn: Story = {
  args: {
    modelValue: true,
    disabled: true,
  },
}

export const WithLabel: Story = {
  args: {
    modelValue: false,
    'aria-label': 'Enable notifications',
  },
}

export const WithId: Story = {
  args: {
    modelValue: true,
    id: 'custom-toggle-id',
    'aria-label': 'Custom toggle',
  },
}
