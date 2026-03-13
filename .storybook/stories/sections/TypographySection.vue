<template>
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
              <h5 class="text-5xl font-black font-primary text-primary" style="font-size: 48px; line-height: 56px;">PP Agrandir</h5>
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
              <h5 class="text-4xl font-normal font-secondary text-dark" style="font-size: 36px; line-height: 44px;">Manrope</h5>
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
              <h5 class="text-4xl font-normal font-mono text-dark" style="font-size: 36px; line-height: 44px;">SF Mono</h5>
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
                  <div class="text-xs font-medium font-primary text-dark" style="font-size: 10px; line-height: 12px;">Title Small</div>
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
                  <div class="text-xs font-medium font-primary text-dark" style="font-size: 10px; line-height: 12px; letter-spacing: 0.025em;">Title Small</div>
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
                  <div class="text-xs font-normal font-secondary text-dark" style="font-size: 11px; line-height: 16px;">Aa</div>
                </div>
                <div class="space-y-1">
                  <div class="text-xs font-normal font-secondary text-dark" style="font-size: 10px; line-height: 12px;">Body Large</div>
                  <div class="text-xs text-medium">16px • Regular</div>
                  <div class="text-xs font-mono text-primary bg-white px-1 py-0.5 rounded text-[10px]">$typography-body-large</div>
                </div>
              </div>

              <!-- Body Large (Emphasized) -->
              <div class="text-center p-3 bg-lightest rounded-lg border border-light">
                <div class="mb-2">
                  <div class="text-xs font-medium font-secondary text-dark" style="font-size: 11px; line-height: 16px; letter-spacing: 0.025em;">Aa</div>
                </div>
                <div class="space-y-1">
                  <div class="text-xs font-medium font-secondary text-dark" style="font-size: 10px; line-height: 12px; letter-spacing: 0.025em;">Body Large</div>
                  <div class="text-xs text-medium">16px • Medium</div>
                  <div class="text-xs font-mono text-primary bg-white px-1 py-0.5 rounded text-[10px]">$typography-body-large-em</div>
                </div>
              </div>

              <!-- Body Medium -->
              <div class="text-center p-3 bg-lightest rounded-lg border border-light">
                <div class="mb-2">
                  <div class="text-xs font-normal font-secondary text-dark" style="font-size: 10px; line-height: 14px;">Aa</div>
                </div>
                <div class="space-y-1">
                  <div class="text-xs font-normal font-secondary text-dark" style="font-size: 9px; line-height: 12px;">Body Medium</div>
                  <div class="text-xs text-medium">14px • Regular</div>
                  <div class="text-xs font-mono text-primary bg-white px-1 py-0.5 rounded text-[10px]">$typography-body-medium</div>
                </div>
              </div>

              <!-- Body Medium (Emphasized) -->
              <div class="text-center p-3 bg-lightest rounded-lg border border-light">
                <div class="mb-2">
                  <div class="text-xs font-medium font-secondary text-dark" style="font-size: 10px; line-height: 14px; letter-spacing: 0.025em;">Aa</div>
                </div>
                <div class="space-y-1">
                  <div class="text-xs font-medium font-secondary text-dark" style="font-size: 9px; line-height: 12px; letter-spacing: 0.025em;">Body Medium</div>
                  <div class="text-xs text-medium">14px • Medium</div>
                  <div class="text-xs font-mono text-primary bg-white px-1 py-0.5 rounded text-[10px]">$typography-body-medium-em</div>
                </div>
              </div>

              <!-- Body Small -->
              <div class="text-center p-3 bg-lightest rounded-lg border border-light">
                <div class="mb-2">
                  <div class="text-xs font-normal font-secondary text-dark" style="font-size: 9px; line-height: 12px;">Aa</div>
                </div>
                <div class="space-y-1">
                  <div class="text-xs font-normal font-secondary text-dark" style="font-size: 8px; line-height: 12px;">Body Small</div>
                  <div class="text-xs text-medium">12px • Regular</div>
                  <div class="text-xs font-mono text-primary bg-white px-1 py-0.5 rounded text-[10px]">$typography-body-small</div>
                </div>
              </div>

              <!-- Body Small (Emphasized) -->
              <div class="text-center p-3 bg-lightest rounded-lg border border-light">
                <div class="mb-2">
                  <div class="text-xs font-medium font-secondary text-dark" style="font-size: 9px; line-height: 12px; letter-spacing: 0.025em;">Aa</div>
                </div>
                <div class="space-y-1">
                  <div class="text-xs font-medium font-secondary text-dark" style="font-size: 8px; line-height: 12px; letter-spacing: 0.025em;">Body Small</div>
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
                  <div class="text-xs font-medium font-secondary text-dark" style="font-size: 9px; line-height: 12px;">Aa</div>
                </div>
                <div class="space-y-1">
                  <div class="text-xs font-medium font-secondary text-dark" style="font-size: 8px; line-height: 12px;">Label Large</div>
                  <div class="text-xs text-medium">14px • Medium</div>
                  <div class="text-xs font-mono text-primary bg-white px-1 py-0.5 rounded text-[10px]">$typography-label-large</div>
                </div>
              </div>

              <!-- Label Large (Emphasized) -->
              <div class="text-center p-3 bg-lightest rounded-lg border border-light">
                <div class="mb-2">
                  <div class="text-xs font-semibold font-secondary text-dark" style="font-size: 9px; line-height: 12px; letter-spacing: 0.1em;">Aa</div>
                </div>
                <div class="space-y-1">
                  <div class="text-xs font-semibold font-secondary text-dark" style="font-size: 8px; line-height: 12px; letter-spacing: 0.1em;">Label Large</div>
                  <div class="text-xs text-medium">14px • Semibold</div>
                  <div class="text-xs font-mono text-primary bg-white px-1 py-0.5 rounded text-[10px]">$typography-label-large-em</div>
                </div>
              </div>

              <!-- Label Medium -->
              <div class="text-center p-3 bg-lightest rounded-lg border border-light">
                <div class="mb-2">
                  <div class="text-xs font-medium font-secondary text-dark" style="font-size: 8px; line-height: 12px;">Aa</div>
                </div>
                <div class="space-y-1">
                  <div class="text-xs font-medium font-secondary text-dark" style="font-size: 7px; line-height: 12px;">Label Medium</div>
                  <div class="text-xs text-medium">12px • Medium</div>
                  <div class="text-xs font-mono text-primary bg-white px-1 py-0.5 rounded text-[10px]">$typography-label-medium</div>
                </div>
              </div>

              <!-- Label Medium (Emphasized) -->
              <div class="text-center p-3 bg-lightest rounded-lg border border-light">
                <div class="mb-2">
                  <div class="text-xs font-semibold font-secondary text-dark" style="font-size: 8px; line-height: 12px; letter-spacing: 0.05em;">Aa</div>
                </div>
                <div class="space-y-1">
                  <div class="text-xs font-semibold font-secondary text-dark" style="font-size: 7px; line-height: 12px; letter-spacing: 0.05em;">Label Medium</div>
                  <div class="text-xs text-medium">12px • Semibold</div>
                  <div class="text-xs font-mono text-primary bg-white px-1 py-0.5 rounded text-[10px]">$typography-label-medium-em</div>
                </div>
              </div>

              <!-- Label Small -->
              <div class="text-center p-3 bg-lightest rounded-lg border border-light">
                <div class="mb-2">
                  <div class="text-xs font-medium font-secondary text-dark" style="font-size: 7px; line-height: 12px;">Aa</div>
                </div>
                <div class="space-y-1">
                  <div class="text-xs font-medium font-secondary text-dark" style="font-size: 6px; line-height: 12px;">Label Small</div>
                  <div class="text-xs text-medium">11px • Medium</div>
                  <div class="text-xs font-mono text-primary bg-white px-1 py-0.5 rounded text-[10px]">$typography-label-small</div>
                </div>
              </div>

              <!-- Label Small (Emphasized) -->
              <div class="text-center p-3 bg-lightest rounded-lg border border-light">
                <div class="mb-2">
                  <div class="text-xs font-semibold font-secondary text-dark" style="font-size: 7px; line-height: 12px; letter-spacing: 0.05em;">Aa</div>
                </div>
                <div class="space-y-1">
                  <div class="text-xs font-semibold font-secondary text-dark" style="font-size: 6px; line-height: 12px; letter-spacing: 0.05em;">Label Small</div>
                  <div class="text-xs text-medium">11px • Semibold</div>
                  <div class="text-xs font-mono text-primary bg-white px-1 py-0.5 rounded text-[10px]">$typography-label-small-em</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
// This component displays the typography section
</script>

<style scoped lang="scss">
@use '~/assets/styles/_variables.scss' as *;
@use '~/assets/styles/_mixins.scss' as *;
</style>
