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
    { name: 'Darkest', value: colorVariables.neutralDarkest, sassVar: '$neutral-darkest' },
    { name: 'Dark', value: colorVariables.neutralDark, sassVar: '$neutral-dark' },
    { name: 'Medium', value: colorVariables.neutralMedium, sassVar: '$neutral-medium' },
    { name: 'Light', value: colorVariables.neutralLight, sassVar: '$neutral-light' },
    { name: 'Lighter', value: '#d6d6d6', sassVar: '$neutral-lighter' },
    { name: 'Lightest', value: colorVariables.neutralLightest, sassVar: '$neutral-lightest' },
    { name: 'White', value: colorVariables.neutralWhite, sassVar: '$neutral-white' },
    { name: 'Off White', value: '#f9f8f7', sassVar: '$neutral-off-white' }
  ],
  semantic: [
    { name: 'Success', value: '#0aaa46', sassVar: '$success' },
    { name: 'Error', value: '#d80003', sassVar: '$error' },
    { name: 'Warning', value: '#ffc800', sassVar: '$warning' },
    { name: 'Info', value: '#1976D2', sassVar: '$info' }
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

<style scoped lang="scss">
@use '~/assets/styles/_variables.scss' as *;
@use '~/assets/styles/_mixins.scss' as *;

// Import the same styles that were used in the original design-system page
@use '~/assets/styles/components/pantone.scss';
</style>
