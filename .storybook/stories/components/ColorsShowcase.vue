<script setup lang="ts">
import paletteData from '../../../assets/styles/colors/palette.json'
import ColorSection from './ColorSection.vue'

// Format color name for display (e.g., "primary-green" -> "Primary Green")
function formatColorName(name: string): string {
  return name
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

// Transform base colors into ColorSection format
function transformBaseColors(colors: Record<string, string>, prefix: string) {
  // Map base color names to their CSS variable names
  const colorNameMap: Record<string, string> = {
    'primary-green': 'primary-green-60',
    'accent-orange': 'accent-orange-60',
    'accent-yellow': 'accent-yellow-60',
    'neutral': 'neutral-60',
    'success': 'success-60',
    'error': 'error-60',
    'warning': 'warning-60',
    'info': 'info-60'
  }
  
  return Object.entries(colors).map(([key, value]) => ({
    name: formatColorName(key),
    value,
    cssVar: `--${colorNameMap[key] || key}`
  }))
}

const brandColors = transformBaseColors(paletteData['base-brand-colors'], 'base-brand')
const semanticColors = transformBaseColors(paletteData['base-semantic-colors'], 'base-semantic')

// Get flat list of light theme roles for display
const lightRoles = Object.entries(paletteData['light-roles']).flatMap(([category, roles]) => {
  if (category === 'neutral') {
    return Object.entries(roles as Record<string, Record<string, string>>).flatMap(([subCategory, subRoles]) =>
      Object.entries(subRoles).map(([role, value]) => ({
        name: `--${category}-${subCategory}-${role}`,
        value
      }))
    )
  }
  return Object.entries(roles as Record<string, string>).map(([role, value]) => ({
    name: `--${category}-${role}`,
    value
  }))
})
</script>

<template>
  <div class="p-8 max-w-6xl mx-auto">
    <h1 class="text-3xl font-bold mb-8">Color Palette</h1>

    <!-- Brand Colors -->
    <ColorSection
      section-id="brand"
      section-type="brand"
      title="Brand Colors"
      subtitle="Primary brand identity colors"
      :colors="brandColors"
    />

    <!-- Semantic Colors -->
    <ColorSection
      section-id="semantic"
      section-type="semantic"
      title="Semantic Colors"
      subtitle="Status and feedback colors"
      :colors="semanticColors"
    />

    <!-- Light Theme Roles -->
    <section class="mb-12">
      <h2 class="text-xl font-semibold mb-4">Light Theme Roles</h2>
      <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
        <div
          v-for="role in lightRoles"
          :key="role.name"
          class="space-y-2"
        >
          <div
            class="h-12 rounded-lg border"
            :style="{ background: role.value }"
          ></div>
          <p class="text-xs font-medium">{{ role.name }}</p>
        </div>
      </div>
    </section>
  </div>
</template>
