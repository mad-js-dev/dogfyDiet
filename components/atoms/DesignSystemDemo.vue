<template>
  <div class="design-system-demo p-8">
    <div class="container">
      <!-- Header -->
      <header class="text-center mb-12">
        <h1 class="text-5xl font-black text-primary mb-4">
          Dogfy Diet Design System
        </h1>
        <p class="text-xl text-medium font-light max-w-2xl mx-auto">
          A comprehensive design system extracted from dogfydiet.com with colors, typography, and component utilities.
        </p>
      </header>

      <!-- Color Palette -->
      <section class="mb-16">
        <h2 class="text-3xl font-semibold text-darkest mb-8">Color Palette</h2>
        
        <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
          <!-- Primary Colors -->
          <div class="text-center">
            <div class="w-full h-20 bg-primary rounded-lg mb-2 shadow-md"></div>
            <p class="text-sm font-medium text-dark">Primary</p>
            <p class="text-xs text-medium">#00B67A</p>
          </div>
          
          <div class="text-center">
            <div class="w-full h-20 bg-primary-dark rounded-lg mb-2 shadow-md"></div>
            <p class="text-sm font-medium text-dark">Primary Dark</p>
            <p class="text-xs text-medium">#1BB57C</p>
          </div>
          
          <div class="text-center">
            <div class="w-full h-20 bg-accent rounded-lg mb-2 shadow-md"></div>
            <p class="text-sm font-medium text-dark">Accent</p>
            <p class="text-xs text-medium">#EF6948</p>
          </div>
          
          <div class="text-center">
            <div class="w-full h-20 bg-accent-light rounded-lg mb-2 shadow-md"></div>
            <p class="text-sm font-medium text-dark">Accent Light</p>
            <p class="text-xs text-medium">#ffca4e</p>
          </div>
          
          <!-- Neutral Colors -->
          <div class="text-center">
            <div class="w-full h-20 bg-darkest rounded-lg mb-2 shadow-md"></div>
            <p class="text-sm font-medium text-white">Darkest</p>
            <p class="text-xs text-light">#1a1a1a</p>
          </div>
          
          <div class="text-center">
            <div class="w-full h-20 bg-lightest rounded-lg mb-2 shadow-md border"></div>
            <p class="text-sm font-medium text-dark">Lightest</p>
            <p class="text-xs text-medium">#f7f7f7</p>
          </div>
        </div>
      </section>

      <!-- Typography -->
      <section class="mb-16">
        <h2 class="text-3xl font-semibold text-darkest mb-8">Typography</h2>
        
        <div class="space-y-6">
          <div>
            <h1 class="text-6xl font-black font-primary">Display Heading</h1>
            <p class="text-sm text-medium mt-2">Display XL - 74px - PP Agrandir - Black</p>
          </div>
          
          <div>
            <h1 class="text-5xl font-bold font-primary">Main Heading</h1>
            <p class="text-sm text-medium mt-2">H1 - 47.31px - PP Agrandir - Bold</p>
          </div>
          
          <div>
            <h2 class="text-3xl font-semibold font-primary">Section Heading</h2>
            <p class="text-sm text-medium mt-2">H2 - 31.53px - PP Agrandir - Semibold</p>
          </div>
          
          <div>
            <h3 class="text-2xl font-medium font-primary">Subsection Heading</h3>
            <p class="text-sm text-medium mt-2">H3 - 24px - PP Agrandir - Medium</p>
          </div>
          
          <div>
            <p class="text-lg font-normal font-secondary">Body text large for important content that needs more emphasis.</p>
            <p class="text-sm text-medium mt-2">Body Large - 18px - Manrope - Regular</p>
          </div>
          
          <div>
            <p class="text-base font-normal font-secondary">Regular body text for general content and descriptions. This is the most common text size used throughout the application.</p>
            <p class="text-sm text-medium mt-2">Body - 16px - Manrope - Regular</p>
          </div>
          
          <div>
            <p class="text-sm font-normal font-secondary">Small text for captions, labels, and secondary information.</p>
            <p class="text-sm text-medium mt-2">Body Small - 14px - Manrope - Regular</p>
          </div>
          
          <div>
            <p class="text-xs font-normal font-secondary">Caption text for metadata, timestamps, and minimal UI elements.</p>
            <p class="text-sm text-medium mt-2">Caption - 12px - Manrope - Regular</p>
          </div>
        </div>
      </section>

      <!-- Buttons -->
      <section class="mb-16">
        <h2 class="text-3xl font-semibold text-darkest mb-8">Buttons</h2>
        
        <div class="space-y-6">
          <!-- Primary Buttons -->
          <div class="flex flex-wrap gap-4">
            <button class="button">Primary Button</button>
            <button class="button secondary">Secondary Button</button>
            <button class="button outline">Outline Button</button>
            <button class="button ghost">Ghost Button</button>
          </div>
          
          <!-- Button Sizes -->
          <div class="flex flex-wrap items-center gap-4">
            <button class="button small">Small Button</button>
            <button class="button">Medium Button</button>
            <button class="button large">Large Button</button>
          </div>
        </div>
      </section>

      <!-- Form Elements -->
      <section class="mb-16">
        <h2 class="text-3xl font-semibold text-darkest mb-8">Form Elements</h2>
        
        <div class="max-w-md space-y-6">
          <div>
            <label class="form-label">Text Input</label>
            <input 
              type="text" 
              class="w-full p-3 border-2 border-light rounded-lg focus:border-primary focus:outline-none transition-colors"
              placeholder="Enter your text..."
            />
          </div>
          
          <div>
            <label class="form-label">Select Input</label>
            <select class="w-full p-3 border-2 border-light rounded-lg focus:border-primary focus:outline-none transition-colors">
              <option>Choose an option</option>
              <option>Option 1</option>
              <option>Option 2</option>
            </select>
          </div>
          
          <div>
            <label class="form-label">Error State</label>
            <input 
              type="text" 
              class="w-full p-3 border-2 border-error rounded-lg focus:border-error focus:outline-none transition-colors"
              placeholder="This field has an error"
            />
            <p class="form-error">This field is required</p>
          </div>
          
          <div>
            <label class="form-label">Success State</label>
            <input 
              type="text" 
              class="w-full p-3 border-2 border-success rounded-lg focus:border-success focus:outline-none transition-colors"
              placeholder="This field is valid"
            />
            <p class="form-success">This field looks good!</p>
          </div>
        </div>
      </section>

      <!-- Cards -->
      <section class="mb-16">
        <h2 class="text-3xl font-semibold text-darkest mb-8">Cards</h2>
        
        <div class="grid md:grid-cols-3 gap-6">
          <div class="card">
            <h3 class="text-xl font-semibold text-primary mb-3">Standard Card</h3>
            <p class="text-medium mb-4">This is a standard card with elevation and default styling.</p>
            <button class="button small">Learn More</button>
          </div>
          
          <div class="card bordered">
            <h3 class="text-xl font-semibold text-accent mb-3">Bordered Card</h3>
            <p class="text-medium mb-4">This card has a border instead of elevation for a different visual style.</p>
            <button class="button small outline">Learn More</button>
          </div>
          
          <div class="card flat">
            <h3 class="text-xl font-semibold text-dark mb-3">Flat Card</h3>
            <p class="text-medium mb-4">This card has minimal styling with just a subtle shadow.</p>
            <button class="button small ghost">Learn More</button>
          </div>
        </div>
      </section>

      <!-- Utility Classes -->
      <section class="mb-16">
        <h2 class="text-3xl font-semibold text-darkest mb-8">Utility Classes</h2>
        
        <div class="space-y-8">
          <!-- Spacing -->
          <div>
            <h3 class="text-xl font-semibold text-dark mb-4">Spacing</h3>
            <div class="flex flex-wrap gap-4">
              <div class="p-4 bg-light rounded">p-4</div>
              <div class="p-6 bg-light rounded">p-6</div>
              <div class="p-8 bg-light rounded">p-8</div>
              <div class="px-6 py-4 bg-light rounded">px-6 py-4</div>
            </div>
          </div>
          
          <!-- Border Radius -->
          <div>
            <h3 class="text-xl font-semibold text-dark mb-4">Border Radius</h3>
            <div class="flex flex-wrap gap-4 items-center">
              <div class="w-16 h-16 bg-primary rounded-none"></div>
              <div class="w-16 h-16 bg-primary rounded-sm"></div>
              <div class="w-16 h-16 bg-primary rounded"></div>
              <div class="w-16 h-16 bg-primary rounded-lg"></div>
              <div class="w-16 h-16 bg-primary rounded-xl"></div>
              <div class="w-16 h-16 bg-primary rounded-full"></div>
            </div>
          </div>
          
          <!-- Shadows -->
          <div>
            <h3 class="text-xl font-semibold text-dark mb-4">Shadows</h3>
            <div class="flex flex-wrap gap-4">
              <div class="w-24 h-24 bg-white rounded-lg shadow-sm"></div>
              <div class="w-24 h-24 bg-white rounded-lg shadow"></div>
              <div class="w-24 h-24 bg-white rounded-lg shadow-lg"></div>
              <div class="w-24 h-24 bg-white rounded-lg shadow-xl"></div>
              <div class="w-24 h-24 bg-white rounded-lg shadow-primary"></div>
            </div>
          </div>
        </div>
      </section>

      <!-- Responsive Design -->
      <section class="mb-16">
        <h2 class="text-3xl font-semibold text-darkest mb-8">Responsive Design</h2>
        
        <div class="space-y-6">
          <div class="p-6 bg-lightest rounded-lg">
            <h3 class="text-responsive-sm font-semibold text-primary mb-2">Responsive Typography</h3>
            <p class="text-responsive-md text-medium">This text scales responsively across different screen sizes.</p>
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div class="p-6 bg-primary text-white rounded-lg">
              <h4 class="font-semibold mb-2">Mobile First</h4>
              <p class="text-sm opacity-90">1 column on mobile</p>
            </div>
            <div class="p-6 bg-accent text-white rounded-lg">
              <h4 class="font-semibold mb-2">Tablet</h4>
              <p class="text-sm opacity-90">2 columns on tablet</p>
            </div>
            <div class="p-6 bg-primary-dark text-white rounded-lg">
              <h4 class="font-semibold mb-2">Desktop</h4>
              <p class="text-sm opacity-90">3 columns on desktop</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Animation Examples -->
      <section class="mb-16">
        <h2 class="text-3xl font-semibold text-darkest mb-8">Animations</h2>
        
        <div class="grid md:grid-cols-3 gap-6">
          <div class="text-center">
            <div class="w-full h-32 bg-primary rounded-lg mb-4 hover-lift cursor-pointer flex items-center justify-center">
              <span class="text-white font-medium">Hover Lift</span>
            </div>
            <p class="text-sm text-medium">Hover over this card</p>
          </div>
          
          <div class="text-center">
            <div class="w-full h-32 bg-accent rounded-lg mb-4 hover-scale cursor-pointer flex items-center justify-center">
              <span class="text-white font-medium">Hover Scale</span>
            </div>
            <p class="text-sm text-medium">Hover over this card</p>
          </div>
          
          <div class="text-center">
            <div class="w-full h-32 bg-primary-dark rounded-lg mb-4 fade-in flex items-center justify-center">
              <span class="text-white font-medium">Fade In</span>
            </div>
            <p class="text-sm text-medium">Animated on load</p>
          </div>
        </div>
      </section>

      <!-- Questionnaire Components -->
      <section class="mb-16">
        <h2 class="text-3xl font-semibold text-darkest mb-8">Questionnaire Components</h2>
        
        <div class="questionnaire-card">
          <!-- Progress Bar -->
          <div class="progress-bar mb-8">
            <div class="progress-fill" style="width: 65%;"></div>
          </div>
          
          <!-- Step Title -->
          <h3 class="step-title">Pet Information</h3>
          <p class="step-description">Tell us about your pets to create personalized nutrition plans.</p>
          
          <!-- Pet Sections -->
          <div class="space-y-4 mb-6">
            <div class="pet-section active">
              <h4 class="pet-name">Max</h4>
              <p class="text-medium text-sm">Golden Retriever • 3 years old</p>
            </div>
            
            <div class="pet-section">
              <h4 class="pet-name">Luna</h4>
              <p class="text-medium text-sm">Siamese Cat • 2 years old</p>
            </div>
          </div>
          
          <!-- Shared Mode Toggle -->
          <button class="shared-mode-toggle">
            Use same answers for both pets
          </button>
          
          <!-- Navigation -->
          <div class="step-navigation">
            <button class="button ghost">Previous</button>
            <button class="button">Next Step</button>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
// Design system demonstration component
// This component showcases all the design tokens and utilities available
</script>

<style lang="scss" scoped>
@use "sass:map";
@use "../../../assets/styles/_variables" as *;
// This component uses the design system variables and mixins
// All styles are applied through utility classes and component-specific classes
// defined in the main.scss file

.design-system-demo {
  background: linear-gradient(135deg, $neutral-lightest 0%, $neutral-white 100%);
  min-height: 100vh;
}

// Custom animations for demonstration
@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.7;
  }
}

.fade-in {
  animation: fadeIn 1s ease-out;
}

// Component-specific styles that use design tokens
.questionnaire-demo {
  border: 2px solid map.get($brand-colors, 'primary');
  background: rgba(map.get($brand-colors, 'primary'), 0.05);
}
</style>
