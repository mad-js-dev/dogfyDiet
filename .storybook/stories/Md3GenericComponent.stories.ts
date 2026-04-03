import type { Meta, StoryObj } from '@storybook/vue3'
import Md3GenericComponent from './components/Md3GenericComponent.vue'

const meta = {
  title: 'Design System/MD3 Generic Component',
  component: Md3GenericComponent,
  parameters: {
    layout: 'centered',
    docs: {
      description: 'A generic component that applies MD3 theming to any element with configurable roles, themes, and variants.'
    }
  }
} satisfies Meta<typeof Md3GenericComponent>

export default meta
type Story = StoryObj<typeof Md3GenericComponent>

export const Default: Story = {
  name: 'Default',
  args: {
    role: 'neutral',
    theme: 'light',
    variant: 'main',
    padding: 'md',
    rounded: true
  },
  render: () => ({
    components: { Md3GenericComponent },
    template: '<Md3GenericComponent role="neutral" theme="light" variant="main" padding="md" rounded>Default Component</Md3GenericComponent>'
  })
}

export const AllRoles: Story = {
  name: 'All Roles',
  render: () => ({
    components: { Md3GenericComponent },
    template: `
      <div style="display: flex; flex-wrap: wrap; gap: 1rem; align-items: center;">
        <!-- Neutral Roles -->
        <Md3GenericComponent role="neutral" theme="light" variant="main" padding="sm" rounded>
          Neutral Main
        </Md3GenericComponent>
        <Md3GenericComponent role="neutral" theme="light" variant="container" padding="sm" rounded>
          Neutral Container
        </Md3GenericComponent>
        
        <!-- Primary Roles -->
        <Md3GenericComponent role="primary" theme="light" variant="main" padding="sm" rounded>
          Primary Main
        </Md3GenericComponent>
        <Md3GenericComponent role="primary" theme="light" variant="container" padding="sm" rounded>
          Primary Container
        </Md3GenericComponent>
        
        <!-- Secondary Roles -->
        <Md3GenericComponent role="secondary" theme="light" variant="main" padding="sm" rounded>
          Secondary Main
        </Md3GenericComponent>
        <Md3GenericComponent role="secondary" theme="light" variant="container" padding="sm" rounded>
          Secondary Container
        </Md3GenericComponent>
        
        <!-- Tertiary Roles -->
        <Md3GenericComponent role="tertiary" theme="light" variant="main" padding="sm" rounded>
          Tertiary Main
        </Md3GenericComponent>
        <Md3GenericComponent role="tertiary" theme="light" variant="container" padding="sm" rounded>
          Tertiary Container
        </Md3GenericComponent>
        
        <!-- Semantic Roles -->
        <Md3GenericComponent role="success" theme="light" variant="main" padding="sm" rounded>
          Success Main
        </Md3GenericComponent>
        <Md3GenericComponent role="error" theme="light" variant="main" padding="sm" rounded>
          Error Main
        </Md3GenericComponent>
        <Md3GenericComponent role="warning" theme="light" variant="main" padding="sm" rounded>
          Warning Main
        </Md3GenericComponent>
        <Md3GenericComponent role="info" theme="light" variant="main" padding="sm" rounded>
          Info Main
        </Md3GenericComponent>
      </div>
    `
  })
}

export const DarkTheme: Story = {
  name: 'Dark Theme',
  render: () => ({
    components: { Md3GenericComponent },
    template: `
      <div style="display: flex; flex-wrap: wrap; gap: 1rem; align-items: center;">
        <!-- Neutral Roles Dark -->
        <Md3GenericComponent role="neutral" theme="dark" variant="main" padding="sm" rounded>
          Neutral Main
        </Md3GenericComponent>
        <Md3GenericComponent role="neutral" theme="dark" variant="container" padding="sm" rounded>
          Neutral Container
        </Md3GenericComponent>
        
        <!-- Primary Roles Dark -->
        <Md3GenericComponent role="primary" theme="dark" variant="main" padding="sm" rounded>
          Primary Main
        </Md3GenericComponent>
        <Md3GenericComponent role="primary" theme="dark" variant="container" padding="sm" rounded>
          Primary Container
        </Md3GenericComponent>
        
        <!-- Secondary Roles Dark -->
        <Md3GenericComponent role="secondary" theme="dark" variant="main" padding="sm" rounded>
          Secondary Main
        </Md3GenericComponent>
        <Md3GenericComponent role="secondary" theme="dark" variant="container" padding="sm" rounded>
          Secondary Container
        </Md3GenericComponent>
        
        <!-- Tertiary Roles Dark -->
        <Md3GenericComponent role="tertiary" theme="dark" variant="main" padding="sm" rounded>
          Tertiary Main
        </Md3GenericComponent>
        <Md3GenericComponent role="tertiary" theme="dark" variant="container" padding="sm" rounded>
          Tertiary Container
        </Md3GenericComponent>
        
        <!-- Semantic Roles Dark -->
        <Md3GenericComponent role="success" theme="dark" variant="main" padding="sm" rounded>
          Success Main
        </Md3GenericComponent>
        <Md3GenericComponent role="error" theme="dark" variant="main" padding="sm" rounded>
          Error Main
        </Md3GenericComponent>
        <Md3GenericComponent role="warning" theme="dark" variant="main" padding="sm" rounded>
          Warning Main
        </Md3GenericComponent>
        <Md3GenericComponent role="info" theme="dark" variant="main" padding="sm" rounded>
          Info Main
        </Md3GenericComponent>
      </div>
    `
  })
}

export const Containers: Story = {
  name: 'Container Examples',
  render: () => ({
    components: { Md3GenericComponent },
    template: `
      <div style="display: flex; flex-direction: column; gap: 1rem;">
        <!-- Surface containers -->
        <Md3GenericComponent 
          md3Type="container" 
          role="neutral" 
          theme="light" 
          variant="surface" 
          padding="lg" 
          rounded 
          border
        >
          <h3 style="margin: 0 0 1rem 0;">Surface Container</h3>
          <p>This is a neutral surface container with light theme.</p>
        </Md3GenericComponent>
        
        <Md3GenericComponent 
          md3Type="container" 
          role="primary" 
          theme="light" 
          variant="surface" 
          padding="lg" 
          rounded 
          border
        >
          <h3 style="margin: 0 0 1rem 0;">Primary Surface</h3>
          <p>This is a primary surface container with light theme.</p>
        </Md3GenericComponent>
        
        <!-- Dark surface containers -->
        <Md3GenericComponent 
          md3Type="container" 
          role="neutral" 
          theme="dark" 
          variant="surface" 
          padding="lg" 
          rounded 
          border
        >
          <h3 style="margin: 0 0 1rem 0;">Dark Surface Container</h3>
          <p>This is a neutral surface container with dark theme.</p>
        </Md3GenericComponent>
      </div>
    `
  })
}

