<template>
  <div class="step-container">
    <slot />
    <StepNavigation :current-step="currentStep || 0" />
  </div>
</template>

<script setup lang="ts">
import StepNavigation from '~/components/StepNavigation.vue'

interface Props {
  currentStep?: number
}

withDefaults(defineProps<Props>(), {
  currentStep: 0
})
</script>

<style scoped>
.step-container {
  min-height: 100vh;
  padding: 2rem;
  max-width: 800px;
  margin: 0 auto;
}
</style>
