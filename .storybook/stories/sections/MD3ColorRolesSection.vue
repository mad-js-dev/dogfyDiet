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
        <input type="radio" v-model="selectedTheme" name="theme" value="light" checked />
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

// Helper function to resolve CSS variables to hex values
function resolveCssVar(cssVar: string): string {
  // Map CSS variables to their hex values from generated palette
  const cssVarMap: { [key: string]: string } = {
    // Primary green
    '--primary-green-0': '#000000', '--primary-green-10': '#010a07', '--primary-green-20': '#000000', '--primary-green-30': '#001d13',
    '--primary-green-40': '#005036', '--primary-green-50': '#008358', '--primary-green-60': '#00B67A', '--primary-green-70': '#03ffac',
    '--primary-green-80': '#50ffc5', '--primary-green-90': '#93ecce', '--primary-green-95': '#ace2d0', '--primary-green-98': '#d0e2dc',
    '--primary-green-99': '#e8edeb', '--primary-green-100': '#ffffff',
    // Shortened names for dark theme
    '--primary-0': '#000000', '--primary-10': '#010a07', '--primary-20': '#000000', '--primary-30': '#001d13',
    '--primary-40': '#005036', '--primary-50': '#008358', '--primary-60': '#00B67A', '--primary-70': '#03ffac',
    '--primary-80': '#50ffc5', '--primary-90': '#93ecce', '--primary-95': '#ace2d0', '--primary-98': '#d0e2dc',
    '--primary-99': '#e8edeb', '--primary-100': '#ffffff',
    // Accent orange
    '--accent-orange-0': '#000000', '--accent-orange-10': '#090301', '--accent-orange-20': '#491509', '--accent-orange-30': '#90280e',
    '--accent-orange-40': '#c03311', '--accent-orange-50': '#eb4319', '--accent-orange-60': '#ef6948', '--accent-orange-70': '#f5a38e',
    '--accent-orange-80': '#fbdcd5', '--accent-orange-90': '#e5a99a', '--accent-orange-95': '#dcbab1', '--accent-orange-98': '#dfd5d2',
    '--accent-orange-99': '#eceae9', '--accent-orange-100': '#ffffff',
    // Accent yellow
    '--accent-yellow-0': '#000000', '--accent-yellow-10': '#0a0801', '--accent-yellow-20': '#191401', '--accent-yellow-30': '#654f01',
    '--accent-yellow-40': '#997800', '--accent-yellow-50': '#cca000', '--accent-yellow-60': '#ffc800', '--accent-yellow-70': '#ffd94d',
    '--accent-yellow-80': '#ffe999', '--accent-yellow-90': '#ecd993', '--accent-yellow-95': '#e2d6ac', '--accent-yellow-98': '#e2ded0',
    '--accent-yellow-99': '#edece8', '--accent-yellow-100': '#ffffff',
    // Neutral
    '--neutral-0': '#000000', '--neutral-10': '#060505', '--neutral-20': '#030303', '--neutral-30': '#2a2a2a',
    '--neutral-40': '#434343', '--neutral-50': '#5d5d5d', '--neutral-60': '#767676', '--neutral-70': '#9c9c9c',
    '--neutral-80': '#c3c3c3', '--neutral-90': '#c4baba', '--neutral-95': '#cac4c4', '--neutral-98': '#dad8d8',
    '--neutral-99': '#ebeaea', '--neutral-100': '#ffffff',
    // Semantic colors
    '--success-0': '#000000', '--success-10': '#010904', '--success-20': '#000000', '--success-30': '#02190b',
    '--success-40': '#044a1e', '--success-50': '#077a32', '--success-60': '#0aaa46', '--success-70': '#10f164',
    '--success-80': '#58f593', '--success-90': '#98e7b5', '--success-95': '#b0dec1', '--success-98': '#d1e0d7',
    '--success-99': '#e9ecea', '--success-100': '#ffffff',
    '--error-0': '#000000', '--error-10': '#0a0101', '--error-20': '#000000', '--error-30': '#3e0101',
    '--error-40': '#720002', '--error-50': '#a50002', '--error-60': '#d80003', '--error-70': '#ff2529',
    '--error-80': '#ff7274', '--error-90': '#ec9394', '--error-95': '#e2acad', '--error-98': '#e2d0d0',
    '--error-99': '#ede8e8', '--error-100': '#ffffff',
    '--warning-0': '#000000', '--warning-10': '#0a0801', '--warning-20': '#191401', '--warning-30': '#654f01',
    '--warning-40': '#997800', '--warning-50': '#cca000', '--warning-60': '#ffc800', '--warning-70': '#ffd94d',
    '--warning-80': '#ffe999', '--warning-90': '#ecd993', '--warning-95': '#e2d6ac', '--warning-98': '#e2ded0',
    '--warning-99': '#edece8', '--warning-100': '#ffffff',
    '--info-0': '#000000', '--info-10': '#020509', '--info-20': '#010305', '--info-30': '#0a2948',
    '--info-40': '#0e4377', '--info-50': '#145ca4', '--info-60': '#1976d2', '--info-70': '#4e9cea',
    '--info-80': '#92c2f2', '--info-90': '#9cbfe2', '--info-95': '#b3c7db', '--info-98': '#d3d9df',
    '--info-99': '#e9ebec', '--info-100': '#ffffff'
  };
  
  return cssVarMap[cssVar] || cssVar;
}

// Derive brand color hex values from JSON palette data
function getBrandColorHex() {
  const brandColors: { [key: string]: { [key: string]: string } } = {};
  const currentTheme = selectedTheme?.value || 'light'
  const themeData = currentTheme === 'dark' ? paletteData['dark-roles'] : paletteData['light-roles']
  
  // Use JSON data and resolve CSS variables to hex values
  brandColors.surface = {
    main: resolveCssVar(themeData.neutral.surface.regular),
    on: resolveCssVar(themeData.neutral['on-surface'].regular),
    container: resolveCssVar(themeData.neutral['surface-variant'].regular),
    'on-container': resolveCssVar(themeData.neutral['on-surface-variant'].regular)
  };

  brandColors.primary = {
    main: resolveCssVar(themeData.primary.main),
    on: resolveCssVar(themeData.primary.on),
    container: resolveCssVar(themeData.primary.container),
    'on-container': resolveCssVar(themeData.primary['on-container'])
  };

  brandColors.secondary = {
    main: resolveCssVar(themeData.secondary.main),
    on: resolveCssVar(themeData.secondary.on),
    container: resolveCssVar(themeData.secondary.container),
    'on-container': resolveCssVar(themeData.secondary['on-container'])
  };

  brandColors.tertiary = {
    main: resolveCssVar(themeData.tertiary.main),
    on: resolveCssVar(themeData.tertiary.on),
    container: resolveCssVar(themeData.tertiary.container),
    'on-container': resolveCssVar(themeData.tertiary['on-container'])
  };

  return brandColors;
}

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

  // Define hex values for semantic colors by resolving CSS variables
  const semanticHexValues = {
    success: {
      base: resolveCssVar(semanticData.success.base),
      on: resolveCssVar(semanticData.success.on),
      container: resolveCssVar(semanticData.success.container),
      'on-container': resolveCssVar(semanticData.success['on-container'])
    },
    error: {
      base: resolveCssVar(semanticData.error.base),
      on: resolveCssVar(semanticData.error.on),
      container: resolveCssVar(semanticData.error.container),
      'on-container': resolveCssVar(semanticData.error['on-container'])
    },
    warning: {
      base: resolveCssVar(semanticData.warning.base),
      on: resolveCssVar(semanticData.warning.on),
      container: resolveCssVar(semanticData.warning.container),
      'on-container': resolveCssVar(semanticData.warning['on-container'])
    },
    info: {
      base: resolveCssVar(semanticData.info.base),
      on: resolveCssVar(semanticData.info.on),
      container: resolveCssVar(semanticData.info.container),
      'on-container': resolveCssVar(semanticData.info['on-container'])
    }
  }

  // Generate grid for each row
  colorRows.forEach(row => {
    grid[row.key] = {}
    semanticColumns.forEach(column => {
      const semanticKey = column.key
      // Map role names to JSON structure
      let roleKey = row.key
      if (row.key === 'main') roleKey = 'base'
      
      const cssVar = `--md3-${semanticKey}${row.key === 'main' ? '' : '-' + row.key}`
      const resolvedValue = semanticHexValues[semanticKey as keyof typeof semanticHexValues]?.[roleKey as keyof typeof semanticHexValues.success] || '#000000'
      
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
