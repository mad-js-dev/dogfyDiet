import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'
import SegmentedButtons from './SegmentedButtons.vue'

const meta: Meta<typeof SegmentedButtons> = {
  title: 'Components/SegmentedButtons',
  component: SegmentedButtons,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Material Design 3 segmented buttons component for binary or multi-choice selections.'
      }
    }
  },
  argTypes: {
    modelValue: {
      control: 'text',
      description: 'Currently selected value',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' }
      }
    },
    options: {
      control: 'object',
      description: 'Array of options with value and label',
      table: {
        type: { summary: 'SegmentedButtonOption[]' }
      }
    },
    name: {
      control: 'text',
      description: 'Name for form compatibility (hidden input)',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'undefined' }
      }
    },
    required: {
      control: 'boolean',
      description: 'Mark as required field for form validation',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' }
      }
    },
  }
}

export default meta
type Story = StoryObj<typeof meta>

// No selection (empty state)
export const NoSelection: Story = {
  render: (args) => ({
    components: { SegmentedButtons },
    setup() {
      const selectedValue = ref('')
      
      return { selectedValue }
    },
    template: `
      <SegmentedButtons
        v-model="selectedValue"
        :options="[
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' }
        ]"
        name="no-selection"
      />
    `
  })
}

export const Selected: Story = {
  render: (args) => ({
    components: { SegmentedButtons },
    setup() {
      const selectedValue = ref('yes')
      
      return { selectedValue }
    },
    template: `
      <SegmentedButtons
        v-model="selectedValue"
        :options="[
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' }
        ]"
        name="selected-example"
      />
    `
  })
}

