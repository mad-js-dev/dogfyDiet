import type { Meta, StoryObj } from '@storybook/vue3'
import { ref, watch } from 'vue'
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
  render: (args) => ({
    components: { M3Toggle },
    setup() {
      const modelValue = ref(args.modelValue)
      watch(() => args.modelValue, (newVal) => {
        modelValue.value = newVal
      })
      const handleUpdate = (value) => {
        args.modelValue = value
      }
      return { modelValue, handleUpdate }
    },
    template: '<M3Toggle ref="toggle" :modelValue="modelValue" @update:modelValue="handleUpdate" />',
  }),
  args: {
    modelValue: false,
  },
}

export const Off: Story = {
  render: (args) => ({
    components: { M3Toggle },
    setup() {
      const modelValue = ref(args.modelValue)
      watch(() => args.modelValue, (newVal) => {
        modelValue.value = newVal
      })
      const handleUpdate = (value) => {
        args.modelValue = value
      }
      return { modelValue, handleUpdate }
    },
    template: '<M3Toggle ref="toggle" :modelValue="modelValue" @update:modelValue="handleUpdate" />',
  }),
  args: {
    modelValue: false,
  },
}

export const Disabled: Story = {
  render: (args) => ({
    components: { M3Toggle },
    setup() {
      const modelValue = ref(args.modelValue)
      watch(() => args.modelValue, (newVal) => {
        modelValue.value = newVal
      })
      const handleUpdate = (value) => {
        args.modelValue = value
      }
      return { modelValue, handleUpdate }
    },
    template: '<M3Toggle ref="toggle" :modelValue="modelValue" @update:modelValue="handleUpdate" />',
  }),
  args: {
    modelValue: false,
    disabled: true,
  },
}

export const DisabledOn: Story = {
  render: (args) => ({
    components: { M3Toggle },
    setup() {
      const modelValue = ref(args.modelValue)
      watch(() => args.modelValue, (newVal) => {
        modelValue.value = newVal
      })
      const handleUpdate = (value) => {
        args.modelValue = value
      }
      return { modelValue, handleUpdate }
    },
    template: '<M3Toggle ref="toggle" :modelValue="modelValue" @update:modelValue="handleUpdate" />',
  }),
  args: {
    modelValue: true,
    disabled: true,
  },
}

export const DisabledOff: Story = {
  render: (args) => ({
    components: { M3Toggle },
    setup() {
      const modelValue = ref(args.modelValue)
      watch(() => args.modelValue, (newVal) => {
        modelValue.value = newVal
      })
      const handleUpdate = (value) => {
        args.modelValue = value
      }
      return { modelValue, handleUpdate }
    },
    template: '<M3Toggle ref="toggle" :modelValue="modelValue" @update:modelValue="handleUpdate" />',
  }),
  args: {
    modelValue: false,
    disabled: true,
  },
}

export const WithId: Story = {
  render: (args) => ({
    components: { M3Toggle },
    setup() {
      const modelValue = ref(args.modelValue)
      watch(() => args.modelValue, (newVal) => {
        modelValue.value = newVal
      })
      const handleUpdate = (value) => {
        args.modelValue = value
      }
      return { modelValue, handleUpdate }
    },
    template: '<M3Toggle ref="toggle" :modelValue="modelValue" @update:modelValue="handleUpdate" />',
  }),
  args: {
    modelValue: true,
    id: 'custom-toggle-id',
    'aria-label': 'Custom toggle',
  },
}
