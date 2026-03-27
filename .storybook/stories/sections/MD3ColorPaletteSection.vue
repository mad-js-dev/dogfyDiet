<template>
  <section class="mb-16 px-6 py-8">
    <h2 class="step-title">Color Palette</h2>

    <div class="pantone-sections-container">
      <BaseColors
        v-for="section in colorSections"
        :key="section.sectionId"
        :section-id="section.sectionId"
        :section-type="section.sectionType"
        :title="section.title"
        :subtitle="section.subtitle"
        :colors="section.colors"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
import { getCssProperty } from '../../utils/colors.js'
import BaseColors from '../components/baseColors.vue'
import { generateColorSections } from '../../../assets/styles/colors/palette.js'

interface ColorData {
  name: string
  value: string
  cssVar: string
}

interface ColorSection {
  sectionId: string
  sectionType: string
  title: string
  subtitle: string
  colors: ColorData[]
}

// Generate color sections dynamically from palette.js
const colorSections: ColorSection[] = generateColorSections()
</script>

<style lang="scss">
@use '~/assets/styles/_css-variables.scss';

</style>

<style scoped lang="scss">
@use '~/assets/styles/_variables.scss' as *;
@use '~/assets/styles/_mixins.scss' as *;

// Import the same styles that were used in the original design-system page
@use '~/assets/styles/components/pantone.scss';
</style>
