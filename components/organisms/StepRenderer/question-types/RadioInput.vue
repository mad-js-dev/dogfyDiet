<template>
  <div class="radio-input">
    <div
      v-for="option in question.options"
      :key="option"
      class="radio-option"
    >
      <label class="radio-label">
        <input
          type="radio"
          :name="question.id"
          :value="option"
          :checked="modelValue === option"
          @change="handleChange"
          :required="question.required"
          class="radio-field"
        />
        <span class="radio-text">{{ option }}</span>
      </label>
    </div>
    <span v-if="hasError" class="error-message">{{ errorMessage }}</span>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface Props {
  question: {
    id: string
    type: string
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
.radio-input {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.radio-option {
  display: flex;
  align-items: center;
}

.radio-label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  font-size: 1rem;
  color: #333;
}

.radio-field {
  margin: 0;
  cursor: pointer;
}

.radio-text {
  user-select: none;
}

.error-message {
  color: #dc3545;
  font-size: 0.875rem;
  margin-top: 0.25rem;
}
</style>
