<template>
  <div class="checkbox-input">
    <div
      v-for="option in question.options"
      :key="option"
      class="checkbox-option"
    >
      <label class="checkbox-label">
        <input
          type="checkbox"
          :value="option"
          :checked="isChecked(option)"
          @change="handleChange"
          class="checkbox-field"
        />
        <span class="checkbox-text">{{ option }}</span>
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
  modelValue: string[]
}

const props = defineProps<Props>()
const emit = defineEmits<{
  'update:modelValue': [value: string[]]
}>()

const hasError = ref(false)
const errorMessage = ref('')

const isChecked = (option: string) => {
  return Array.isArray(props.modelValue) && props.modelValue.includes(option)
}

const handleChange = (event: Event) => {
  const target = event.target as HTMLInputElement
  const value = target.value
  const checked = target.checked
  
  let newValue = [...(props.modelValue || [])]
  
  if (checked) {
    if (!newValue.includes(value)) {
      newValue.push(value)
    }
  } else {
    newValue = newValue.filter(item => item !== value)
  }
  
  // Validate if validation rules exist
  if (props.question.validation) {
    validateInput(newValue)
  }
  
  emit('update:modelValue', newValue)
}

const validateInput = (value: string[]) => {
  hasError.value = false
  errorMessage.value = ''
  
  for (const rule of props.question.validation || []) {
    switch (rule.type) {
      case 'required':
        if (!value || value.length === 0) {
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
.checkbox-input {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.checkbox-option {
  display: flex;
  align-items: center;
}

.checkbox-label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  font-size: 1rem;
  color: #333;
}

.checkbox-field {
  margin: 0;
  cursor: pointer;
}

.checkbox-text {
  user-select: none;
}

.error-message {
  color: #dc3545;
  font-size: 0.875rem;
  margin-top: 0.25rem;
}
</style>
