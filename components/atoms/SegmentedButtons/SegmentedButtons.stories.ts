import type { Meta, StoryObj } from '@storybook/vue3'

import SegmentedButtons from './SegmentedButtons.vue'

const meta: Meta<typeof SegmentedButtons> = {
  title: 'Atoms/SegmentedButtons',
  component: SegmentedButtons,
  parameters: {
    layout: 'centered',
  },
  tags: ['atoms', 'buttons'],
}

export default meta
type Story = StoryObj<typeof SegmentedButtons>

export const Default: Story = {
  args: {
    modelValue: 'Male',
    options: ['Male', 'Female'],
  },
}

export const WithActive: Story = {
  args: {
    modelValue: 'Female',
    options: ['Male', 'Female'],
  },
}

export const Disabled: Story = {
  args: {
    modelValue: 'Male',
    options: ['Male', 'Female'],
    disabled: true,
  },
}
