<template>
  <div class="design-system-page questionnaire-container">
    <div>

      <!-- Header -->
      <header class="header">
        <div class="container mx-auto px-4">
          <div class="text-left">
            <h1 class="questionnaire-title">Dogfy Diet Design System</h1>
            <p class="questionnaire-subtitle">
              A comprehensive design system extracted from dogfydiet.com with colors, typography, and component utilities.
            </p>
          </div>
        </div>
      </header>

      <!-- Color Palette -->
      <section class="mb-16 px-6 py-8">
        <h2 class="step-title">Color Palette</h2>
        
        <div class="pantone-sections-container">
          
          <!-- Brand Colors -->
          <div id="brand-section" class="pantone-section">
            <div class="pantone-tab brand">Brand</div>
            <div class="pantone-content">
              <div class="pantone-header">
                <h3 class="pantone-title">Brand Colors</h3>
                <p class="pantone-subtitle">Core brand identity and supporting colors</p>
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
                    <div class="pantone-color-display" style="background-color: #EF6948;"></div>
                    <div class="pantone-color-info">
                      <p class="pantone-color-name" style="color: #1a1a1a;">Accent Orange</p>
                      <p class="pantone-color-code" style="color: #1a1a1a;">#EF6948</p>
                      <p class="pantone-color-formula" style="color: #1a1a1a;">$accent-orange</p>
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
                    <div class="pantone-color-display" style="background-color: #d80003;"></div>
                    <div class="pantone-color-info">
                      <p class="pantone-color-name" style="color: #1a1a1a;">Error</p>
                      <p class="pantone-color-code" style="color: #1a1a1a;">#d80003</p>
                      <p class="pantone-color-formula" style="color: #1a1a1a;">$error</p>
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

      <!-- Material Design 3 Color Roles -->
      <section class="mb-16 px-6 py-8">
        <h2 class="step-title">Material Design 3 Color Roles</h2>
        <p class="step-description">Semantic color mappings following M3 guidelines for consistent UI design.</p>
        
        <!-- General Concepts -->
        <div class="mb-8 p-6 bg-lightest rounded-lg border border-light">
          <h3 class="text-xl font-semibold text-dark mb-4">General Concepts</h3>
          <p class="text-medium mb-4">Here are helpful-to-know words you'll see in the names of color roles:</p>
          <div class="space-y-3 text-medium">
            <div class="flex items-start gap-3">
              <span class="font-semibold text-primary min-w-24">Surface</span>
              <span>A role used for backgrounds and large, low-emphasis areas of the screen.</span>
            </div>
            <div class="flex items-start gap-3">
              <span class="font-semibold text-primary min-w-24">Primary, Secondary, Tertiary</span>
              <span>Accent color roles used to emphasize or de-emphasize foreground elements.</span>
            </div>
            <div class="flex items-start gap-3">
              <span class="font-semibold text-primary min-w-24">Container</span>
              <span>Roles used as a fill color for foreground elements like buttons. They should not be used for text or icons.</span>
            </div>
            <div class="flex items-start gap-3">
              <span class="font-semibold text-primary min-w-24">On</span>
              <span>Roles starting with this term indicate a color for text or icons on top of its paired parent color. For example, on primary is used for text and icons against the primary fill color.</span>
            </div>
            <div class="flex items-start gap-3">
              <span class="font-semibold text-primary min-w-24">Variant</span>
              <span>Roles ending with this term offer a lower emphasis alternative to its non-variant pair. For example, outline variant is a less emphasized version of the outline color.</span>
            </div>
          </div>
        </div>
        
        <div class="md3-color-roles-grid">
          <!-- Brand & Surface Colors Grid -->
          <div class="md3-column-headers">
            <div class="md3-column-header"></div>
            <div class="md3-column-header">Surface</div>
            <div class="md3-column-header">Primary</div>
            <div class="md3-column-header">Secondary</div>
            <div class="md3-column-header">Tertiary</div>
          </div>

          <!-- Color Rows -->
          <div class="md3-color-rows">
            <!-- Base Colors Row -->
            <div class="md3-row-label">Base</div>
            <div class="md3-color-cell">
              <div class="md3-color-unified" style="background-color: #ffffff; border: 1px solid #e0e0e0;">
                <div class="md3-color-content">
                  <div class="md3-color-label" style="color: #1a1a1a;">Surface</div>
                  <div class="md3-color-details" style="color: #1a1a1a;">
                    <div class="md3-color-name">Surface</div>
                    <div class="md3-color-hex">#ffffff</div>
                    <div class="md3-color-var">$md3-surface</div>
                  </div>
                </div>
              </div>
            </div>
            <div class="md3-color-cell">
              <div class="md3-color-unified" style="background-color: #00B67A;">
                <div class="md3-color-content">
                  <div class="md3-color-label">Primary</div>
                  <div class="md3-color-details">
                    <div class="md3-color-name">Primary</div>
                    <div class="md3-color-hex">#00B67A</div>
                    <div class="md3-color-var">$md3-primary</div>
                  </div>
                </div>
              </div>
            </div>
            <div class="md3-color-cell">
              <div class="md3-color-unified" style="background-color: #EF6948;">
                <div class="md3-color-content">
                  <div class="md3-color-label">Secondary</div>
                  <div class="md3-color-details">
                    <div class="md3-color-name">Secondary</div>
                    <div class="md3-color-hex">#EF6948</div>
                    <div class="md3-color-var">$md3-secondary</div>
                  </div>
                </div>
              </div>
            </div>
            <div class="md3-color-cell">
              <div class="md3-color-unified" style="background-color: #ffca4e;">
                <div class="md3-color-content">
                  <div class="md3-color-label" style="color: #1a1a1a;">Tertiary</div>
                  <div class="md3-color-details" style="color: #1a1a1a;">
                    <div class="md3-color-name">Tertiary</div>
                    <div class="md3-color-hex">#ffca4e</div>
                    <div class="md3-color-var">$md3-tertiary</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- On Colors Row -->
          <div class="md3-color-rows">
            <div class="md3-row-label">On</div>
            <div class="md3-color-cell">
              <div class="md3-color-unified" style="background-color: #1a1a1a;">
                <div class="md3-color-content">
                  <div class="md3-color-label">On Surface</div>
                  <div class="md3-color-details">
                    <div class="md3-color-name">On Surface</div>
                    <div class="md3-color-hex">#1a1a1a</div>
                    <div class="md3-color-var">$md3-on-surface</div>
                  </div>
                </div>
              </div>
            </div>
            <div class="md3-color-cell">
              <div class="md3-color-unified" style="background-color: #ffffff; border: 1px solid #e0e0e0;">
                <div class="md3-color-content">
                  <div class="md3-color-label" style="color: #1a1a1a;">On Primary</div>
                  <div class="md3-color-details" style="color: #1a1a1a;">
                    <div class="md3-color-name">On Primary</div>
                    <div class="md3-color-hex">#ffffff</div>
                    <div class="md3-color-var">$md3-on-primary</div>
                  </div>
                </div>
              </div>
            </div>
            <div class="md3-color-cell">
              <div class="md3-color-unified" style="background-color: #ffffff; border: 1px solid #e0e0e0;">
                <div class="md3-color-content">
                  <div class="md3-color-label" style="color: #1a1a1a;">On Secondary</div>
                  <div class="md3-color-details" style="color: #1a1a1a;">
                    <div class="md3-color-name">On Secondary</div>
                    <div class="md3-color-hex">#ffffff</div>
                    <div class="md3-color-var">$md3-on-secondary</div>
                  </div>
                </div>
              </div>
            </div>
            <div class="md3-color-cell">
              <div class="md3-color-unified" style="background-color: #1a1a1a;">
                <div class="md3-color-content">
                  <div class="md3-color-label">On Tertiary</div>
                  <div class="md3-color-details">
                    <div class="md3-color-name">On Tertiary</div>
                    <div class="md3-color-hex">#1a1a1a</div>
                    <div class="md3-color-var">$md3-on-tertiary</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Container Colors Row -->
          <div class="md3-color-rows">
            <div class="md3-row-label">Container</div>
            <div class="md3-color-cell">
              <div class="md3-color-unified" style="background-color: #f7f7f7; border: 1px solid #e0e0e0;">
                <div class="md3-color-content">
                  <div class="md3-color-label" style="color: #1a1a1a;">Surface Variant</div>
                  <div class="md3-color-details" style="color: #1a1a1a;">
                    <div class="md3-color-name">Surface Variant</div>
                    <div class="md3-color-hex">#f7f7f7</div>
                    <div class="md3-color-var">$md3-surface-variant</div>
                  </div>
                </div>
              </div>
            </div>
            <div class="md3-color-cell">
              <div class="md3-color-unified" style="background-color: #B3E5CC;">
                <div class="md3-color-content">
                  <div class="md3-color-label">Primary Container</div>
                  <div class="md3-color-details">
                    <div class="md3-color-name">Primary Container</div>
                    <div class="md3-color-hex">#B3E5CC</div>
                    <div class="md3-color-var">$md3-primary-container</div>
                  </div>
                </div>
              </div>
            </div>
            <div class="md3-color-cell">
              <div class="md3-color-unified" style="background-color: #FFD4C4;">
                <div class="md3-color-content">
                  <div class="md3-color-label">Secondary Container</div>
                  <div class="md3-color-details">
                    <div class="md3-color-name">Secondary Container</div>
                    <div class="md3-color-hex">#FFD4C4</div>
                    <div class="md3-color-var">$md3-secondary-container</div>
                  </div>
                </div>
              </div>
            </div>
            <div class="md3-color-cell">
              <div class="md3-color-unified" style="background-color: #fff5d6; border: 1px solid #e0e0e0;">
                <div class="md3-color-content">
                  <div class="md3-color-label" style="color: #1a1a1a;">Tertiary Container</div>
                  <div class="md3-color-details" style="color: #1a1a1a;">
                    <div class="md3-color-name">Tertiary Container</div>
                    <div class="md3-color-hex">#fff5d6</div>
                    <div class="md3-color-var">$md3-tertiary-container</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- On Container Colors Row -->
          <div class="md3-color-rows">
            <div class="md3-row-label">On Container</div>
            <div class="md3-color-cell">
              <div class="md3-color-unified" style="background-color: #767676;">
                <div class="md3-color-content">
                  <div class="md3-color-label">On Surface Variant</div>
                  <div class="md3-color-details">
                    <div class="md3-color-name">On Surface Variant</div>
                    <div class="md3-color-hex">#767676</div>
                    <div class="md3-color-var">$md3-on-surface-variant</div>
                  </div>
                </div>
              </div>
            </div>
            <div class="md3-color-cell">
              <div class="md3-color-unified" style="background-color: #004D29;">
                <div class="md3-color-content">
                  <div class="md3-color-label">On Primary Container</div>
                  <div class="md3-color-details">
                    <div class="md3-color-name">On Primary Container</div>
                    <div class="md3-color-hex">#004D29</div>
                    <div class="md3-color-var">$md3-on-primary-container</div>
                  </div>
                </div>
              </div>
            </div>
            <div class="md3-color-cell">
              <div class="md3-color-unified" style="background-color: #5D2B1E;">
                <div class="md3-color-content">
                  <div class="md3-color-label">On Secondary Container</div>
                  <div class="md3-color-details">
                    <div class="md3-color-name">On Secondary Container</div>
                    <div class="md3-color-hex">#5D2B1E</div>
                    <div class="md3-color-var">$md3-on-secondary-container</div>
                  </div>
                </div>
              </div>
            </div>
            <div class="md3-color-cell">
              <div class="md3-color-unified" style="background-color: #cc8a00;">
                <div class="md3-color-content">
                  <div class="md3-color-label">On Tertiary Container</div>
                  <div class="md3-color-details">
                    <div class="md3-color-name">On Tertiary Container</div>
                    <div class="md3-color-hex">#cc8a00</div>
                    <div class="md3-color-var">$md3-on-tertiary-container</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Semantic Colors Grid -->
        <div class="md3-color-roles-grid">
          <!-- Column Headers -->
          <div class="md3-column-headers">
            <div class="md3-column-header"></div>
            <div class="md3-column-header">Error</div>
            <div class="md3-column-header">Success</div>
            <div class="md3-column-header">Warning</div>
            <div class="md3-column-header">Info</div>
          </div>

          <!-- Color Rows -->
          <div class="md3-color-rows">
            <!-- Base Colors Row -->
            <div class="md3-row-label">Base</div>
            <div class="md3-color-cell">
              <div class="md3-color-unified" style="background-color: #d80003;">
                <div class="md3-color-content">
                  <div class="md3-color-label">Error</div>
                  <div class="md3-color-details">
                    <div class="md3-color-name">Error</div>
                    <div class="md3-color-hex">#d80003</div>
                    <div class="md3-color-var">$md3-error</div>
                  </div>
                </div>
              </div>
            </div>
            <div class="md3-color-cell">
              <div class="md3-color-unified" style="background-color: #0aaa46;">
                <div class="md3-color-content">
                  <div class="md3-color-label">Success</div>
                  <div class="md3-color-details">
                    <div class="md3-color-name">Success</div>
                    <div class="md3-color-hex">#0aaa46</div>
                    <div class="md3-color-var">$md3-success</div>
                  </div>
                </div>
              </div>
            </div>
            <div class="md3-color-cell">
              <div class="md3-color-unified" style="background-color: #ffc800;">
                <div class="md3-color-content">
                  <div class="md3-color-label" style="color: #1a1a1a;">Warning</div>
                  <div class="md3-color-details" style="color: #1a1a1a;">
                    <div class="md3-color-name">Warning</div>
                    <div class="md3-color-hex">#ffc800</div>
                    <div class="md3-color-var">$md3-warning</div>
                  </div>
                </div>
              </div>
            </div>
            <div class="md3-color-cell">
              <div class="md3-color-unified" style="background-color: #1976D2;">
                <div class="md3-color-content">
                  <div class="md3-color-label">Info</div>
                  <div class="md3-color-details">
                    <div class="md3-color-name">Info</div>
                    <div class="md3-color-hex">#1976D2</div>
                    <div class="md3-color-var">$md3-info</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- On Colors Row -->
          <div class="md3-color-rows">
            <div class="md3-row-label">On</div>
            <div class="md3-color-cell">
              <div class="md3-color-unified" style="background-color: #ffffff; border: 1px solid #e0e0e0;">
                <div class="md3-color-content">
                  <div class="md3-color-label" style="color: #1a1a1a;">On Error</div>
                  <div class="md3-color-details" style="color: #1a1a1a;">
                    <div class="md3-color-name">On Error</div>
                    <div class="md3-color-hex">#ffffff</div>
                    <div class="md3-color-var">$md3-on-error</div>
                  </div>
                </div>
              </div>
            </div>
            <div class="md3-color-cell">
              <div class="md3-color-unified" style="background-color: #ffffff; border: 1px solid #e0e0e0;">
                <div class="md3-color-content">
                  <div class="md3-color-label" style="color: #1a1a1a;">On Success</div>
                  <div class="md3-color-details" style="color: #1a1a1a;">
                    <div class="md3-color-name">On Success</div>
                    <div class="md3-color-hex">#ffffff</div>
                    <div class="md3-color-var">$md3-on-success</div>
                  </div>
                </div>
              </div>
            </div>
            <div class="md3-color-cell">
              <div class="md3-color-unified" style="background-color: #1a1a1a;">
                <div class="md3-color-content">
                  <div class="md3-color-label">On Warning</div>
                  <div class="md3-color-details">
                    <div class="md3-color-name">On Warning</div>
                    <div class="md3-color-hex">#1a1a1a</div>
                    <div class="md3-color-var">$md3-on-warning</div>
                  </div>
                </div>
              </div>
            </div>
            <div class="md3-color-cell">
              <div class="md3-color-unified" style="background-color: #ffffff; border: 1px solid #e0e0e0;">
                <div class="md3-color-content">
                  <div class="md3-color-label" style="color: #1a1a1a;">On Info</div>
                  <div class="md3-color-details" style="color: #1a1a1a;">
                    <div class="md3-color-name">On Info</div>
                    <div class="md3-color-hex">#ffffff</div>
                    <div class="md3-color-var">$md3-on-info</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Container Colors Row -->
          <div class="md3-color-rows">
            <div class="md3-row-label">Container</div>
            <div class="md3-color-cell">
              <div class="md3-color-unified" style="background-color: #fef1f1; border: 1px solid #e0e0e0;">
                <div class="md3-color-content">
                  <div class="md3-color-label" style="color: #1a1a1a;">Error Container</div>
                  <div class="md3-color-details" style="color: #1a1a1a;">
                    <div class="md3-color-name">Error Container</div>
                    <div class="md3-color-hex">#fef1f1</div>
                    <div class="md3-color-var">$md3-error-container</div>
                  </div>
                </div>
              </div>
            </div>
            <div class="md3-color-cell">
              <div class="md3-color-unified" style="background-color: #005128;">
                <div class="md3-color-content">
                  <div class="md3-color-label">Success Container</div>
                  <div class="md3-color-details">
                    <div class="md3-color-name">Success Container</div>
                    <div class="md3-color-hex">#005128</div>
                    <div class="md3-color-var">$md3-success-container</div>
                  </div>
                </div>
              </div>
            </div>
            <div class="md3-color-cell">
              <div class="md3-color-unified" style="background-color: #fff5d6; border: 1px solid #e0e0e0;">
                <div class="md3-color-content">
                  <div class="md3-color-label" style="color: #1a1a1a;">Warning Container</div>
                  <div class="md3-color-details" style="color: #1a1a1a;">
                    <div class="md3-color-name">Warning Container</div>
                    <div class="md3-color-hex">#fff5d6</div>
                    <div class="md3-color-var">$md3-warning-container</div>
                  </div>
                </div>
              </div>
            </div>
            <div class="md3-color-cell">
              <div class="md3-color-unified" style="background-color: #e3f2fd; border: 1px solid #e0e0e0;">
                <div class="md3-color-content">
                  <div class="md3-color-label" style="color: #1a1a1a;">Info Container</div>
                  <div class="md3-color-details" style="color: #1a1a1a;">
                    <div class="md3-color-name">Info Container</div>
                    <div class="md3-color-hex">#e3f2fd</div>
                    <div class="md3-color-var">$md3-info-container</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- On Container Colors Row -->
          <div class="md3-color-rows">
            <div class="md3-row-label">On Container</div>
            <div class="md3-color-cell">
              <div class="md3-color-unified" style="background-color: #93000A;">
                <div class="md3-color-content">
                  <div class="md3-color-label">On Error Container</div>
                  <div class="md3-color-details">
                    <div class="md3-color-name">On Error Container</div>
                    <div class="md3-color-hex">#93000A</div>
                    <div class="md3-color-var">$md3-on-error-container</div>
                  </div>
                </div>
              </div>
            </div>
            <div class="md3-color-cell">
              <div class="md3-color-unified" style="background-color: #ffffff; border: 1px solid #e0e0e0;">
                <div class="md3-color-content">
                  <div class="md3-color-label" style="color: #1a1a1a;">On Success Container</div>
                  <div class="md3-color-details" style="color: #1a1a1a;">
                    <div class="md3-color-name">On Success Container</div>
                    <div class="md3-color-hex">#ffffff</div>
                    <div class="md3-color-var">$md3-on-success-container</div>
                  </div>
                </div>
              </div>
            </div>
            <div class="md3-color-cell">
              <div class="md3-color-unified" style="background-color: #cc8a00;">
                <div class="md3-color-content">
                  <div class="md3-color-label">On Warning Container</div>
                  <div class="md3-color-details">
                    <div class="md3-color-name">On Warning Container</div>
                    <div class="md3-color-hex">#cc8a00</div>
                    <div class="md3-color-var">$md3-on-warning-container</div>
                  </div>
                </div>
              </div>
            </div>
            <div class="md3-color-cell">
              <div class="md3-color-unified" style="background-color: #0d47a1;">
                <div class="md3-color-content">
                  <div class="md3-color-label">On Info Container</div>
                  <div class="md3-color-details">
                    <div class="md3-color-name">On Info Container</div>
                    <div class="md3-color-hex">#0d47a1</div>
                    <div class="md3-color-var">$md3-on-info-container</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Color Usage Examples -->
      <section class="mb-16 px-6 py-8">
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
      <section class="mb-16 px-6 py-8">
        <h2 class="step-title">Typography</h2>
        <p class="step-description">Typography creates hierarchy and readability through font families, sizes, weights, and spacing. Based on Material Design 3 principles.</p>
        
        <!-- Typography Concepts -->
        <div class="mb-8 p-6 bg-lightest rounded-lg border border-light">
          <h3 class="text-xl font-semibold text-dark mb-4">Typography Concepts</h3>
          <p class="text-medium mb-4">Typography uses a systematic approach to create clear visual hierarchy and maintain consistency.</p>
          <div class="space-y-3 text-medium">
            <div class="flex items-start gap-3">
              <span class="font-semibold text-primary min-w-24">Font Families</span>
              <span>Primary font for branding, secondary for body text, mono for code.</span>
            </div>
            <div class="flex items-start gap-3">
              <span class="font-semibold text-primary min-w-24">Type Scale</span>
              <span>Material Design 3 uses 13 text styles with consistent naming and sizing.</span>
            </div>
            <div class="flex items-start gap-3">
              <span class="font-semibold text-primary min-w-24">Line Height</span>
              <span>Fixed line heights ensure consistent spacing and readability.</span>
            </div>
          </div>
        </div>

        <!-- Font Information -->
        <div class="mb-8">
          <h3 class="text-xl font-semibold text-dark mb-6">Font Information</h3>
          <p class="text-medium mb-4">Material Design 3 provides guidelines for font selection and implementation to ensure optimal readability and brand expression.</p>
          
          <!-- Font Selection Guidelines -->
          <div class="mb-6 p-6 bg-lightest rounded-lg border border-light">
            <h4 class="text-lg font-semibold text-primary mb-4">Font Selection Guidelines</h4>
            <p class="text-medium mb-4">Choose fonts that support your brand identity while maintaining excellent readability across all devices and contexts.</p>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h5 class="font-semibold text-dark mb-3">Brand Font (Primary)</h5>
                <ul class="space-y-2 text-medium">
                  <li class="flex items-start gap-2">
                    <span class="text-primary">•</span>
                    <span>Expressive and distinctive for brand identity</span>
                  </li>
                  <li class="flex items-start gap-2">
                    <span class="text-primary">•</span>
                    <span>Used for headlines and important text</span>
                  </li>
                  <li class="flex items-start gap-2">
                    <span class="text-primary">•</span>
                    <span>Should have multiple weights available</span>
                  </li>
                  <li class="flex items-start gap-2">
                    <span class="text-primary">•</span>
                    <span>Must be legible at large sizes</span>
                  </li>
                </ul>
              </div>
              <div>
                <h5 class="font-semibold text-dark mb-3">System Font (Secondary)</h5>
                <ul class="space-y-2 text-medium">
                  <li class="flex items-start gap-2">
                    <span class="text-primary">•</span>
                    <span>Highly readable for body text</span>
                  </li>
                  <li class="flex items-start gap-2">
                    <span class="text-primary">•</span>
                    <span>Optimized for screen reading</span>
                  </li>
                  <li class="flex items-start gap-2">
                    <span class="text-primary">•</span>
                    <span>Good performance and accessibility</span>
                  </li>
                  <li class="flex items-start gap-2">
                    <span class="text-primary">•</span>
                    <span>Consistent across platforms</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <!-- Font Characteristics -->
          <div class="mb-6 p-6 bg-lightest rounded-lg border border-light">
            <h4 class="text-lg font-semibold text-primary mb-4">Font Characteristics</h4>
            <p class="text-medium mb-4">Key characteristics to consider when selecting fonts for your design system.</p>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div class="p-4 bg-white rounded-lg border border-light">
                <h5 class="font-semibold text-dark mb-2">Readability</h5>
                <p class="text-sm text-medium mb-2">Clear letterforms and proper spacing for comfortable reading</p>
                <div class="text-xs text-medium">Essential for body text and long-form content</div>
              </div>
              <div class="p-4 bg-white rounded-lg border border-light">
                <h5 class="font-semibold text-dark mb-2">Personality</h5>
                <p class="text-sm text-medium mb-2">Font style should match your brand's tone and voice</p>
                <div class="text-xs text-medium">Expressive fonts for headlines, neutral for body</div>
              </div>
              <div class="p-4 bg-white rounded-lg border border-light">
                <h5 class="font-semibold text-dark mb-2">Versatility</h5>
                <p class="text-sm text-medium mb-2">Multiple weights and styles for design flexibility</p>
                <div class="text-xs text-medium">Regular, medium, bold weights minimum requirement</div>
              </div>
            </div>
          </div>

          <!-- Our Font Stack -->
          <div class="mb-6">
            <h4 class="text-lg font-semibold text-primary mb-4">Our Font Stack</h4>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <!-- Primary Font -->
              <div class="p-6 bg-white rounded-lg border border-light">
                <div class="mb-4">
                  <h5 class="text-5xl font-black font-primary text-primary mb-2" style="font-size: 48px; line-height: 56px;">PP Agrandir</h5>
                  <p class="text-base font-medium text-dark">Primary Brand Font</p>
                </div>
                <div class="space-y-4">
                  <div class="flex items-center gap-2">
                    <span class="text-sm font-semibold text-primary bg-lightest px-3 py-1 rounded">BRAND</span>
                    <span class="text-sm text-medium">Headlines & Branding</span>
                  </div>
                  <div class="space-y-2">
                    <div class="text-sm font-medium">Characteristics:</div>
                    <ul class="text-sm text-medium space-y-1">
                      <li>• Bold, expressive personality</li>
                      <li>• High contrast letterforms</li>
                      <li>• Multiple weights available</li>
                      <li>• Strong brand presence</li>
                    </ul>
                  </div>
                  <div class="text-sm font-mono text-medium bg-lightest p-3 rounded">
                    $font-family-primary
                  </div>
                </div>
              </div>

              <!-- Secondary Font -->
              <div class="p-6 bg-white rounded-lg border border-light">
                <div class="mb-4">
                  <h5 class="text-4xl font-normal font-secondary text-dark mb-2" style="font-size: 36px; line-height: 44px;">Manrope</h5>
                  <p class="text-base font-medium text-dark">Secondary Body Font</p>
                </div>
                <div class="space-y-4">
                  <div class="flex items-center gap-2">
                    <span class="text-sm font-semibold text-primary bg-lightest px-3 py-1 rounded">BODY</span>
                    <span class="text-sm text-medium">Content & UI Text</span>
                  </div>
                  <div class="space-y-2">
                    <div class="text-sm font-medium">Characteristics:</div>
                    <ul class="text-sm text-medium space-y-1">
                      <li>• Excellent readability</li>
                      <li>• Clean, modern design</li>
                      <li>• Optimized for screens</li>
                      <li>• Good performance</li>
                    </ul>
                  </div>
                  <div class="text-sm font-mono text-medium bg-lightest p-3 rounded">
                    $font-family-secondary
                  </div>
                </div>
              </div>

              <!-- Monospace Font -->
              <div class="p-6 bg-white rounded-lg border border-light">
                <div class="mb-4">
                  <h5 class="text-4xl font-normal font-mono text-dark mb-2" style="font-size: 36px; line-height: 44px;">SF Mono</h5>
                  <p class="text-base font-medium text-dark">Monospace Font</p>
                </div>
                <div class="space-y-4">
                  <div class="flex items-center gap-2">
                    <span class="text-sm font-semibold text-primary bg-lightest px-3 py-1 rounded">CODE</span>
                    <span class="text-sm text-medium">Code & Data</span>
                  </div>
                  <div class="space-y-2">
                    <div class="text-sm font-medium">Characteristics:</div>
                    <ul class="text-sm text-medium space-y-1">
                      <li>• Fixed character width</li>
                      <li>• Clear distinction</li>
                      <li>• Code readability</li>
                      <li>• System consistency</li>
                    </ul>
                  </div>
                  <div class="text-sm font-mono text-medium bg-lightest p-3 rounded">
                    $font-family-mono
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Font Loading Strategy -->
          <div class="mb-6 p-6 bg-lightest rounded-lg border border-light">
            <h4 class="text-lg font-semibold text-primary mb-4">Font Loading Strategy</h4>
            <p class="text-medium mb-4">Optimal font loading ensures fast page loads and smooth text rendering.</p>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h5 class="font-semibold text-dark mb-3">Performance Considerations</h5>
                <ul class="space-y-2 text-medium">
                  <li class="flex items-start gap-2">
                    <span class="text-primary">•</span>
                    <span>Preload critical fonts for above-the-fold content</span>
                  </li>
                  <li class="flex items-start gap-2">
                    <span class="text-primary">•</span>
                    <span>Use font-display: swap for better performance</span>
                  </li>
                  <li class="flex items-start gap-2">
                    <span class="text-primary">•</span>
                    <span>Provide fallback fonts for graceful degradation</span>
                  </li>
                  <li class="flex items-start gap-2">
                    <span class="text-primary">•</span>
                    <span>Subset fonts to reduce file size</span>
                  </li>
                </ul>
              </div>
              <div>
                <h5 class="font-semibold text-dark mb-3">Accessibility Requirements</h5>
                <ul class="space-y-2 text-medium">
                  <li class="flex items-start gap-2">
                    <span class="text-primary">•</span>
                    <span>Ensure fonts load within 3 seconds</span>
                  </li>
                  <li class="flex items-start gap-2">
                    <span class="text-primary">•</span>
                    <span>Use system fonts as fallbacks</span>
                  </li>
                  <li class="flex items-start gap-2">
                    <span class="text-primary">•</span>
                    <span>Avoid invisible text during loading</span>
                  </li>
                  <li class="flex items-start gap-2">
                    <span class="text-primary">•</span>
                    <span>Test with slow connections</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <!-- Material Design 3 Type Scale -->
        <div class="mb-8">
          <h3 class="text-xl font-semibold text-dark mb-6">Material Design 3 Type Scale</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <!-- Display Scale -->
            <div class="space-y-4">
              <h4 class="text-lg font-semibold text-primary mb-3">Display Scale</h4>
              <div class="space-y-3">
                <div class="p-4 bg-white rounded-lg border border-light">
                  <h5 class="text-5xl font-black font-primary text-primary" style="font-size: 57px; line-height: 64px;">Display Large</h5>
                  <p class="text-xs text-medium mt-2">57px - PP Agrandir - Black</p>
                  <p class="text-xs font-mono text-medium opacity-75">$typography-display-large</p>
                </div>
                <div class="p-4 bg-white rounded-lg border border-light">
                  <h5 class="text-4xl font-black font-primary text-dark" style="font-size: 45px; line-height: 52px;">Display Medium</h5>
                  <p class="text-xs text-medium mt-2">45px - PP Agrandir - Black</p>
                  <p class="text-xs font-mono text-medium opacity-75">$typography-display-medium</p>
                </div>
                <div class="p-4 bg-white rounded-lg border border-light">
                  <h5 class="text-3xl font-black font-primary text-dark" style="font-size: 36px; line-height: 44px;">Display Small</h5>
                  <p class="text-xs text-medium mt-2">36px - PP Agrandir - Black</p>
                  <p class="text-xs font-mono text-medium opacity-75">$typography-display-small</p>
                </div>
              </div>
            </div>

            <!-- Headline Scale -->
            <div class="space-y-4">
              <h4 class="text-lg font-semibold text-primary mb-3">Headline Scale</h4>
              <div class="space-y-3">
                <div class="p-4 bg-white rounded-lg border border-light">
                  <h5 class="text-3xl font-bold font-primary text-darkest" style="font-size: 32px; line-height: 40px;">Headline Large</h5>
                  <p class="text-xs text-medium mt-2">32px - PP Agrandir - Bold</p>
                  <p class="text-xs font-mono text-medium opacity-75">$typography-headline-large</p>
                </div>
                <div class="p-4 bg-white rounded-lg border border-light">
                  <h5 class="text-2xl font-semibold font-primary text-darkest" style="font-size: 28px; line-height: 36px;">Headline Medium</h5>
                  <p class="text-xs text-medium mt-2">28px - PP Agrandir - Semibold</p>
                  <p class="text-xs font-mono text-medium opacity-75">$typography-headline-medium</p>
                </div>
                <div class="p-4 bg-white rounded-lg border border-light">
                  <h5 class="text-xl font-medium font-primary text-darkest" style="font-size: 24px; line-height: 32px;">Headline Small</h5>
                  <p class="text-xs text-medium mt-2">24px - PP Agrandir - Medium</p>
                  <p class="text-xs font-mono text-medium opacity-75">$typography-headline-small</p>
                </div>
              </div>
            </div>

            <!-- Title Scale -->
            <div class="space-y-4">
              <h4 class="text-lg font-semibold text-primary mb-3">Title Scale</h4>
              <div class="space-y-3">
                <div class="p-4 bg-white rounded-lg border border-light">
                  <h5 class="text-xl font-medium font-primary text-darkest" style="font-size: 22px; line-height: 28px;">Title Large</h5>
                  <p class="text-xs text-medium mt-2">22px - PP Agrandir - Medium</p>
                  <p class="text-xs font-mono text-medium opacity-75">$typography-title-large</p>
                </div>
                <div class="p-4 bg-white rounded-lg border border-light">
                  <h5 class="text-base font-medium font-primary text-dark" style="font-size: 16px; line-height: 24px;">Title Medium</h5>
                  <p class="text-xs text-medium mt-2">16px - PP Agrandir - Medium</p>
                  <p class="text-xs font-mono text-medium opacity-75">$typography-title-medium</p>
                </div>
                <div class="p-4 bg-white rounded-lg border border-light">
                  <h5 class="text-sm font-medium font-primary text-dark" style="font-size: 14px; line-height: 20px;">Title Small</h5>
                  <p class="text-xs text-medium mt-2">14px - PP Agrandir - Medium</p>
                  <p class="text-xs font-mono text-medium opacity-75">$typography-title-small</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Typography Grid Display -->
        <div class="mb-8">
          <h3 class="text-xl font-semibold text-dark mb-6">Typography Grid Display</h3>
          <p class="text-medium mb-4">Complete visual reference of all Material Design 3 typography styles in a comprehensive grid layout.</p>
          
          <!-- Typography Visual Grid - Five Columns -->
          <div class="bg-white rounded-lg border border-light p-6">
            <div class="grid grid-cols-1 md:grid-cols-5 gap-6">
              <!-- Display Column -->
              <div class="space-y-4">
                <h4 class="text-sm font-semibold text-primary text-center mb-3">Display</h4>
                <div class="grid grid-cols-2 gap-3">
                  <!-- Display Large -->
                  <div class="text-center p-3 bg-lightest rounded-lg border border-light">
                    <div class="mb-2">
                      <div class="text-2xl font-black font-primary text-primary" style="font-size: 28px; line-height: 36px;">Aa</div>
                    </div>
                    <div class="space-y-1">
                      <div class="text-lg font-black font-primary text-primary" style="font-size: 18px; line-height: 24px;">Display Large</div>
                      <div class="text-xs text-medium">57px • Black</div>
                      <div class="text-xs font-mono text-primary bg-white px-1 py-0.5 rounded text-[10px]">$typography-display-large</div>
                    </div>
                  </div>
                  
                  <!-- Display Large (Emphasized) -->
                  <div class="text-center p-3 bg-lightest rounded-lg border border-light">
                    <div class="mb-2">
                      <div class="text-2xl font-black font-primary text-primary" style="font-size: 28px; line-height: 36px; letter-spacing: -0.01em;">Aa</div>
                    </div>
                    <div class="space-y-1">
                      <div class="text-lg font-black font-primary text-primary" style="font-size: 18px; line-height: 24px; letter-spacing: -0.01em;">Display Large</div>
                      <div class="text-xs text-medium">57px • Black</div>
                      <div class="text-xs font-mono text-primary bg-white px-1 py-0.5 rounded text-[10px]">$typography-display-large-em</div>
                    </div>
                  </div>
                  
                  <!-- Display Medium -->
                  <div class="text-center p-3 bg-lightest rounded-lg border border-light">
                    <div class="mb-2">
                      <div class="text-xl font-black font-primary text-dark" style="font-size: 22px; line-height: 28px;">Aa</div>
                    </div>
                    <div class="space-y-1">
                      <div class="text-base font-black font-primary text-dark" style="font-size: 16px; line-height: 20px;">Display Medium</div>
                      <div class="text-xs text-medium">45px • Black</div>
                      <div class="text-xs font-mono text-primary bg-white px-1 py-0.5 rounded text-[10px]">$typography-display-medium</div>
                    </div>
                  </div>
                  
                  <!-- Display Medium (Emphasized) -->
                  <div class="text-center p-3 bg-lightest rounded-lg border border-light">
                    <div class="mb-2">
                      <div class="text-xl font-black font-primary text-dark" style="font-size: 22px; line-height: 28px; letter-spacing: -0.01em;">Aa</div>
                    </div>
                    <div class="space-y-1">
                      <div class="text-base font-black font-primary text-dark" style="font-size: 16px; line-height: 20px; letter-spacing: -0.01em;">Display Medium</div>
                      <div class="text-xs text-medium">45px • Black</div>
                      <div class="text-xs font-mono text-primary bg-white px-1 py-0.5 rounded text-[10px]">$typography-display-medium-em</div>
                    </div>
                  </div>
                  
                  <!-- Display Small -->
                  <div class="text-center p-3 bg-lightest rounded-lg border border-light">
                    <div class="mb-2">
                      <div class="text-lg font-black font-primary text-dark" style="font-size: 18px; line-height: 24px;">Aa</div>
                    </div>
                    <div class="space-y-1">
                      <div class="text-sm font-black font-primary text-dark" style="font-size: 14px; line-height: 18px;">Display Small</div>
                      <div class="text-xs text-medium">36px • Black</div>
                      <div class="text-xs font-mono text-primary bg-white px-1 py-0.5 rounded text-[10px]">$typography-display-small</div>
                    </div>
                  </div>
                  
                  <!-- Display Small (Emphasized) -->
                  <div class="text-center p-3 bg-lightest rounded-lg border border-light">
                    <div class="mb-2">
                      <div class="text-lg font-black font-primary text-dark" style="font-size: 18px; line-height: 24px; letter-spacing: -0.01em;">Aa</div>
                    </div>
                    <div class="space-y-1">
                      <div class="text-sm font-black font-primary text-dark" style="font-size: 14px; line-height: 18px; letter-spacing: -0.01em;">Display Small</div>
                      <div class="text-xs text-medium">36px • Black</div>
                      <div class="text-xs font-mono text-primary bg-white px-1 py-0.5 rounded text-[10px]">$typography-display-small-em</div>
                    </div>
                  </div>
                </div>
              </div>
              
              <!-- Headline Column -->
              <div class="space-y-4">
                <h4 class="text-sm font-semibold text-primary text-center mb-3">Headline</h4>
                <div class="grid grid-cols-2 gap-3">
                  <!-- Headline Large -->
                  <div class="text-center p-3 bg-lightest rounded-lg border border-light">
                    <div class="mb-2">
                      <div class="text-lg font-bold font-primary text-darkest" style="font-size: 18px; line-height: 24px;">Aa</div>
                    </div>
                    <div class="space-y-1">
                      <div class="text-base font-bold font-primary text-darkest" style="font-size: 16px; line-height: 20px;">Headline Large</div>
                      <div class="text-xs text-medium">32px • Bold</div>
                      <div class="text-xs font-mono text-primary bg-white px-1 py-0.5 rounded text-[10px]">$typography-headline-large</div>
                    </div>
                  </div>
                  
                  <!-- Headline Large (Emphasized) -->
                  <div class="text-center p-3 bg-lightest rounded-lg border border-light">
                    <div class="mb-2">
                      <div class="text-lg font-bold font-primary text-darkest" style="font-size: 18px; line-height: 24px; letter-spacing: 0.1em;">Aa</div>
                    </div>
                    <div class="space-y-1">
                      <div class="text-base font-bold font-primary text-darkest" style="font-size: 16px; line-height: 20px; letter-spacing: 0.1em;">Headline Large</div>
                      <div class="text-xs text-medium">32px • Bold</div>
                      <div class="text-xs font-mono text-primary bg-white px-1 py-0.5 rounded text-[10px]">$typography-headline-large-em</div>
                    </div>
                  </div>
                  
                  <!-- Headline Medium -->
                  <div class="text-center p-3 bg-lightest rounded-lg border border-light">
                    <div class="mb-2">
                      <div class="text-base font-semibold font-primary text-darkest" style="font-size: 16px; line-height: 20px;">Aa</div>
                    </div>
                    <div class="space-y-1">
                      <div class="text-sm font-semibold font-primary text-darkest" style="font-size: 14px; line-height: 18px;">Headline Medium</div>
                      <div class="text-xs text-medium">28px • Semibold</div>
                      <div class="text-xs font-mono text-primary bg-white px-1 py-0.5 rounded text-[10px]">$typography-headline-medium</div>
                    </div>
                  </div>
                  
                  <!-- Headline Medium (Emphasized) -->
                  <div class="text-center p-3 bg-lightest rounded-lg border border-light">
                    <div class="mb-2">
                      <div class="text-base font-semibold font-primary text-darkest" style="font-size: 16px; line-height: 20px; letter-spacing: 0.1em;">Aa</div>
                    </div>
                    <div class="space-y-1">
                      <div class="text-sm font-semibold font-primary text-darkest" style="font-size: 14px; line-height: 18px; letter-spacing: 0.1em;">Headline Medium</div>
                      <div class="text-xs text-medium">28px • Semibold</div>
                      <div class="text-xs font-mono text-primary bg-white px-1 py-0.5 rounded text-[10px]">$typography-headline-medium-em</div>
                    </div>
                  </div>
                  
                  <!-- Headline Small -->
                  <div class="text-center p-3 bg-lightest rounded-lg border border-light">
                    <div class="mb-2">
                      <div class="text-sm font-medium font-primary text-darkest" style="font-size: 14px; line-height: 18px;">Aa</div>
                    </div>
                    <div class="space-y-1">
                      <div class="text-xs font-medium font-primary text-darkest" style="font-size: 12px; line-height: 16px;">Headline Small</div>
                      <div class="text-xs text-medium">24px • Medium</div>
                      <div class="text-xs font-mono text-primary bg-white px-1 py-0.5 rounded text-[10px]">$typography-headline-small</div>
                    </div>
                  </div>
                  
                  <!-- Headline Small (Emphasized) -->
                  <div class="text-center p-3 bg-lightest rounded-lg border border-light">
                    <div class="mb-2">
                      <div class="text-sm font-medium font-primary text-darkest" style="font-size: 14px; line-height: 18px; letter-spacing: 0.025em;">Aa</div>
                    </div>
                    <div class="space-y-1">
                      <div class="text-xs font-medium font-primary text-darkest" style="font-size: 12px; line-height: 16px; letter-spacing: 0.025em;">Headline Small</div>
                      <div class="text-xs text-medium">24px • Medium</div>
                      <div class="text-xs font-mono text-primary bg-white px-1 py-0.5 rounded text-[10px]">$typography-headline-small-em</div>
                    </div>
                  </div>
                </div>
              </div>
              
              <!-- Title Column -->
              <div class="space-y-4">
                <h4 class="text-sm font-semibold text-primary text-center mb-3">Title</h4>
                <div class="grid grid-cols-2 gap-3">
                  <!-- Title Large -->
                  <div class="text-center p-3 bg-lightest rounded-lg border border-light">
                    <div class="mb-2">
                      <div class="text-sm font-medium font-primary text-darkest" style="font-size: 14px; line-height: 18px;">Aa</div>
                    </div>
                    <div class="space-y-1">
                      <div class="text-xs font-medium font-primary text-darkest" style="font-size: 12px; line-height: 14px;">Title Large</div>
                      <div class="text-xs text-medium">22px • Medium</div>
                      <div class="text-xs font-mono text-primary bg-white px-1 py-0.5 rounded text-[10px]">$typography-title-large</div>
                    </div>
                  </div>
                  
                  <!-- Title Large (Emphasized) -->
                  <div class="text-center p-3 bg-lightest rounded-lg border border-light">
                    <div class="mb-2">
                      <div class="text-sm font-medium font-primary text-darkest" style="font-size: 14px; line-height: 18px; letter-spacing: 0.025em;">Aa</div>
                    </div>
                    <div class="space-y-1">
                      <div class="text-xs font-medium font-primary text-darkest" style="font-size: 12px; line-height: 14px; letter-spacing: 0.025em;">Title Large</div>
                      <div class="text-xs text-medium">22px • Medium</div>
                      <div class="text-xs font-mono text-primary bg-white px-1 py-0.5 rounded text-[10px]">$typography-title-large-em</div>
                    </div>
                  </div>
                  
                  <!-- Title Medium -->
                  <div class="text-center p-3 bg-lightest rounded-lg border border-light">
                    <div class="mb-2">
                      <div class="text-xs font-medium font-primary text-dark" style="font-size: 12px; line-height: 14px;">Aa</div>
                    </div>
                    <div class="space-y-1">
                      <div class="text-xs font-medium font-primary text-dark" style="font-size: 11px; line-height: 14px;">Title Medium</div>
                      <div class="text-xs text-medium">16px • Medium</div>
                      <div class="text-xs font-mono text-primary bg-white px-1 py-0.5 rounded text-[10px]">$typography-title-medium</div>
                    </div>
                  </div>
                  
                  <!-- Title Medium (Emphasized) -->
                  <div class="text-center p-3 bg-lightest rounded-lg border border-light">
                    <div class="mb-2">
                      <div class="text-xs font-medium font-primary text-dark" style="font-size: 12px; line-height: 14px; letter-spacing: 0.025em;">Aa</div>
                    </div>
                    <div class="space-y-1">
                      <div class="text-xs font-medium font-primary text-dark" style="font-size: 11px; line-height: 14px; letter-spacing: 0.025em;">Title Medium</div>
                      <div class="text-xs text-medium">16px • Medium</div>
                      <div class="text-xs font-mono text-primary bg-white px-1 py-0.5 rounded text-[10px]">$typography-title-medium-em</div>
                    </div>
                  </div>
                  
                  <!-- Title Small -->
                  <div class="text-center p-3 bg-lightest rounded-lg border border-light">
                    <div class="mb-2">
                      <div class="text-xs font-medium font-primary text-dark" style="font-size: 11px; line-height: 14px;">Aa</div>
                    </div>
                    <div class="space-y-1">
                      <div class="text-xs font-medium font-primary text-dark" style="font-size: 10px; line-height: 13px;">Title Small</div>
                      <div class="text-xs text-medium">14px • Medium</div>
                      <div class="text-xs font-mono text-primary bg-white px-1 py-0.5 rounded text-[10px]">$typography-title-small</div>
                    </div>
                  </div>
                  
                  <!-- Title Small (Emphasized) -->
                  <div class="text-center p-3 bg-lightest rounded-lg border border-light">
                    <div class="mb-2">
                      <div class="text-xs font-medium font-primary text-dark" style="font-size: 11px; line-height: 14px; letter-spacing: 0.025em;">Aa</div>
                    </div>
                    <div class="space-y-1">
                      <div class="text-xs font-medium font-primary text-dark" style="font-size: 10px; line-height: 13px; letter-spacing: 0.025em;">Title Small</div>
                      <div class="text-xs text-medium">14px • Medium</div>
                      <div class="text-xs font-mono text-primary bg-white px-1 py-0.5 rounded text-[10px]">$typography-title-small-em</div>
                    </div>
                  </div>
                </div>
              </div>
              
              <!-- Body Column -->
              <div class="space-y-4">
                <h4 class="text-sm font-semibold text-primary text-center mb-3">Body</h4>
                <div class="grid grid-cols-2 gap-3">
                  <!-- Body Large -->
                  <div class="text-center p-3 bg-lightest rounded-lg border border-light">
                    <div class="mb-2">
                      <div class="text-xs font-normal font-secondary text-dark" style="font-size: 12px; line-height: 16px;">Aa</div>
                    </div>
                    <div class="space-y-1">
                      <div class="text-xs font-normal font-secondary text-dark" style="font-size: 11px; line-height: 14px;">Body Large</div>
                      <div class="text-xs text-medium">16px • Regular</div>
                      <div class="text-xs font-mono text-primary bg-white px-1 py-0.5 rounded text-[10px]">$typography-body-large</div>
                    </div>
                  </div>
                  
                  <!-- Body Large (Emphasized) -->
                  <div class="text-center p-3 bg-lightest rounded-lg border border-light">
                    <div class="mb-2">
                      <div class="text-xs font-normal font-secondary text-dark" style="font-size: 12px; line-height: 16px; letter-spacing: 0.025em;">Aa</div>
                    </div>
                    <div class="space-y-1">
                      <div class="text-xs font-normal font-secondary text-dark" style="font-size: 11px; line-height: 14px; letter-spacing: 0.025em;">Body Large</div>
                      <div class="text-xs text-medium">16px • Regular</div>
                      <div class="text-xs font-mono text-primary bg-white px-1 py-0.5 rounded text-[10px]">$typography-body-large-em</div>
                    </div>
                  </div>
                  
                  <!-- Body Medium -->
                  <div class="text-center p-3 bg-lightest rounded-lg border border-light">
                    <div class="mb-2">
                      <div class="text-sm font-normal font-secondary text-dark" style="font-size: 14px; line-height: 20px;">Aa</div>
                    </div>
                    <div class="space-y-1">
                      <div class="text-sm font-normal font-secondary text-dark" style="font-size: 13px; line-height: 18px;">Body Medium</div>
                      <div class="text-xs text-medium">14px • Regular</div>
                      <div class="text-xs font-mono text-primary bg-white px-1 py-0.5 rounded text-[10px]">$typography-body-medium</div>
                    </div>
                  </div>
                  
                  <!-- Body Medium (Emphasized) -->
                  <div class="text-center p-3 bg-lightest rounded-lg border border-light">
                    <div class="mb-2">
                      <div class="text-sm font-normal font-secondary text-dark" style="font-size: 14px; line-height: 20px; letter-spacing: 0.025em;">Aa</div>
                    </div>
                    <div class="space-y-1">
                      <div class="text-sm font-normal font-secondary text-dark" style="font-size: 13px; line-height: 18px; letter-spacing: 0.025em;">Body Medium</div>
                      <div class="text-xs text-medium">14px • Regular</div>
                      <div class="text-xs font-mono text-primary bg-white px-1 py-0.5 rounded text-[10px]">$typography-body-medium-em</div>
                    </div>
                  </div>
                  
                  <!-- Body Small -->
                  <div class="text-center p-3 bg-lightest rounded-lg border border-light">
                    <div class="mb-2">
                      <div class="text-xs font-normal font-secondary text-dark" style="font-size: 12px; line-height: 16px;">Aa</div>
                    </div>
                    <div class="space-y-1">
                      <div class="text-xs font-normal font-secondary text-dark" style="font-size: 11px; line-height: 16px;">Body Small</div>
                      <div class="text-xs text-medium">12px • Regular</div>
                      <div class="text-xs font-mono text-primary bg-white px-1 py-0.5 rounded text-[10px]">$typography-body-small</div>
                    </div>
                  </div>
                  
                  <!-- Body Small (Emphasized) -->
                  <div class="text-center p-3 bg-lightest rounded-lg border border-light">
                    <div class="mb-2">
                      <div class="text-xs font-normal font-secondary text-dark" style="font-size: 12px; line-height: 16px; letter-spacing: 0.025em;">Aa</div>
                    </div>
                    <div class="space-y-1">
                      <div class="text-xs font-normal font-secondary text-dark" style="font-size: 11px; line-height: 16px; letter-spacing: 0.025em;">Body Small</div>
                      <div class="text-xs text-medium">12px • Regular</div>
                      <div class="text-xs font-mono text-primary bg-white px-1 py-0.5 rounded text-[10px]">$typography-body-small-em</div>
                    </div>
                  </div>
                </div>
              </div>
              
              <!-- Label Column -->
              <div class="space-y-4">
                <h4 class="text-sm font-semibold text-primary text-center mb-3">Label</h4>
                <div class="grid grid-cols-2 gap-3">
                  <!-- Label Large -->
                  <div class="text-center p-3 bg-lightest rounded-lg border border-light">
                    <div class="mb-2">
                      <div class="text-sm font-medium font-secondary text-dark" style="font-size: 14px; line-height: 20px;">Aa</div>
                    </div>
                    <div class="space-y-1">
                      <div class="text-sm font-medium font-secondary text-dark" style="font-size: 13px; line-height: 18px;">Label Large</div>
                      <div class="text-xs text-medium">14px • Medium</div>
                      <div class="text-xs font-mono text-primary bg-white px-1 py-0.5 rounded text-[10px]">$typography-label-large</div>
                    </div>
                  </div>
                  
                  <!-- Label Large (Emphasized) -->
                  <div class="text-center p-3 bg-lightest rounded-lg border border-light">
                    <div class="mb-2">
                      <div class="text-sm font-medium font-secondary text-dark" style="font-size: 14px; line-height: 20px; letter-spacing: 0.025em;">Aa</div>
                    </div>
                    <div class="space-y-1">
                      <div class="text-sm font-medium font-secondary text-dark" style="font-size: 13px; line-height: 18px; letter-spacing: 0.025em;">Label Large</div>
                      <div class="text-xs text-medium">14px • Medium</div>
                      <div class="text-xs font-mono text-primary bg-white px-1 py-0.5 rounded text-[10px]">$typography-label-large-em</div>
                    </div>
                  </div>
                  
                  <!-- Label Medium -->
                  <div class="text-center p-3 bg-lightest rounded-lg border border-light">
                    <div class="mb-2">
                      <div class="text-xs font-medium font-secondary text-dark" style="font-size: 12px; line-height: 16px;">Aa</div>
                    </div>
                    <div class="space-y-1">
                      <div class="text-xs font-medium font-secondary text-dark" style="font-size: 11px; line-height: 16px;">Label Medium</div>
                      <div class="text-xs text-medium">12px • Medium</div>
                      <div class="text-xs font-mono text-primary bg-white px-1 py-0.5 rounded text-[10px]">$typography-label-medium</div>
                    </div>
                  </div>
                  
                  <!-- Label Medium (Emphasized) -->
                  <div class="text-center p-3 bg-lightest rounded-lg border border-light">
                    <div class="mb-2">
                      <div class="text-xs font-medium font-secondary text-dark" style="font-size: 12px; line-height: 16px; letter-spacing: 0.025em;">Aa</div>
                    </div>
                    <div class="space-y-1">
                      <div class="text-xs font-medium font-secondary text-dark" style="font-size: 11px; line-height: 16px; letter-spacing: 0.025em;">Label Medium</div>
                      <div class="text-xs text-medium">12px • Medium</div>
                      <div class="text-xs font-mono text-primary bg-white px-1 py-0.5 rounded text-[10px]">$typography-label-medium-em</div>
                    </div>
                  </div>
                  
                  <!-- Label Small -->
                  <div class="text-center p-3 bg-lightest rounded-lg border border-light">
                    <div class="mb-2">
                      <div class="text-xs font-medium font-secondary text-dark" style="font-size: 11px; line-height: 16px;">Aa</div>
                    </div>
                    <div class="space-y-1">
                      <div class="text-xs font-medium font-secondary text-dark" style="font-size: 10px; line-height: 16px;">Label Small</div>
                      <div class="text-xs text-medium">11px • Medium</div>
                      <div class="text-xs font-mono text-primary bg-white px-1 py-0.5 rounded text-[10px]">$typography-label-small</div>
                    </div>
                  </div>
                  
                  <!-- Label Small (Emphasized) -->
                  <div class="text-center p-3 bg-lightest rounded-lg border border-light">
                    <div class="mb-2">
                      <div class="text-xs font-medium font-secondary text-dark" style="font-size: 11px; line-height: 16px; letter-spacing: 0.025em;">Aa</div>
                    </div>
                    <div class="space-y-1">
                      <div class="text-xs font-medium font-secondary text-dark" style="font-size: 10px; line-height: 16px; letter-spacing: 0.025em;">Label Small</div>
                      <div class="text-xs text-medium">11px • Medium</div>
                      <div class="text-xs font-mono text-primary bg-white px-1 py-0.5 rounded text-[10px]">$typography-label-small-em</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Typography Tokens Reference -->
        <div class="mb-8">
          <h3 class="text-xl font-semibold text-dark mb-6">Typography Tokens Reference</h3>
          <p class="text-medium mb-4">Complete reference of all available typography tokens for consistent implementation.</p>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div class="p-4 bg-lightest rounded-lg border border-light">
              <div class="font-semibold text-primary mb-1">$font-family-primary</div>
              <div class="text-sm text-medium mb-2">PP Agrandir</div>
              <div class="text-xs text-medium">Brand headings</div>
            </div>
            <div class="p-4 bg-lightest rounded-lg border border-light">
              <div class="font-semibold text-primary mb-1">$font-family-secondary</div>
              <div class="text-sm text-medium mb-2">Manrope</div>
              <div class="text-xs text-medium">Body text</div>
            </div>
            <div class="p-4 bg-lightest rounded-lg border border-light">
              <div class="font-semibold text-primary mb-1">$font-family-mono</div>
              <div class="text-sm text-medium mb-2">SF Mono</div>
              <div class="text-xs text-medium">Code elements</div>
            </div>
            <div class="p-4 bg-lightest rounded-lg border border-light">
              <div class="font-semibold text-primary mb-1">$font-weight-regular</div>
              <div class="text-sm text-medium mb-2">400</div>
              <div class="text-xs text-medium">Normal weight</div>
            </div>
            <div class="p-4 bg-lightest rounded-lg border border-light">
              <div class="font-semibold text-primary mb-1">$font-weight-medium</div>
              <div class="text-sm text-medium mb-2">500</div>
              <div class="text-xs text-medium">Medium weight</div>
            </div>
            <div class="p-4 bg-lightest rounded-lg border border-light">
              <div class="font-semibold text-primary mb-1">$font-weight-semibold</div>
              <div class="text-sm text-medium mb-2">600</div>
              <div class="text-xs text-medium">Semibold weight</div>
            </div>
            <div class="p-4 bg-lightest rounded-lg border border-light">
              <div class="font-semibold text-primary mb-1">$font-weight-bold</div>
              <div class="text-sm text-medium mb-2">700</div>
              <div class="text-xs text-medium">Bold weight</div>
            </div>
            <div class="p-4 bg-lightest rounded-lg border border-light">
              <div class="font-semibold text-primary mb-1">$font-weight-black</div>
              <div class="text-sm text-medium mb-2">900</div>
              <div class="text-xs text-medium">Black weight</div>
            </div>
          </div>
        </div>
      </section>
      <section class="mb-16 px-6 py-8">
        <h2 class="step-title">Elevation</h2>
        <p class="step-description">Elevation creates visual hierarchy and depth through shadows and layering. Based on Material Design 3 principles.</p>
        
        <!-- Elevation Concepts -->
        <div class="mb-8 p-6 bg-lightest rounded-lg border border-light">
          <h3 class="text-xl font-semibold text-dark mb-4">Elevation Concepts</h3>
          <p class="text-medium mb-4">Elevation is the relative distance between two surfaces along the z-axis. It creates depth and hierarchy in your interface.</p>
          <div class="space-y-3 text-medium">
            <div class="flex items-start gap-3">
              <span class="font-semibold text-primary min-w-24">Levels</span>
              <span>We use a 0-5 scale for elevation levels, from flat surfaces to the highest overlays.</span>
            </div>
            <div class="flex items-start gap-3">
              <span class="font-semibold text-primary min-w-24">Tokens</span>
              <span>Elevation tokens provide consistent shadow values and can be used both numerically and semantically.</span>
            </div>
            <div class="flex items-start gap-3">
              <span class="font-semibold text-primary min-w-24">Z-index</span>
              <span>Proper layering ensures elements stack correctly and maintain accessibility.</span>
            </div>
          </div>
        </div>

        <!-- Elevation Levels -->
        <div class="mb-8">
          <h3 class="text-xl font-semibold text-dark mb-6">Elevation Levels</h3>
          <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            <!-- Level 0 -->
            <div class="aspect-square p-4 bg-white border border-light rounded-lg flex flex-col justify-between" style="box-shadow: var(--elevation-0);">
              <div>
                <h4 class="text-sm font-semibold text-dark mb-1">Level 0</h4>
                <p class="text-xs text-medium mb-1">Base Surface</p>
                <p class="text-xs text-medium opacity-75">No elevation</p>
              </div>
              <div class="space-y-1">
                <div class="text-xs font-mono bg-lightest p-1 rounded">
                  <div class="font-semibold">$elevation-0</div>
                </div>
                <div class="text-xs text-medium">Base layout</div>
              </div>
            </div>

            <!-- Level 1 -->
            <div class="aspect-square p-4 bg-white rounded-lg flex flex-col justify-between" style="box-shadow: 0 1px 2px 0 rgba(26, 26, 26, 0.05), 0 1px 3px 0 rgba(26, 26, 26, 0.1);">
              <div>
                <h4 class="text-sm font-semibold text-dark mb-1">Level 1</h4>
                <p class="text-xs text-medium mb-1">Low Elevation</p>
                <p class="text-xs text-medium opacity-75">Cards, list items</p>
              </div>
              <div class="space-y-1">
                <div class="text-xs font-mono bg-lightest p-1 rounded">
                  <div class="font-semibold">$elevation-1</div>
                </div>
                <div class="text-xs text-medium">Cards, chips</div>
              </div>
            </div>

            <!-- Level 2 -->
            <div class="aspect-square p-4 bg-white rounded-lg flex flex-col justify-between" style="box-shadow: 0 4px 6px -1px rgba(26, 26, 26, 0.1), 0 2px 4px -1px rgba(26, 26, 26, 0.06);">
              <div>
                <h4 class="text-sm font-semibold text-dark mb-1">Level 2</h4>
                <p class="text-xs text-medium mb-1">Medium Elevation</p>
                <p class="text-xs text-medium opacity-75">Interactive elements</p>
              </div>
              <div class="space-y-1">
                <div class="text-xs font-mono bg-lightest p-1 rounded">
                  <div class="font-semibold">$elevation-2</div>
                </div>
                <div class="text-xs text-medium">Buttons, dropdowns</div>
              </div>
            </div>

            <!-- Level 3 -->
            <div class="aspect-square p-4 bg-white rounded-lg flex flex-col justify-between" style="box-shadow: 0 10px 15px -3px rgba(26, 26, 26, 0.1), 0 4px 6px -2px rgba(26, 26, 26, 0.05);">
              <div>
                <h4 class="text-sm font-semibold text-dark mb-1">Level 3</h4>
                <p class="text-xs text-medium mb-1">High Elevation</p>
                <p class="text-xs text-medium opacity-75">Prominent elements</p>
              </div>
              <div class="space-y-1">
                <div class="text-xs font-mono bg-lightest p-1 rounded">
                  <div class="font-semibold">$elevation-3</div>
                </div>
                <div class="text-xs text-medium">FABs, drawers</div>
              </div>
            </div>

            <!-- Level 4 -->
            <div class="aspect-square p-4 bg-white rounded-lg flex flex-col justify-between" style="box-shadow: 0 20px 25px -5px rgba(26, 26, 26, 0.1), 0 10px 10px -5px rgba(26, 26, 26, 0.04);">
              <div>
                <h4 class="text-sm font-semibold text-dark mb-1">Level 4</h4>
                <p class="text-xs text-medium mb-1">Very High Elevation</p>
                <p class="text-xs text-medium opacity-75">Modal content</p>
              </div>
              <div class="space-y-1">
                <div class="text-xs font-mono bg-lightest p-1 rounded">
                  <div class="font-semibold">$elevation-4</div>
                </div>
                <div class="text-xs text-medium">Modals, dialogs</div>
              </div>
            </div>

            <!-- Level 5 -->
            <div class="aspect-square p-4 bg-white rounded-lg flex flex-col justify-between" style="box-shadow: 0 25px 50px -12px rgba(26, 26, 26, 0.25);">
              <div>
                <h4 class="text-sm font-semibold text-dark mb-1">Level 5</h4>
                <p class="text-xs text-medium mb-1">Highest Elevation</p>
                <p class="text-xs text-medium opacity-75">Maximum depth</p>
              </div>
              <div class="space-y-1">
                <div class="text-xs font-mono bg-lightest p-1 rounded">
                  <div class="font-semibold">$elevation-5</div>
                </div>
                <div class="text-xs text-medium">Menus, tooltips</div>
              </div>
            </div>
          </div>
        </div>

        <!-- Semantic Elevation Tokens -->
        <div class="mb-8">
          <h3 class="text-xl font-semibold text-dark mb-6">Semantic Elevation Tokens</h3>
          <p class="text-medium mb-4">Use semantic tokens for component-specific elevation to maintain consistency across your application.</p>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div class="p-4 bg-lightest rounded-lg border border-light">
              <div class="font-semibold text-primary mb-1">$elevation-card</div>
              <div class="text-sm text-medium mb-2">Maps to $elevation-1</div>
              <div class="text-xs text-medium">Use for content cards</div>
            </div>
            <div class="p-4 bg-lightest rounded-lg border border-light">
              <div class="font-semibold text-primary mb-1">$elevation-button</div>
              <div class="text-sm text-medium mb-2">Maps to $elevation-2</div>
              <div class="text-xs text-medium">Use for raised buttons</div>
            </div>
            <div class="p-4 bg-lightest rounded-lg border border-light">
              <div class="font-semibold text-primary mb-1">$elevation-fab</div>
              <div class="text-sm text-medium mb-2">Maps to $elevation-3</div>
              <div class="text-xs text-medium">Use for floating action buttons</div>
            </div>
            <div class="p-4 bg-lightest rounded-lg border border-light">
              <div class="font-semibold text-primary mb-1">$elevation-modal</div>
              <div class="text-sm text-medium mb-2">Maps to $elevation-4</div>
              <div class="text-xs text-medium">Use for modal dialogs</div>
            </div>
            <div class="p-4 bg-lightest rounded-lg border border-light">
              <div class="font-semibold text-primary mb-1">$elevation-menu</div>
              <div class="text-sm text-medium mb-2">Maps to $elevation-5</div>
              <div class="text-xs text-medium">Use for dropdown menus</div>
            </div>
            <div class="p-4 bg-lightest rounded-lg border border-light">
              <div class="font-semibold text-primary mb-1">$elevation-app-bar</div>
              <div class="text-sm text-medium mb-2">Maps to $elevation-2</div>
              <div class="text-xs text-medium">Use for top navigation</div>
            </div>
          </div>
        </div>

        <!-- Z-index Layering -->
        <div class="mb-8">
          <h3 class="text-xl font-semibold text-dark mb-6">Z-index Layering</h3>
          <p class="text-medium mb-4">Proper z-index values ensure elements stack correctly and maintain accessibility.</p>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="space-y-3">
              <div class="flex justify-between items-center p-3 bg-lightest rounded-lg">
                <span class="font-medium text-dark">Base</span>
                <span class="text-sm font-mono text-medium">$z-index-base (0)</span>
              </div>
              <div class="flex justify-between items-center p-3 bg-lightest rounded-lg">
                <span class="font-medium text-dark">Raised</span>
                <span class="text-sm font-mono text-medium">$z-index-raised (10)</span>
              </div>
              <div class="flex justify-between items-center p-3 bg-lightest rounded-lg">
                <span class="font-medium text-dark">Dropdown</span>
                <span class="text-sm font-mono text-medium">$z-index-dropdown (100)</span>
              </div>
              <div class="flex justify-between items-center p-3 bg-lightest rounded-lg">
                <span class="font-medium text-dark">Sticky</span>
                <span class="text-sm font-mono text-medium">$z-index-sticky (200)</span>
              </div>
              <div class="flex justify-between items-center p-3 bg-lightest rounded-lg">
                <span class="font-medium text-dark">Fixed</span>
                <span class="text-sm font-mono text-medium">$z-index-fixed (300)</span>
              </div>
            </div>
            <div class="space-y-3">
              <div class="flex justify-between items-center p-3 bg-lightest rounded-lg">
                <span class="font-medium text-dark">Modal Backdrop</span>
                <span class="text-sm font-mono text-medium">$z-index-modal-backdrop (400)</span>
              </div>
              <div class="flex justify-between items-center p-3 bg-lightest rounded-lg">
                <span class="font-medium text-dark">Modal</span>
                <span class="text-sm font-mono text-medium">$z-index-modal (500)</span>
              </div>
              <div class="flex justify-between items-center p-3 bg-lightest rounded-lg">
                <span class="font-medium text-dark">Popover</span>
                <span class="text-sm font-mono text-medium">$z-index-popover (600)</span>
              </div>
              <div class="flex justify-between items-center p-3 bg-lightest rounded-lg">
                <span class="font-medium text-dark">Tooltip</span>
                <span class="text-sm font-mono text-medium">$z-index-tooltip (700)</span>
              </div>
              <div class="flex justify-between items-center p-3 bg-lightest rounded-lg">
                <span class="font-medium text-dark">Notification</span>
                <span class="text-sm font-mono text-medium">$z-index-notification (800)</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Usage Guidelines -->
        <div class="mb-8">
          <h3 class="text-xl font-semibold text-dark mb-6">Usage Guidelines</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 class="font-semibold text-primary mb-3">Best Practices</h4>
              <ul class="space-y-2 text-medium">
                <li class="flex items-start gap-2">
                  <span class="text-primary">•</span>
                  <span>Use semantic tokens for consistency across components</span>
                </li>
                <li class="flex items-start gap-2">
                  <span class="text-primary">•</span>
                  <span>Keep elevation levels minimal (0-5 scale)</span>
                </li>
                <li class="flex items-start gap-2">
                  <span class="text-primary">•</span>
                  <span>Combine elevation with proper z-index values</span>
                </li>
                <li class="flex items-start gap-2">
                  <span class="text-primary">•</span>
                  <span>Consider accessibility when using elevation</span>
                </li>
              </ul>
            </div>
            <div>
              <h4 class="font-semibold text-primary mb-3">Accessibility</h4>
              <ul class="space-y-2 text-medium">
                <li class="flex items-start gap-2">
                  <span class="text-primary">•</span>
                  <span>Don't rely solely on elevation for hierarchy</span>
                </li>
                <li class="flex items-start gap-2">
                  <span class="text-primary">•</span>
                  <span>Use color and typography to supplement depth</span>
                </li>
                <li class="flex items-start gap-2">
                  <span class="text-primary">•</span>
                  <span>Ensure sufficient contrast for elevated elements</span>
                </li>
                <li class="flex items-start gap-2">
                  <span class="text-primary">•</span>
                  <span>Test elevation in both light and dark themes</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <!-- Typography -->
      <section class="mb-16 px-6 py-8">
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
      <section class="mb-16 px-6 py-8">
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
      <section class="mb-16 px-6 py-8">
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
          
          <div>
            <label class="form-label">Warning State</label>
            <input 
              type="text" 
              class="w-full p-3 border-2 border-warning rounded-lg focus:border-warning focus:outline-none transition-colors"
              placeholder="This field needs attention"
            />
            <p class="form-warning">Please review this field</p>
          </div>
          
          <div>
            <label class="form-label">Info State</label>
            <input 
              type="text" 
              class="w-full p-3 border-2 border-info rounded-lg focus:border-info focus:outline-none transition-colors"
              placeholder="Information field"
            />
            <p class="form-info">Additional information</p>
          </div>
        </div>
      </section>

      <!-- Cards -->
      <section class="mb-16 px-6 py-8">
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
      <section class="mb-16 px-6 py-8">
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
      <section class="mb-16 px-6 py-8">
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
      <section class="mb-16 px-6 py-8">
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
      <section class="mb-16 px-6 py-8">
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
import { ref, onMounted } from 'vue'

// Page title and meta
useHead({
  title: 'Design System - Dogfy Diet',
  meta: [
    { name: 'description', content: 'Complete design system showcase with colors, typography, and components' }
  ]
})

// Reactive state for active section
const activeSection = ref('primary')

// Initialize page
onMounted(() => {
  // Static page - no animations
})

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

// Questionnaire title styles
.questionnaire-title {
  text-align: left;
  line-height: 1.2;
}

// Header styles
.header {
  background-color: white;
  border-bottom: 1px solid #e5e7eb;
  min-height: 85vh;
  padding: 30vh 0px;
}

// Pantone-style individual color pages
.pantone-swatch-page {
  background: white;
  border: 1px solid #d0d0d0;
  border-radius: 2px;
  margin-bottom: 16px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  width: 160px;
  height: 640px;
  position: relative;
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
  position: relative;
  overflow: hidden;
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
}

// Pantone-style tabs
.pantone-sections-container {
  display: flex;
  flex-wrap: wrap;
  gap: 0; // Remove gap for full width
  margin-bottom: 0; // Remove margin for full height
  column-gap: 2%;
}

.pantone-section {
  position: relative;
  background: #f8f8f8;
  border-radius: 0; // Remove border radius for full screen
  overflow: hidden;
  border: 1px solid #e0e0e0;
  flex: 46%;
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
  margin-bottom: $spacing-4;
  max-width: 300px;
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

// Material Design 3 Color Roles Grid
.md3-color-roles-grid {
  display: flex;
  flex-direction: column;
  margin-top: 32px;
  border: 1px solid #e0e0e0;
  border-radius: 12px;
  overflow: hidden;
  margin-bottom: 24px;
  
  &:last-child {
    margin-bottom: 0;
  }
}

.md3-column-headers {
  display: grid;
  grid-template-columns: 100px repeat(5, 1fr);
  background: #f8f8f8;
  border-bottom: 1px solid #e0e0e0;
  
  // Brand & Surface grid has 6 columns, Semantic grid has 6 columns
  &:first-of-type {
    grid-template-columns: 100px repeat(5, 1fr);
  }
}

.md3-column-header {
  padding: 16px 12px;
  font-size: 14px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: #1a1a1a;
  display: flex;
  align-items: center;
  justify-content: center;
  border-right: 1px solid #e0e0e0;
  
  &:first-child {
    background: #f0f0f0;
    font-weight: 700;
  }
  
  &:last-child {
    border-right: none;
  }
}

.md3-color-rows {
  display: grid;
  grid-template-columns: 100px repeat(5, 1fr);
  border-bottom: 1px solid #f0f0f0;
  
  &:last-child {
    border-bottom: none;
  }
}

.md3-row-label {
  padding: 16px 12px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.3px;
  color: #666;
  background: #fafafa;
  display: flex;
  align-items: center;
  justify-content: center;
  border-right: 1px solid #e0e0e0;
}

.md3-color-cell {
  padding: 0;
  display: flex;
  flex-direction: column;
  border-right: 1px solid #f0f0f0;
  
  &:last-child {
    border-right: none;
  }
}

.md3-color-unified {
  width: 100%;
  height: 140px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  border-bottom: 1px solid #f0f0f0;
}

.md3-color-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 8px;
}

.md3-color-label {
  font-size: 10px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.2px;
  color: #ffffff;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
  line-height: 1.2;
  margin-bottom: 4px;
}

.md3-color-details {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1px;
}

.md3-color-name {
  font-size: 8px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.1px;
  color: #ffffff;
  line-height: 1.1;
  opacity: 0.9;
}

.md3-color-hex {
  font-size: 7px;
  font-family: 'Courier New', monospace;
  color: #ffffff;
  opacity: 0.8;
}

.md3-color-var {
  font-size: 6px;
  font-family: 'Courier New', monospace;
  color: #ffffff;
  font-style: italic;
  opacity: 0.7;
}

// Responsive adjustments for M3 grid
@include respond-down-to(mobile) {
  .md3-color-roles-grid {
    margin-top: 24px;
  }
  
  .md3-column-headers,
  .md3-color-rows {
    grid-template-columns: 80px repeat(5, 1fr);
  }
  
  .md3-column-header {
    padding: 12px 8px;
    font-size: 12px;
  }
  
  .md3-row-label {
    padding: 12px 8px;
    font-size: 10px;
  }
  
  .md3-color-unified {
    height: 120px;
  }
  
  .md3-color-content {
    padding: 6px;
  }
  
  .md3-color-label {
    font-size: 8px;
    margin-bottom: 3px;
  }
  
  .md3-color-name {
    font-size: 7px;
  }
  
  .md3-color-hex {
    font-size: 6px;
  }
  
  .md3-color-var {
    font-size: 5px;
  }
}
</style>
