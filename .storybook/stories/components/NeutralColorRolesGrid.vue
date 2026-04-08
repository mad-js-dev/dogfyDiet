<template>
  <div class="neutral-color-roles-grid">
    <!-- Row 1: All Surfaces -->
    <div class="neutral-color-row">
      <div 
        v-for="surface in surfaces" 
        :key="surface.key"
        class="neutral-color-cell"
      >
        <div 
          class="neutral-color-unified" 
          :style="getColorStyle(surface)"
        >
          <div class="neutral-color-content">
            <div 
              class="neutral-color-label" 
              :style="{ color: getTextColor(surface) }"
            >
              {{ surface.label }}
            </div>
            <div 
              class="neutral-color-details" 
              :style="{ color: getTextColor(surface) }"
            >
              <div class="neutral-color-hex">{{ surface.resolvedValue }}</div>
              <div v-if="surface.value" class="neutral-color-css-var">
                {{ surface.value }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Row 2: All Containers -->
    <div class="neutral-color-row">
      <div 
        v-for="container in containers" 
        :key="container.key"
        class="neutral-color-cell"
      >
        <div 
          class="neutral-color-unified" 
          :style="getColorStyle(container)"
        >
          <div class="neutral-color-content">
            <div 
              class="neutral-color-label" 
              :style="{ color: getTextColor(container) }"
            >
              {{ container.label }}
            </div>
            <div 
              class="neutral-color-details" 
              :style="{ color: getTextColor(container) }"
            >
              <div class="neutral-color-hex">{{ container.resolvedValue }}</div>
              <div v-if="container.value" class="neutral-color-css-var">
                {{ container.value }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Row 3: OnSurface, Variant, Outline, Outline-Variant -->
    <div class="neutral-color-row">
      <div 
        v-for="item in thirdRowItems" 
        :key="item.key"
        class="neutral-color-cell"
      >
        <div 
          class="neutral-color-unified" 
          :style="getColorStyle(item)"
        >
          <div class="neutral-color-content">
            <div 
              class="neutral-color-label" 
              :style="{ color: getTextColor(item, true) }"
            >
              {{ item.label }}
            </div>
            <div 
              class="neutral-color-details" 
              :style="{ color: getTextColor(item, true) }"
            >
              <div class="neutral-color-hex">{{ item.resolvedValue }}</div>
              <div v-if="item.value" class="neutral-color-css-var">
                {{ item.value }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface ColorData {
  label: string
  value: string
  resolvedValue: string
  cssVar: string
}

interface Props {
  neutralData: {
    surfaces: ColorData[]
    containers: ColorData[]
    thirdRow: ColorData[]
  }
}

const props = defineProps<Props>()

const surfaces = props.neutralData.surfaces
const containers = props.neutralData.containers
const thirdRowItems = props.neutralData.thirdRow

// Helper function to determine text color based on background
function getTextColor(colorData: ColorData, isThirdRow: boolean = false): string {
  if (!colorData) {
    return '#1a1a1a';
  }

  // Force white text for third row
  if (isThirdRow) {
    return '#ffffff';
  }

  const hex = colorData.resolvedValue?.replace('#', '') || 'ffffff';
  
  if (!hex || hex.length !== 6) {
    return '#1a1a1a';
  }
  
  const r = parseInt(hex.substr(0, 2), 16);
  const g = parseInt(hex.substr(2, 2), 16);
  const b = parseInt(hex.substr(4, 2), 16);
  
  if (isNaN(r) || isNaN(g) || isNaN(b)) {
    return '#1a1a1a';
  }
  
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  
  return luminance > 0.35 ? '#000000' : '#ffffff';
}

// Helper function to get color style with border for white colors
function getColorStyle(colorData: ColorData) {
  const baseStyle = { backgroundColor: colorData.resolvedValue }
  
  if (colorData.resolvedValue === '#ffffff' || colorData.resolvedValue === '#f7f7f7' || colorData.resolvedValue === '#fff5d6' || colorData.resolvedValue === '#e3f2fd' || colorData.resolvedValue === '#fef1f1') {
    return { ...baseStyle, border: '1px solid #e0e0e0' }
  }
  
  return baseStyle
}
</script>

<style scoped lang="scss">
@use '~/assets/styles/_variables.scss' as *;
@use '~/assets/styles/_mixins.scss' as *;

.neutral-color-roles-grid {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.neutral-color-row {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.neutral-color-cell {
  flex: 1;
  min-width: 120px;
}

.neutral-color-unified {
  border-radius: 0.5rem;
  padding: 1rem;
  min-height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.2s ease;
  
  &:hover {
    transform: scale(1.02);
  }
}

.neutral-color-content {
  text-align: center;
}

.neutral-color-label {
  font-weight: 600;
  font-size: 0.875rem;
  margin-bottom: 0.5rem;
}

.neutral-color-details {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.neutral-color-hex {
  font-size: 0.75rem;
  font-family: 'Courier New', monospace;
  opacity: 0.9;
}

.neutral-color-css-var {
  font-size: 0.7rem;
  font-family: 'Courier New', monospace;
  opacity: 0.7;
  word-break: break-all;
}
</style>
