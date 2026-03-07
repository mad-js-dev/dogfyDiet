<template>
  <div 
    class="c-m3-toggle"
    :class="{
      'c-m3-toggle--disabled': disabled,
      'c-m3-toggle--checked': modelValue
    }"
  >
    <button
      type="button"
      :id="inputId"
      :class="{
        'c-m3-toggle__button': true,
        'c-m3-toggle__button--active': modelValue
      }"
      :disabled="disabled"
      :aria-pressed="modelValue"
      :aria-label="ariaLabel || 'Toggle switch'"
      @click="toggle"
      role="switch"
    >
      <div class="c-m3-toggle__thumb">
        <div class="c-m3-toggle__thumb-handle"></div>
      </div>
    </button>
    
    <!-- Hidden input for form compatibility -->
    <input
      type="checkbox"
      :id="inputId + '-hidden'"
      :checked="modelValue"
      :disabled="disabled"
      :aria-label="ariaLabel || 'Toggle switch'"
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  modelValue?: boolean
  id?: string
  disabled?: boolean
  label?: string
  required?: boolean
  'aria-label'?: string
}

interface Emits {
  'update:modelValue': [value: boolean]
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
  required: false
})

const emit = defineEmits<Emits>()

// Computed properties
const inputId = computed(() => props.id || 'toggle-' + Math.random().toString(36).substr(2, 9))

// Handle toggle
const toggle = () => {
  const newValue = !props.modelValue
  emit('update:modelValue', newValue)
}

// Computed aria label
const ariaLabel = computed(() => {
  return props['aria-label'] || 'Toggle switch'
})
</script>

<style scoped lang="scss">
@use 'sass:map';
@use '~/assets/styles/_mixins-new.scss' as *;

.c-m3-toggle {
  @include component-style(
    $typography-role: body-medium,
    $color-role: surface,
    $elevation-level: 0
  );
  
  position: relative;
  display: inline-block;
  width: 52px;
  height: 32px;

  &__button {
    position: relative;
    width: 100%;
    height: 100%;
    border: none;
    background-color: transparent;
    cursor: pointer;
    border-radius: 16px;
    transition: all 0.2s ease;

    &:hover {
      @include color-role(surface-variant);
    }

    &--active {
      @include color-role(primary);
    }

    &--disabled {
      opacity: 0.6;
      cursor: not-allowed;
      background-color: transparent;
    }
  }

  &__thumb {
    position: absolute;
    top: 4px;
    left: 4px;
    width: 24px;
    height: 24px;
    background-color: map.get(map.get($color-roles-light, surface), background);
    border-radius: 12px;
    box-shadow: map.get($elevation-shadows, 1);
    transition: all 0.2s ease;
  }

  &__thumb-handle {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 2px;
    height: 10px;
    background-color: map.get(map.get($color-roles-light, primary), background);
    border-radius: 1px;
    transform: translate(-50%, -50%);
  }
}

/* Active state */
.c-m3-toggle--checked {
  .c-m3-toggle__thumb {
    background-color: map.get(map.get($color-roles-light, primary), background);
    box-shadow: map.get($elevation-shadows, 2);
  }
}

/* Focus styles */
.c-m3-toggle:focus-within {
  .c-m3-toggle__button {
    outline: 2px solid map.get(map.get($color-roles-light, primary), border);
    outline-offset: 2px;
  }
}

/* Disabled state */
.c-m3-toggle--disabled {
  .c-m3-toggle__button {
    background-color: transparent;
  }

  .c-m3-toggle__thumb {
    background-color: map.get(map.get($color-roles-light, surface-variant), background);
    box-shadow: none;
  }
}
</style>
