<template>
  <div class="c-text-input">
    <div class="c-text-input__wrapper">
      <input
        :id="config.id"
        v-model="inputValue"
        :type="inputType"
        :placeholder="placeholder"
        :disabled="disabled"
        autocomplete="off"
        class="c-text-input__input"
        :class="{ 'c-text-input__input--with-suffix': suffix || icon }"
        @input="handleInput"
        @blur="handleBlur"
        @focus="handleFocus"
        @keydown="$emit('keydown', $event)"
      />
      <div v-if="suffix || icon" class="c-text-input__suffix">
        <span v-if="icon" class="c-text-input__icon" v-html="icon"></span>
        <span v-if="suffix" class="c-text-input__suffix-text">{{ suffix }}</span>
      </div>
    </div>
    <div v-if="error" class="c-text-input__error">
      {{ error }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import type { QuestionConfig } from '~/types/questionnaire'

interface Props {
  config: QuestionConfig
  modelValue?: string
  petId?: string
  disabled?: boolean
  suffix?: string
  icon?: string
}

interface Emits {
  (e: 'update:modelValue', value: string): void
  (e: 'answer', questionId: string, value: string, petId?: string): void
  (e: 'focus'): void
  (e: 'keydown', event: KeyboardEvent): void
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false
})

const emit = defineEmits<Emits>()

console.log('TextInput component mounted:', {
  questionId: props.config.id,
  modelValue: props.modelValue,
  petId: props.petId
})

const inputValue = ref(props.modelValue || '')
const error = ref('')
const isTouched = ref(false)

const inputType = computed(() => {
  // Use's config.type if it's email or tel, otherwise default to text
  if (props.config.type === 'email') {
    return 'email'
  }
  if (props.config.type === 'tel') {
    return 'tel'
  }
  // Check if this is an email field based on validation pattern (legacy support)
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
      case 'email':
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(value)) {
          error.value = rule.message
          return false
        }
        break
      case 'phone':
        const phoneRegex = /^[\d\s\-\(\)\+]+$/
        if (!phoneRegex.test(value) || value.replace(/\D/g, '').length < 7) {
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
  
  console.log('TextInput handleInput called:', {
    questionId: props.config.id,
    value,
    petId: props.petId
  })
  
  inputValue.value = value
  emit('update:modelValue', value)
  
  // Emit answer immediately for real-time updates
  emit('answer', value, props.config.id, props.petId)
  
  if (isTouched.value) {
    validateInput(value)
  }
}

const handleBlur = () => {
  console.log('TextInput handleBlur called:', {
    questionId: props.config.id,
    value: inputValue.value,
    petId: props.petId
  })
  
  isTouched.value = true
  validateInput(inputValue.value)
  // Also emit on blur for consistency
  emit('answer', inputValue.value, props.config.id, props.petId)
}

const handleFocus = () => {
  // Just emit the focus event - parent components can handle the logic
  emit('focus')
}

// Watch for external changes
watch(() => props.modelValue, (newValue) => {
  if (newValue !== inputValue.value) {
    inputValue.value = newValue || ''
  }
})
</script>

<style scoped lang="scss">
.c-text-input {
  $primary-color: #ffc800;
  $primary-surface-color: #fe9;
  $secondary-color: #ef6948;

  --primary-color: #{$primary-color};
  --primary-surface-color: #{$primary-surface-color};
  --secondary-color: #{$secondary-color};
  
  width: 100%;
  max-width: 320px;
  margin: 0 auto;
  position: relative;

  &__wrapper {
    position: relative;
    display: flex;
    align-items: center;
  }

  &__input {
    width: 100%;
    min-width: 250px;
    box-sizing: border-box;
    padding: 0.75rem 1rem 0.75rem 1rem;
    border: 1px solid #e0e0e0;
    border-radius: 6px;
    font-size: 1rem;
    background: white;
    cursor: text;
    transition: border-color 0.3s ease;

    &--with-suffix {
      padding-right: 3rem;
    }

    &:hover {
      border: 1px solid #000;
    }

    &:focus {
      outline: none;
      border-color: var(--primary-color);
      box-shadow: 0 0 0 2px var(--primary-surface-color);
    }

    &:disabled {
      background-color: #f5f5f5;
      cursor: not-allowed;
    }

    &::placeholder {
      color: #999;
    }
  }

  &__suffix {
    position: absolute;
    right: 1rem;
    top: 50%;
    transform: translateY(-50%);
    display: flex;
    align-items: center;
    gap: 0.25rem;
    color: #666;
    font-size: 0.875rem;
    pointer-events: none;
  }

  &__icon {
    display: flex;
    align-items: center;
    font-size: 1rem;
    line-height: 1;
  }

  &__suffix-text {
    font-weight: 500;
  }

  &__error {
    color: var(--secondary-color);
    font-size: 0.875rem;
    margin-top: 1rem;
  }
}
</style>
