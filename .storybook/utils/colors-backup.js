// Color variables from Sass system for programmatic access
// These values are automatically synced with assets/styles/_variables.scss
// Run this script to update: node sync-colors.js
export const colorVariables = {
  // Brand colors (from $primary-green, $accent-orange, $accent-yellow)
  primaryGreen: '#00B67A',
  accentOrange: '#EF6948',
  accentYellow: '#ffc800',

  // Neutral colors (from $neutral-* variables)
  neutralDarkest: '#1a1a1a',
  neutralDark: '#3d3d3d',
  neutralMedium: '#767676',
  neutralLight: '#e8e8e8',
  neutralLightest: '#f7f7f7',
  neutralWhite: '#ffffff',

  // Material Design 3 tokens (read from CSS custom properties)
  get md3Primary() {
    return getCssProperty('--md3-primary', '#00B67A')
  },
  get md3OnPrimary() {
    return getCssProperty('--md3-on-primary', '#ffffff')
  },
  get md3PrimaryContainer() {
    return getCssProperty('--md3-primary-container', '#00B67A')
  },
  get md3OnPrimaryContainer() {
    return getCssProperty('--md3-on-primary-container', '#000000')
  },
  get md3Secondary() {
    return getCssProperty('--md3-secondary', '#767676')
  },
  get md3OnSecondary() {
    return getCssProperty('--md3-on-secondary', '#ffffff')
  },
  get md3Surface() {
    return getCssProperty('--md3-surface', '#ffffff')
  },
  get md3OnSurface() {
    return getCssProperty('--md3-on-surface', '#1a1a1a')
  },
  get md3SurfaceVariant() {
    return getCssProperty('--md3-surface-variant', '#f5f5f5')
  },
  get md3OnSurfaceVariant() {
    return getCssProperty('--md3-on-surface-variant', '#3d3d3d')
  },
  get md3Outline() {
    return getCssProperty('--md3-outline', '#767676')
  },
  get md3Error() {
    return getCssProperty('--md3-error', '#ba1a1a')
  },
  get md3OnError() {
    return getCssProperty('--md3-on-error', '#ffffff')
  }
}

// Utility function to get CSS custom property with fallback
function getCssProperty(property, fallback) {
  if (typeof window !== 'undefined' && window.getComputedStyle) {
    const root = document.documentElement
    const value = getComputedStyle(root).getPropertyValue(property).trim()
    return value || fallback
  }
  return fallback
}

// Utility function to copy color to clipboard
export async function copyColor(color) {
  try {
    await navigator.clipboard.writeText(color)
    return true
  } catch (err) {
    console.error('Failed to copy color:', err)
    return false
  }
}
