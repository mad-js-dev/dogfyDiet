<template>
  <div class="design-system-page">
    <div>

      <!-- Header -->
      <header class="design-system-header">
        <div class="container">
          <div class="text-left">
            <h1 class="design-system-title">Dogfy Diet Design System</h1>
            <p class="design-system-subtitle">
              A comprehensive design system extracted from dogfydiet.com with colors, typography, and component utilities.
            </p>
          </div>
        </div>
      </header>

      <!-- Sections -->
      <MD3ColorPaletteSection />
      <MD3TonalPalettesSection />
      <MD3ColorRolesSection />
      <ColorUsageSection />
      <TypographySection />
    </div>
  </div>
</template>

<script setup lang="ts">
// Import section components
import MD3ColorPaletteSection from './sections/MD3ColorPaletteSection.vue'
import MD3ColorRolesSection from './sections/MD3ColorRolesSection.vue'
import MD3TonalPalettesSection from './sections/MD3TonalPalettesSection.vue'
import ColorUsageSection from './sections/ColorUsageSection.vue'
import TypographySection from './sections/TypographySection.vue'

// This component displays the complete design system documentation
</script>

<style lang="scss">
@use '~/assets/styles/_css-variables.scss';
</style>

<style scoped lang="scss">
@use '~/assets/styles/_variables.scss' as *;
@use '~/assets/styles/_mixins.scss' as *;
@use '~/assets/styles/components/pantone.scss';
@use '~/assets/styles/components/md3-color-roles.scss';

.design-system-page {
  padding: 2rem;
}

.design-system-header {
  margin-bottom: 3rem;
  
  .container {
    max-width: 1200px;
    margin: 0 auto;
  }
  
  .design-system-title {
    font-size: 2.5rem;
    font-weight: 700;
    color: $neutral-darkest;
    margin-bottom: 1rem;
  }
  
  .design-system-subtitle {
    font-size: 1.125rem;
    color: $neutral-medium;
    line-height: 1.6;
  }
}
</style>
