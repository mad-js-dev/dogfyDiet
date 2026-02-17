<template>
  <div class="multi-select-answer">
    <label :for="config.id" class="question-label">
      {{ config.question }}
      <span v-if="config.required" class="required-indicator">*</span>
    </label>
    
    <div class="checkbox-group">
      <label 
        v-for="option in config.options" 
        :key="option"
        class="checkbox-label"
      >
        <input
          type="checkbox"
          :name="config.id"
          :value="option"
          v-model="selectedValues"
          :disabled="disabled"
          @change="handleChange"
          class="checkbox-input"
        />
        <span class="checkbox-text">{{ option }}</span>
      </label>
    </div>
    
    <div v-if="error" class="error-message">
      {{ error }}
    </div>
  </div>
</template>

<script setup lang="ts">
import type { QuestionConfig } from '~/types/questionnaire'

interface Props {
  config: QuestionConfig
  modelValue?: string[]
  disabled?: boolean
}

interface Emits {
  (e: 'update:modelValue', value: string[]): void
  (e: 'answer', questionId: string, value: string[]): void
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false
})

const emit = defineEmits<Emits>()

const selectedValues = ref<string[]>(props.modelValue || [])
const error = ref('')
const isTouched = ref(false)

const validateInput = (value: string[]): boolean => {
  if (!props.config.required) return true
  
  return value.length > 0
}

const handleChange = () => {
  emit('update:modelValue', selectedValues.value)
  
  if (isTouched.value) {
    validateInput(selectedValues.value)
  }
  
  emit('answer', props.config.id, selectedValues.value)
}

const handleBlur = () => {
  isTouched.value = true
  validateInput(selectedValues.value)
}

// Watch for external changes
watch(() => props.modelValue, (newValue) => {
  if (JSON.stringify(newValue) !== JSON.stringify(selectedValues.value)) {
    selectedValues.value = newValue || []
  }
})
</script>

<style scoped>
.multi-select-answer {
  width: 100%;
}

.question-label {
  display: block;
  font-weight: 400;
  color: #333;
  margin-bottom: 1rem;
  font-size: 1.1rem;
  line-height: 1.4;
}

.required-indicator {
  color: #f44336;
  margin-left: 0.25rem;
}

.checkbox-group {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.checkbox-label {
  display: flex;
  align-items: center;
  padding: 0.75rem;
  border: 2px solid #e0e0e0;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.checkbox-label:hover {
  border-color: #0066cc;
  background: rgba(0, 102, 204, 0.05);
}

.checkbox-label:has(.checkbox-input:checked) {
  border-color: #0066cc;
  background: rgba(0, 102, 204, 0.1);
}

.checkbox-input {
  margin-right: 1rem;
  width: 18px;
  height: 18px;
  cursor: pointer;
}

.checkbox-text {
  color: #333;
  font-size: 1rem;
}

.error-message {
  color: #f44336;
  font-size: 0.875rem;
  margin-top: 0.5rem;
  padding: 0.5rem;
  background: #ffebee;
  border-radius: 4px;
  border-left: 3px solid #f44336;
}
</style>
