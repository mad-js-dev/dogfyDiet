<template>
  <div class="select-answer">
    <select
      :id="config.id"
      v-model="selectedValue"
      :required="config.required"
      :disabled="disabled"
      class="select-input"
      @blur="handleBlur"
    >
      <option value="" disabled>{{ placeholder }}</option>
      <option 
        v-for="option in config.options" 
        :key="option"
        :value="option"
      >
        {{ option }}
      </option>
    </select>
    
    <div v-if="error" class="error-message">
      {{ error }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, watch } from 'vue'
import type { QuestionConfig } from '~/types/questionnaire'

interface Props {
  config: QuestionConfig
  modelValue?: string | string[]
  disabled?: boolean
}

interface Emits {
  (e: 'update:modelValue', value: string | string[]): void
  (e: 'answer', questionId: string, value: string | string[]): void
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false
})

const emit = defineEmits<Emits>()

const selectedValue = ref(props.modelValue || '')
const error = ref('')
const isTouched = ref(false)

const placeholder = computed(() => {
  return props.config.question || 'Select an option...'
})

const validateInput = (value: string | string[]): boolean => {
  if (!props.config.required) return true
  
  if (Array.isArray(value)) {
    return value.length > 0
  }
  
  return value !== null && value !== undefined && value !== ''
}

const handleBlur = () => {
  isTouched.value = true
  validateInput(selectedValue.value)
}

// Watch for changes in selectedValue and emit to parent
watch(selectedValue, (newValue) => {
  emit('update:modelValue', newValue)
  emit('answer', props.config.id, newValue)
  
  if (isTouched.value) {
    validateInput(newValue)
  }
})

// Watch for external changes
watch(() => props.modelValue, (newValue) => {
  if (newValue !== selectedValue.value) {
    selectedValue.value = newValue || ''
  }
})
</script>

<style scoped>
.select-answer {
  width: 100%;
}

.select-input {
  width: 100%;
  padding: 0.75rem;
  border: 2px solid #e0e0e0;
  border-radius: 6px;
  font-size: 1rem;
  background: white;
  transition: border-color 0.3s ease;
}

.select-input:focus {
  outline: none;
  border-color: #0066cc;
  box-shadow: 0 0 0 3px rgba(0, 102, 204, 0.1);
}

.select-input:disabled {
  background-color: #f5f5f5;
  cursor: not-allowed;
}

.error-message {
  color: #f44336;
  font-size: 0.875rem;
  margin-top: 0.5rem;
}
</style>
