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

export const SurfaceVariants: Story = {
  name: 'Surface Variants',
  render: () => ({
    components: { Md3GenericComponent },
    template: `
      <div style="display: flex; flex-direction: column; gap: 2rem;">
        <!-- Surface Variants (Light Theme) -->
        <div>
          <h3>Surface (Light Theme)</h3>
          <div style="display: flex; flex-wrap: wrap; gap: 1rem; align-items: center;">
            <Md3GenericComponent role="neutral" theme="light" variant="surface" surfaceSubVariant="dim" padding="md" rounded>
              Surface Dim
            </Md3GenericComponent>
            <Md3GenericComponent role="neutral" theme="light" variant="surface" surfaceSubVariant="regular" padding="md" rounded>
              Surface Regular
            </Md3GenericComponent>
            <Md3GenericComponent role="neutral" theme="light" variant="surface" surfaceSubVariant="bright" padding="md" rounded>
              Surface Bright
            </Md3GenericComponent>
            <Md3GenericComponent role="neutral" theme="light" variant="surface" surfaceSubVariant="inverse" padding="md" rounded>
              Surface Inverse
            </Md3GenericComponent>
          </div>
        </div>
        
        <!-- Surface Variants (Dark Theme) -->
        <div>
          <h3>Surface (Dark Theme)</h3>
          <div style="display: flex; flex-wrap: wrap; gap: 1rem; align-items: center;">
            <Md3GenericComponent role="neutral" theme="dark" variant="surface" surfaceSubVariant="dim" padding="md" rounded>
              Surface Dim
            </Md3GenericComponent>
            <Md3GenericComponent role="neutral" theme="dark" variant="surface" surfaceSubVariant="regular" padding="md" rounded>
              Surface Regular
            </Md3GenericComponent>
            <Md3GenericComponent role="neutral" theme="dark" variant="surface" surfaceSubVariant="bright" padding="md" rounded>
              Surface Bright
            </Md3GenericComponent>
            <Md3GenericComponent role="neutral" theme="dark" variant="surface" surfaceSubVariant="inverse" padding="md" rounded>
              Surface Inverse
            </Md3GenericComponent>
          </div>
        </div>
        
        <!-- Surface Variant Variants (Light Theme) -->
        <div>
          <h3>Surface-Variant (Light Theme)</h3>
          <div style="display: flex; flex-wrap: wrap; gap: 1rem; align-items: center;">
            <Md3GenericComponent role="neutral" theme="light" variant="surface-variant" surfaceSubVariant="dim" padding="md" rounded>
              Surface-Variant Dim
            </Md3GenericComponent>
            <Md3GenericComponent role="neutral" theme="light" variant="surface-variant" surfaceSubVariant="regular" padding="md" rounded>
              Surface-Variant Regular
            </Md3GenericComponent>
            <Md3GenericComponent role="neutral" theme="light" variant="surface-variant" surfaceSubVariant="bright" padding="md" rounded>
              Surface-Variant Bright
            </Md3GenericComponent>
            <Md3GenericComponent role="neutral" theme="light" variant="surface-variant" surfaceSubVariant="inverse" padding="md" rounded>
              Surface-Variant Inverse
            </Md3GenericComponent>
          </div>
        </div>
        
        <!-- Surface Variant Variants (Dark Theme) -->
        <div>
          <h3>Surface-Variant (Dark Theme)</h3>
          <div style="display: flex; flex-wrap: wrap; gap: 1rem; align-items: center;">
            <Md3GenericComponent role="neutral" theme="dark" variant="surface-variant" surfaceSubVariant="dim" padding="md" rounded>
              Surface-Variant Dim
            </Md3GenericComponent>
            <Md3GenericComponent role="neutral" theme="dark" variant="surface-variant" surfaceSubVariant="regular" padding="md" rounded>
              Surface-Variant Regular
            </Md3GenericComponent>
            <Md3GenericComponent role="neutral" theme="dark" variant="surface-variant" surfaceSubVariant="bright" padding="md" rounded>
              Surface-Variant Bright
            </Md3GenericComponent>
            <Md3GenericComponent role="neutral" theme="dark" variant="surface-variant" surfaceSubVariant="inverse" padding="md" rounded>
              Surface-Variant Inverse
            </Md3GenericComponent>
          </div>
        </div>
      </div>
    `
  })
}

export const ContainerHierarchy: Story = {
  name: 'Container Hierarchy',
  render: () => ({
    components: { Md3GenericComponent },
    template: `
      <div style="display: flex; flex-direction: column; gap: 2rem;">
        <!-- Container Hierarchy (Light Theme) -->
        <div>
          <h3>Container Hierarchy (Light Theme)</h3>
          <div style="display: flex; flex-wrap: wrap; gap: 1rem; align-items: center;">
            <Md3GenericComponent role="neutral" theme="light" variant="container" containerSubVariant="container-lowest" padding="md" rounded>
              Container Lowest
            </Md3GenericComponent>
            <Md3GenericComponent role="neutral" theme="light" variant="container" containerSubVariant="container-low" padding="md" rounded>
              Container Low
            </Md3GenericComponent>
            <Md3GenericComponent role="neutral" theme="light" variant="container" containerSubVariant="container" padding="md" rounded>
              Container Regular
            </Md3GenericComponent>
            <Md3GenericComponent role="neutral" theme="light" variant="container" containerSubVariant="container-high" padding="md" rounded>
              Container High
            </Md3GenericComponent>
            <Md3GenericComponent role="neutral" theme="light" variant="container" containerSubVariant="container-highest" padding="md" rounded>
              Container Highest
            </Md3GenericComponent>
          </div>
        </div>
        
        <!-- Container Hierarchy (Dark Theme) -->
        <div>
          <h3>Container Hierarchy (Dark Theme)</h3>
          <div style="display: flex; flex-wrap: wrap; gap: 1rem; align-items: center;">
            <Md3GenericComponent role="neutral" theme="dark" variant="container" containerSubVariant="container-lowest" padding="md" rounded>
              Container Lowest
            </Md3GenericComponent>
            <Md3GenericComponent role="neutral" theme="dark" variant="container" containerSubVariant="container-low" padding="md" rounded>
              Container Low
            </Md3GenericComponent>
            <Md3GenericComponent role="neutral" theme="dark" variant="container" containerSubVariant="container" padding="md" rounded>
              Container Regular
            </Md3GenericComponent>
            <Md3GenericComponent role="neutral" theme="dark" variant="container" containerSubVariant="container-high" padding="md" rounded>
              Container High
            </Md3GenericComponent>
            <Md3GenericComponent role="neutral" theme="dark" variant="container" containerSubVariant="container-highest" padding="md" rounded>
              Container Highest
            </Md3GenericComponent>
          </div>
        </div>
      </div>
    `
  })
}

export const ContainerTypes: Story = {
  name: 'Container Types',
  render: () => ({
    components: { Md3GenericComponent },
    template: `
      <div style="display: flex; flex-direction: column; gap: 2rem;">
        <!-- Card Container -->
        <div>
          <h3>Card Container</h3>
          <Md3GenericComponent 
            md3Type="container" 
            role="neutral" 
            theme="light" 
            variant="surface" 
            padding="lg" 
            rounded 
            border
          >
            <h4 style="margin: 0 0 1rem 0;">Card Title</h4>
            <p style="margin: 0 0 1rem 0;">This is a card container using surface variant.</p>
            <Md3GenericComponent role="primary" theme="light" variant="main" padding="sm" rounded>
              Action Button
            </Md3GenericComponent>
          </Md3GenericComponent>
        </div>
        
        <!-- Dialog Container -->
        <div>
          <h3>Dialog Container</h3>
          <Md3GenericComponent 
            md3Type="container" 
            role="neutral" 
            theme="light" 
            variant="surface-variant" 
            padding="lg" 
            rounded 
            border
          >
            <h4 style="margin: 0 0 1rem 0;">Dialog Title</h4>
            <p style="margin: 0 0 1rem 0;">This is a dialog container using surface-variant.</p>
            <div style="display: flex; gap: 1rem; justify-content: flex-end;">
              <Md3GenericComponent role="neutral" theme="light" variant="surface" padding="sm" rounded border>
                Cancel
              </Md3GenericComponent>
              <Md3GenericComponent role="primary" theme="light" variant="main" padding="sm" rounded>
                Confirm
              </Md3GenericComponent>
            </div>
          </Md3GenericComponent>
        </div>
        
        <!-- Navigation Container -->
        <div>
          <h3>Navigation Container</h3>
          <Md3GenericComponent 
            md3Type="container" 
            role="neutral" 
            theme="light" 
            variant="surface" 
            padding="md" 
            rounded
          >
            <div style="display: flex; gap: 1rem;">
              <Md3GenericComponent role="neutral" theme="light" variant="on-surface" padding="sm" rounded>
                Home
              </Md3GenericComponent>
              <Md3GenericComponent role="primary" theme="light" variant="main" padding="sm" rounded>
                Active
              </Md3GenericComponent>
              <Md3GenericComponent role="neutral" theme="light" variant="on-surface" padding="sm" rounded>
                Settings
              </Md3GenericComponent>
            </div>
          </Md3GenericComponent>
        </div>
        
        <!-- Content Container -->
        <div>
          <h3>Content Container</h3>
          <Md3GenericComponent 
            md3Type="container" 
            role="neutral" 
            theme="light" 
            variant="surface-variant" 
            padding="lg" 
            rounded
          >
            <h4 style="margin: 0 0 1rem 0;">Content Area</h4>
            <p style="margin: 0 0 1rem 0;">This is a content area using surface-variant for subtle differentiation.</p>
            <Md3GenericComponent 
              md3Type="container" 
              role="neutral" 
              theme="light" 
              variant="surface" 
              padding="md" 
              rounded
            >
              Nested content container
            </Md3GenericComponent>
          </Md3GenericComponent>
        </div>
      </div>
    `
  })
}

export const SurfaceHierarchy: Story = {
  name: 'Surface Hierarchy',
  render: () => ({
    components: { Md3GenericComponent },
    template: `
      <div style="display: flex; flex-direction: column; gap: 2rem;">
        <!-- Background Surface -->
        <div>
          <h3>Surface Hierarchy Example</h3>
          <Md3GenericComponent 
            md3Type="container" 
            role="neutral" 
            theme="light" 
            variant="surface" 
            padding="lg" 
            rounded
            style="min-height: 200px;"
          >
            <h4 style="margin: 0 0 1rem 0;">Background Surface</h4>
            <p style="margin: 0 0 1rem 0;">This is the base surface layer.</p>
            
            <!-- Elevated Surface -->
            <Md3GenericComponent 
              md3Type="container" 
              role="neutral" 
              theme="light" 
              variant="surface-variant" 
              padding="md" 
              rounded 
              border
              style="margin: 1rem 0;"
            >
              <h5 style="margin: 0 0 0.5rem 0;">Elevated Surface</h5>
              <p style="margin: 0 0 0.5rem 0;">This surface is elevated above the background.</p>
              
              <!-- Floating Surface -->
              <Md3GenericComponent 
                md3Type="container" 
                role="primary" 
                theme="light" 
                variant="container" 
                padding="sm" 
                rounded
                style="display: inline-block; margin-top: 0.5rem;"
              >
                Floating Action
              </Md3GenericComponent>
            </Md3GenericComponent>
          </Md3GenericComponent>
        </div>
        
        <!-- Dark Theme Hierarchy -->
        <div>
          <h3>Dark Theme Hierarchy</h3>
          <Md3GenericComponent 
            md3Type="container" 
            role="neutral" 
            theme="dark" 
            variant="surface" 
            padding="lg" 
            rounded
            style="min-height: 200px;"
          >
            <h4 style="margin: 0 0 1rem 0;">Dark Background Surface</h4>
            <p style="margin: 0 0 1rem 0;">Dark theme base surface layer.</p>
            
            <Md3GenericComponent 
              md3Type="container" 
              role="neutral" 
              theme="dark" 
              variant="surface-variant" 
              padding="md" 
              rounded 
              border
              style="margin: 1rem 0;"
            >
              <h5 style="margin: 0 0 0.5rem 0;">Dark Elevated Surface</h5>
              <p style="margin: 0 0 0.5rem 0;">Elevated surface in dark theme.</p>
              
              <Md3GenericComponent 
                md3Type="container" 
                role="secondary" 
                theme="dark" 
                variant="container" 
                padding="sm" 
                rounded
                style="display: inline-block; margin-top: 0.5rem;"
              >
                Dark Floating Action
              </Md3GenericComponent>
            </Md3GenericComponent>
          </Md3GenericComponent>
        </div>
      </div>
    `
  })
}

export const DarkThemeSurfaces: Story = {
  name: 'Dark Theme Surfaces',
  render: () => ({
    components: { Md3GenericComponent },
    template: `
      <div style="display: flex; flex-direction: column; gap: 2rem;">
        <!-- Dark Surface Variants -->
        <div>
          <h3>Dark Surface Variants</h3>
          <div style="display: flex; flex-wrap: wrap; gap: 1rem; align-items: center;">
            <Md3GenericComponent role="neutral" theme="dark" variant="surface" padding="md" rounded>
              Dark Surface
            </Md3GenericComponent>
            <Md3GenericComponent role="neutral" theme="dark" variant="surface-variant" padding="md" rounded>
              Dark Surface-Variant
            </Md3GenericComponent>
            <Md3GenericComponent role="neutral" theme="dark" variant="on-surface" padding="md" rounded>
              Dark On-Surface
            </Md3GenericComponent>
            <Md3GenericComponent role="neutral" theme="dark" variant="on-surface-variant" padding="md" rounded>
              Dark On-Surface-Variant
            </Md3GenericComponent>
          </div>
        </div>
        
        <!-- Dark Container Examples -->
        <div>
          <h3>Dark Container Examples</h3>
          <div style="display: flex; flex-wrap: wrap; gap: 1rem;">
            <Md3GenericComponent 
              md3Type="container" 
              role="neutral" 
              theme="dark" 
              variant="surface" 
              padding="lg" 
              rounded 
              border
            >
              <h4 style="margin: 0 0 1rem 0;">Dark Card</h4>
              <p style="margin: 0;">Dark theme card container.</p>
            </Md3GenericComponent>
            
            <Md3GenericComponent 
              md3Type="container" 
              role="primary" 
              theme="dark" 
              variant="container" 
              padding="lg" 
              rounded 
              border
            >
              <h4 style="margin: 0 0 1rem 0;">Primary Container</h4>
              <p style="margin: 0;">Primary container in dark theme.</p>
            </Md3GenericComponent>
            
            <Md3GenericComponent 
              md3Type="container" 
              role="secondary" 
              theme="dark" 
              variant="container" 
              padding="lg" 
              rounded 
              border
            >
              <h4 style="margin: 0 0 1rem 0;">Secondary Container</h4>
              <p style="margin: 0;">Secondary container in dark theme.</p>
            </Md3GenericComponent>
          </div>
        </div>
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

