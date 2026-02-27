<template>
  <div class="design-system-page questionnaire-container">
    <div>

      <!-- Header -->
      <header class="sticky-header">
        <div class="container mx-auto px-4">
          <div class="text-left">
            <h1 class="questionnaire-title">Dogfy Diet Design System</h1>
            <p class="questionnaire-subtitle">
              A comprehensive design system extracted from dogfydiet.com with colors, typography, and component utilities.
            </p>
          </div>
        </div>
      </header>

      <!-- Color Roles -->
      <section class="mb-16">
        <h2 class="step-title">Color Roles</h2>
        
        <div class="pantone-sections-container">
          <!-- Primary Colors -->
          <div id="primary-section" class="pantone-section">
            <div class="pantone-tab primary">Primary</div>
            <div class="pantone-content">
              <div class="pantone-header">
                <h3 class="pantone-title">Primary Colors</h3>
                <p class="pantone-subtitle">Core brand identity colors</p>
              </div>
              <div class="pantone-swatches-container">
                <div class="flex flex-nowrap gap-4 overflow-x-auto pb-4">
                  <div class="pantone-swatch-page">
                    <div class="pantone-color-display" style="background-color: #00B67A;"></div>
                    <div class="pantone-color-info">
                      <p class="pantone-color-name" style="color: #1a1a1a;">Primary Green</p>
                      <p class="pantone-color-code" style="color: #1a1a1a;">#00B67A</p>
                      <p class="pantone-color-formula" style="color: #1a1a1a;">$primary-green</p>
                    </div>
                  </div>
                  
                  <div class="pantone-swatch-page">
                    <div class="pantone-color-display" style="background-color: #1BB57C;"></div>
                    <div class="pantone-color-info">
                      <p class="pantone-color-name" style="color: #1a1a1a;">Primary Dark</p>
                      <p class="pantone-color-code" style="color: #1a1a1a;">#1BB57C</p>
                      <p class="pantone-color-formula" style="color: #1a1a1a;">$primary-green-dark</p>
                    </div>
                  </div>
                  
                  <div class="pantone-swatch-page">
                    <div class="pantone-color-display" style="background-color: #0aaa46;"></div>
                    <div class="pantone-color-info">
                      <p class="pantone-color-name" style="color: #1a1a1a;">Primary Light</p>
                      <p class="pantone-color-code" style="color: #1a1a1a;">#0aaa46</p>
                      <p class="pantone-color-formula" style="color: #1a1a1a;">$primary-green-light</p>
                    </div>
                  </div>
                  
                  <div class="pantone-swatch-page">
                    <div class="pantone-color-display" style="background-color: #005128;"></div>
                    <div class="pantone-color-info">
                      <p class="pantone-color-name" style="color: #1a1a1a;">Primary Darkest</p>
                      <p class="pantone-color-code" style="color: #1a1a1a;">#005128</p>
                      <p class="pantone-color-formula" style="color: #1a1a1a;">$primary-green-darkest</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Accent Colors -->
          <div id="accent-section" class="pantone-section">
            <div class="pantone-tab accent">Accent</div>
            <div class="pantone-content">
              <div class="pantone-header">
                <h3 class="pantone-title">Accent Colors</h3>
                <p class="pantone-subtitle">Supporting brand colors</p>
              </div>
              <div class="pantone-swatches-container">
                <div class="flex flex-nowrap gap-4 overflow-x-auto pb-4">
                  <div class="pantone-swatch-page">
                    <div class="pantone-color-display" style="background-color: #EF6948;"></div>
                    <div class="pantone-color-info">
                      <p class="pantone-color-name" style="color: #1a1a1a;">Accent Orange</p>
                      <p class="pantone-color-code" style="color: #1a1a1a;">#EF6948</p>
                      <p class="pantone-color-formula" style="color: #1a1a1a;">$accent-orange</p>
                    </div>
                  </div>
                  
                  <div class="pantone-swatch-page">
                    <div class="pantone-color-display" style="background-color: #ed6948;"></div>
                    <div class="pantone-color-info">
                      <p class="pantone-color-name" style="color: #1a1a1a;">Accent Dark</p>
                      <p class="pantone-color-code" style="color: #1a1a1a;">#ed6948</p>
                      <p class="pantone-color-formula" style="color: #1a1a1a;">$accent-orange-dark</p>
                    </div>
                  </div>
                  
                  <div class="pantone-swatch-page">
                    <div class="pantone-color-display" style="background-color: #ffca4e;"></div>
                    <div class="pantone-color-info">
                      <p class="pantone-color-name" style="color: #1a1a1a;">Accent Yellow</p>
                      <p class="pantone-color-code" style="color: #1a1a1a;">#ffca4e</p>
                      <p class="pantone-color-formula" style="color: #1a1a1a;">$accent-yellow</p>
                    </div>
                  </div>
                  
                  <div class="pantone-swatch-page">
                    <div class="pantone-color-display" style="background-color: #ffc800;"></div>
                    <div class="pantone-color-info">
                      <p class="pantone-color-name" style="color: #1a1a1a;">Warning</p>
                      <p class="pantone-color-code" style="color: #1a1a1a;">#ffc800</p>
                      <p class="pantone-color-formula" style="color: #1a1a1a;">$warning</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Neutral Colors -->
          <div id="neutral-section" class="pantone-section">
            <div class="pantone-tab neutral">Neutral</div>
            <div class="pantone-content">
              <div class="pantone-header">
                <h3 class="pantone-title">Neutral Colors</h3>
                <p class="pantone-subtitle">Typography and UI elements</p>
              </div>
              <div class="pantone-swatches-container">
                <div class="flex flex-nowrap gap-4 overflow-x-auto pb-4">
                  <div class="pantone-swatch-page">
                    <div class="pantone-color-display" style="background-color: #1a1a1a;"></div>
                    <div class="pantone-color-info">
                      <p class="pantone-color-name" style="color: #1a1a1a;">Darkest</p>
                      <p class="pantone-color-code" style="color: #1a1a1a;">#1a1a1a</p>
                      <p class="pantone-color-formula" style="color: #1a1a1a;">$neutral-darkest</p>
                    </div>
                  </div>
                  
                  <div class="pantone-swatch-page">
                    <div class="pantone-color-display" style="background-color: #3d3d3d;"></div>
                    <div class="pantone-color-info">
                      <p class="pantone-color-name" style="color: #1a1a1a;">Dark</p>
                      <p class="pantone-color-code" style="color: #1a1a1a;">#3d3d3d</p>
                      <p class="pantone-color-formula" style="color: #1a1a1a;">$neutral-dark</p>
                    </div>
                  </div>
                  
                  <div class="pantone-swatch-page">
                    <div class="pantone-color-display" style="background-color: #767676;"></div>
                    <div class="pantone-color-info">
                      <p class="pantone-color-name" style="color: #1a1a1a;">Medium</p>
                      <p class="pantone-color-code" style="color: #1a1a1a;">#767676</p>
                      <p class="pantone-color-formula" style="color: #1a1a1a;">$neutral-medium</p>
                    </div>
                  </div>
                  
                  <div class="pantone-swatch-page">
                    <div class="pantone-color-display" style="background-color: #e8e8e8;"></div>
                    <div class="pantone-color-info">
                      <p class="pantone-color-name" style="color: #1a1a1a;">Light</p>
                      <p class="pantone-color-code" style="color: #1a1a1a;">#e8e8e8</p>
                      <p class="pantone-color-formula" style="color: #1a1a1a;">$neutral-light</p>
                    </div>
                  </div>
                  
                  <div class="pantone-swatch-page">
                    <div class="pantone-color-display" style="background-color: #d6d6d6;"></div>
                    <div class="pantone-color-info">
                      <p class="pantone-color-name" style="color: #1a1a1a;">Lighter</p>
                      <p class="pantone-color-code" style="color: #1a1a1a;">#d6d6d6</p>
                      <p class="pantone-color-formula" style="color: #1a1a1a;">$neutral-lighter</p>
                    </div>
                  </div>
                  
                  <div class="pantone-swatch-page">
                    <div class="pantone-color-display" style="background-color: #f7f7f7;"></div>
                    <div class="pantone-color-info">
                      <p class="pantone-color-name" style="color: #1a1a1a;">Lightest</p>
                      <p class="pantone-color-code" style="color: #1a1a1a;">#f7f7f7</p>
                      <p class="pantone-color-formula" style="color: #1a1a1a;">$neutral-lightest</p>
                    </div>
                  </div>
                  
                  <div class="pantone-swatch-page">
                    <div class="pantone-color-display" style="background-color: #ffffff; border-bottom: 2px solid #d0d0d0;"></div>
                    <div class="pantone-color-info">
                      <p class="pantone-color-name" style="color: #1a1a1a;">White</p>
                      <p class="pantone-color-code" style="color: #1a1a1a;">#ffffff</p>
                      <p class="pantone-color-formula" style="color: #1a1a1a;">$neutral-white</p>
                    </div>
                  </div>
                  
                  <div class="pantone-swatch-page">
                    <div class="pantone-color-display" style="background-color: #f9f8f7;"></div>
                    <div class="pantone-color-info">
                      <p class="pantone-color-name" style="color: #1a1a1a;">Off White</p>
                      <p class="pantone-color-code" style="color: #1a1a1a;">#f9f8f7</p>
                      <p class="pantone-color-formula" style="color: #1a1a1a;">$neutral-off-white</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Semantic Colors -->
          <div id="semantic-section" class="pantone-section">
            <div class="pantone-tab semantic">Semantic</div>
            <div class="pantone-content">
              <div class="pantone-header">
                <h3 class="pantone-title">Semantic Colors</h3>
                <p class="pantone-subtitle">UI states and feedback</p>
              </div>
              <div class="pantone-swatches-container">
                <div class="flex flex-nowrap gap-4 overflow-x-auto pb-4">
                  <div class="pantone-swatch-page">
                    <div class="pantone-color-display" style="background-color: #0aaa46;"></div>
                    <div class="pantone-color-info">
                      <p class="pantone-color-name" style="color: #1a1a1a;">Success</p>
                      <p class="pantone-color-code" style="color: #1a1a1a;">#0aaa46</p>
                      <p class="pantone-color-formula" style="color: #1a1a1a;">$success</p>
                    </div>
                  </div>
                  
                  <div class="pantone-swatch-page">
                    <div class="pantone-color-display" style="background-color: #005128;"></div>
                    <div class="pantone-color-info">
                      <p class="pantone-color-name" style="color: #1a1a1a;">Success Dark</p>
                      <p class="pantone-color-code" style="color: #1a1a1a;">#005128</p>
                      <p class="pantone-color-formula" style="color: #1a1a1a;">$success-dark</p>
                    </div>
                  </div>
                  
                  <div class="pantone-swatch-page">
                    <div class="pantone-color-display" style="background-color: #d80003;"></div>
                    <div class="pantone-color-info">
                      <p class="pantone-color-name" style="color: #1a1a1a;">Error</p>
                      <p class="pantone-color-code" style="color: #1a1a1a;">#d80003</p>
                      <p class="pantone-color-formula" style="color: #1a1a1a;">$error</p>
                    </div>
                  </div>
                  
                  <div class="pantone-swatch-page">
                    <div class="pantone-color-display" style="background-color: #fef1f1;"></div>
                    <div class="pantone-color-info">
                      <p class="pantone-color-name" style="color: #1a1a1a;">Error Light</p>
                      <p class="pantone-color-code" style="color: #1a1a1a;">#fef1f1</p>
                      <p class="pantone-color-formula" style="color: #1a1a1a;">$error-light</p>
                    </div>
                  </div>
                  
                  <div class="pantone-swatch-page">
                    <div class="pantone-color-display" style="background-color: #1976D2;"></div>
                    <div class="pantone-color-info">
                      <p class="pantone-color-name" style="color: #1a1a1a;">Info</p>
                      <p class="pantone-color-code" style="color: #1a1a1a;">#1976D2</p>
                      <p class="pantone-color-formula" style="color: #1a1a1a;">$info</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Color Usage Examples -->
      <section class="mb-16">
        <h2 class="step-title">Color Usage Examples</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="p-6 bg-primary rounded-lg">
            <h4 class="text-xl font-semibold text-white mb-2">Primary Action</h4>
            <p class="text-white opacity-90 mb-4">Use primary green for main CTAs and important actions.</p>
            <button class="button small bg-white text-primary">Primary Button</button>
          </div>
          
          <div class="p-6 bg-accent rounded-lg">
            <h4 class="text-xl font-semibold text-white mb-2">Secondary Action</h4>
            <p class="text-white opacity-90 mb-4">Use accent orange for secondary actions and highlights.</p>
            <button class="button small bg-white text-accent">Accent Button</button>
          </div>
          
          <div class="p-6 bg-lightest rounded-lg border-2 border-light">
            <h4 class="text-xl font-semibold text-dark mb-2">Card Background</h4>
            <p class="text-medium mb-4">Use lightest background for cards and sections.</p>
            <button class="button small outline">Outline Button</button>
          </div>
          
          <div class="p-6 bg-darkest rounded-lg">
            <h4 class="text-xl font-semibold text-white mb-2">Dark Section</h4>
            <p class="text-white opacity-90 mb-4">Use darkest background for hero sections or emphasis.</p>
            <button class="button small bg-white text-darkest">Dark Button</button>
          </div>
        </div>
      </section>

      <!-- Typography -->
      <section class="mb-16">
        <h2 class="step-title">Typography</h2>
        
        <div class="space-y-6">
          <div>
            <h1 class="text-6xl font-black font-primary text-primary">Display Heading</h1>
            <p class="text-sm text-medium mt-2">Display XL - 74px - PP Agrandir - Black</p>
          </div>
          
          <div>
            <h1 class="text-5xl font-bold font-primary text-darkest">Main Heading</h1>
            <p class="text-sm text-medium mt-2">H1 - 47.31px - PP Agrandir - Bold</p>
          </div>
          
          <div>
            <h2 class="text-3xl font-semibold font-primary text-darkest">Section Heading</h2>
            <p class="text-sm text-medium mt-2">H2 - 31.53px - PP Agrandir - Semibold</p>
          </div>
          
          <div>
            <h3 class="text-2xl font-medium font-primary text-darkest">Subsection Heading</h3>
            <p class="text-sm text-medium mt-2">H3 - 24px - PP Agrandir - Medium</p>
          </div>
          
          <div>
            <p class="text-lg font-normal font-secondary text-dark">Body text large for important content that needs more emphasis.</p>
            <p class="text-sm text-medium mt-2">Body Large - 18px - Manrope - Regular</p>
          </div>
          
          <div>
            <p class="text-base font-normal font-secondary text-dark">Regular body text for general content and descriptions. This is the most common text size used throughout the application.</p>
            <p class="text-sm text-medium mt-2">Body - 16px - Manrope - Regular</p>
          </div>
          
          <div>
            <p class="text-sm font-normal font-secondary text-dark">Small text for captions, labels, and secondary information.</p>
            <p class="text-sm text-medium mt-2">Body Small - 14px - Manrope - Regular</p>
          </div>
          
          <div>
            <p class="text-xs font-normal font-secondary text-dark">Caption text for metadata, timestamps, and minimal UI elements.</p>
            <p class="text-sm text-medium mt-2">Caption - 12px - Manrope - Regular</p>
          </div>
        </div>
      </section>

      <!-- Buttons -->
      <section class="mb-16">
        <h2 class="step-title">Buttons</h2>
        
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
        <h2 class="step-title">Form Elements</h2>
        
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
        <h2 class="step-title">Cards</h2>
        
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
        <h2 class="step-title">Utility Classes</h2>
        
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
        <h2 class="step-title">Responsive Design</h2>
        
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
        <h2 class="step-title">Animations</h2>
        
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
        <h2 class="step-title">Questionnaire Components</h2>
        
        <div class="questionnaire-card">
          <!-- Progress Bar -->
          <div class="progress-bar mb-8">
            <div class="progress-fill" style="width: 65%;"></div>
          </div>
          
          <!-- Header Section -->
          <header class="sticky top-0 z-50 bg-white border-b border-gray-200" style="min-height: 40vh; padding: 5vh 0px;">
            <div class="container mx-auto px-4">
              <div class="flex items-center justify-between">
                <div>
                  <h1 class="text-4xl font-bold text-gray-900 mb-2">Design System</h1>
                  <p class="text-lg text-gray-600">Complete color palette and design tokens for Dogfy Diet</p>
                </div>
                <div class="flex items-center space-x-4">
                  <div class="text-right">
                    <p class="text-sm text-gray-500">Last Updated</p>
                    <p class="text-sm font-medium text-gray-900">November 2024</p>
                  </div>
                </div>
              </div>
            </div>
          </header>
          
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
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

// Page title and meta
useHead({
  title: 'Design System - Dogfy Diet',
  meta: [
    { name: 'description', content: 'Complete design system showcase with colors, typography, and components' }
  ]
})

// Reactive state for active section
const activeSection = ref('primary')

// Pantone sections data
const pantoneSections = [
  { id: 'primary', name: 'Primary', color: '#00B67A', gradient: 'linear-gradient(135deg, #00B67A, #1BB57C)' },
  { id: 'accent', name: 'Accent', color: '#EF6948', gradient: 'linear-gradient(135deg, #EF6948, #ffca4e)' },
  { id: 'neutral', name: 'Neutral', color: '#3d3d3d', gradient: 'linear-gradient(135deg, #3d3d3d, #767676)' },
  { id: 'semantic', name: 'Semantic', color: '#0aaa46', gradient: 'linear-gradient(135deg, #0aaa46, #1976D2)' }
]

// Initialize animations and scroll navigation
onMounted(() => {
  nextTick(() => {
    // Initialize scroll navigation
    initScrollNavigation()
    
    // Initialize scroll-triggered animations
    initScrollAnimations()
    
    // Initialize letter hiding animation
    initLetterHidingAnimation()
  })
})

// Scroll navigation functionality
const initScrollNavigation = () => {
  // Create horizontal scroll navigation
  const sections = document.querySelectorAll('.pantone-section')
  
  sections.forEach((section, index) => {
    ScrollTrigger.create({
      trigger: section,
      start: 'top 50%',
      end: 'bottom 50%',
      onEnter: () => {
        activeSection.value = section.id.replace('-section', '')
        updateActiveNav()
      },
      onEnterBack: () => {
        activeSection.value = section.id.replace('-section', '')
        updateActiveNav()
      }
    })
  })
}

// Update active navigation indicator
const updateActiveNav = () => {
  const navItems = document.querySelectorAll('.pantone-nav-item')
  navItems.forEach(item => {
    if (item.dataset.section === activeSection.value) {
      gsap.to(item, {
        scale: 1.1,
        backgroundColor: item.dataset.color,
        duration: 0.3,
        ease: 'power2.out'
      })
    } else {
      gsap.to(item, {
        scale: 1,
        backgroundColor: '#f8f8f8',
        duration: 0.3,
        ease: 'power2.out'
      })
    }
  })
}

// Scroll to section
const scrollToSection = (sectionId) => {
  const section = document.getElementById(`${sectionId}-section`)
  if (section) {
    gsap.to(window, {
      duration: 1,
      scrollTo: {
        y: section,
        offsetY: 100
      },
      ease: 'power2.inOut'
    })
  }
}

// Initialize scroll-triggered animations
const initScrollAnimations = () => {
  // No scroll animations - clean implementation
  // Sections are now static with only hover effects
}

// Letter hiding animation for questionnaire title
const initLetterHidingAnimation = () => {
  const titleElement = document.querySelector('.questionnaire-title')
  if (!titleElement) return
  
  // Get the original text
  const originalText = titleElement.textContent
  const words = originalText.split(' ')
  
  // Create spans for each letter while preserving word structure
  let htmlContent = ''
  words.forEach((word, wordIndex) => {
    htmlContent += '<span class="word-wrapper">'
    for (let i = 0; i < word.length; i++) {
      const isFirstLetter = i === 0
      const isLastLetter = i === word.length - 1
      htmlContent += `<span class="letter ${isFirstLetter ? 'first-letter' : ''} ${isLastLetter ? 'last-letter' : ''}" data-word="${wordIndex}" data-position="${i}">${word[i]}</span>`
    }
    htmlContent += '</span>'
    if (wordIndex < words.length - 1) {
      htmlContent += '<span class="space"> </span>'
    }
  })
  
  titleElement.innerHTML = htmlContent
  
  // Get all letters except first letters of each word
  const lettersToHide = titleElement.querySelectorAll('.letter:not(.first-letter)')
  
  // Get all spaces
  const spaces = titleElement.querySelectorAll('.space')
  
  // Store original widths and ensure proper alignment
  lettersToHide.forEach(letter => {
    // Force a reflow to get accurate width
    letter.style.display = 'inline-block'
    letter.style.whiteSpace = 'nowrap'
    letter.style.verticalAlign = 'baseline'
    letter.style.lineHeight = 'inherit'
    
    // Get the computed width
    const computedStyle = window.getComputedStyle(letter)
    const width = parseFloat(computedStyle.width)
    
    // Store original width
    letter.dataset.originalWidth = `${width}px`
    letter.style.width = `${width}px`
    letter.style.overflow = 'hidden'
    
    // Ensure no extra margins that could cause alignment issues
    letter.style.margin = '0'
    letter.style.padding = '0'
    letter.style.border = 'none'
    letter.style.outline = 'none'
  })
  
  // Also ensure first letters have proper alignment
  const firstLetters = titleElement.querySelectorAll('.letter.first-letter')
  firstLetters.forEach(letter => {
    letter.style.display = 'inline-block'
    letter.style.verticalAlign = 'baseline'
    letter.style.lineHeight = 'inherit'
    letter.style.margin = '0'
    letter.style.padding = '0'
    letter.style.border = 'none'
    letter.style.outline = 'none'
  })
  
  // Store original widths for spaces
  spaces.forEach(space => {
    space.style.display = 'inline-block'
    space.style.whiteSpace = 'pre'
    const computedStyle = window.getComputedStyle(space)
    const width = parseFloat(computedStyle.width)
    space.dataset.originalWidth = `${width}px`
    space.style.width = `${width}px`
    space.style.overflow = 'hidden'
    space.style.margin = '0'
    space.style.padding = '0'
  })
  
  // Create timeline for the animation
  const tl = gsap.timeline({ repeat: -1, repeatDelay: 2 })
  
  // Group letters by word for word-by-word animation
  const wordsToAnimate = {}
  lettersToHide.forEach(letter => {
    const wordIndex = letter.dataset.word
    if (!wordsToAnimate[wordIndex]) {
      wordsToAnimate[wordIndex] = []
    }
    wordsToAnimate[wordIndex].push(letter)
  })
  
  // First tween: Animate each word from last letter to first (excluding first letter)
  Object.keys(wordsToAnimate).reverse().forEach((wordIndex, wordAnimIndex) => {
    const letters = wordsToAnimate[wordIndex]
    
    // Animate letters from last to first (but keep first letter)
    letters.reverse().forEach((letter, letterIndex) => {
      tl.to(letter, {
        width: 0,
        opacity: 0,
        paddingLeft: 0,
        paddingRight: 0,
        marginLeft: 0,
        marginRight: 0,
        duration: 0.3,
        ease: 'power2.inOut'
      }, `word${wordAnimIndex}+=${letterIndex * 0.1}`)
    })
  })
  
  // Second tween: Remove all spaces at the same time after letters are done
  tl.to(spaces, {
    width: 0,
    opacity: 0,
    paddingLeft: 0,
    paddingRight: 0,
    marginLeft: 0,
    marginRight: 0,
    duration: 0.4,
    ease: 'bounce.out'
  }, '+=0.2')
  
  // At the same time as spaces, fade out subtitle
  tl.to('.questionnaire-subtitle', {
    opacity: 0,
    duration: 0.4,
    ease: 'power2.inOut'
  }, '-=0.6') 
  // After all animations, animate header padding and h1 size
  tl.to('.sticky-header', {
    paddingTop: '3vh',
    paddingBottom: '3vh',
    duration: 0.8,
    ease: 'power2.inOut'
  }, '+=0.5')
  
  tl.to('.questionnaire-title', {
    fontSize: '2rem',
    duration: 0.8,
    ease: 'power2.inOut'
  }, '-=0.8')
}
</script>

<style lang="scss" scoped>
// Import design system mixins and variables
@use '~/assets/styles/_variables' as *;
@use '~/assets/styles/_mixins' as *;

// Page-specific styles using design system tokens
.design-system-page {
  // All styling is handled by utility classes and component-specific classes
  // defined in main.scss file
  margin: 0;
  padding: 0;
  min-height: 100vh;
}

// Questionnaire title animation styles
.questionnaire-title {
  text-align: left;
  line-height: 1.2;
  
  .word-wrapper {
    display: inline-block;
    vertical-align: baseline;
  }
  
  .letter {
    display: inline-block;
    transform-origin: center center;
    transition: transform 0.3s ease;
    white-space: nowrap;
    vertical-align: baseline;
    text-align: left;
    line-height: inherit;
  }
  
  .space {
    display: inline-block;
    white-space: pre;
    vertical-align: baseline;
    line-height: inherit;
  }
}

// Sticky header styles
.sticky-header {
  position: sticky;
  top: 0;
  z-index: 50;
  background-color: white;
  border-bottom: 1px solid #e5e7eb;
  min-height: 85vh;
  padding: 30vh 0px;
}

// Pantone-style individual color pages - authentic proportions (4x taller)
.pantone-swatch-page {
  background: white;
  border: 1px solid #d0d0d0;
  border-radius: 2px;
  overflow: hidden;
  transition: all 0.2s ease;
  margin-bottom: 16px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  width: 160px;
  height: 640px; /* 4x taller than 160px */
  position: relative;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  }
}

.pantone-color-display {
  height: 85%; /* Larger color area for tall format */
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: rgba(0, 0, 0, 0.15);
  }
}

.pantone-color-info {
  height: 15%; /* Smaller info section for tall format */
  background: white;
  padding: 12px 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-top: 1px solid #e5e5e5;
}

.pantone-color-name {
  font-size: 10px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.2px;
  margin: 0 0 3px 0;
  line-height: 1.1;
  font-family: 'Helvetica Neue', Arial, sans-serif;
}

.pantone-color-code {
  font-size: 9px;
  font-family: 'Helvetica Neue', Arial, sans-serif;
  font-weight: 500;
  margin: 0 0 2px 0;
  opacity: 0.8;
}

.pantone-color-formula {
  font-size: 8px;
  font-family: 'Helvetica Neue', Arial, sans-serif;
  margin: 0;
  opacity: 0.6;
  font-style: italic;
}

// Horizontal scroll navigation
.pantone-nav {
  position: sticky;
  top: 0;
  z-index: 100;
  background: white;
  border-bottom: 1px solid #e0e0e0;
  backdrop-filter: blur(10px);
  padding: 16px 0;
  margin-bottom: 32px;
}

.pantone-nav-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
}

.pantone-nav-items {
  display: flex;
  gap: 12px;
  margin-bottom: 12px;
  overflow-x: auto;
  padding-bottom: 8px;
  
  &::-webkit-scrollbar {
    height: 6px;
  }
  
  &::-webkit-scrollbar-track {
    background: #f0f0f0;
    border-radius: 3px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: #d0d0d0;
    border-radius: 3px;
    
    &:hover {
      background: #b0b0b0;
    }
  }
}

.pantone-nav-item {
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 120px;
  height: 48px;
  background: #f8f8f8;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  padding: 8px 16px;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0));
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    border-color: #d0d0d0;
    
    &::before {
      opacity: 1;
    }
  }
  
  &.active {
    transform: scale(1.05);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
    border-color: transparent;
  }
}

.pantone-nav-text {
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: #1a1a1a;
  font-family: 'Helvetica Neue', Arial, sans-serif;
  position: relative;
  z-index: 1;
}

.pantone-nav-progress {
  height: 4px;
  background: #e0e0e0;
  border-radius: 2px;
  overflow: hidden;
}

.pantone-nav-progress-bar {
  height: 100%;
  background: linear-gradient(90deg, #00B67A, #EF6948, #3d3d3d, #0aaa46);
  border-radius: 2px;
  transition: width 0.5s ease;
}

// Pantone-style tabs
.pantone-sections-container {
  display: flex;
  flex-wrap: wrap;
  gap: 0; // Remove gap for full width
  margin-bottom: 0; // Remove margin for full height
}

.pantone-section {
  position: relative;
  background: #f8f8f8;
  border-radius: 0; // Remove border radius for full screen
  overflow: hidden;
  border: 1px solid #e0e0e0;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.pantone-tab {
  position: absolute;
  top: 0;
  right: 0;
  width: 100px;
  height: 35px;
  background: #1a1a1a;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  clip-path: polygon(15% 0, 100% 0, 100% 100%, 0% 100%);
  z-index: 10;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
}

.pantone-tab.primary {
  background: linear-gradient(135deg, #00B67A, #1BB57C);
}

.pantone-tab.accent {
  background: linear-gradient(135deg, #EF6948, #ffca4e);
}

.pantone-tab.neutral {
  background: linear-gradient(135deg, #3d3d3d, #767676);
}

.pantone-tab.semantic {
  background: linear-gradient(135deg, #0aaa46, #1976D2);
}

.pantone-content {
  flex: 1; // Take remaining height
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.pantone-header {
  margin-bottom: 20px;
  border-bottom: 1px solid #d0d0d0;
  padding-bottom: 12px;
  flex-shrink: 0; // Don't shrink
}

.pantone-title {
  font-size: 16px;
  font-weight: 700;
  color: #1a1a1a;
  margin: 0 0 2px 0;
  text-transform: uppercase;
  letter-spacing: 0.8px;
  font-family: 'Helvetica Neue', Arial, sans-serif;
}

.pantone-subtitle {
  font-size: 10px;
  color: #666;
  margin: 0;
  text-transform: uppercase;
  letter-spacing: 0.3px;
  font-family: 'Helvetica Neue', Arial, sans-serif;
}

// Swatch container that fills remaining space
.pantone-swatches-container {
  flex: 1; // Take remaining space
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.color-swatch {
  @include card-base(false, true);
  overflow: hidden;
  transition: all $transition-normal $ease-out;
  margin-bottom: $spacing-4;
  max-width: 300px;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: $shadow-lg;
  }
}

.color-swatch-box {
  width: 100%;
  height: 80px;
  position: relative;
  border: 2px solid #e8e8e8;
  box-sizing: border-box;
  
  // Add subtle gradient overlay for depth
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, transparent 50%);
    pointer-events: none;
  }
}

.color-swatch-info {
  padding: $spacing-3;
  text-align: center;
  background: #ffffff;
  border: 1px solid #e8e8e8;
  border-top: none;
  
  p {
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    
    &:first-child {
      margin-bottom: $spacing-1;
      font-weight: 600;
    }
    
    &:nth-child(2) {
      margin-bottom: $spacing-1;
      font-family: 'Courier New', monospace;
      font-size: 12px;
    }
    
    &:nth-child(3) {
      font-family: 'Courier New', monospace;
      font-size: 11px;
      opacity: 0.8;
    }
  }
}

// Responsive adjustments for color swatches
@include respond-down-to(mobile) {
  .color-swatch-box {
    height: 60px;
  }
  
  .color-swatch-info {
    padding: $spacing-2;
    
    p {
      &:first-child {
        font-size: 14px;
      }
      
      &:nth-child(2) {
        font-size: 11px;
      }
      
      &:nth-child(3) {
        font-size: 10px;
      }
    }
  }
}
</style>
