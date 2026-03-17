<template>
  <section class="tonal-palettes-section">
    <h2 class="tonal-section-title">Tonal Palettes</h2>
    <p class="tonal-section-description">Algorithm-generated tonal variations for each key color, with values from 0-100 and special tones (95, 98, 99).</p>

    <!-- Primary Tonal Palette -->
    <div class="tonal-palette">
      <div class="tonal-header">
        <div class="tonal-base-color" :style="{ backgroundColor: '#5C833B' }">Primary</div>
      </div>
      <div class="tonal-row">
        <div 
          v-for="tone in primaryTones" 
          :key="`primary-${tone.value}`"
          class="tonal-swatch"
          :style="{ backgroundColor: tone.color }"
        >
          <div class="tonal-info">
            <div 
              class="tonal-value" 
              :style="{ color: getTextColor(tone.color) }"
            >
              {{ tone.value }}
            </div>
            <div 
              class="tonal-hex" 
              :style="{ color: getTextColor(tone.color) }"
            >
              {{ tone.hex }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Secondary Tonal Palette -->
    <div class="tonal-palette">
      <div class="tonal-header">
        <div class="tonal-base-color" :style="{ backgroundColor: '#7C8074' }">Secondary</div>
      </div>
      <div class="tonal-row">
        <div 
          v-for="tone in secondaryTones" 
          :key="`secondary-${tone.value}`"
          class="tonal-swatch"
          :style="{ backgroundColor: tone.color }"
        >
          <div class="tonal-info">
            <div 
              class="tonal-value" 
              :style="{ color: getTextColor(tone.color) }"
            >
              {{ tone.value }}
            </div>
            <div 
              class="tonal-hex" 
              :style="{ color: getTextColor(tone.color) }"
            >
              {{ tone.hex }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Tertiary Tonal Palette -->
    <div class="tonal-palette">
      <div class="tonal-header">
        <div class="tonal-base-color" :style="{ backgroundColor: '#4A7C8C' }">Tertiary</div>
      </div>
      <div class="tonal-row">
        <div 
          v-for="tone in tertiaryTones" 
          :key="`tertiary-${tone.value}`"
          class="tonal-swatch"
          :style="{ backgroundColor: tone.color }"
        >
          <div class="tonal-info">
            <div 
              class="tonal-value" 
              :style="{ color: getTextColor(tone.color) }"
            >
              {{ tone.value }}
            </div>
            <div 
              class="tonal-hex" 
              :style="{ color: getTextColor(tone.color) }"
            >
              {{ tone.hex }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Neutral Tonal Palette -->
    <div class="tonal-palette">
      <div class="tonal-header">
        <div class="tonal-base-color" :style="{ backgroundColor: '#6B6B6B' }">Neutral</div>
      </div>
      <div class="tonal-row">
        <div 
          v-for="tone in neutralTones" 
          :key="`neutral-${tone.value}`"
          class="tonal-swatch"
          :style="{ backgroundColor: tone.color }"
        >
          <div class="tonal-info">
            <div 
              class="tonal-value" 
              :style="{ color: getTextColor(tone.color) }"
            >
              {{ tone.value }}
            </div>
            <div 
              class="tonal-hex" 
              :style="{ color: getTextColor(tone.color) }"
            >
              {{ tone.hex }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Neutral Variant Tonal Palette -->
    <div class="tonal-palette">
      <div class="tonal-header">
        <div class="tonal-base-color" :style="{ backgroundColor: '#7A7A7A' }">Neutral variant</div>
      </div>
      <div class="tonal-row">
        <div 
          v-for="tone in neutralVariantTones" 
          :key="`neutral-variant-${tone.value}`"
          class="tonal-swatch"
          :style="{ backgroundColor: tone.color }"
        >
          <div class="tonal-info">
            <div 
              class="tonal-value" 
              :style="{ color: getTextColor(tone.color) }"
            >
              {{ tone.value }}
            </div>
            <div 
              class="tonal-hex" 
              :style="{ color: getTextColor(tone.color) }"
            >
              {{ tone.hex }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
interface TonalValue {
  value: number
  color: string
  hex: string
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

// Tonal palette generation algorithm
function generateTonalPalette(baseColor: string): TonalValue[] {
  const tones: TonalValue[] = []
  
  // Generate tones 0-90 in increments of 10
  for (let i = 0; i <= 90; i += 10) {
    tones.push({
      value: i,
      color: adjustTone(baseColor, i),
      hex: adjustTone(baseColor, i)
    })
  }
  
  // Add special tones 95, 98, 99, then 100 as the final tone
  tones.push({ value: 95, color: adjustTone(baseColor, 95), hex: adjustTone(baseColor, 95) })
  tones.push({ value: 98, color: adjustTone(baseColor, 98), hex: adjustTone(baseColor, 98) })
  tones.push({ value: 99, color: adjustTone(baseColor, 99), hex: adjustTone(baseColor, 99) })
  tones.push({ value: 100, color: adjustTone(baseColor, 100), hex: adjustTone(baseColor, 100) })
  
  return tones
}

// Tone adjustment algorithm
function adjustTone(baseColor: string, tone: number): string {
  // This is a simplified tone adjustment algorithm
  // In a real implementation, you'd use HSL color space manipulation
  const hex = baseColor.replace('#', '')
  const r = parseInt(hex.substr(0, 2), 16)
  const g = parseInt(hex.substr(2, 2), 16)
  const b = parseInt(hex.substr(4, 2), 16)
  
  // Convert to HSL and adjust lightness
  const [h, s, l] = rgbToHsl(r, g, b)
  const adjustedL = Math.max(0, Math.min(100, l * (tone / 50)))
  
  return hslToHex(h, s, adjustedL)
}

// Color space conversion utilities
function rgbToHsl(r: number, g: number, b: number): [number, number, number] {
  r /= 255
  g /= 255
  b /= 255
  
  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  let h, s, l = (max + min) / 2

  if (max === min) {
    h = s = 0
  } else {
    const d = max - min
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
    switch (max) {
      case r: h = ((g - b) / d + (g < b ? 6 : 0)) * 60; break
      case g: h = ((b - r) / d + (b < r ? 4 : 2)) * 60; break
      case b: h = ((r - g) / d + (r < g ? 2 : 4)) * 60; break
    }
  }

  return [h, s * 100, l * 100]
}

function hslToHex(h: number, s: number, l: number): string {
  h = h / 360
  s = s / 100
  l = l / 100
  
  const c = (1 - Math.abs(2 * l - 1)) * Math.min(l, 1 - l)
  const x = c * (1 - Math.abs((h / 60) % 2 - 1))
  const m = l - c / 2
  
  let r, g, b
  
  if (h >= 0 && h < 60) {
    r = c; g = x; b = 0
  } else if (h >= 60 && h < 120) {
    r = x; g = c; b = 0
  } else if (h >= 120 && h < 180) {
    r = 0; g = c; b = x
  } else if (h >= 180 && h < 240) {
    r = 0; g = x; b = c
  } else if (h >= 240 && h < 300) {
    r = x; g = 0; b = c
  } else {
    r = c; g = 0; b = x
  }
  
  r = Math.round((r + m) * 255)
  g = Math.round((g + m) * 255)
  b = Math.round((b + m) * 255)
  
  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`
}

// Generate tonal palettes for each key color
const primaryTones = generateTonalPalette('#00B67A')
const secondaryTones = generateTonalPalette('#EF6948')
const tertiaryTones = generateTonalPalette('#ffc800')
const neutralTones = generateTonalPalette('#1a1a1a')
</script>

<style scoped lang="scss">
@use '~/assets/styles/_variables.scss' as *;
@use '~/assets/styles/_mixins.scss' as *;

.tonal-palettes-section {
  margin-bottom: 4rem;
  padding: 0 1.5rem;
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
  width: 5.9375rem; /* 95px */
  height: 5.9375rem; /* 95px */
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  font-weight: 600;
  font-size: 1.125rem;
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
}

.tonal-swatch {
  width: 5rem;
  height: 5rem;
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
  font-size: 0.75rem;
  font-family: monospace;
  opacity: 0.9;
}
</style>
