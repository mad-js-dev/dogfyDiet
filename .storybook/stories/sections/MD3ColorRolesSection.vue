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

    <!-- Surface Variants Grid -->
    <div class="surface-variants-section">
      <h3 class="md3-subsection-title">Surface Variants (Neutral Colors)</h3>
      <p class="md3-subsection-description">Surface variants including dim, regular, bright, and inverse options.</p>
      <NeutralColorRolesGrid :neutral-data="neutralColorsData" />
    </div>

    <!-- Container Hierarchy Grid -->
    <div class="container-hierarchy-section">
      <h3 class="md3-subsection-title">Container Hierarchy (Neutral Colors)</h3>
      <p class="md3-subsection-description">5-level container elevation hierarchy from lowest to highest elevation levels.</p>
      <ColorRolesGrid
        :columns="containerColumns"
        :rows="containerRows"
        :color-grid="reactiveContainerGrid"
      />
    </div>

    <!-- Brand & Surface Colors Grid -->
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
import NeutralColorRolesGrid from '../components/NeutralColorRolesGrid.vue'
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

// Surface columns (M3 standard)
const surfaceColumns: Column[] = [
  { key: 'surface', label: 'Surface' }
]

// Surface container columns (M3 standard)
const containerColumns: Column[] = [
  { key: 'surface-container', label: 'Surface Container' }
]

// Surface rows (M3 standard - only surface roles)
const surfaceRows: Row[] = [
  { key: 'regular', label: 'Regular' },
  { key: 'dim', label: 'Dim' },
  { key: 'bright', label: 'Bright' }
]

// Surface container rows (M3 standard - container hierarchy)
const containerRows: Row[] = [
  { key: 'lowest', label: 'Lowest' },
  { key: 'low', label: 'Low' },
  { key: 'regular', label: 'Regular' },
  { key: 'high', label: 'High' },
  { key: 'highest', label: 'Highest' }
]

// Combined neutral rows (not used anymore - replaced by separate sections)
// const neutralRows: Row[] = [
//   { key: 'dim', label: 'Dim' },
//   { key: 'regular', label: 'Regular' },
//   { key: 'bright', label: 'Bright' },
//   { key: 'inverse', label: 'Inverse' },
//   { key: 'container-lowest', label: 'Container Lowest' },
//   { key: 'container-low', label: 'Container Low' },
//   { key: 'container', label: 'Container Regular' },
//   { key: 'container-high', label: 'Container High' },
//   { key: 'container-highest', label: 'Container Highest' }
// ]

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
  // Simply return the CSS variable name - let the browser resolve it to actual value
  return cssVar
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
    container: resolveCssVar(themeData.neutral['surface-container'].regular),
    'on-container': resolveCssVar(themeData.neutral['on-surface'].regular)
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

// Generate surface grid data dynamically using JSON (M3 standard)
function generateSurfaceGrid() {
  const grid: ColorGrid = {}
  const currentTheme = selectedTheme?.value || 'light'
  const themeData = currentTheme === 'dark' ? paletteData['dark-roles'] : paletteData['light-roles']

  // Generate grid for each surface row
  surfaceRows.forEach(row => {
    grid[row.key] = {}
    surfaceColumns.forEach(column => {
      let cssVar = ''
      let roleValue = ''
      
      // Map surface colors to neutral CSS variables from JSON (M3 standard)
      if (column.key === 'surface') {
        cssVar = `--md3-neutral-surface-${row.key}`
        roleValue = themeData.neutral.surface[row.key as keyof typeof themeData.neutral.surface]
      } else if (column.key === 'surface-variant') {
        cssVar = '--md3-neutral-surface-variant-regular'
        roleValue = themeData.neutral['surface-variant'].regular
      }
      
      if (cssVar && roleValue) {
        grid[row.key][column.key] = {
          label: `${column.label} ${row.label}`,
          value: cssVar,
          resolvedValue: resolveCssVar(roleValue),
          cssVar: roleValue
        }
      }
    })
  })

  return grid
}

// Make surfaceGrid reactive to theme changes
const reactiveSurfaceGrid = computed(() => generateSurfaceGrid())

// Generate surface container grid data dynamically using JSON (M3 standard)
function generateContainerGrid() {
  const grid: ColorGrid = {}
  const currentTheme = selectedTheme?.value || 'light'
  const themeData = currentTheme === 'dark' ? paletteData['dark-roles'] : paletteData['light-roles']

  // Generate grid for each surface container row
  containerRows.forEach(row => {
    grid[row.key] = {}
    containerColumns.forEach(column => {
      let cssVar = ''
      let roleValue = ''
      
      // Map surface container colors to neutral CSS variables from JSON (M3 standard)
      if (column.key === 'surface-container') {
        cssVar = `--md3-neutral-surface-container-${row.key}`
        roleValue = themeData.neutral['surface-container'][row.key as keyof typeof themeData.neutral['surface-container']]
      } else if (column.key === 'on-surface-container') {
        cssVar = `--md3-neutral-on-surface-container-${row.key}`
        roleValue = themeData.neutral['on-surface-container'][row.key as keyof typeof themeData.neutral['on-surface-container']]
      }
      
      grid[row.key][column.key] = {
        label: `${column.label} ${row.label}`,
        value: cssVar,
        resolvedValue: resolveCssVar(roleValue),
        cssVar: roleValue
      }
    })
  })

  return grid
}

// Make containerGrid reactive to theme changes
const reactiveContainerGrid = computed(() => generateContainerGrid())

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
        if (row.key === 'main') {
          cssVar = `--md3-neutral-surface-regular`
          roleValue = themeData.neutral.surface.regular
        } else if (row.key === 'on') {
          cssVar = `--md3-neutral-on-surface-regular`
          roleValue = themeData.neutral['on-surface'].regular
        } else if (row.key === 'container') {
          cssVar = `--md3-neutral-surface-container-regular`
          roleValue = themeData.neutral['surface-container'].regular
        } else if (row.key === 'on-container') {
          cssVar = `--md3-neutral-on-surface-regular`
          roleValue = themeData.neutral['on-surface'].regular
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

// Generate neutral colors data for the new NeutralColorRolesGrid component
const neutralColorsData = computed(() => {
  const currentTheme = selectedTheme?.value || 'light'
  const themeData = currentTheme === 'dark' ? paletteData['dark-roles'] : paletteData['light-roles']
  
  // Row 1: All surfaces (dim, regular, bright) - note: inverse doesn't exist in the data
  const surfaces = [
    {
      key: 'surface-dim',
      label: 'Surface Dim',
      value: `--md3-neutral-surface-dim`,
      resolvedValue: resolveCssVar(themeData.neutral.surface.dim),
      cssVar: themeData.neutral.surface.dim
    },
    {
      key: 'surface-regular',
      label: 'Surface Regular',
      value: `--md3-neutral-surface-regular`,
      resolvedValue: resolveCssVar(themeData.neutral.surface.regular),
      cssVar: themeData.neutral.surface.regular
    },
    {
      key: 'surface-bright',
      label: 'Surface Bright',
      value: `--md3-neutral-surface-bright`,
      resolvedValue: resolveCssVar(themeData.neutral.surface.bright),
      cssVar: themeData.neutral.surface.bright
    }
  ]
  
  // Row 2: All containers (lowest, low, regular, high, highest)
  const containers = [
    {
      key: 'container-lowest',
      label: 'Container Lowest',
      value: `--md3-neutral-surface-container-lowest`,
      resolvedValue: resolveCssVar(themeData.neutral['surface-container'].lowest),
      cssVar: themeData.neutral['surface-container'].lowest
    },
    {
      key: 'container-low',
      label: 'Container Low',
      value: `--md3-neutral-surface-container-low`,
      resolvedValue: resolveCssVar(themeData.neutral['surface-container'].low),
      cssVar: themeData.neutral['surface-container'].low
    },
    {
      key: 'container-regular',
      label: 'Container Regular',
      value: `--md3-neutral-surface-container-regular`,
      resolvedValue: resolveCssVar(themeData.neutral['surface-container'].regular),
      cssVar: themeData.neutral['surface-container'].regular
    },
    {
      key: 'container-high',
      label: 'Container High',
      value: `--md3-neutral-surface-container-high`,
      resolvedValue: resolveCssVar(themeData.neutral['surface-container'].high),
      cssVar: themeData.neutral['surface-container'].high
    },
    {
      key: 'container-highest',
      label: 'Container Highest',
      value: `--md3-neutral-surface-container-highest`,
      resolvedValue: resolveCssVar(themeData.neutral['surface-container'].highest),
      cssVar: themeData.neutral['surface-container'].highest
    }
  ]
  
  // Row 3: onSurface, surface-variant, outline, outline-variant
  const thirdRow = [
    {
      key: 'on-surface',
      label: 'On Surface',
      value: `--md3-neutral-on-surface-regular`,
      resolvedValue: resolveCssVar(themeData.neutral['on-surface'].regular),
      cssVar: themeData.neutral['on-surface'].regular
    },
    {
      key: 'surface-variant',
      label: 'Surface Variant',
      value: `--md3-neutral-surface-variant-regular`,
      resolvedValue: resolveCssVar(themeData.neutral['surface-variant']?.regular || themeData.neutral['on-surface'].variant),
      cssVar: themeData.neutral['surface-variant']?.regular || themeData.neutral['on-surface'].variant
    },
    {
      key: 'outline',
      label: 'Outline',
      value: `--md3-neutral-outline-regular`,
      resolvedValue: resolveCssVar(themeData.neutral.outline.regular),
      cssVar: themeData.neutral.outline.regular
    },
    {
      key: 'outline-variant',
      label: 'Outline Variant',
      value: `--md3-neutral-outline-variant-regular`,
      resolvedValue: resolveCssVar(themeData.neutral.outline.variant),
      cssVar: themeData.neutral.outline.variant
    }
  ]
  
  return {
    surfaces,
    containers,
    thirdRow
  }
})

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

.surface-variants-section {
  margin-bottom: 3rem;
}

.container-hierarchy-section {
  margin-bottom: 3rem;
}

.md3-subsection-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: palette-color('neutral', 10);
  margin-bottom: 1rem;
}

.md3-subsection-description {
  font-size: 0.875rem;
  color: palette-color('neutral', 50);
  line-height: 1.6;
  margin-bottom: 2rem;
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
