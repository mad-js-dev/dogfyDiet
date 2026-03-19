// Color variables from CSS custom properties
// These values are directly sourced from Sass variables via CSS custom properties

// Utility function to get CSS custom property
function getCssProperty(property) {
  if (typeof window !== 'undefined' && window.getComputedStyle) {
    const root = document.documentElement
    const value = getComputedStyle(root).getPropertyValue(property).trim()
    return value || ''
  }
  return ''
}

// Export color variables that read from CSS custom properties
export const colorVariables = {
  // Brand colors (from CSS custom properties)
  get primaryGreen() {
    return getCssProperty('--primary-green')
  },
  get accentOrange() {
    return getCssProperty('--accent-orange')
  },
  get accentYellow() {
    return getCssProperty('--accent-yellow')
  },

  // Neutral colors (from CSS custom properties)
  get neutralDarkest() {
    return getCssProperty('--base-10')
  },
  get neutralDark() {
    return getCssProperty('--base-20')
  },
  get neutralMedium() {
    return getCssProperty('--base-50')
  },
  get neutralLight() {
    return getCssProperty('--base-80')
  },
  get neutralLightest() {
    return getCssProperty('--base-95')
  },
  get neutralWhite() {
    return getCssProperty('--base-100')
  },

  // Semantic colors (from CSS custom properties)
  get success() {
    return getCssProperty('--success')
  },
  get error() {
    return getCssProperty('--error')
  },
  get warning() {
    return getCssProperty('--warning')
  },
  get info() {
    return getCssProperty('--info')
  },
  get md3Primary() {
    return getCssProperty('--md3-primary')
  },
  get md3OnPrimary() {
    return getCssProperty('--md3-on-primary')
  },
  get md3PrimaryContainer() {
    return getCssProperty('--md3-primary-container')
  },
  get md3OnPrimaryContainer() {
    return getCssProperty('--md3-on-primary-container')
  },
  get md3Secondary() {
    return getCssProperty('--md3-secondary')
  },
  get md3OnSecondary() {
    return getCssProperty('--md3-on-secondary')
  },
  get md3Surface() {
    return getCssProperty('--md3-surface')
  },
  get md3OnSurface() {
    return getCssProperty('--md3-on-surface')
  },
  get md3SurfaceVariant() {
    return getCssProperty('--md3-surface-variant')
  },
  get md3OnSurfaceVariant() {
    return getCssProperty('--md3-on-surface-variant')
  },
  get md3Outline() {
    return getCssProperty('--md3-outline')
  },
  get md3Error() {
    return getCssProperty('--md3-error')
  },
  get md3OnError() {
    return getCssProperty('--md3-on-error')
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
