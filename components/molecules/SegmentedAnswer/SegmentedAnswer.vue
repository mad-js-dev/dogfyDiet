<template>
  <div class="segmented-answer">
    <SegmentedButtons
      :model-value="currentAnswer"
      :options="segmentedOptions"
      :name="config.id"
      :disabled="disabled"
      :class="{ 'has-error': error && isTouched }"
      @update:model-value="handleChange"
    />
    
    <div v-if="error" class="error-message">
      {{ error }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch, onMounted } from 'vue'
import SegmentedButtons from '../../atoms/SegmentedButtons/SegmentedButtons.vue'
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
const isTouched = ref(false)

// Convert options to string array for SegmentedButtons
const segmentedOptions = computed(() => {
  if (!props.config.options) return []
  
  return props.config.options.map(option => {
    if (typeof option === 'string') {
      return option
    }
    // If option is an object with value property, extract the value
    return (option as { value: string }).value
  })
})

const validateInput = (value: string): boolean => {
  error.value = ''
  
  if (!props.config.required) return true
  
  if (!value || value.trim() === '') {
    error.value = 'This field is required'
    return false
  }
  
  return true
}

const handleChange = (value: string | string[]) => {
  // Convert to string for single selection mode
  const stringValue = Array.isArray(value) ? value[0] || '' : value
  currentAnswer.value = stringValue
  isTouched.value = true
  
  // Validate the input
  validateInput(stringValue)
  
  emit('update:modelValue', stringValue)
  emit('answer', stringValue, props.config.id, props.petId)
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
  font-weight: 500;
}

:deep(.has-error) {
  .c-segmented-buttons {
    border: 2px solid #f44336;
    border-radius: 25px;
    
    &__button {
      border-color: #f44336;
      
      &:hover {
        border-color: #d32f2f;
      }
    }
  }
}
</style>
