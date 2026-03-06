<template>
  <div 
    class="c-checkbox"
    :class="{
      'c-checkbox--disabled': disabled,
      'c-checkbox--checked': modelValue,
      'c-checkbox--error': hasError
    }"
  >
    <input
      type="checkbox"
      :id="inputId"
      :checked="modelValue"
      :disabled="disabled"
      :class="{
        'c-checkbox__input': true,
        'c-checkbox__input--error': hasError
      }"
      @change="handleChange"
      @blur="handleBlur"
      @focus="handleFocus"
      :aria-describedby="hasError ? `${inputId}-error` : undefined"
    />
    
    <label 
      :for="inputId"
      :class="{
        'c-checkbox__label': true,
        'c-checkbox__label--disabled': disabled,
        'c-checkbox__label--error': hasError
      }"
      @click="handleLabelClick"
    >
      <span v-if="label">{{ label }}</span>
    </label>
    
    <div v-if="hasError" :id="`${inputId}-error`" class="c-checkbox__error">
      {{ errorMessage }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

interface Props {
  modelValue?: boolean
  label?: string
  id?: string
  disabled?: boolean
  required?: boolean
  errorMessage?: string
  'aria-label'?: string
}

interface Emits {
  'update:modelValue': [value: boolean]
  'blur': []
  'focus': []
  'click': [value: any]
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
  required: false
})

const emit = defineEmits<Emits>()

const inputRef = ref<HTMLInputElement>()

// Handle input change
const handleChange = (event: Event) => {
  const value = (event.target as HTMLInputElement).checked
  emit('update:modelValue', value)
}

// Handle blur event
const handleBlur = (event: FocusEvent) => {
  emit('blur')
}

// Handle focus event
const handleFocus = (event: FocusEvent) => {
  emit('focus')
}

// Handle label click
const handleLabelClick = () => {
  inputRef.value?.focus()
}

// Computed class for error state
const hasError = computed(() => {
  return props.required && !props.modelValue && props.errorMessage
})

// Computed aria attributes
const ariaDescribedBy = computed(() => {
  return hasError.value ? `${props.id}-error` : undefined
})

const ariaLabel = computed(() => {
  return props['aria-label'] || props.label
})
</script>

<style scoped>
.c-checkbox {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  cursor: pointer;
  user-select: none;
}

.c-checkbox__input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  width: 20px;
  height: 20px;
  margin: 0;
}

.c-checkbox__input:checked {
  opacity: 1;
}

.c-checkbox__input--error {
  accent-color: #d80003;
}

.c-checkbox__label {
  cursor: pointer;
  font-size: 16px;
  line-height: 24px;
  color: #1a1a1a;
  transition: color 0.2s ease;
}

.c-checkbox__label:hover {
  color: #00B67A;
}

.c-checkbox__label--disabled {
  color: #9e9e9e;
  cursor: not-allowed;
}

.c-checkbox__label--error {
  color: #d80003;
}

.c-checkbox__error {
  font-size: 14px;
  line-height: 20px;
  color: #d80003;
  margin-top: 4px;
}

.c-checkbox--disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.c-checkbox--checked {
  color: #00B67A;
}

/* Focus styles */
.c-checkbox:focus-within .c-checkbox__input {
  outline: 2px solid #00B67A;
  outline-offset: 2px;
}

.c-checkbox:focus-within .c-checkbox__label {
  outline: 2px solid #00B67A;
  outline-offset: 2px;
}

/* Disabled state */
.c-checkbox--disabled .c-checkbox__input {
  background-color: #f5f5f5;
}

.c-checkbox--disabled .c-checkbox__label {
  color: #9e9e9e;
}

/* Error state */
.c-checkbox--error .c-checkbox__input {
  border-color: #d80003;
}

.c-checkbox--error .c-checkbox__label {
  color: #d80003;
}

/* Animation */
.c-checkbox__input {
  transition: all 0.2s ease;
}

.c-checkbox__label {
  transition: color 0.2s ease;
}
</style>
