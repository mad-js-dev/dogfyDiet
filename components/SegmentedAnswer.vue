<template>
  <div class="segmented-answer">
    <SegmentedButtons
      :model-value="currentAnswer"
      :options="segmentedOptions"
      :name="config.id"
      :disabled="disabled"
      @update:model-value="handleChange"
    />
    
    <div v-if="error" class="error-message">
      {{ error }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch, onMounted } from 'vue'
import SegmentedButtons from '~/components/segmented-buttons/SegmentedButtons.vue'
import { useComprehensiveQuestionnaireStore } from '~/stores/comprehensive-questionnaire'
import type { QuestionConfig } from '~/types/questionnaire'

interface Props {
  config: QuestionConfig
  modelValue?: string
  petId?: string
  disabled?: boolean
}

interface Emits {
  (e: 'update:modelValue', value: string): void
  (e: 'answer', value: string, questionId: string, petId?: string): void
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false
})

const emit = defineEmits<Emits>()
const questionnaire = useComprehensiveQuestionnaireStore()

const currentAnswer = ref(props.modelValue ?? '')
const error = ref('')

// Convert string array options to SegmentedButtonOption format
const segmentedOptions = computed(() => {
  if (!props.config.options) return []
  
  return props.config.options.map(option => {
    if (typeof option === 'string') {
      return { value: option, label: option }
    }
    return option
  })
})

const handleChange = (value: string) => {
  currentAnswer.value = value
  error.value = ''
  emit('update:modelValue', value)
  emit('answer', value, props.config.id, props.petId)
}

// Watch for external changes
watch(() => props.modelValue, (newValue) => {
  if (newValue !== currentAnswer.value) {
    currentAnswer.value = newValue || ''
  }
})

// Emit default value on mount for required questions
onMounted(() => {
  // Don't emit default values automatically - only emit when user actually selects
  // This prevents unwanted auto-selection of first option
})

// Validate on mount if required
// Removed - validation will be handled at validator level
</script>

<style scoped>
.segmented-answer {
  width: 100%;
}

.error-message {
  color: #f44336;
  font-size: 0.875rem;
  margin-top: 0.5rem;
}
</style>
