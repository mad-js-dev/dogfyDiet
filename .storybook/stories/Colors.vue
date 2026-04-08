<script setup lang="ts">
import paletteData from '../../assets/styles/colors/palette.json'
import BaseColors from './components/baseColors.vue'

// Format color name for display (e.g., "primary-green" -> "Primary Green")
function formatColorName(name: string): string {
  return name
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

// Transform base colors into ColorSection format
function transformBaseColors(colors: Record<string, any>, prefix: string) {
  return Object.entries(colors).map(([key, colorData]) => ({
    name: formatColorName(key),
    value: colorData.color, // Extract the base color from the nested structure
    cssVar: '' // Remove CSS variable names as requested
  }))
}

const brandColors = transformBaseColors(paletteData['base-brand-colors'], 'base-brand')
const semanticColors = transformBaseColors(paletteData['base-semantic-colors'], 'base-semantic')

</script>

<template>
  <div class="p-8 max-w-6xl mx-auto">
    <h1 class="text-3xl font-bold mb-8">Color Palette</h1>

    <!-- Brand Colors -->
    <BaseColors
      section-id="brand"
      section-type="brand"
      title="Brand Colors"
      subtitle="Primary brand identity colors"
      :colors="brandColors"
    />

    <!-- Semantic Colors -->
    <BaseColors
      section-id="semantic"
      section-type="semantic"
      title="Semantic Colors"
      subtitle="Status and feedback colors"
      :colors="semanticColors"
    />
  </div>
</template>
