<template>
  <div class="select-input">
    <select
      :value="modelValue"
      @change="handleChange"
      :required="question.required"
      class="select-field"
      :class="{ 'has-error': hasError }"
    >
      <option value="" disabled>{{ question.placeholder || 'Select an option' }}</option>
      <option
        v-for="option in question.options"
        :key="option"
        :value="option"
      >
        {{ option }}
      </option>
    </select>
    <span v-if="hasError" class="error-message">{{ errorMessage }}</span>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface Props {
  question: {
    id: string
    type: string
    placeholder?: string
    required?: boolean
    options?: string[]
    validation?: Array<{
      type: string
      message: string
    }>
  }
  modelValue: string
}

const props = defineProps<Props>()
const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const hasError = ref(false)
const errorMessage = ref('')

const handleChange = (event: Event) => {
  const target = event.target as HTMLSelectElement
  const value = target.value
  
  // Validate if validation rules exist
  if (props.question.validation) {
    validateInput(value)
  }
  
  emit('update:modelValue', value)
}

const validateInput = (value: string) => {
  hasError.value = false
  errorMessage.value = ''
  
  for (const rule of props.question.validation || []) {
    switch (rule.type) {
      case 'required':
        if (!value) {
          hasError.value = true
          errorMessage.value = rule.message
          return
        }
        break
    }
  }
}
</script>

<style scoped>
.select-input {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.select-field {
  padding: 0.75rem;
  border: 2px solid #e0e0e0;
  border-radius: 6px;
  font-size: 1rem;
  transition: border-color 0.3s ease;
  width: 100%;
  background: white;
  cursor: pointer;
}

.select-field:focus {
  outline: none;
  border-color: #0066cc;
}

.select-field.has-error {
  border-color: #dc3545;
}

.error-message {
  color: #dc3545;
  font-size: 0.875rem;
  margin-top: 0.25rem;
}
</style>
