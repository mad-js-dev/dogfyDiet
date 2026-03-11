import type { Meta, StoryObj } from '@storybook/vue3'
import DesignSystem from './DesignSystem.vue'

const meta = {
  title: 'Design System',
  parameters: {
    layout: 'fullscreen',
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
    controls: { disable: true },
    actions: { disable: true },
    interactions: { disable: true },
    options: { showPanel: false },
    console: { disable: true },
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
