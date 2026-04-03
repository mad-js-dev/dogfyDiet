import type { Meta, StoryObj } from '@storybook/vue3'
import Colors from './Colors.vue'
import MD3TonalPalettesSection from './sections/MD3TonalPalettesSection.vue'
import MD3ColorRolesSection from './sections/MD3ColorRolesSection.vue'

const meta = {
  title: 'Styleguide/Colors',
  component: Colors,
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

export const BaseColors: Story = {
  name: 'Base colors',
  parameters: {
    showPanel: false,
    docs: {
      description: {
        story: 'All color tokens in the design system.'
      }
    }
  },
  render: () => ({
    components: { Colors },
    template: '<Colors />'
  })
}

export const DynamicPalettes: Story = {
  name: 'Dynamic palettes',
  parameters: {
    showPanel: false,
    docs: {
      description: {
        story: 'All color tokens in the design system.'
      }
    }
  },
  render: () => ({
    components: { MD3TonalPalettesSection },
    template: '<MD3TonalPalettesSection />'
  })
}


export const ColorRoles: Story = {
  name: 'Color roles',
  parameters: {
    showPanel: false,
    docs: {
      description: {
        story: 'All color tokens in the design system.'
      }
    }
  },
  render: () => ({
    components: { MD3ColorRolesSection },
    template: '<MD3ColorRolesSection />'
  })
}
