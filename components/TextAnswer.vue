<template>
  <div class="text-answer">
    <input
      :id="config.id"
      v-model="inputValue"
      :type="inputType"
      :placeholder="placeholder"
      :required="config.required"
      :disabled="disabled"
      class="text-input"
      @input="handleInput"
      @blur="handleBlur"
    />
    <div v-if="error" class="error-message">
      {{ error }}
    </div>
  </div>
</template>

<script setup lang="ts">
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

const inputValue = ref(props.modelValue || '')
const error = ref('')
const isTouched = ref(false)

const inputType = computed(() => {
  // Check if this is an email field
  if (props.config.validation?.some(v => v.type === 'pattern' && v.value?.includes('@'))) {
    return 'email'
  }
  return 'text'
})

const placeholder = computed(() => {
  return props.config.question || 'Enter your answer...'
})

const validateInput = (value: string): boolean => {
  if (!props.config.validation) return true
  
  for (const rule of props.config.validation) {
    switch (rule.type) {
      case 'required':
        if (!value || value.trim() === '') {
          error.value = rule.message
          return false
        }
        break
      case 'minLength':
        if (value.length < rule.value) {
          error.value = rule.message
          return false
        }
        break
      case 'maxLength':
        if (value.length > rule.value) {
          error.value = rule.message
          return false
        }
        break
      case 'pattern':
        const regex = new RegExp(rule.value)
        if (!regex.test(value)) {
          error.value = rule.message
          return false
        }
        break
    }
  }
  
  error.value = ''
  return true
}

const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  const value = target.value
  
  inputValue.value = value
  emit('update:modelValue', value)
  
  if (isTouched.value) {
    validateInput(value)
  }
}

const handleBlur = () => {
  isTouched.value = true
  validateInput(inputValue.value)
  emit('answer', props.config.id, inputValue.value)
}

// Watch for external changes
watch(() => props.modelValue, (newValue) => {
  if (newValue !== inputValue.value) {
    inputValue.value = newValue || ''
  }
})
</script>

<style scoped>
.text-answer {
  width: 100%;
}

.text-input {
  width: 100%;
  padding: 0.75rem;
  border: 2px solid #e0e0e0;
  border-radius: 6px;
  font-size: 1rem;
  transition: border-color 0.3s ease;
}

.text-input:focus {
  outline: none;
  border-color: #0066cc;
  box-shadow: 0 0 0 3px rgba(0, 102, 204, 0.1);
}

.text-input:disabled {
  background-color: #f5f5f5;
  cursor: not-allowed;
}

.error-message {
  color: #f44336;
  font-size: 0.875rem;
  margin-top: 0.5rem;
}
</style>
