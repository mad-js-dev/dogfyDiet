<template>
  <label class="c-m3-checkbox">
    <input
      type="checkbox"
      :id="inputId"
      :checked="indeterminate ? false : modelValue"
      :disabled="disabled"
      :indeterminate="indeterminate"
      class="c-m3-checkbox__input"
      @change="handleChange"
      @blur="handleBlur"
      @focus="handleFocus"
      :aria-describedby="hasError ? `${inputId}-error` : undefined"
    />
    <span class="c-m3-checkbox__visual" :class="{ 'c-m3-checkbox__visual--error': hasError }"></span>
    <span class="c-m3-checkbox__label-text" :class="{ 'c-m3-checkbox__label-text--error': hasError }" v-if="label">{{ label }}</span>
    <span class="c-m3-checkbox__required" v-if="required && !modelValue">*</span>
    
    <div v-if="hasError" :id="`${inputId}-error`" class="c-m3-checkbox__error">
      {{ errorMessage }}
    </div>
  </label>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'

interface Props {
  modelValue?: boolean | null
  label?: string
  id?: string
  disabled?: boolean
  required?: boolean
  errorMessage?: string
  'aria-label'?: string
  indeterminate?: boolean
}

interface Emits {
  'update:modelValue': [value: boolean]
  'blur': []
  'focus': []
  'click': [value: any]
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
  required: false,
  indeterminate: false
})

const emit = defineEmits<Emits>()

// Debug: Watch modelValue changes
watch(() => props.modelValue, (newValue) => {
  console.log('modelValue changed to:', newValue)
})

const inputRef = ref<HTMLInputElement>()

// Computed properties
const inputId = computed(() => props.id || 'checkbox-' + Math.random().toString(36).substr(2, 9))

const hasError = computed(() => {
  return props.required && !props.modelValue && props.errorMessage
})

// Handle input change
const handleChange = (event: Event) => {
  const target = event.target as HTMLInputElement
  console.log('Checkbox changed:', target.checked) // Debug log
  emit('update:modelValue', target.checked)
}

// Handle blur event
const handleBlur = (event: FocusEvent) => {
  emit('blur')
}

// Handle focus event
const handleFocus = (event: FocusEvent) => {
  emit('focus')
}

// Computed aria attributes
const ariaDescribedBy = computed(() => {
  return hasError.value ? `${inputId.value}-error` : undefined
})

const ariaLabel = computed(() => {
  return props['aria-label'] || props.label
})
</script>

<script lang="ts">
export default {
  name: 'M3Checkbox'
}
</script>

<style scoped lang="scss">
@use 'sass:map';
@use '~/assets/styles/_mixins-new.scss' as *;

.c-m3-checkbox {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  user-select: none;
  position: relative;
  
  &__input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
    width: 48px; // Target size
    height: 48px; // Target size
    margin: 0;
    z-index: 2;

    &:checked + .c-m3-checkbox__visual {
      background-color: map.get($color-roles-light, primary, background);
      border-color: map.get($color-roles-light, primary, background);
      
      &::after {
        opacity: 1;
        transform: scale(1);
        color: map.get($color-roles-light, primary, text);
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='18' height='18' viewBox='0 0 24 24'%3E%3Cpath fill='currentColor' d='M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z'/%3E%3C/svg%3E");
      }
    }

    &:indeterminate + .c-m3-checkbox__visual {
      background-color: map.get($color-roles-light, primary, background);
      border-color: map.get($color-roles-light, primary, background);
      
      &::after {
        opacity: 1;
        transform: scale(1);
        color: map.get($color-roles-light, primary, text);
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='18' height='18' viewBox='0 0 24 24'%3E%3Cpath fill='currentColor' d='M19 13H5v-2h14v2z'/%3E%3C/svg%3E");
      }
    }

    &:focus + .c-m3-checkbox__visual {
      outline: 2px solid map.get($color-roles-light, primary, text);
      outline-offset: 2px;
    }

    &:disabled + .c-m3-checkbox__visual {
      background-color: map.get($color-roles-light, surface-variant, background);
      border-color: map.get($color-roles-light, surface-variant, border);
      opacity: 0.6;
      cursor: not-allowed;
      
      &::after {
        color: map.get($color-roles-light, surface-variant, text);
      }
    }

    &:disabled:checked + .c-m3-checkbox__visual,
    &:disabled:indeterminate + .c-m3-checkbox__visual {
      background-color: map.get($color-roles-light, surface-variant, background);
      border-color: map.get($color-roles-light, surface-variant, border);
    }
  }
  
  // Custom checkbox visual (18dp container)
  &__visual {
    width: 18px;
    height: 18px;
    border-radius: 2px; // Container corner shape
    border: 2px solid map.get($color-roles-light, surface-variant, border);
    background-color: map.get($color-roles-light, surface, background);
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s ease;
    position: relative;
    z-index: 1;
    
    // Checkmark/minus icon (18dp size, center-aligned)
    &::after {
      content: '';
      width: 18px;
      height: 18px;
      background-size: contain;
      background-repeat: no-repeat;
      background-position: center;
      opacity: 0;
      transform: scale(0.8);
      transition: all 0.2s ease;
      color: transparent;
    }
    
    // Error state - red border
    &--error {
      border-color: map.get($color-roles-light, error, border);
    }
  }

  // State layer (40dp)
  &::before {
    content: '';
    position: absolute;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    left: 4px;
    top: 50%;
    transform: translateY(-50%);
    background-color: transparent;
    transition: background-color 0.2s ease;
    z-index: 0;
  }
  
  &:hover::before {
    background-color: map.get($color-roles-light, primary, text);
    opacity: 0.08;
  }

  &:hover .c-m3-checkbox__label-text {
    color: map.get($color-roles-light, primary, border);
  }

  &__label-text {
    @include typography-role(body-medium);
    color: map.get($color-roles-light, surface, text);
    transition: color 0.2s ease;
    z-index: 1;
    
    &--error {
      color: map.get($color-roles-light, error, border);
    }
  }

  &__required {
    @include typography-role(body-small);
    color: map.get($color-roles-light, error, border);
    margin-left: 4px;
  }

  &__error {
    @include typography-role(body-small);
    color: map.get($color-roles-light, error, border);
    margin-top: 4px;
    display: block;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    
    &::before {
      display: none;
    }
    
    .c-m3-checkbox__label-text {
      color: map.get($color-roles-light, surface-variant, text);
      cursor: not-allowed;
    }
  }
}
</style>
