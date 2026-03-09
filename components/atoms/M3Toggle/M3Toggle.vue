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
      class="c-m3-toggle__hidden-input"
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

// Define theme-aware color properties for the toggle
.c-m3-toggle {
  --toggle-track-off: #{map.get(map.get($color-roles-light, surface), surface-container-highest)};
  --toggle-track-on: #{map.get(map.get($color-roles-light, secondary), main)};
  --toggle-track-disabled: rgba(#{map.get(map.get($color-roles-light, surface-variant), background)}, 0.12);
  --toggle-thumb-off: #{map.get(map.get($color-roles-light, surface-variant), border)};
  --toggle-thumb-on: #{map.get(map.get($color-roles-light, secondary), border)};
  --toggle-handle: #{map.get(map.get($color-roles-light, secondary), text)};
  --toggle-focus-outline: #{map.get(map.get($color-roles-light, secondary), border)};
  --toggle-thumb-disabled: #{map.get(map.get($color-roles-light, surface-variant), background)};
  --toggle-surface-container-highest: #{map.get(map.get($color-roles-light, surface), background)};
  
  // Dark theme overrides
  @media (prefers-color-scheme: dark) {
    --toggle-track-off: #{map.get(map.get($color-roles-dark, surface-container-highest), background)};
    --toggle-track-on: rgba(#{map.get(map.get($color-roles-dark, primary), background)}, 0.54);
    --toggle-track-disabled: rgba(#{map.get(map.get($color-roles-dark, surface-variant), background)}, 0.12);
    --toggle-thumb-off: #{map.get(map.get($color-roles-dark, surface-variant), border)};
    --toggle-thumb-on: #{map.get(map.get($color-roles-dark, primary), border)};
    --toggle-handle: #{map.get(map.get($color-roles-dark, primary), text)};
    --toggle-focus-outline: #{map.get(map.get($color-roles-dark, primary), border)};
    --toggle-thumb-disabled: #{map.get(map.get($color-roles-dark, surface-variant), background)};
    --toggle-surface-container-highest: #{map.get(map.get($color-roles-dark, surface), background)};
  }
  
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
    border: 2px solid var(--toggle-thumb-off);
    background-color: var(--toggle-surface-container-highest);
    cursor: pointer;
    border-radius: 16px;
    transition: all 0.2s ease;

    &:hover {
      // No background color change on hover
    }

    &--active {
      background-color: #{map.get(map.get($color-roles-light, primary), background)};
      border-color: var(--toggle-track-on);
    }

    &--disabled {
      opacity: 0.6;
      cursor: not-allowed;
      background-color: var(--toggle-track-disabled);
      border-color: var(--toggle-track-disabled);
    }
  }

  &__thumb {
    position: absolute;
    top: 50%;
    width: 16px;
    height: 16px;
    background-color: var(--toggle-thumb-off);
    border-radius: 50%;
    cursor: grab;
    transform: translate(-50%, -50%);
    box-shadow: map.get($elevation-shadows, 1);
    transition: transform 0.2s ease, box-shadow 0.2s ease, left 0.2s ease, background-color 0.2s ease;
    left: 16px;

    &:hover {
      transform: translate(-50%, -50%) scale(1.1);
      box-shadow: map.get($elevation-shadows, 2);
    }

    &:active {
      cursor: grabbing;
      transform: translate(-50%, -50%) scale(1.2);
    }
  }

  &__thumb-handle {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 2px;
    height: 10px;
    background-color: var(--toggle-thumb-off);
    border-radius: 1px;
    transform: translate(-50%, -50%);
  }

  // Hidden input for form compatibility - completely invisible
  &__hidden-input {
    position: absolute;
    opacity: 0;
    pointer-events: none;
    width: 0;
    height: 0;
    margin: 0;
    padding: 0;
    border: none;
    clip: rect(0, 0, 0, 0);
    overflow: hidden;
  }
}

/* Active state */
.c-m3-toggle--checked {
  .c-m3-toggle__thumb {
    background-color: var(--toggle-track-on);
    box-shadow: map.get($elevation-shadows, 1);
    left: 36px;
  }

  .c-m3-toggle__thumb-handle {
    background-color: var(--toggle-track-on);
  }
}


/* Disabled state */
.c-m3-toggle--disabled {
  .c-m3-toggle__button {
    background-color: transparent;
  }

  .c-m3-toggle__thumb {
    background-color: var(--toggle-thumb-disabled);
    box-shadow: none;
  }
}
</style>
