<template>
  <component 
    :is="tag" 
    :class="computedClasses" 
    :style="computedStyles"
    v-bind="$attrs"
  >
    <slot />
  </component>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import paletteData from '~/assets/styles/colors/palette.json'

interface Props {
  tag?: string
  md3Type?: 'element' | 'container'
  role?: 'neutral' | 'primary' | 'secondary' | 'tertiary' | 'success' | 'error' | 'warning' | 'info'
  theme?: 'light' | 'dark'
  variant?: 'surface' | 'on-surface' | 'surface-variant' | 'on-surface-variant' | 'main' | 'on' | 'container' | 'on-container'
  surfaceSubVariant?: 'dim' | 'regular' | 'bright' | 'inverse'
  containerSubVariant?: 'container-lowest' | 'container-low' | 'container' | 'container-high' | 'container-highest'
  border?: boolean
  rounded?: boolean
  padding?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  margin?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  textColor?: 'auto' | 'inherit'
}

const props = withDefaults(defineProps<Props>(), {
  tag: 'div',
  md3Type: 'element',
  role: 'neutral',
  theme: 'light',
  variant: 'main',
  surfaceSubVariant: 'regular',
  containerSubVariant: 'container',
  border: false,
  rounded: false,
  padding: 'none',
  margin: 'none',
  textColor: 'auto'
})

// Get color value from JSON data
function getColorValue(role: string, variant: string, theme: string, subVariant?: string, containerSubVariant?: string): string {
  const themeData = theme === 'dark' ? paletteData['dark-roles'] : paletteData['light-roles']
  const semanticData = paletteData['semantic-roles']
  
  if (role === 'neutral') {
    // Handle neutral colors with nested structure and sub-variants
    if (variant === 'surface') {
      const subVar = subVariant || 'regular'
      return themeData.neutral.surface[subVar as keyof typeof themeData.neutral.surface]
    }
    if (variant === 'on-surface') {
      const subVar = subVariant || 'regular'
      return themeData.neutral['on-surface'][subVar as keyof typeof themeData.neutral['on-surface']]
    }
    if (variant === 'surface-variant') {
      const subVar = subVariant || 'regular'
      return themeData.neutral['surface-variant'][subVar as keyof typeof themeData.neutral['surface-variant']]
    }
    if (variant === 'on-surface-variant') {
      const subVar = subVariant || 'regular'
      return themeData.neutral['on-surface-variant'][subVar as keyof typeof themeData.neutral['on-surface-variant']]
    }
    if (variant === 'container') {
      const containerVar = containerSubVariant || 'container'
      return themeData.neutral.container[containerVar as keyof typeof themeData.neutral.container]
    }
    if (variant === 'on-container') {
      const containerVar = containerSubVariant || 'container'
      return themeData.neutral['on-container'][containerVar as keyof typeof themeData.neutral['on-container']]
    }
  } else if (role === 'primary' || role === 'secondary' || role === 'tertiary') {
    // Handle brand colors
    if (variant === 'main') return themeData[role].main
    if (variant === 'on') return themeData[role].on
    if (variant === 'container') return themeData[role].container
    if (variant === 'on-container') return themeData[role]['on-container']
  } else if (semanticData[role]) {
    // Handle semantic colors
    const semanticKey = variant === 'main' ? 'base' : variant
    return semanticData[role][semanticKey]
  }
  
  // Fallback
  return 'var(--neutral-60)'
}

// Compute classes based on props
const computedClasses = computed(() => {
  const classes = []
  
  // Base classes
  classes.push('md3-generic')
  classes.push(`md3-generic--${props.md3Type}`)
  classes.push(`md3-generic--${props.role}`)
  classes.push(`md3-generic--${props.theme}`)
  classes.push(`md3-generic--${props.variant}`)
  
  // Optional classes
  if (props.border) classes.push('md3-generic--border')
  if (props.rounded) classes.push('md3-generic--rounded')
  if (props.padding !== 'none') classes.push(`md3-generic--padding-${props.padding}`)
  if (props.margin !== 'none') classes.push(`md3-generic--margin-${props.margin}`)
  if (props.textColor !== 'auto') classes.push(`md3-generic--text-${props.textColor}`)
  
  return classes
})

// Compute styles based on props
const computedStyles = computed(() => {
  const styles: Record<string, string> = {}
  
  // Get theme data for text color calculations
  const themeData = props.theme === 'dark' ? paletteData['dark-roles'] : paletteData['light-roles']
  const semanticData = paletteData['semantic-roles']
  
  // Get color based on theme, role, and variant from JSON data
  const color = getColorValue(props.role, props.variant, props.theme, props.surfaceSubVariant, props.containerSubVariant)
  
  // Apply background color for element type
  if (props.md3Type === 'element' || props.md3Type === 'container') {
    styles.backgroundColor = color
  }
  
  // Apply text color
  if (props.textColor === 'auto') {
    // Get the appropriate "on" color for text contrast
    if (props.role === 'neutral') {
      if (props.variant === 'surface') {
        const subVar = props.surfaceSubVariant || 'regular'
        styles.color = themeData.neutral['on-surface'][subVar as keyof typeof themeData.neutral['on-surface']]
      }
      else if (props.variant === 'on-surface') {
        const subVar = props.surfaceSubVariant || 'regular'
        styles.color = themeData.neutral.surface[subVar as keyof typeof themeData.neutral.surface]
      }
      else if (props.variant === 'surface-variant') {
        const subVar = props.surfaceSubVariant || 'regular'
        styles.color = themeData.neutral['on-surface-variant'][subVar as keyof typeof themeData.neutral['on-surface-variant']]
      }
      else if (props.variant === 'on-surface-variant') {
        const subVar = props.surfaceSubVariant || 'regular'
        styles.color = themeData.neutral['surface-variant'][subVar as keyof typeof themeData.neutral['surface-variant']]
      }
      else if (props.variant === 'container') {
        const containerVar = props.containerSubVariant || 'container'
        styles.color = themeData.neutral['on-container'][containerVar as keyof typeof themeData.neutral['on-container']]
      }
      else if (props.variant === 'on-container') {
        const containerVar = props.containerSubVariant || 'container'
        styles.color = themeData.neutral.container[containerVar as keyof typeof themeData.neutral.container]
      }
      else {
        styles.color = themeData.neutral['on-surface'].regular
      }
    } else if (props.role === 'primary' || props.role === 'secondary' || props.role === 'tertiary') {
      if (props.variant === 'main') styles.color = themeData[props.role].on
      else if (props.variant === 'on') styles.color = themeData[props.role].main
      else if (props.variant === 'container') styles.color = themeData[props.role]['on-container']
      else if (props.variant === 'on-container') styles.color = themeData[props.role].container
      else styles.color = themeData[props.role].on
    } else if (semanticData[props.role]) {
      const semanticKey = props.variant === 'main' ? 'base' : props.variant
      styles.color = semanticData[props.role].on
    } else {
      styles.color = themeData.neutral['on-surface'].regular
    }
  } else if (props.textColor === 'inherit') {
    styles.color = 'inherit'
  }
  
  // Apply border color
  if (props.border) {
    styles.border = `1px solid ${color}`
  }
  
  return styles
})
</script>

<style scoped lang="scss">
.md3-generic {
  /* Base styles */
  display: inline-block;
  transition: all 0.2s ease-in-out;
  
  /* Type modifiers */
  &--container {
    /* Container-specific styles */
    width: 100%;
  }
  
  /* Optional modifiers */
  &--border {
    border-radius: 4px;
  }
  
  &--rounded {
    border-radius: 8px;
  }
  
  /* Padding modifiers */
  &--padding-xs { padding: 0.25rem; }
  &--padding-sm { padding: 0.5rem; }
  &--padding-md { padding: 1rem; }
  &--padding-lg { padding: 1.5rem; }
  &--padding-xl { padding: 2rem; }
  
  /* Margin modifiers */
  &--margin-xs { margin: 0.25rem; }
  &--margin-sm { margin: 0.5rem; }
  &--margin-md { margin: 1rem; }
  &--margin-lg { margin: 1.5rem; }
  &--margin-xl { margin: 2rem; }
  
  /* Text color modifiers */
  &--text-inherit {
    color: inherit;
  }
}
</style>
