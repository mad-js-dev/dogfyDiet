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
              :style="{ color: tone.value <= 30 ? '#DDD' : tone.value >= 90 ? '#222' : '#000000' }"
            >
              {{ tone.hex }}
            </div>
            <div 
              class="tonal-css-var" 
              :style="{ color: tone.value <= 30 ? '#DDD' : tone.value >= 90 ? '#222' : '#000000' }"
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
import { tonalPalettes } from '../../../assets/styles/colors/palette.js'
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
