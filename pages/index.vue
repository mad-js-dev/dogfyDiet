<template>
  <div class="questionnaire-page">
    <ComprehensiveQuestionnaire />
  </div>
</template>

<script setup lang="ts">
import ComprehensiveQuestionnaire from '~/components/ComprehensiveQuestionnaire.vue'

// Page metadata
definePageMeta({
  title: 'Pet Questionnaire',
  description: 'Tell us about your pets to get personalized recommendations'
})
</script>

<style scoped>
.questionnaire-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 2rem 1rem;
}
</style>
