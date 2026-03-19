<template>
  <section class="mb-16 px-6 py-8">
    <h2 class="step-title">Color Palette</h2>

    <div class="pantone-sections-container">
      <ColorSection
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
import { colorVariables } from '../../utils/colors.js'
import ColorSection from '../components/ColorSection.vue'

interface ColorData {
  name: string
  value: string
  sassVar: string
}

interface ColorSection {
  sectionId: string
  sectionType: 'brand' | 'neutral' | 'semantic'
  title: string
  subtitle: string
  colors: ColorData[]
}

// Color categories with their properties
const colorCategories = {
  brand: [
    { name: 'Primary Green', value: colorVariables.primaryGreen, sassVar: '$primary-green' },
    { name: 'Accent Orange', value: colorVariables.accentOrange, sassVar: '$accent-orange' },
    { name: 'Accent Yellow', value: colorVariables.accentYellow, sassVar: '$accent-yellow' }
  ],
  neutral: [
    { name: 'Darkest', value: colorVariables.neutralDarkest, sassVar: "palette-color('base', 10)" },
    { name: 'Dark', value: colorVariables.neutralDark, sassVar: "palette-color('base', 20)" },
    { name: 'Medium', value: colorVariables.neutralMedium, sassVar: "palette-color('base', 50)" },
    { name: 'Light', value: colorVariables.neutralLight, sassVar: "palette-color('base', 80)" },
    { name: 'Lighter', value: colorVariables.neutralLightest, sassVar: "palette-color('base', 90)" },
    { name: 'Lightest', value: colorVariables.neutralLightest, sassVar: "palette-color('base', 95)" },
    { name: 'White', value: colorVariables.neutralWhite, sassVar: "palette-color('base', 100)" },
    { name: 'Off White', value: '#f9f8f7', sassVar: "palette-color('base', 98)" }
  ],
  semantic: [
    { name: 'Success', value: colorVariables.success, sassVar: '$success' },
    { name: 'Error', value: colorVariables.error, sassVar: '$error' },
    { name: 'Warning', value: colorVariables.warning, sassVar: '$warning' },
    { name: 'Info', value: colorVariables.info, sassVar: '$info' }
  ]
}

// Color sections data for the loop
const colorSections: ColorSection[] = [
  {
    sectionId: 'brand',
    sectionType: 'brand',
    title: 'Brand Colors',
    subtitle: 'Core brand identity and supporting colors',
    colors: colorCategories.brand
  },
  {
    sectionId: 'neutral',
    sectionType: 'neutral',
    title: 'Neutral Colors',
    subtitle: 'Typography and UI elements',
    colors: colorCategories.neutral
  },
  {
    sectionId: 'semantic',
    sectionType: 'semantic',
    title: 'Semantic Colors',
    subtitle: 'UI states and feedback',
    colors: colorCategories.semantic
  }
]
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
