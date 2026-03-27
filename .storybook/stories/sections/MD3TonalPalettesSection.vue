<template>
  <section class="tonal-palettes-section">
    <h2 class="tonal-section-title">Color Palettes</h2>
    <p class="tonal-section-description">Algorithm-generated tonal variations for each key color, with values from 0-100 and special tones (95, 98, 99).</p>

    <!-- Dynamic Tonal Palettes -->
    <dynamic-colors />

  </section>
</template>

<script setup lang="ts">
import dynamicColors from '../components/dynamicColors.vue'
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
</style>
