import type { Meta, StoryObj } from '@storybook/vue3'
import SegmentedAnswer from './SegmentedAnswer.vue'

const meta: Meta<typeof SegmentedAnswer> = {
  title: 'Molecules/SegmentedAnswer',
  component: SegmentedAnswer,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    config: {
      control: 'object',
      description: 'Question configuration',
    },
    modelValue: {
      control: 'text',
      description: 'Current selected value',
    },
    petId: {
      control: 'text',
      description: 'Pet ID for multi-pet scenarios',
    },
    disabled: {
      control: 'boolean',
      description: 'Disable the component',
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const GenderSelection: Story = {
  args: {
    config: {
      id: 'pet_gender',
      type: 'single',
      question: 'What is your pet\'s gender?',
      appliesTo: 'individual',
      required: false,
      options: ['Male', 'Female'],
    },
    modelValue: 'Male',
    petId: 'pet_1',
    disabled: false,
  },
}

export const NoSelection: Story = {
  args: {
    config: {
      id: 'pet_gender',
      type: 'single',
      question: 'What is your pet\'s gender?',
      appliesTo: 'individual',
      required: false,
      options: ['Male', 'Female'],
    },
    modelValue: undefined,
    petId: 'pet_1',
    disabled: false,
  },
}

export const MultiplePets: Story = {
  args: {
    config: {
      id: 'pet_gender',
      type: 'single',
      question: 'What is your pet\'s gender?',
      appliesTo: 'individual',
      required: false,
      options: ['Male', 'Female'],
    },
    modelValue: 'Female',
    petId: 'pet_2',
    disabled: false,
  },
}

export const Disabled: Story = {
  args: {
    ...GenderSelection.args,
    disabled: true,
  },
}

export const Required: Story = {
  args: {
    config: {
      id: 'pet_gender',
      type: 'single',
      question: 'What is your pet\'s gender?',
      appliesTo: 'individual',
      required: true,
      options: ['Male', 'Female'],
    },
    modelValue: 'Male',
    petId: 'pet_1',
    disabled: false,
  },
}
