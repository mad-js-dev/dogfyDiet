import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'
import M3RadioButton from './M3RadioButton.vue'

const meta: Meta<typeof M3RadioButton> = {
  title: 'Atoms/M3RadioButton',
  component: M3RadioButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    modelValue: {
      control: 'text',
      description: 'The selected value',
    },
    value: {
      control: 'text',
      description: 'The value of this radio button',
    },
    label: {
      control: 'text',
      description: 'Label text for radio button',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether radio button is disabled',
    },
    required: {
      control: 'boolean',
      description: 'Whether radio button is required',
    },
    errorMessage: {
      control: 'text',
      description: 'Error message to display',
    },
    name: {
      control: 'text',
      description: 'Name for form grouping',
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
    label: 'Option 1',
    value: 'option1',
    name: 'radio-group',
  },
  render: (args) => ({
    components: { M3RadioButton },
    setup() {
      const selected = ref('option1')
      return { selected, args }
    },
    template: `
      <M3RadioButton 
        v-model="selected" 
        :label="args.label"
        :value="args.value"
        :name="args.name"
      />
    `,
  }),
}

export const Selected: Story = {
  args: {
    label: 'Option 2',
    value: 'option2',
    name: 'radio-group',
  },
  render: (args) => ({
    components: { M3RadioButton },
    setup() {
      const selected = ref('option2')
      return { selected, args }
    },
    template: `
      <M3RadioButton 
        v-model="selected" 
        :label="args.label"
        :value="args.value"
        :name="args.name"
      />
    `,
  }),
}

export const Disabled: Story = {
  args: {
    label: 'Disabled option',
    value: 'disabled',
    disabled: true,
    name: 'radio-group',
  },
  render: (args) => ({
    components: { M3RadioButton },
    setup() {
      const selected = ref('')
      return { selected, args }
    },
    template: `
      <M3RadioButton 
        v-model="selected" 
        :label="args.label"
        :value="args.value"
        :disabled="args.disabled"
        :name="args.name"
      />
    `,
  }),
}

export const WithError: Story = {
  args: {
    label: 'Required option',
    value: 'required',
    required: true,
    errorMessage: 'You must select this option',
    name: 'radio-group',
  },
  render: (args) => ({
    components: { M3RadioButton },
    setup() {
      const selected = ref('')
      return { selected, args }
    },
    template: `
      <M3RadioButton 
        v-model="selected" 
        :label="args.label"
        :value="args.value"
        :required="args.required"
        :errorMessage="args.errorMessage"
        :name="args.name"
      />
    `,
  }),
}

export const VerticalGroup: Story = {
  args: {
    name: 'radio-group-vertical',
  },
  render: (args) => ({
    components: { M3RadioButton },
    setup() {
      const selected = ref('option1')
      return { selected, args }
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 16px;">
        <M3RadioButton 
          v-model="selected" 
          label="Option 1"
          value="option1"
          :name="args.name"
        />
        <M3RadioButton 
          v-model="selected" 
          label="Option 2"
          value="option2"
          :name="args.name"
        />
        <M3RadioButton 
          v-model="selected" 
          label="Option 3"
          value="option3"
          :name="args.name"
        />
      </div>
    `,
  }),
}

export const LongLabels: Story = {
  args: {
    name: 'radio-group-long',
  },
  render: (args) => ({
    components: { M3RadioButton },
    setup() {
      const selected = ref('option1')
      return { selected, args }
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 16px;">
        <M3RadioButton 
          v-model="selected" 
          label="This is a very long label for the first radio button option that tests how the component handles longer text"
          value="option1"
          :name="args.name"
        />
        <M3RadioButton 
          v-model="selected" 
          label="Another long label for the second option to see the wrapping and spacing behavior"
          value="option2"
          :name="args.name"
        />
        <M3RadioButton 
          v-model="selected" 
          label="The third option with an even longer label that might span multiple lines depending on the container width"
          value="option3"
          :name="args.name"
        />
      </div>
    `,
  }),
}
