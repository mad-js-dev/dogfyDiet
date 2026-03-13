<template>
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
</template>

<script setup lang="ts">
// This component displays the Material Design 3 color roles section
</script>

<style scoped lang="scss">
@use '~/assets/styles/_variables.scss' as *;
@use '~/assets/styles/_mixins.scss' as *;

// Import the same styles that were used in the original design-system page
@use '~/assets/styles/components/md3-color-roles.scss';
</style>
