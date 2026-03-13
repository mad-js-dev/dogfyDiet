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

      <!-- Sections -->
      <ColorPaletteSection />
      <MD3ColorRolesSection />
      <ColorUsageSection />
      <TypographySection />
    </div>
  </div>
</template>

<script setup lang="ts">
// Import section components
import ColorPaletteSection from './sections/ColorPaletteSection.vue'
import MD3ColorRolesSection from './sections/MD3ColorRolesSection.vue'
import ColorUsageSection from './sections/ColorUsageSection.vue'
import TypographySection from './sections/TypographySection.vue'

// This component displays the complete design system documentation
</script>

<style scoped lang="scss">
@use '~/assets/styles/_variables.scss' as *;
@use '~/assets/styles/_mixins.scss' as *;

// Import the same styles that were used in the original design-system page
@use '~/assets/styles/components/pantone.scss';
@use '~/assets/styles/components/md3-color-roles.scss';
</style>
