<template>
  <div class="text-input">
    <input
      :type="inputType"
      :value="modelValue"
      @input="handleInput"
      :placeholder="question.placeholder || 'Enter your answer'"
      :required="question.required"
      class="text-field"
      :class="{ 'has-error': hasError }"
    />
    <span v-if="hasError" class="error-message">{{ errorMessage }}</span>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

interface Props {
  question: {
    id: string
    type: string
    placeholder?: string
    required?: boolean
    validation?: Array<{
      type: string
      value?: any
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

const inputType = computed(() => {
  if (props.question.type === 'email') return 'email'
  if (props.question.type === 'number') return 'number'
  if (props.question.type === 'tel') return 'tel'
  return 'text'
})

const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement
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
        if (!value.trim()) {
          hasError.value = true
          errorMessage.value = rule.message
          return
        }
        break
      case 'minLength':
        if (value.length < rule.value) {
          hasError.value = true
          errorMessage.value = rule.message
          return
        }
        break
      case 'email':
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(value)) {
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
.text-input {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.text-field {
  padding: 0.75rem;
  border: 2px solid #e0e0e0;
  border-radius: 6px;
  font-size: 1rem;
  transition: border-color 0.3s ease;
  width: 100%;
}

.text-field:focus {
  outline: none;
  border-color: #0066cc;
}

.text-field.has-error {
  border-color: #dc3545;
}

.error-message {
  color: #dc3545;
  font-size: 0.875rem;
  margin-top: 0.25rem;
}
</style>
