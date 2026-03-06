import type { Meta, StoryObj } from '@storybook/vue3'
import M3SegmentedButtons from './M3SegmentedButtons.vue'

const meta: Meta<typeof M3SegmentedButtons> = {
  title: 'Atoms/M3SegmentedButtons',
  component: M3SegmentedButtons,
  parameters: {
    layout: 'centered',
  },
  tags: ['atoms', 'buttons'],
}

export default meta
type Story = StoryObj<typeof M3SegmentedButtons>

export const Default: Story = {
  args: {
    modelValue: 'Male',
    options: ['Male', 'Female'],
  },
}
