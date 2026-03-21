<template>
  <section class="tonal-palettes-section">
    <h2 class="tonal-section-title">Color Palettes</h2>
    <p class="tonal-section-description">Algorithm-generated tonal variations for each key color, with values from 0-100 and special tones (95, 98, 99).</p>

    <!-- Dynamic Tonal Palettes -->
    <div 
      v-for="palette in tonalPalettes" 
      :key="palette.key"
      class="tonal-palette"
    >
      <div class="tonal-header">
        <div 
          class="tonal-base-color" 
          :style="{ backgroundColor: palette.baseColor }"
        >
          {{ palette.label }}
        </div>
      </div>
      <div class="tonal-row">
        <div 
          v-for="tone in palette.tones" 
          :key="`${palette.key}-${tone.value}`"
          class="tonal-swatch"
          :style="{ backgroundColor: tone.color }"
        >
          <div class="tonal-info">
            <div 
              class="tonal-hex" 
              :style="{ color: tone.value <= 30 ? '#DDD' : tone.value >= 90 ? '#333' : '#000000' }"
            >
              {{ tone.hex }}
            </div>
            <div 
              class="tonal-css-var" 
              :style="{ color: tone.value <= 30 ? '#DDD' : tone.value >= 90 ? '#333' : '#000000' }"
            >
              {{ tone.cssVar }}
            </div>
          </div>
        </div>
      </div>
    </div>

  </section>
</template>

<script setup lang="ts">
import { colorMaps, formatColorName } from '../../../assets/styles/colors/palette.js'

interface TonalValue {
  value: number
  color: string
  hex: string
  cssVar: string
}

// Generate tonal palette from base color using Material Design 3 algorithm
function generateTonalPalette(baseColor: string, paletteKey: string): TonalValue[] {
  const tones = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 95, 98, 99, 100]
  
  // Convert hex to HSL for easier manipulation
  const hex = baseColor.replace('#', '')
  const r = parseInt(hex.substr(0, 2), 16) / 255
  const g = parseInt(hex.substr(2, 2), 16) / 255
  const b = parseInt(hex.substr(4, 2), 16) / 255
  
  // RGB to HSL conversion
  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  let h = 0, s = 0, l = (max + min) / 2
  
  if (max !== min) {
    const d = max - min
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break
      case g: h = (b - r) / d + 2; break
      case b: h = (r - g) / d + 4; break
    }
    h /= 6
  }
  
  return tones.map(tone => {
    let adjustedL = tone / 100
    let adjustedS = s
    
    // Material Design 3 tonal palette adjustments
    if (tone === 0) {
      adjustedL = 0
      adjustedS = 0
    } else if (tone === 100) {
      adjustedL = 1
      adjustedS = 0
    } else {
      // Reduce saturation for extreme tones to maintain colorfulness
      if (tone <= 20 || tone >= 80) {
        adjustedS = s * 0.6
      }
      if (tone <= 10 || tone >= 90) {
        adjustedS = s * 0.3
      }
    }
    
    // HSL to RGB conversion
    const hue2rgb = (p: number, q: number, t: number) => {
      if (t < 0) t += 1
      if (t > 1) t -= 1
      if (t < 1/6) return p + (q - p) * 6 * t
      if (t < 1/2) return q
      if (t < 2/3) return p + (q - p) * (2/3 - t) * 6
      return p
    }
    
    let r, g, b_rgb
    if (adjustedS === 0) {
      r = g = b_rgb = adjustedL
    } else {
      const q = adjustedL < 0.5 ? adjustedL * (1 + adjustedS) : adjustedL + adjustedS - adjustedL * adjustedS
      const p = 2 * adjustedL - q
      r = hue2rgb(p, q, h + 1/3)
      g = hue2rgb(p, q, h)
      b_rgb = hue2rgb(p, q, h - 1/3)
    }
    
    const toHex = (c: number) => Math.round(c * 255).toString(16).padStart(2, '0')
    const hexColor = `#${toHex(r)}${toHex(g)}${toHex(b_rgb)}`
    
    return {
      value: tone,
      color: hexColor,
      hex: hexColor,
      cssVar: `--${paletteKey}-${tone}`
    }
  })
}

// Generate tonal palettes using HCT algorithm for all colors in colorMaps
function generateTonalPalettes() {
  const palettes = [];

  Object.entries(colorMaps).forEach(([category, colors]) => {
    Object.entries(colors).forEach(([key, value]) => {
      palettes.push({
        key,
        label: formatColorName(key),
        category,
        baseColor: value,
        tones: generateTonalPalette(value, key)
      });
    });
  });

  return palettes;
}

const tonalPalettes = generateTonalPalettes()
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
  color: palette-color('base', 10);
  margin-bottom: 1rem;
}

.tonal-section-description {
  font-size: 1rem;
  color: palette-color('neutral', 50);
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
  color: palette-color('neutral', 50);
}

.tonal-palette-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: palette-color('base', 10);
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

.tonal-hex {
  font-size: 1.1rem;
  font-family: monospace;
  font-weight: bold;
}

.tonal-css-variable {
  font-size: 0.875rem;
  font-family: monospace;
  opacity: 0.9;
  width: 60%;
}
</style>
