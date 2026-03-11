import type { Meta, StoryObj } from '@storybook/vue3'
import DesignSystem from './DesignSystem.vue'

const meta = {
  title: 'Design System',
  parameters: {
    layout: 'fullscreen',
    options: { showPanel: false },
    docs: {
      description: {
        component: 'Complete design system documentation including colors, typography, and usage guidelines.'
      }
    }
  }
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

export const Overview: Story = {
  name: 'Design System Overview',
  parameters: {
    showPanel: false,
    docs: {
      description: {
        story: 'Complete visual documentation of the Dogfy Diet design system.'
      }
    }
  },
  render: () => ({
    components: { DesignSystem },
    template: '<DesignSystem />'
  })
}
