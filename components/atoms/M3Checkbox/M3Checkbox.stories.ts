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

export const DisabledIndeterminate: Story = {
  args: {
    modelValue: false,
    label: 'Disabled indeterminate checkbox',
    disabled: true,
    indeterminate: true,
  },
}

export const WithError: Story = {
  args: {
    modelValue: false,
    label: 'Accept privacy policy',
    required: true,
    errorMessage: 'You must accept privacy policy to continue',
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

export const Interactive: Story = {
  render: (args) => ({
    components: { M3Checkbox },
    setup() {
      const checked = ref(args.modelValue || false)
      const indeterminate = ref(args.indeterminate || false)
      
      return { checked, indeterminate, args }
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 16px;">
        <div>
          <h4 style="margin: 0 0 8px 0; font-weight: 600;">Interactive States:</h4>
          <M3Checkbox 
            v-model="checked" 
            v-bind="args"
            label="Try checking/unchecking me!"
          />
          <p style="margin: 8px 0; font-size: 14px; color: #666;">
            State: {{ checked ? 'Checked' : 'Unchecked' }}
          </p>
        </div>
        
        <div>
          <h4 style="margin: 0 0 8px 0; font-weight: 600;">Indeterminate Toggle:</h4>
          <M3Checkbox 
            v-model="checked" 
            :indeterminate="indeterminate"
            label="Click to toggle indeterminate state"
          />
          <button 
            @click="indeterminate = !indeterminate"
            style="margin: 8px 0; padding: 4px 8px; border: 1px solid #ccc; border-radius: 4px; background: #f5f5f5; cursor: pointer;"
          >
            Toggle Indeterminate: {{ indeterminate ? 'ON' : 'OFF' }}
          </button>
        </div>
      </div>
    `,
  }),
  args: {
    label: 'Interactive checkbox with state controls',
  },
}
