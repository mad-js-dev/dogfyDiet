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
    modelValue: 'Option 1',
    options: ['Option 1', 'Option 2', 'Option 3'],
  },
}

export const WithActive: Story = {
  args: {
    modelValue: 'Option 2',
    options: ['Option 1', 'Option 2', 'Option 3'],
  },
}

export const TwoOptions: Story = {
  args: {
    modelValue: 'Male',
    options: ['Male', 'Female'],
  },
}

export const Disabled: Story = {
  args: {
    modelValue: 'Option 1',
    options: ['Option 1', 'Option 2', 'Option 3'],
    disabled: true,
  },
}
