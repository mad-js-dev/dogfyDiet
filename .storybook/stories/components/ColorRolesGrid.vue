<template>
  <div class="md3-color-roles-grid">
    <!-- Column Headers -->
    <div class="md3-column-headers">
      <div class="md3-column-header"></div>
      <div 
        v-for="column in columns" 
        :key="column.key"
        class="md3-column-header"
      >
        {{ column.label }}
      </div>
    </div>

    <!-- Color Rows -->
    <div 
      v-for="row in rows" 
      :key="row.key"
      class="md3-color-rows"
    >
      <div class="md3-row-label">{{ row.label }}</div>
      <div 
        v-for="column in columns" 
        :key="`${row.key}-${column.key}`"
        class="md3-color-cell"
      >
        <div 
          class="md3-color-unified" 
          :style="getColorStyle(getColorForCell(row.key, column.key))"
        >
          <div class="md3-color-content">
            <div 
              class="md3-color-label" 
              :style="{ color: getTextColor(getColorForCell(row.key, column.key).value) }"
            >
              {{ getColorForCell(row.key, column.key).label }}
            </div>
            <div 
              class="md3-color-details" 
              :style="{ color: getTextColor(getColorForCell(row.key, column.key).value) }"
            >
              <div class="md3-color-name">{{ getColorForCell(row.key, column.key).label }}</div>
              <div class="md3-color-hex">{{ getColorForCell(row.key, column.key).value }}</div>
              <div class="md3-color-var">{{ getColorForCell(row.key, column.key).sassVar }}</div>
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
  sassVar: string
}

interface Column {
  key: string
  label: string
}

interface Row {
  key: string
  label: string
}

interface ColorGrid {
  [rowKey: string]: {
    [columnKey: string]: ColorData
  }
}

interface Props {
  columns: Column[]
  rows: Row[]
  colorGrid: ColorGrid
}

const props = defineProps<Props>()

// Helper function to get color data for a specific cell
function getColorForCell(rowKey: string, columnKey: string): ColorData {
  return props.colorGrid[rowKey]?.[columnKey] || {
    label: '',
    value: '#ffffff',
    resolvedValue: '#ffffff',
    sassVar: ''
  }
}

// Helper function to determine text color based on background
function getTextColor(colorData: ColorData): string {
  // Handle undefined colorData
  if (!colorData) {
    return '#1a1a1a';
  }

  // Special handling for 'On' color roles - always use semi-transparent black
  if (colorData.label && colorData.label.startsWith('On ')) {
    return 'rgba(0, 0, 0, 0.6)';
  }

  // For other colors, determine based on background luminance
  const hex = colorData.value?.replace('#', '') || 'ffffff';
  const r = parseInt(hex.substr(0, 2), 16) || 255;
  const g = parseInt(hex.substr(2, 2), 16) || 255;
  const b = parseInt(hex.substr(4, 2), 16) || 255;
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.5 ? '#1a1a1a' : '#ffffff';
}

// Helper function to get color style with border for white colors
function getColorStyle(colorData: ColorData) {
  const baseStyle = { backgroundColor: colorData.value }
  
  // Add border for white/light colors to make them visible
  if (colorData.value === '#ffffff' || colorData.value === '#f7f7f7' || colorData.value === '#fff5d6' || colorData.value === '#e3f2fd' || colorData.value === '#fef1f1') {
    return { ...baseStyle, border: '1px solid #e0e0e0' }
  }
  
  return baseStyle
}
</script>

<style scoped lang="scss">
@use '~/assets/styles/_variables.scss' as *;
@use '~/assets/styles/_mixins.scss' as *;

// Import the same styles that were used in the original design-system page
@use '~/assets/styles/components/md3-color-roles.scss';
</style>
