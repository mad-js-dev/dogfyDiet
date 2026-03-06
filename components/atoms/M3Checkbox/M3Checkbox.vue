<template>
  <div 
    class="c-m3-checkbox"
    :class="{
      'c-m3-checkbox--disabled': disabled,
      'c-m3-checkbox--checked': modelValue,
      'c-m3-checkbox--error': hasError
    }"
  >
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
  inputRef.value?.focus()
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
  
  &__input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
    width: 20px;
    height: 20px;
    margin: 0;

    &:checked {
      opacity: 1;
    }

    &--error {
      accent-color: map.get($color-roles-light, error, text);
    }
  }

  &__label {
    cursor: pointer;
    @include typography-role(body-medium);
    @include color-role(surface);
    transition: color 0.2s ease;

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

    .c-m3-checkbox__input {
      background-color: map.get($color-roles-light, surface-variant, background);
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
  .c-m3-checkbox__input {
    outline: 2px solid map.get($color-roles-light, primary, text);
    outline-offset: 2px;
  }

  .c-m3-checkbox__label {
    outline: 2px solid map.get($color-roles-light, primary, text);
    outline-offset: 2px;
  }
}
</style>
