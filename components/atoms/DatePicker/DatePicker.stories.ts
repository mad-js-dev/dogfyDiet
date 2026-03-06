import type { StoryObj } from '@storybook/vue3'
import type { Meta } from '@storybook/addon-docs'

const meta: Meta = {
  title: 'Atoms/DatePicker',
  component: 'DatePicker',
}

export default {
  title: 'Default',
  component: 'DatePicker',
  parameters: {
    modelValue: { control: 'text', description: 'Selected date in YYYY-MM-DD format' },
    min: { control: 'text', description: 'Minimum selectable date' },
    max: { control: 'text', description: 'Maximum selectable date' },
    disabled: { control: 'boolean', description: 'Whether the date picker is disabled' },
    label: { control: 'text', description: 'Label for the input field' },
    placeholder: { control: 'text', description: 'Placeholder text for the input field' },
    errorMessage: { control: 'text', description: 'Error message to display' },
    'aria-label': { control: 'text', description: 'ARIA label for accessibility' }
  },
  args: {
    modelValue: { control: 'text', description: '2024-01-15' },
    min: { control: 'text', description: '2024-01-01' },
    max: { control: 'text', description: '2024-12-31' },
    disabled: { control: 'boolean', description: 'false' },
  }
}

export const Default = (args: any) => ({
  components: {
    DatePicker: {
      args: args
    }
  }
})

export default export default Default
