import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'
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
      description: 'Whether checkbox is checked',
    },
    label: {
      control: 'text',
      description: 'Label text for checkbox',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether checkbox is disabled',
    },
    required: {
      control: 'boolean',
      description: 'Whether checkbox is required',
    },
    errorMessage: {
      control: 'text',
      description: 'Error message to display',
    },
    'aria-label': {
      control: 'text',
      description: 'ARIA label for accessibility',
    },
    indeterminate: {
      control: 'boolean',
      description: 'Whether checkbox is in indeterminate state',
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    label: 'I agree to the terms and conditions',
  },
  render: (args) => ({
    components: { M3Checkbox },
    setup() {
      const checked = ref(false)
      return { checked, args }
    },
    template: `
      <M3Checkbox 
        v-model="checked" 
        :label="args.label"
      />
    `,
  }),
}

export const Checked: Story = {
  args: {
    label: 'I agree to the terms and conditions',
  },
  render: (args) => ({
    components: { M3Checkbox },
    setup() {
      const checked = ref(true)
      return { checked, args }
    },
    template: `
      <M3Checkbox 
        v-model="checked" 
        :label="args.label"
      />
    `,
  }),
}

export const Disabled: Story = {
  args: {
    label: 'Disabled checkbox',
    disabled: true,
  },
  render: (args) => ({
    components: { M3Checkbox },
    setup() {
      const checked = ref(false)
      return { checked, args }
    },
    template: `
      <M3Checkbox 
        v-model="checked" 
        :label="args.label"
        :disabled="args.disabled"
      />
    `,
  }),
}

export const DisabledChecked: Story = {
  args: {
    label: 'Disabled checked checkbox',
    disabled: true,
  },
  render: (args) => ({
    components: { M3Checkbox },
    setup() {
      const checked = ref(true)
      return { checked, args }
    },
    template: `
      <M3Checkbox 
        v-model="checked" 
        :label="args.label"
        :disabled="args.disabled"
      />
    `,
  }),
}

export const DisabledIndeterminate: Story = {
  args: {
    label: 'Disabled indeterminate checkbox',
    disabled: true,
    indeterminate: true,
  },
  render: (args) => ({
    components: { M3Checkbox },
    setup() {
      const checked = ref(false)
      return { checked, args }
    },
    template: `
      <M3Checkbox 
        v-model="checked" 
        :label="args.label"
        :disabled="args.disabled"
        :indeterminate="args.indeterminate"
      />
    `,
  }),
}

export const WithError: Story = {
  args: {
    label: 'Accept privacy policy',
    required: true,
    errorMessage: 'You must accept privacy policy to continue',
  },
  render: (args) => ({
    components: { M3Checkbox },
    setup() {
      const checked = ref(false)
      return { checked, args }
    },
    template: `
      <M3Checkbox 
        v-model="checked" 
        :label="args.label"
        :required="args.required"
        :errorMessage="args.errorMessage"
      />
    `,
  }),
}

export const NoLabel: Story = {
  args: {
    'aria-label': 'Standalone checkbox without visible label',
  },
  render: (args) => ({
    components: { M3Checkbox },
    setup() {
      const checked = ref(false)
      return { checked, args }
    },
    template: `
      <M3Checkbox 
        v-model="checked" 
        :aria-label="args['aria-label']"
      />
    `,
  }),
}

export const Indeterminate: Story = {
  args: {
    label: 'Indeterminate checkbox',
  },
  render: (args) => ({
    components: { M3Checkbox },
    setup() {
      const modelValue = ref<boolean | null>(true)
      const indeterminate = ref(false)
      const handleUpdate = (value: boolean | null) => {
        if (modelValue.value === true) {
          modelValue.value = false
        } else if (modelValue.value === false) {
          modelValue.value = null
          indeterminate.value = true
        } else {
          indeterminate.value = false
          modelValue.value = true
        }
      }
      return { modelValue, indeterminate, handleUpdate, args }
    },
    template: `
      <M3Checkbox 
        :modelValue="modelValue"
        :indeterminate="indeterminate"
        @update:modelValue="handleUpdate"
        :label="args.label"
      />
    `,
  }),
}

export const IndeterminateWithCross: Story = {
  args: {
    label: 'Indeterminate checkbox with cross',
  },
  render: (args) => ({
    components: { M3Checkbox },
    setup() {
      const modelValue = ref<boolean | null>(true)
      const indeterminate = ref(false)
      const handleUpdate = (value: boolean | null) => {
        if (modelValue.value === true) {
          modelValue.value = false
        } else if (modelValue.value === false) {
          modelValue.value = null
          indeterminate.value = true
        } else {
          indeterminate.value = false
          modelValue.value = true
        }
      }
      return { modelValue, indeterminate, handleUpdate, args }
    },
    template: `
      <M3Checkbox 
        :modelValue="modelValue"
        :indeterminate="indeterminate"
        @update:modelValue="handleUpdate"
        :label="args.label"
        :showCross="args.showCross"
      />
    `,
  }),
}


export const IndeterminateEmpty: Story = {
  args: {
    label: 'Indeterminate checkbox with empty box',
    showIndeterminateIcon: false,
  },
  render: (args) => ({
    components: { M3Checkbox },
    setup() {
      const modelValue = ref<boolean | null>(true)
      const indeterminate = ref(false)
      const handleUpdate = (value: boolean | null) => {
        if (modelValue.value === true) {
          modelValue.value = false
        } else if (modelValue.value === false) {
          modelValue.value = null
          indeterminate.value = true
        } else {
          indeterminate.value = false
          modelValue.value = true
        }
      }
      return { modelValue, indeterminate, handleUpdate, args }
    },
    template: `
      <M3Checkbox 
        :modelValue="modelValue"
        :indeterminate="indeterminate"
        @update:modelValue="handleUpdate"
        :label="args.label"
        :showIndeterminateIcon="args.showIndeterminateIcon"
      />
    `,
  }),
}
