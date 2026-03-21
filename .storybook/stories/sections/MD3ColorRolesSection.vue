<template>
  <section class="md3-color-roles-section">
    <h2 class="md3-section-title">Material Design 3 Color Roles</h2>
    <p class="md3-section-description">Semantic color mappings following M3 guidelines for consistent UI design.</p>

    <!-- General Concepts -->
    <div class="md3-concepts-section">
      <h3 class="md3-concepts-title">General Concepts</h3>
      <p class="md3-concepts-description">Here are helpful-to-know words you'll see in the names of color roles:</p>
      <div class="md3-concepts-list">
        <div class="md3-concept-item">
          <span class="md3-concept-term">Surface: </span>
          <span>A role used for backgrounds and large, low-emphasis areas of the screen.</span>
        </div>
        <div class="md3-concept-item">
          <span class="md3-concept-term">Primary, Secondary, Tertiary: </span>
          <span>Accent color roles used to emphasize or de-emphasize foreground elements.</span>
        </div>
        <div class="md3-concept-item">
          <span class="md3-concept-term">Container: </span>
          <span>Roles used as a fill color for foreground elements like buttons. They should not be used for text or icons.</span>
        </div>
        <div class="md3-concept-item">
          <span class="md3-concept-term">On: </span>
          <span>Roles starting with this term indicate a color for text or icons on top of its paired parent color. For example, on primary is used for text and icons against the primary fill color.</span>
        </div>
        <div class="md3-concept-item">
          <span class="md3-concept-term">Variant: </span>
          <span>Roles ending with this term offer a lower emphasis alternative to its non-variant pair. For example, outline variant is a less emphasized version of the outline color.</span>
        </div>
      </div>
    </div>

    <div class="theme-selector">
      <label class="radio-option">
        <input type="radio" v-model="selectedTheme" value="light" />
        <span>Light Theme</span>
      </label>
      <label class="radio-option">
        <input type="radio" v-model="selectedTheme" value="dark" />
        <span>Dark Theme</span>
      </label>
    </div>

    <div>
      <pre>{{ JSON.stringify(displayedBrandRoles, null, 2) }}</pre>
    </div>

    <!-- Brand & Surface Colors Grid -->
    <ColorRolesGrid
      :columns="brandColumns"
      :rows="colorRows"
      :color-grid="brandColorGrid"
    />

    <!-- Semantic Colors Grid -->
    <ColorRolesGrid
      :columns="semanticColumns"
      :rows="colorRows"
      :color-grid="semanticColorGrid"
    />
  </section>
</template>

<script setup lang="ts">
import ColorRolesGrid from '../components/ColorRolesGrid.vue'
import { semanticRoles, tonalPalettes, brandRoles } from '~/assets/styles/colors/palette.js'
import { computed, ref } from 'vue'

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

// Column definitions
const brandColumns: Column[] = [
  { key: 'surface', label: 'Surface' },
  { key: 'primary', label: 'Primary' },
  { key: 'secondary', label: 'Secondary' },
  { key: 'tertiary', label: 'Tertiary' }
]

const semanticColumns: Column[] = [
  { key: 'error', label: 'Error' },
  { key: 'success', label: 'Success' },
  { key: 'warning', label: 'Warning' },
  { key: 'info', label: 'Info' }
]

// Row definitions
const colorRows: Row[] = [
  { key: 'base', label: 'Base' },
  { key: 'on', label: 'On' },
  { key: 'container', label: 'Container' },
  { key: 'onContainer', label: 'On Container' }
]

// Derive brand color hex values from tonalPalettes (matching the SCSS get-md3-color values)
function getBrandColorHex() {
  const brandColors: { [key: string]: { [key: string]: string } } = {};

  // Find tonal palettes for brand colors
  const primaryGreenPalette = tonalPalettes.find(p => p.key === 'primary-green');
  const accentOrangePalette = tonalPalettes.find(p => p.key === 'accent-orange');
  const accentYellowPalette = tonalPalettes.find(p => p.key === 'accent-yellow');
  const neutralPalette = tonalPalettes.find(p => p.key === 'neutral');

  if (neutralPalette) {
    brandColors.surface = {
      base: neutralPalette.tones.find(t => t.value === 90)?.hex || '#e6e6e6',
      on: neutralPalette.tones.find(t => t.value === 10)?.hex || '#1a1a1a',
      container: neutralPalette.tones.find(t => t.value === 70)?.hex || '#b3b3b3',
      onContainer: neutralPalette.tones.find(t => t.value === 50)?.hex || '#808080'
    };
  }

  if (primaryGreenPalette) {
    brandColors.primary = {
      base: primaryGreenPalette.tones.find(t => t.value === 40)?.hex || '#00cc89',
      on: primaryGreenPalette.tones.find(t => t.value === 100)?.hex || '#ffffff',
      container: primaryGreenPalette.tones.find(t => t.value === 90)?.hex || '#deede8',
      onContainer: primaryGreenPalette.tones.find(t => t.value === 10)?.hex || '#12211c'
    };
  }

  if (accentOrangePalette) {
    brandColors.secondary = {
      base: accentOrangePalette.tones.find(t => t.value === 40)?.hex || '#bc3210',
      on: accentOrangePalette.tones.find(t => t.value === 100)?.hex || '#ffffff',
      container: accentOrangePalette.tones.find(t => t.value === 90)?.hex || '#ece2df',
      onContainer: accentOrangePalette.tones.find(t => t.value === 10)?.hex || '#201613'
    };
  }

  if (accentYellowPalette) {
    brandColors.tertiary = {
      base: accentYellowPalette.tones.find(t => t.value === 40)?.hex || '#cca000',
      on: accentYellowPalette.tones.find(t => t.value === 100)?.hex || '#ffffff',
      container: accentYellowPalette.tones.find(t => t.value === 90)?.hex || '#edeade',
      onContainer: accentYellowPalette.tones.find(t => t.value === 10)?.hex || '#211e12'
    };
  }

  return brandColors;
}

const brandColorHex = getBrandColorHex();

// Generate brand & surface color grid data dynamically
function generateBrandColorGrid() {
  const grid: ColorGrid = {}

  // Generate the grid for each row
  colorRows.forEach(row => {
    grid[row.key] = {}
    brandColumns.forEach(column => {
      let varSuffix = column.key
      if (column.key === 'surface') {
        if (row.key === 'base') {
          varSuffix = 'surface'
        } else if (row.key === 'on') {
          varSuffix = 'on-surface'
        } else if (row.key === 'container') {
          varSuffix = 'surface-variant'
        } else if (row.key === 'onContainer') {
          varSuffix = 'on-surface-variant'
        }
      }
      const cssVar = `--md3-roles-${column.key === 'primary' ? 'primarygreen' : column.key === 'secondary' ? 'accentorange' : column.key === 'tertiary' ? 'accentyellow' : 'neutral'}-${varSuffix}`
      grid[row.key][column.key] = {
        label: `${column.label}${row.key === 'base' ? '' : ' ' + row.label}`,
        value: cssVar,
        resolvedValue: brandColorHex[column.key][row.key],
        sassVar: `get-md3-color('${varSuffix}')`
      }
    })
  })

  return grid
}

const brandColorGrid: ColorGrid = generateBrandColorGrid()

// Generate semantic color grid data dynamically
function generateSemanticColorGrid() {
  const grid: ColorGrid = {}

  // Generate the grid for each row
  colorRows.forEach(row => {
    grid[row.key] = {}
    semanticColumns.forEach(column => {
      const roleKey = row.key as keyof typeof semanticRoles.error
      grid[row.key][column.key] = {
        label: `${column.label}${row.key === 'base' ? '' : ' ' + row.label}`,
        value: `--md3-${column.key}${row.key === 'base' ? '' : '-' + row.key})`,
        resolvedValue: semanticRoles[column.key][roleKey]
      }
    })
  })

  return grid
}

const semanticColorGrid: ColorGrid = generateSemanticColorGrid()

// Theme selection
const selectedTheme = ref('light')

// Computed property to extract only the light version of brandRoles with updated CSS vars
const lightBrandRoles = computed(() => {
  const lightRoles: any = {}
  Object.entries(brandRoles).forEach(([colorKey, colorData]) => {
    lightRoles[colorKey] = colorData.light
  })
  return lightRoles
})

// Computed property to extract only the dark version of brandRoles
const darkBrandRoles = computed(() => {
  const darkRoles: any = {}
  Object.entries(brandRoles).forEach(([colorKey, colorData]) => {
    darkRoles[colorKey] = colorData.dark
  })
  return darkRoles
})

// Computed property to display the appropriate theme roles based on selection
const displayedBrandRoles = computed(() => {
  return selectedTheme.value === 'dark' ? darkBrandRoles.value : lightBrandRoles.value
})

// Set CSS custom properties for semantic color roles
import { onMounted } from 'vue'
onMounted(() => {
  const root = document.documentElement
  Object.entries(semanticRoles).forEach(([semantic, roles]) => {
    root.style.setProperty(`--md3-${semantic}`, roles.base)
    root.style.setProperty(`--md3-on-${semantic}`, roles.on)
    root.style.setProperty(`--md3-${semantic}-container`, roles.container)
    root.style.setProperty(`--md3-on-${semantic}-container`, roles.onContainer)
  })
})

</script>

<style scoped lang="scss">
@use 'sass:map';
@use '~/assets/styles/_variables.scss' as *;
@use '../../../assets/styles/colors/_palette.scss' as *;
@use '~/assets/styles/_mixins.scss' as *;

// Import the same styles that were used in the original design-system page
@use '~/assets/styles/components/pantone.scss';

.md3-color-roles-section {
  margin-bottom: 4rem;
  padding: 0 1.5rem;
}

.md3-section-title {
  font-size: 2rem;
  font-weight: 700;
  color: palette-color('neutral', 10);
  margin-bottom: 1rem;
}

.md3-section-description {
  font-size: 1rem;
  color: palette-color('neutral', 50);
  line-height: 1.6;
  margin-bottom: 2rem;
}

.md3-concepts-section {
  margin-bottom: 2rem;
  padding: 1.5rem;
  background-color: palette-color('neutral', 95);
  border-radius: 0.5rem;
  border: 1px solid palette-color('neutral', 80);
}

.md3-concepts-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: palette-color('neutral', 10);
  margin-bottom: 1rem;
}

.md3-concepts-description {
  font-size: 0.875rem;
  color: palette-color('neutral', 50);
  line-height: 1.6;
  margin-bottom: 1rem;
}

.md3-concepts-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.md3-concept-item {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
}

.md3-concept-term {
  font-weight: 600;
  color: map.get($brand-colors, 'primary');
  min-width: 6rem;
}

.theme-selector {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
  padding: 1rem;
  background-color: palette-color('neutral', 95);
  border-radius: 0.5rem;
  border: 1px solid palette-color('neutral', 80);
}

.radio-option {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  font-size: 0.875rem;
  color: palette-color('neutral', 30);
  
  input[type="radio"] {
    accent-color: map.get($brand-colors, 'primary');
  }
  
  &:hover {
    color: palette-color('neutral', 10);
  }
}
</style>

<style lang="scss">
@use 'sass:map';
@use '~/assets/styles/_variables.scss' as *;
@use '../../../assets/styles/colors/_palette.scss' as *;

/* Define CSS custom properties for brand color roles */
:root {
  --md3-surface: #{get-md3-color('surface')};
  --md3-on-surface: #{get-md3-color('on-surface')};
  --md3-surface-variant: #{get-md3-color('surface-variant')};
  --md3-on-surface-variant: #{get-md3-color('on-surface-variant')};
  --md3-primary: #{get-md3-color('primary')};
  --md3-on-primary: #{get-md3-color('on-primary')};
  --md3-primary-container: #{get-md3-color('primary-container')};
  --md3-on-primary-container: #{get-md3-color('on-primary-container')};
  --md3-secondary: #{get-md3-color('secondary')};
  --md3-on-secondary: #{get-md3-color('on-secondary')};
  --md3-secondary-container: #{get-md3-color('secondary-container')};
  --md3-on-secondary-container: #{get-md3-color('on-secondary-container')};
  --md3-tertiary: #{get-md3-color('tertiary')};
  --md3-on-tertiary: #{get-md3-color('on-tertiary')};
  --md3-tertiary-container: #{get-md3-color('tertiary-container')};
  --md3-on-tertiary-container: #{get-md3-color('on-tertiary-container')};

  --md3-error: #d80003;
  --md3-on-error: #ffffff;
  --md3-error-container: #fef1f1;
  --md3-on-error-container: #93000a;

  --md3-success: #0aaa46;
  --md3-on-success: #ffffff;
  --md3-success-container: #005128;
  --md3-on-success-container: #ffffff;

  --md3-warning: #ffc800;
  --md3-on-warning: #ffffff;
  --md3-warning-container: #fff5d6;
  --md3-on-warning-container: #000000;

  --md3-info: #1976d2;
  --md3-on-info: #ffffff;
  --md3-info-container: #e3f2fd;
  --md3-on-info-container: #0d47a1;
}
</style>
