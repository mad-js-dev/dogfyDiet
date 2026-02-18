<template>
  <div class="pet-names-section">
    <ConditionalAnswerRenderer 
      :question="{
        id: 'pet_name',
        type: 'text',
        appliesTo: 'individual',
        required: true,
        validation: [
          {
            type: 'required',
            message: 'Pet name is required'
          },
          {
            type: 'minLength',
            value: 2,
            message: 'Pet name must be at least 2 characters'
          }
        ]
      }"
      :initial-mode="'individual'"
    />
  </div>
</template>

<script setup lang="ts">
import ConditionalAnswerRenderer from '~/components/ConditionalAnswerRenderer.vue'
import { computed } from 'vue'
import { useComprehensiveQuestionnaireStore } from '~/stores/comprehensive-questionnaire'

const questionnaire = useComprehensiveQuestionnaireStore()

// Watch for changes to pet_name in questionnaire store and update component
const petNameAnswer = computed(() => questionnaire.getAnswer('pet_name', 'pet_1')?.value)
</script>

<style scoped>
.pet-names-section {
  width: 100%;
}
</style>
