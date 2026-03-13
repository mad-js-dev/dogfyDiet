// Color variables from CSS custom properties
// These values are directly sourced from Sass variables via CSS custom properties

// Utility function to get CSS custom property with fallback
function getCssProperty(property, fallback) {
  if (typeof window !== 'undefined' && window.getComputedStyle) {
    const root = document.documentElement
    const value = getComputedStyle(root).getPropertyValue(property).trim()
    return value || fallback
  }
  return fallback
}

// Export color variables that read from CSS custom properties
export const colorVariables = {
  // Brand colors (from CSS custom properties)
  get primaryGreen() {
    return getCssProperty('--primary-green', '#00B67A')
  },
  get accentOrange() {
    return getCssProperty('--accent-orange', '#EF6948')
  },
  get accentYellow() {
    return getCssProperty('--accent-yellow', '#ffca4e')
  },

  // Neutral colors (from CSS custom properties)
  get neutralDarkest() {
    return getCssProperty('--neutral-darkest', '#1a1a1a')
  },
  get neutralDark() {
    return getCssProperty('--neutral-dark', '#3d3d3d')
  },
  get neutralMedium() {
    return getCssProperty('--neutral-medium', '#767676')
  },
  get neutralLight() {
    return getCssProperty('--neutral-light', '#a3a3a3')
  },
  get neutralLightest() {
    return getCssProperty('--neutral-lightest', '#d4d4d4')
  },
  get neutralWhite() {
    return getCssProperty('--neutral-white', '#ffffff')
  },

  // Material Design 3 tokens (from CSS custom properties)
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
