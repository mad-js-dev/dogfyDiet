<template>
  <section class="mb-16 px-6 py-8">
    <h2 class="step-title">Color Usage Examples</h2>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div class="p-6 bg-primary rounded-lg">
        <h4 class="text-xl font-semibold text-white mb-2">Primary Action</h4>
        <p class="text-white opacity-90 mb-4">Use primary green for main CTAs and important actions.</p>
        <button class="button small bg-white text-primary">Primary Button</button>
      </div>

      <div class="p-6 bg-accent rounded-lg">
        <h4 class="text-xl font-semibold text-white mb-2">Secondary Action</h4>
        <p class="text-white opacity-90 mb-4">Use accent orange for secondary actions and highlights.</p>
        <button class="button small bg-white text-accent">Accent Button</button>
      </div>

      <div class="p-6 bg-lightest rounded-lg border-2 border-light">
        <h4 class="text-xl font-semibold text-dark mb-2">Card Background</h4>
        <p class="text-medium mb-4">Use lightest background for cards and sections.</p>
        <button class="button small outline">Outline Button</button>
      </div>

      <div class="p-6 bg-darkest rounded-lg">
        <h4 class="text-xl font-semibold text-white mb-2">Dark Section</h4>
        <p class="text-white opacity-90 mb-4">Use darkest background for hero sections or emphasis.</p>
        <button class="button small bg-white text-darkest">Dark Button</button>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
// This component displays color usage examples
</script>

<style scoped lang="scss">
@use '~/assets/styles/_variables.scss' as *;
@use '~/assets/styles/_mixins.scss' as *;
</style>
