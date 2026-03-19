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

// Brand & Surface color grid data
const brandColorGrid: ColorGrid = {
  base: {
    surface: { label: 'Surface', value: 'var(--md3-surface)', resolvedValue: '#ffffff', sassVar: '$md3-light-surface' },
    primary: { label: 'Primary', value: 'var(--md3-primary)', resolvedValue: '#00B67A', sassVar: 'map.get($md3-light-primary, "main")' },
    secondary: { label: 'Secondary', value: 'var(--md3-secondary)', resolvedValue: '#EF6948', sassVar: 'map.get($md3-light-secondary, "main")' },
    tertiary: { label: 'Tertiary', value: 'var(--md3-tertiary)', resolvedValue: '#ffca4e', sassVar: 'map.get($md3-light-tertiary, "main")' }
  },
  on: {
    surface: { label: 'On Surface', value: 'var(--md3-on-surface)', resolvedValue: '#1a1a1a', sassVar: '$md3-light-on-surface' },
    primary: { label: 'On Primary', value: 'var(--md3-on-primary)', resolvedValue: '#ffffff', sassVar: 'map.get($md3-light-primary, "on")' },
    secondary: { label: 'On Secondary', value: 'var(--md3-on-secondary)', resolvedValue: '#ffffff', sassVar: 'map.get($md3-light-secondary, "on")' },
    tertiary: { label: 'On Tertiary', value: 'var(--md3-on-tertiary)', resolvedValue: '#1a1a1a', sassVar: 'map.get($md3-light-tertiary, "on")' }
  },
  container: {
    surface: { label: 'Surface Variant', value: 'var(--md3-surface-variant)', resolvedValue: '#f7f7f7', sassVar: '$md3-light-surface-variant' },
    primary: { label: 'Primary Container', value: 'var(--md3-primary-container)', resolvedValue: '#B3E5CC', sassVar: 'map.get($md3-light-primary, "container")' },
    secondary: { label: 'Secondary Container', value: 'var(--md3-secondary-container)', resolvedValue: '#FFD4C4', sassVar: 'map.get($md3-light-secondary, "container")' },
    tertiary: { label: 'Tertiary Container', value: 'var(--md3-tertiary-container)', resolvedValue: '#fff5d6', sassVar: 'map.get($md3-light-tertiary, "container")' }
  },
  onContainer: {
    surface: { label: 'On Surface Variant', value: 'var(--md3-on-surface-variant)', resolvedValue: '#767676', sassVar: '$md3-light-on-surface-variant' },
    primary: { label: 'On Primary Container', value: 'var(--md3-on-primary-container)', resolvedValue: '#004D29', sassVar: 'map.get($md3-light-primary, "on-container")' },
    secondary: { label: 'On Secondary Container', value: 'var(--md3-on-secondary-container)', resolvedValue: '#5D2B1E', sassVar: 'map.get($md3-light-secondary, "on-container")' },
    tertiary: { label: 'On Tertiary Container', value: 'var(--md3-on-tertiary-container)', resolvedValue: '#cc8a00', sassVar: 'map.get($md3-light-tertiary, "on-container")' }
  }
}

// Semantic color grid data
const semanticColorGrid: ColorGrid = {
  base: {
    error: { label: 'Error', value: 'var(--md3-error)', resolvedValue: '#d80003', sassVar: '$md3-error' },
    success: { label: 'Success', value: 'var(--md3-success)', resolvedValue: '#0aaa46', sassVar: '$md3-success' },
    warning: { label: 'Warning', value: 'var(--md3-warning)', resolvedValue: '#ffc800', sassVar: '$md3-warning' },
    info: { label: 'Info', value: 'var(--md3-info)', resolvedValue: '#1976D2', sassVar: '$md3-info' }
  },
  on: {
    error: { label: 'On Error', value: 'var(--md3-on-error)', resolvedValue: '#ffffff', sassVar: '$md3-on-error' },
    success: { label: 'On Success', value: 'var(--md3-on-success)', resolvedValue: '#ffffff', sassVar: '$md3-on-success' },
    warning: { label: 'On Warning', value: 'var(--md3-on-warning)', resolvedValue: '#1a1a1a', sassVar: '$md3-on-warning' },
    info: { label: 'On Info', value: 'var(--md3-on-info)', resolvedValue: '#ffffff', sassVar: '$md3-on-info' }
  },
  container: {
    error: { label: 'Error Container', value: 'var(--md3-error-container)', resolvedValue: '#fef1f1', sassVar: '$md3-error-container' },
    success: { label: 'Success Container', value: 'var(--md3-success-container)', resolvedValue: '#005128', sassVar: '$md3-success-container' },
    warning: { label: 'Warning Container', value: 'var(--md3-warning-container)', resolvedValue: '#fff5d6', sassVar: '$md3-warning-container' },
    info: { label: 'Info Container', value: 'var(--md3-info-container)', resolvedValue: '#e3f2fd', sassVar: '$md3-info-container' }
  },
  onContainer: {
    error: { label: 'On Error Container', value: 'var(--md3-on-error-container)', resolvedValue: '#93000A', sassVar: '$md3-on-error-container' },
    success: { label: 'On Success Container', value: 'var(--md3-on-success-container)', resolvedValue: '#ffffff', sassVar: '$md3-on-success-container' },
    warning: { label: 'On Warning Container', value: 'var(--md3-on-warning-container)', resolvedValue: '#cc8a00', sassVar: '$md3-on-warning-container' },
    info: { label: 'On Info Container', value: 'var(--md3-on-info-container)', resolvedValue: '#0d47a1', sassVar: '$md3-on-info-container' }
  }
}
</script>

<style lang="scss">
@use '~/assets/styles/_css-variables.scss';
</style>

<style scoped lang="scss">
@use 'sass:map';
@use '~/assets/styles/_variables.scss' as *;
@use '~/assets/styles/_mixins.scss' as *;
@use '~/assets/styles/components/pantone.scss';
@use '~/assets/styles/components/md3-color-roles.scss';

.md3-color-roles-section {
  margin-bottom: 4rem;
  padding: 0 1.5rem;
}

.md3-section-title {
  font-size: 2rem;
  font-weight: 700;
  color: palette-color('base', 10);
  margin-bottom: 1rem;
}

.md3-section-description {
  font-size: 1rem;
  color: palette-color('base', 50);
  line-height: 1.6;
  margin-bottom: 2rem;
}

.md3-concepts-section {
  margin-bottom: 2rem;
  padding: 1.5rem;
  background-color: palette-color('base', 95);
  border-radius: 0.5rem;
  border: 1px solid palette-color('base', 80);
}

.md3-concepts-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: palette-color('base', 10);
  margin-bottom: 1rem;
}

.md3-concepts-description {
  font-size: 0.875rem;
  color: palette-color('base', 50);
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
</style>
