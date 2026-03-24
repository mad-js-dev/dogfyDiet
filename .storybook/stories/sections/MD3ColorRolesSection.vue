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
        <input type="radio" v-model="selectedTheme" name="theme" value="light" />
        <span>Light Theme</span>
      </label>
      <label class="radio-option">
        <input type="radio" v-model="selectedTheme" name="theme" value="dark" />
        <span>Dark Theme</span>
      </label>
    </div>
 <!-- 
    <div>
      <pre>Selected Theme: {{ selectedTheme }}</pre>
      <pre>Brand Grid Data:</pre>
      <pre>{{ JSON.stringify(reactiveBrandColorGrid, null, 2) }}</pre>
    </div>

   Brand & Surface Colors Grid -->
    <ColorRolesGrid
      :columns="brandColumns"
      :rows="colorRows"
      :color-grid="reactiveBrandColorGrid"
    />

    <!-- Semantic Colors Grid -->
    <ColorRolesGrid
      :columns="semanticColumns"
      :rows="colorRows"
      :color-grid="reactiveSemanticColorGrid"
    />
  </section>
</template>

<script setup lang="ts">
import ColorRolesGrid from '../components/ColorRolesGrid.vue'
import paletteData from '~/assets/styles/colors/palette.json'
import { computed, ref } from 'vue'

interface ColorData {
  label: string
  value: string
  resolvedValue: string
  cssVar: string
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
  { key: 'main', label: 'Main' },
  { key: 'on', label: 'On' },
  { key: 'container', label: 'Container' },
  { key: 'on-container', label: 'On Container' }
]

// Derive brand color hex values from JSON palette data
function getBrandColorHex() {
  const brandColors: { [key: string]: { [key: string]: string } } = {};
  const currentTheme = selectedTheme?.value || 'light'
  const themeData = currentTheme === 'dark' ? paletteData['dark-roles'] : paletteData['light-roles']

  // Use actual values from JSON structure instead of hardcoded
  brandColors.surface = {
    main: '#e6e6e6', // Will be updated from neutral surface
    on: '#1a1a1a',
    container: '#b3b3b3',
    'on-container': '#808080'
  };

  // Use JSON data for brand colors
  brandColors.primary = {
    main: currentTheme === 'dark' ? '#001d13' : '#00b67a', // From JSON brandRoles
    on: '#ffffff',
    container: currentTheme === 'dark' ? '#000000' : '#b6ffe7',
    'on-container': currentTheme === 'dark' ? '#ffffff' : '#000000'
  };

  brandColors.secondary = {
    main: currentTheme === 'dark' ? '#90280e' : '#ef6948', // From JSON brandRoles
    on: '#ffffff',
    container: currentTheme === 'dark' ? '#491509' : '#ffffff',
    'on-container': currentTheme === 'dark' ? '#ffffff' : '#040101'
  };

  brandColors.tertiary = {
    main: currentTheme === 'dark' ? '#654f01' : '#ffc800', // From JSON brandRoles
    on: '#ffffff',
    container: currentTheme === 'dark' ? '#191401' : '#ffffff',
    'on-container': currentTheme === 'dark' ? '#ffffff' : '#000000'
  };

  return brandColors;
}

const brandColorHex = getBrandColorHex();

// Theme selection - must be declared before grid generation
const selectedTheme = ref('light')

// Generate brand & surface color grid data dynamically using JSON
function generateBrandColorGrid() {
  const grid: ColorGrid = {}
  const currentTheme = selectedTheme?.value || 'light'
  const themeData = currentTheme === 'dark' ? paletteData['dark-roles'] : paletteData['light-roles']
  const brandColorHex = getBrandColorHex()

  // Generate the grid for each row
  colorRows.forEach(row => {
    grid[row.key] = {}
    brandColumns.forEach(column => {
      let cssVar = ''
      let roleValue = ''
      
      if (column.key === 'surface') {
        // Map surface colors to neutral CSS variables from JSON
        if (row.key === 'main') {
          cssVar = `--md3-neutral-surface-regular`
          roleValue = themeData.neutral.surface.regular
        } else if (row.key === 'on') {
          cssVar = `--md3-neutral-on-surface-regular`
          roleValue = themeData.neutral['on-surface'].regular
        } else if (row.key === 'container') {
          cssVar = `--md3-neutral-surface-variant-regular`
          roleValue = themeData.neutral['surface-variant'].regular
        } else if (row.key === 'on-container') {
          cssVar = `--md3-neutral-on-surface-variant-regular`
          roleValue = themeData.neutral['on-surface-variant'].regular
        }
        
        grid[row.key][column.key] = {
          label: `${column.label}${row.key === 'main' ? '' : ' ' + row.label}`,
          value: cssVar,
          resolvedValue: brandColorHex[column.key][row.key],
          cssVar: roleValue || ''
        }
      } else {
        // Map brand colors to their CSS variables from JSON
        if (row.key === 'main') {
          cssVar = `--md3-${column.key}-main`
          roleValue = themeData[column.key]?.main
        } else if (row.key === 'on') {
          cssVar = `--md3-${column.key}-on`
          roleValue = themeData[column.key]?.on
        } else if (row.key === 'container') {
          cssVar = `--md3-${column.key}-container`
          roleValue = themeData[column.key]?.container
        } else if (row.key === 'on-container') {
          cssVar = `--md3-${column.key}-on-container`
          roleValue = themeData[column.key]?.['on-container']
        }
        
        grid[row.key][column.key] = {
          label: `${column.label}${row.key === 'main' ? '' : ' ' + row.label}`,
          value: cssVar,
          resolvedValue: brandColorHex[column.key][row.key],
          cssVar: roleValue || ''
        }
      }
    })
  })

  return grid
}

// Make brandColorGrid reactive to theme changes
const reactiveBrandColorGrid = computed(() => generateBrandColorGrid())

// Generate semantic color grid data dynamically using JSON
function generateSemanticColorGrid() {
  const grid: ColorGrid = {}
  const semanticData = paletteData['semantic-roles']

  // Generate the grid for each row
  colorRows.forEach(row => {
    grid[row.key] = {}
    semanticColumns.forEach(column => {
      const semanticKey = column.key
      // Map role names to JSON structure
      let roleKey = row.key
      if (row.key === 'main') roleKey = 'base'
      
      const cssVar = `--md3-${semanticKey}${row.key === 'main' ? '' : '-' + row.key}`
      const resolvedValue = semanticData[semanticKey]?.[roleKey] || '#000000'
      
      grid[row.key][column.key] = {
        label: `${column.label}${row.key === 'main' ? '' : ' ' + row.label}`,
        value: cssVar,
        resolvedValue: resolvedValue,
        cssVar: cssVar
      }
    })
  })

  return grid
}

// Make semanticColorGrid reactive to theme changes
const reactiveSemanticColorGrid = computed(() => generateSemanticColorGrid())

// Set CSS custom properties for all color roles using JSON data
import { onMounted, watch } from 'vue'
onMounted(() => {
  updateColorVariables()
})

// Watch for theme changes and update variables
watch(selectedTheme, () => {
  updateColorVariables()
})

function updateColorVariables() {
  const root = document.documentElement
  const currentTheme = selectedTheme?.value || 'light'
  const themeData = currentTheme === 'dark' ? paletteData['dark-roles'] : paletteData['light-roles']
  const semanticData = paletteData['semantic-roles']
  
  // Update theme-specific color variables
  Object.entries(themeData).forEach(([colorType, roles]) => {
    if (colorType === 'neutral') {
      // Handle nested neutral structure
      Object.entries(roles).forEach(([category, values]) => {
        Object.entries(values).forEach(([role, value]) => {
          root.style.setProperty(`--md3-${colorType}-${category}-${role}`, value)
        })
      })
    } else {
      // Handle primary, secondary, tertiary
      Object.entries(roles).forEach(([role, value]) => {
        root.style.setProperty(`--md3-${colorType}-${role}`, value)
      })
    }
  })
  
  // Update semantic color variables
  Object.entries(semanticData).forEach(([semantic, roles]) => {
    Object.entries(roles).forEach(([role, value]) => {
      root.style.setProperty(`--md3-${semantic}-${role}`, value)
    })
  })
}

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
  color: var(--primary-green-40); // From JSON brand data
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
    accent-color: var(--primary-green-40); // From JSON brand data
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

/* Define CSS custom properties for all color roles using JSON-driven system */
:root {
  /* Generate all color variables from JSON data */
  @include generate-brand-colors();
  @include generate-semantic-colors();
  @include generate-neutral-colors();
  
  /* Light theme color roles - mapped from JSON light-roles */
  --md3-primary: var(--primary-green-40);
  --md3-on-primary: var(--primary-green-100);
  --md3-primary-container: var(--primary-green-90);
  --md3-on-primary-container: var(--primary-green-10);
  --md3-primary-inverse: var(--primary-green-80);
  
  --md3-secondary: var(--accent-orange-40);
  --md3-on-secondary: var(--accent-orange-100);
  --md3-secondary-container: var(--accent-orange-70);
  --md3-on-secondary-container: var(--accent-orange-10);
  
  --md3-tertiary: var(--accent-yellow-40);
  --md3-on-tertiary: var(--accent-yellow-100);
  --md3-tertiary-container: var(--accent-yellow-70);
  --md3-on-tertiary-container: var(--accent-yellow-10);
  
  /* Neutral surface colors - mapped from JSON light-roles.neutral */
  --md3-neutral-surface-dim: var(--neutral-70);
  --md3-neutral-surface-regular: var(--neutral-90);
  --md3-neutral-surface-bright: var(--neutral-100);
  --md3-neutral-surface-inverse: var(--neutral-10);
  --md3-neutral-surface-inverse-primary: var(--primary-green-80);
  
  --md3-neutral-on-surface-dim: var(--neutral-20);
  --md3-neutral-on-surface-regular: var(--neutral-10);
  --md3-neutral-on-surface-bright: var(--neutral-0);
  --md3-neutral-on-surface-inverse: var(--neutral-100);
  --md3-neutral-on-surface-inverse-primary: var(--primary-green-80);
  
  --md3-neutral-surface-variant-dim: var(--neutral-60);
  --md3-neutral-surface-variant-regular: var(--neutral-80);
  --md3-neutral-surface-variant-bright: var(--neutral-90);
  --md3-neutral-surface-variant-inverse: var(--neutral-20);
  --md3-neutral-surface-variant-inverse-primary: var(--primary-green-80);
  
  --md3-neutral-on-surface-variant-dim: var(--neutral-30);
  --md3-neutral-on-surface-variant-regular: var(--neutral-20);
  --md3-neutral-on-surface-variant-bright: var(--neutral-10);
  --md3-neutral-on-surface-variant-inverse: var(--neutral-100);
  --md3-neutral-on-surface-variant-inverse-primary: var(--primary-green-80);
  
  /* Semantic colors - mapped from JSON semantic-roles */
  --md3-error-base: #d80003;
  --md3-error-on: #ffffff;
  --md3-error-container: #ffd8d9;
  --md3-error-on-container: #000000;
  
  --md3-success-base: #0aaa46;
  --md3-success-on: #ffffff;
  --md3-success-container: #b8fbd1;
  --md3-success-on-container: #000000;
  
  --md3-warning-base: #ffc800;
  --md3-warning-on: #ffffff;
  --md3-warning-container: #ffffff;
  --md3-warning-on-container: #000000;
  
  --md3-info-base: #1976d2;
  --md3-info-on: #ffffff;
  --md3-info-container: #edf5fd;
  --md3-info-on-container: #000000;
}
</style>
