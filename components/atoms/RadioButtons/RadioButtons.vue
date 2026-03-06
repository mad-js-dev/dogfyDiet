<template>
  <div 
    class="c-radio-buttons"
    :class="{ 'c-radio-buttons--disabled': disabled }"
  >
    <div class="c-radio-buttons__options">
      <button
        v-for="(option, index) in actualOptions"
        :key="option.value"
        type="button"
        :class="{
          'c-radio-buttons__button': true,
          'c-radio-buttons__button--active': modelValue === option.value,
          'c-radio-buttons__button--first': index === 0,
          'c-radio-buttons__button--last': index === actualOptions.length - 1
        }"
        :disabled="disabled"
        :aria-pressed="modelValue === option.value"
        :aria-label="option.label"
        @click="selectOption(option)"
      >
        <span class="c-radio-buttons__text">{{ option.label }}</span>
      </button>
    </div>
    
    <!-- Hidden input for form compatibility -->
    <input
      type="hidden"
      :name="actualName"
      :value="Array.isArray(modelValue) ? modelValue.join(',') : modelValue"
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  modelValue?: string
  options?: string[]
  name?: string
  disabled?: boolean
  required?: boolean
}

interface Emits {
  'update:modelValue': [value: string]
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
  required: false
})

const emit = defineEmits<Emits>()

// Handle option selection
const selectOption = (option: string) => {
  emit('update:modelValue', option)
}

// Computed options array
const actualOptions = computed(() => {
  return props.options || []
})

// Computed selected index
const selectedIndex = computed(() => {
  if (!props.modelValue || !props.options) return -1
  return props.options.findIndex(option => option === props.modelValue)
})
</script>

<style scoped>
.c-radio-buttons {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.c-radio-buttons__options {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.c-radio-buttons__button {
  flex: 1;
  align-items: center;
  justify-content: center;
  min-height: 48px;
  padding: 12px 16px;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  background-color: #ffffff;
  color: #1a1a1a;
  font-size: 16px;
  line-height: 24px;
  cursor: pointer;
  transition: all 0.2s ease;
  user-select: none;
}

.c-radio-buttons__button:hover {
  background-color: #f5f5f5;
  border-color: #d0d0d0;
}

.c-radio-buttons__button--active {
  background-color: #00B67A;
  border-color: #00B67A;
  color: #ffffff;
}

.c-radio-buttons__button--first {
  border-top-left-radius: 8px;
}

.c-radio-buttons__button--last {
  border-bottom-right-radius: 8px;
}

.c-radio-buttons__button--disabled {
  opacity: 0.6;
  cursor: not-allowed;
  background-color: #f5f5f5;
  border-color: #e0e0e0;
  color: #9e9e9e;
}

.c-radio-buttons__text {
  font-weight: 500;
}

/* Focus styles */
.c-radio-buttons__button:focus {
  outline: 2px solid #00B67A;
  outline-offset: 2px;
}

/* Active state */
.c-radio-buttons__button--active:focus {
  outline: 2px solid #005128;
  outline-offset: 2px;
}

/* Disabled state */
.c-radio-buttons__button--disabled:focus {
  outline: none;
}

/* Animation */
.c-radio-buttons__button {
  transition: all 0.2s ease;
}

.c-radio-buttons__text {
  transition: color 0.2s ease;
}
</style>
