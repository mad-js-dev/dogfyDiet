<template>
  <div :id="`${sectionId}-section`" class="pantone-section">
    <div class="pantone-tab" :class="sectionType">{{ sectionType }}</div>
    <div class="pantone-content">
      <div class="pantone-header">
        <h3 class="pantone-title">{{ title }}</h3>
        <p class="pantone-subtitle">{{ subtitle }}</p>
      </div>
      <div class="pantone-swatches-container">
        <div class="swatches-row">
          <div 
            v-for="(color, index) in colors" 
            :key="`${sectionId}-${index}`"
            class="pantone-swatch-page"
          >
            <div 
              class="pantone-color-display" 
              :style="{ backgroundColor: color.value, color: getTextColor(color.value) }"
            ></div>
            <div class="pantone-color-info">
              <p class="pantone-color-name">
                {{ color.name }}
              </p>
              <p class="pantone-color-code">
                {{ color.value }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface ColorData {
  name: string
  value: string
  cssVar?: string
}

interface Props {
  sectionId: string
  sectionType: 'brand' | 'neutral' | 'semantic'
  title: string
  subtitle: string
  colors: ColorData[]
}

defineProps<Props>()

// Helper function to determine text color based on background
function getTextColor(backgroundColor: string): string {
  // Simple luminance calculation
  const hex = backgroundColor.replace('#', '')
  const r = parseInt(hex.substr(0, 2), 16)
  const g = parseInt(hex.substr(2, 2), 16)
  const b = parseInt(hex.substr(4, 2), 16)
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255
  return luminance > 0.5 ? '#1a1a1a' : '#ffffff'
}

</script>

<style scoped lang="scss">
@use '~/assets/styles/_variables.scss' as *;
@use '~/assets/styles/_mixins.scss' as *;

// Import the same styles that were used in the original design-system page
@use '~/assets/styles/components/pantone.scss';

.swatches-row {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  gap: 1rem;
  overflow-x: auto;
  padding-bottom: 1rem;
}
</style>
