<template>
  <div 
    class="c-m3-checkbox"
    :class="{
      'c-m3-checkbox--disabled': disabled,
      'c-m3-checkbox--checked': modelValue,
      'c-m3-checkbox--error': hasError
    }"
  >
    <div class="c-m3-checkbox__input-wrapper">
      <input
        type="checkbox"
        :id="inputId"
        :checked="modelValue"
        :disabled="disabled"
        :class="{
          'c-m3-checkbox__input': true,
          'c-m3-checkbox__input--error': hasError
        }"
        @change="handleChange"
        @blur="handleBlur"
        @focus="handleFocus"
        :aria-describedby="hasError ? `${inputId}-error` : undefined"
      />
      <div class="c-m3-checkbox__visual"></div>
    </div>
    
    <label 
      :for="inputId"
      :class="{
        'c-m3-checkbox__label': true,
        'c-m3-checkbox__label--disabled': disabled,
        'c-m3-checkbox__label--error': hasError
      }"
      @click="handleLabelClick"
    >
      <span v-if="label">{{ label }}</span>
    </label>
    
    <div v-if="hasError" :id="`${inputId}-error`" class="c-m3-checkbox__error">
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

// Computed properties
const inputId = computed(() => props.id || 'checkbox-' + Math.random().toString(36).substr(2, 9))

const hasError = computed(() => {
  return props.required && !props.modelValue && props.errorMessage
})

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
  if (!props.disabled) {
    inputRef.value?.click()
  }
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
  @include component-style(
    $typography-role: body-medium,
    $color-role: surface,
    $elevation-level: 0
  );
  
  display: flex;
  align-items: flex-start;
  gap: 12px;
  cursor: pointer;
  user-select: none;
  position: relative;
  
  // State layer (40dp) - centered around the checkbox
  &::before {
    content: '';
    position: absolute;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    background-color: transparent;
    transition: background-color 0.2s ease;
    z-index: 0;
    margin-left: -20px; // Adjust for label positioning
  }
  
  &:hover::before {
    background-color: map.get($color-roles-light, primary, text);
    opacity: 0.08;
  }
  
  &__input-wrapper {
    position: relative;
    width: 48px; // Target size
    height: 48px; // Target size
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1;
  }
  
  &__input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
    width: 48px; // Target size
    height: 48px; // Target size
    margin: 0;
    z-index: 3; // Above visual element
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);

    &--error {
      accent-color: map.get($color-roles-light, error, text);
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
    pointer-events: none; // Allow clicks to pass through to input
    
    // Checkmark icon (18dp size, center-aligned)
    &::after {
      content: '';
      width: 18px;
      height: 18px;
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='18' height='18' viewBox='0 0 18 18'%3E%3Cpath fill='%23currentColor' d='M6.75 12.25L3.5 9l-1.06 1.06L6.75 14.87 15.56 6.06 14.5 5z'/%3E%3C/svg%3E");
      background-size: contain;
      background-repeat: no-repeat;
      background-position: center;
      opacity: 0;
      transform: scale(0.8);
      transition: all 0.2s ease;
      color: transparent;
    }
  }
  
  // Checked state
  &--checked &__visual {
    background-color: map.get($color-roles-light, primary, background);
    border-color: map.get($color-roles-light, primary, background);
    
    &::after {
      opacity: 1;
      transform: scale(1);
      color: map.get($color-roles-light, primary, text);
    }
  }
  
  // Error state
  &--error &__visual {
    border-color: map.get($color-roles-light, error, border);
  }
  
  // Checked and error state
  &.c-m3-checkbox--checked.c-m3-checkbox--error &__visual {
    background-color: map.get($color-roles-light, error, background);
    border-color: map.get($color-roles-light, error, background);
    
    &::after {
      color: map.get($color-roles-light, error, text);
    }
  }

  &__label {
    cursor: pointer;
    @include typography-role(body-medium);
    @include color-role(surface);
    transition: color 0.2s ease;
    padding-top: 12px; // Align with checkbox center
    z-index: 1;

    &:hover {
      @include color-role(primary);
    }

    &--disabled {
      @include color-role(surface-variant);
      cursor: not-allowed;
    }

    &--error {
      @include color-role(error);
    }
  }

  &__error {
    @include typography-role(body-small);
    @include color-role(error);
    margin-top: 4px;
  }

  &--disabled {
    opacity: 0.6;
    cursor: not-allowed;

    .c-m3-checkbox__visual {
      background-color: map.get($color-roles-light, surface-variant, background);
      border-color: map.get($color-roles-light, surface-variant, border);
      
      &::after {
        color: map.get($color-roles-light, surface-variant, text);
      }
    }
    
    &::before {
      display: none;
    }
  }

  &--checked {
    .c-m3-checkbox__label {
      @include color-role(primary);
    }
  }
}

/* Focus styles */
.c-m3-checkbox:focus-within {
  .c-m3-checkbox__visual {
    outline: 2px solid map.get($color-roles-light, primary, text);
    outline-offset: 2px;
  }
}
</style>
