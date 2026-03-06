<template>
  <div 
    class="c-toggle"
    :class="{
      'c-toggle--disabled': disabled,
      'c-toggle--checked': modelValue
    }"
  >
    <button
      type="button"
      :id="inputId"
      :class="{
        'c-toggle__button': true,
        'c-toggle__button--active': modelValue
      }"
      :disabled="disabled"
      :aria-pressed="modelValue"
      :aria-label="ariaLabel || 'Toggle switch'"
      @click="toggle"
      role="switch"
    >
      <div class="c-toggle__thumb">
        <div class="c-toggle__thumb-handle"></div>
      </div>
    </button>
    
    <!-- Hidden input for form compatibility -->
    <input
      type="checkbox"
      :id="inputId"
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

<style scoped>
.c-toggle {
  position: relative;
  display: inline-block;
  width: 52px;
  height: 32px;
}

.c-toggle__button {
  position: relative;
  width: 100%;
  height: 100%;
  border: none;
  background-color: transparent;
  cursor: pointer;
  border-radius: 16px;
  transition: all 0.2s ease;
}

.c-toggle__button--active {
  background-color: #00B67A;
}

.c-toggle__button:hover {
  background-color: rgba(0, 183, 205, 0.05);
}

.c-toggle__button--disabled {
  opacity: 0.6;
  cursor: not-allowed;
  background-color: transparent;
}

.c-toggle__thumb {
  position: absolute;
  top: 4px;
  left: 4px;
  width: 24px;
  height: 24px;
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  transition: all 0.2s ease;
}

.c-toggle__thumb-handle {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 2px;
  height: 10px;
  background-color: #00B67A;
  border-radius: 1px;
  transform: translate(-50%, -50%);
}

/* Active state */
.c-toggle--checked .c-toggle__thumb {
  background-color: #00B67A;
  box-shadow: 0 2px 8px rgba(0, 183, 205, 0.25);
}

/* Focus styles */
.c-toggle:focus-within .c-toggle__button {
  outline: 2px solid #00B67A;
  outline-offset: 2px;
}

/* Disabled state */
.c-toggle--disabled .c-toggle__button {
  background-color: transparent;
}

.c-toggle--disabled .c-toggle__thumb {
  background-color: #9e9e9e;
  box-shadow: none;
}

/* Animation */
.c-toggle__thumb {
  transition: all 0.2s ease;
}

.c-toggle__thumb-handle {
  transition: all 0.2s ease;
}
</style>
