<template>
  <div class="range-answer">
    <div class="range-label">{{ config.question }}</div>
    
    <div class="range-options">
      <label 
        v-for="option in config.rangeOptions" 
        :key="option.value"
        class="range-option"
        :class="{ selected: selectedValue === option.value }"
      >
        <input
          type="radio"
          :name="config.id"
          :value="option.value"
          v-model="selectedValue"
          :disabled="disabled"
          @change="handleChange"
        />
        <div class="option-content">
          <div class="option-label">{{ option.label }}</div>
          <div class="option-range" v-if="option.min !== undefined && option.max !== undefined">
            {{ option.min }} - {{ option.max }}
          </div>
        </div>
      </label>
    </div>
    
    <div v-if="error" class="error-message">
      {{ error }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import type { QuestionConfig } from '~/types/questionnaire'

interface Props {
  config: QuestionConfig
  modelValue?: string
  disabled?: boolean
}

interface Emits {
  (e: 'update:modelValue', value: string): void
  (e: 'answer', questionId: string, value: string): void
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false
})

const emit = defineEmits<Emits>()

const selectedValue = ref(props.modelValue || props.config.rangeOptions?.[0]?.value || '')
const error = ref('')
const isTouched = ref(false)

const validateInput = (value: string): boolean => {
  error.value = ''
  
  if (!props.config.required) return true
  
  if (!value || value.trim() === '') {
    error.value = 'This field is required'
    return false
  }
  
  if (!props.config.rangeOptions) {
    error.value = 'Invalid configuration'
    return false
  }
  
  const isValidOption = props.config.rangeOptions.some(option => option.value === value)
  if (!isValidOption) {
    error.value = 'Please select a valid option'
    return false
  }
  
  return true
}

const handleChange = () => {
  emit('update:modelValue', selectedValue.value)
  
  if (isTouched.value) {
    validateInput(selectedValue.value)
  }
  
  emit('answer', props.config.id, selectedValue.value)
}

const handleBlur = () => {
  isTouched.value = true
  validateInput(selectedValue.value)
}

// Watch for external changes
watch(() => props.modelValue, (newValue) => {
  if (newValue !== selectedValue.value) {
    selectedValue.value = newValue || ''
  }
})

// Emit default value on mount for required questions
onMounted(() => {
  if (props.config.required && !props.modelValue && selectedValue.value) {
    emit('update:modelValue', selectedValue.value)
    emit('answer', props.config.id, selectedValue.value)
  }
})
</script>

<script>
export default {
  name: 'RangeAnswer'
}
</script>

<style scoped>
.range-answer {
  width: 100%;
}

.range-label {
  font-weight: 600;
  color: #333;
  margin-bottom: 1rem;
  text-align: center;
}

.range-options {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.range-option {
  display: flex;
  align-items: flex-start;
  padding: 1rem;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.range-option:hover {
  border-color: #0066cc;
  background: rgba(0, 102, 204, 0.05);
}

.range-option.selected {
  border-color: #0066cc;
  background: rgba(0, 102, 204, 0.1);
}

.range-option input[type="radio"] {
  margin-right: 1rem;
  margin-top: 0.25rem;
}

.option-content {
  flex: 1;
}

.option-label {
  font-weight: 600;
  color: #333;
  margin-bottom: 0.5rem;
}

.option-range {
  font-size: 0.875rem;
  color: #666;
  font-style: italic;
}

.error-message {
  color: #f44336;
  font-size: 0.875rem;
  margin-top: 1rem;
}
</style>
