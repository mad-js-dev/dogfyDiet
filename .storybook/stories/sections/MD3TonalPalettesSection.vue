<template>
  <section class="tonal-palettes-section">
    <h2 class="tonal-section-title">Tonal Palettes</h2>
    <p class="tonal-section-description">Algorithm-generated tonal variations for each key color, with values from 0-100 and special tones (95, 98, 99).</p>

    <!-- Dynamic Tonal Palettes -->
    <div 
      v-for="brand in brandColors" 
      :key="brand.key"
      class="tonal-palette"
    >
      <div class="tonal-header">
        <div 
          class="tonal-base-color" 
          :style="{ backgroundColor: colorVariables?.[brand.key] || brand.fallback }"
        >
          {{ brand.label }}
        </div>
      </div>
      <div class="tonal-row">
        <div 
          v-for="tone in brand.tones" 
          :key="`${brand.key}-${tone.value}`"
          class="tonal-swatch"
          :style="{ backgroundColor: tone.color }"
        >
          <div class="tonal-info">
            <div 
              class="tonal-value" 
              :style="{ color: 'rgba(0, 0, 0, 0.6)' }"
            >
              {{ tone.value }}
            </div>
            <div 
              class="tonal-hex" 
              :style="{ color: 'rgba(0, 0, 0, 0.6)' }"
            >
              {{ tone.hex }}
            </div>
            <div 
              class="tonal-lch" 
              :style="{ color: 'rgba(0, 0, 0, 0.6)' }"
            >
              {{ tone.lch }}
            </div>
          </div>
        </div>
      </div>
    </div>

  </section>
</template>

<script setup lang="ts">
import { colorVariables } from '../../utils/colors.js'

interface TonalValue {
  value: number
  color: string
  hex: string
  lch: string
}

// Helper function to determine text color based on background
function getTextColor(backgroundColor: string): string {
  const hex = backgroundColor.replace('#', '')
  const r = parseInt(hex.substr(0, 2), 16)
  const g = parseInt(hex.substr(2, 2), 16)
  const b = parseInt(hex.substr(4, 2), 16)
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255
  return luminance > 0.5 ? '#1a1a1a' : '#ffffff'
}

// Function to convert hex to LCH color space
function hexToLCH(hex: string): string {
  // Remove # if present
  const cleanHex = hex.replace('#', '')
  
  // Convert hex to RGB
  const r = parseInt(cleanHex.substr(0, 2), 16) / 255
  const g = parseInt(cleanHex.substr(2, 2), 16) / 255
  const b = parseInt(cleanHex.substr(4, 2), 16) / 255
  
  // Convert RGB to XYZ
  const x = r > 0.04045 ? Math.pow((r + 0.055) / 1.055, 2.4) : r / 12.92
  const y = g > 0.04045 ? Math.pow((g + 0.055) / 1.055, 2.4) : g / 12.92
  const z = b > 0.04045 ? Math.pow((b + 0.055) / 1.055, 2.4) : b / 12.92
  
  const xScaled = x * 100
  const yScaled = y * 100
  const zScaled = z * 100
  
  // Convert XYZ to LAB
  const xr = xScaled / 95.047
  const yr = yScaled / 100
  const zr = zScaled / 108.883
  
  const fx = xr > 0.008856 ? Math.pow(xr, 1/3) : (7.787 * xr) + (16/116)
  const fy = yr > 0.008856 ? Math.pow(yr, 1/3) : (7.787 * yr) + (16/116)
  const fz = zr > 0.008856 ? Math.pow(zr, 1/3) : (7.787 * zr) + (16/116)
  
  const l = (116 * fy) - 16
  const a = 500 * (fx - fy)
  const b_lab = 200 * (fy - fz)
  
  // Convert LAB to LCH
  const c = Math.sqrt(a * a + b_lab * b_lab)
  let h = 0
  if (c > 0.0001) { // Only calculate hue if chroma is not zero (avoids NaN)
    h = Math.atan2(b_lab, a) * (180 / Math.PI)
    h = h >= 0 ? h : h + 360
  }
  
  // Clamp chroma to CSS-compliant range (0-150) and ensure valid LCH
  const clampedC = Math.min(Math.max(c, 0), 150)
  const clampedL = Math.min(Math.max(l, 0), 100)
  
  return `LCH(${Math.round(clampedL)} ${Math.round(clampedC)} ${Math.round(h)})`
}

// Function to convert RGB string to hex
function rgbToHex(rgb: string): string {
  // Parse RGB values from string like "rgb(255, 0, 128)" or "rgb(255 0 128)"
  const rgbMatch = rgb.match(/^rgb\((\d+)[,\s]+(\d+)[,\s]+(\d+)\)$/)
  if (!rgbMatch) return rgb // Return as-is if not RGB format
  
  const r = parseInt(rgbMatch[1])
  const g = parseInt(rgbMatch[2])
  const b = parseInt(rgbMatch[3])
  
  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`
}

// Get tonal palette colors from CSS custom properties
function getTonalPalette(prefix: string): TonalValue[] {
  const tones = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 95, 98, 99, 100]
  const root = document.documentElement
  
  return tones.map(tone => {
    const cssVar = `--${prefix}-${tone}`
    const color = getComputedStyle(root).getPropertyValue(cssVar).trim()
    
    // Convert RGB to hex if necessary
    const hexColor = color.startsWith('#') ? color : rgbToHex(color)
    
    return {
      value: tone,
      color: hexColor,
      hex: hexColor,
      lch: hexToLCH(hexColor)
    }
  })
}

// Generate tonal palettes using CSS variables for all brand colors
const brandColors = [
  {
    key: 'primaryGreen',
    label: 'Primary Green',
    fallback: '#00B67A',
    tones: getTonalPalette('primary')
  },
  {
    key: 'accentOrange',
    label: 'Accent Orange',
    fallback: '#EF6948',
    tones: getTonalPalette('accent-orange')
  },
  {
    key: 'accentYellow',
    label: 'Accent Yellow',
    fallback: '#FFC800',
    tones: getTonalPalette('accent-yellow')
  }
]
</script>

<style scoped lang="scss">
@use '~/assets/styles/_variables.scss' as *;
@use '~/assets/styles/_mixins.scss' as *;

.tonal-palettes-section {
  margin-bottom: 4rem;
}

.tonal-section-title {
  font-size: 2rem;
  font-weight: 700;
  color: $neutral-darkest;
  margin-bottom: 1rem;
}

.tonal-section-description {
  font-size: 1rem;
  color: $neutral-medium;
  line-height: 1.6;
  margin-bottom: 2rem;
}

.tonal-palette {
  margin-bottom: 2rem;
  display: flex;
  align-items: center;
  gap: 2rem;
}

.tonal-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
}

.tonal-base-color {
  width: 4rem; /* 64px */
  height: 4rem; /* 64px */
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  font-weight: 600;
  font-size: 0.875rem;
  text-align: center;
}

.tonal-arrow {
  font-size: 1.5rem;
  font-weight: 600;
  color: $neutral-medium;
}

.tonal-palette-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: $neutral-darkest;
  margin-bottom: 1rem;
}

.tonal-row {
  display: flex;
  align-items: center;
  gap: 0;
  overflow-x: auto;
  padding: 1rem 0;
  flex-grow: 1;
}

.tonal-swatch {
  width: 100%;
  height: 7rem;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.tonal-info {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  gap: 0.25rem;
}

.tonal-value {
  font-size: 0.875rem;
  font-weight: 700;
  color: $neutral-darkest;
}

.tonal-hex {
  font-size: 1.1rem;
  font-family: monospace;
  opacity: 0.9;
}

.tonal-lch {
  font-size: 1rem;
  font-family: monospace;
  font-weight: bold;
  opacity: 0.8;
  width: 60%;
}
</style>
