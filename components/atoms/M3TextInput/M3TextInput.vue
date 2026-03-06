<template>
  <div class="c-text-input">
    <div class="c-text-input__wrapper">
      <input
        :id="inputId"
        :value="modelValue"
        :type="inputType"
        :placeholder="placeholder"
        :disabled="disabled"
        :required="required"
        autocomplete="off"
        class="c-text-input__input"
        :class="{ 'c-text-input__input--with-suffix': suffix || icon, 'has-error': hasError }"
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
    <div v-if="hasError" class="c-text-input__error">
      {{ errorMessage }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

interface Props {
  modelValue: string
  placeholder?: string
  required?: boolean
  type?: 'text' | 'email' | 'number' | 'tel'
  id?: string
  disabled?: boolean
  suffix?: string
  icon?: string
  validation?: Array<{
    type: string
    value?: any
    message: string
  }>
}

const props = withDefaults(defineProps<Props>(), {
  type: 'text',
  required: false,
  placeholder: 'Enter your answer',
  disabled: false
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
  'focus': []
  'keydown': [event: KeyboardEvent]
}>()

const hasError = ref(false)
const errorMessage = ref('')

const inputId = computed(() => props.id || `text-input-${Math.random().toString(36).substr(2, 9)}`)

const inputType = computed(() => {
  if (props.type === 'email') return 'email'
  if (props.type === 'number') return 'number'
  if (props.type === 'tel') return 'tel'
  return 'text'
})

const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  const value = target.value
  
  validateInput(value)
  emit('update:modelValue', value)
}

const handleBlur = () => {
  validateInput(props.modelValue)
}

const handleFocus = () => {
  emit('focus')
}

const validateInput = (value: string) => {
  hasError.value = false
  errorMessage.value = ''
  
  for (const rule of props.validation || []) {
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

    &.has-error {
      border-color: var(--secondary-color);
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
