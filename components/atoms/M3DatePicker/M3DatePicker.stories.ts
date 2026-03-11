import type { Meta, StoryObj } from '@storybook/vue3'
import M3DatePicker from './M3DatePicker.vue'

const meta: Meta<typeof M3DatePicker> = {
  title: 'Atoms/M3DatePicker',
  component: M3DatePicker,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    modelValue: { control: 'text', description: 'Selected date in YYYY-MM-DD format' },
    min: { control: 'text', description: 'Minimum selectable date' },
    max: { control: 'text', description: 'Maximum selectable date' },
    disabled: { control: 'boolean', description: 'Whether the date picker is disabled' },
    label: { control: 'text', description: 'Label for the input field' },
    placeholder: { control: 'text', description: 'Placeholder text for the input field' },
    errorMessage: { control: 'text', description: 'Error message to display' },
    'aria-label': { control: 'text', description: 'ARIA label for accessibility' }
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    modelValue: '2024-01-15',
    min: '2024-01-01',
    max: '2024-12-31',
    disabled: false,
    label: 'Select a date',
    placeholder: 'MM/DD/YYYY'
  }
}

