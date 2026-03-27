import type { Meta, StoryObj } from '@storybook/vue3'
import ColorsShowcase from './components/ColorsShowcase.vue'

const meta = {
  title: 'Styleguide/Colors',
  component: ColorsShowcase,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Complete color palette documentation including brand colors, semantic colors, and usage guidelines.'
      }
    }
  }
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

export const Palette: Story = {
  name: 'Color Palette',
  parameters: {
    showPanel: false,
    docs: {
      description: {
        story: 'All color tokens in the design system.'
      }
    }
  },
  render: () => ({
    components: { ColorsShowcase },
    template: '<ColorsShowcase />'
  })
}
