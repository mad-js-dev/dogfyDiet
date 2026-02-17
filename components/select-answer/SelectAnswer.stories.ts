import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'
import SelectAnswer from './SelectAnswer.vue'

const meta: Meta<typeof SelectAnswer> = {
  title: 'Components/SelectAnswer',
  component: SelectAnswer,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    config: {
      description: 'Configuration object for the select input',
    },
    modelValue: {
      control: 'text',
      description: 'Current selected value',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether select is disabled',
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    config: {
      id: 'pet-size',
      type: 'select',
      question: 'What size is your pet?',
      appliesTo: 'individual',
      options: ['Small', 'Medium', 'Large', 'Extra Large'],
      required: false
    },
    modelValue: undefined,
    disabled: false,
  },
}

export const WithValue: Story = {
  args: {
    config: {
      id: 'pet-size',
      type: 'select',
      question: 'What size is your pet?',
      appliesTo: 'individual',
      options: ['Small', 'Medium', 'Large', 'Extra Large'],
      required: false,
    },
    modelValue: 'Medium',
    disabled: false,
  },
}

export const Required: Story = {
  args: {
    config: {
      id: 'pet-type',
      type: 'select',
      question: 'What type of pet do you have?',
      appliesTo: 'individual',
      options: ['Dog', 'Cat', 'Bird', 'Fish', 'Other'],
      required: true,
    },
    modelValue: 'Medium',
    disabled: false,
  },
}

export const Disabled: Story = {
  args: {
    config: {
      id: 'pet-breed',
      type: 'select',
      question: 'What breed is your pet?',
      appliesTo: 'individual',
      options: ['Labrador', 'Golden Retriever', 'German Shepherd', 'Bulldog'],
      required: false
    },
    modelValue: undefined,
    disabled: true,
  },
}

export const FewOptions: Story = {
  args: {
    config: {
      id: 'yes-no',
      type: 'select',
      question: 'Would you like to proceed?',
      appliesTo: 'individual',
      options: ['Yes', 'No'],
      required: false
    },
    modelValue: undefined,
    disabled: false,
  },
}

export const ManyOptions: Story = {
  args: {
    config: {
      id: 'countries',
      type: 'select',
      question: 'Select your country',
      appliesTo: 'individual',
      options: ['United States', 'Canada', 'United Kingdom', 'Germany', 'France', 'Spain', 'Italy', 'Japan', 'Australia', 'Brazil'],
      required: false
    },
    modelValue: undefined,
    disabled: false,
  },
}

export const TenOptions: Story = {
  args: {
    config: {
      id: 'numbers',
      type: 'select',
      question: 'Choose a number',
      appliesTo: 'individual',
      options: ['One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten'],
      required: false,
    },
    modelValue: undefined,
    disabled: false,
  },
}

export const WithoutQuestion: Story = {
  args: {
    config: {
      id: 'simple-select',
      type: 'select',
      question: 'Choose your favorite color',
      appliesTo: 'individual',
      options: ['Red', 'Blue', 'Green', 'Yellow', 'Purple', 'Orange'],
      required: false,
    },
    modelValue: undefined,
    disabled: false,
  },
}

export const Interactive: Story = {
  args: {
    config: {
      id: 'interactive-select',
      type: 'select',
      question: 'Choose your favorite color',
      appliesTo: 'individual',
      options: ['Red', 'Blue', 'Green', 'Yellow', 'Purple', 'Orange'],
      required: false
    },
    modelValue: undefined,
    disabled: false,
  },
  render: (args) => ({
    components: { SelectAnswer },
    setup() {
      const selectedValue = ref('')
      return { args, selectedValue }
    },
    template: `
      <div style="padding: 20px; min-width: 300px;">
        <SelectAnswer 
          v-bind="args"
          v-model="selectedValue"
        />
        <p>Selected: {{ selectedValue }}</p>
      </div>
    `,
  }),
}
