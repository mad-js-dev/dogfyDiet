<template>
  <label class="c-m3-radio-button">
    <input
      type="radio"
      :id="inputId"
      :checked="modelValue === value"
      :value="value"
      :name="name"
      :disabled="disabled"
      class="c-m3-radio-button__input"
      @click="handleChange"
      @blur="handleBlur"
      @focus="handleFocus"
      :aria-describedby="hasError ? `${inputId}-error` : undefined"
    />
    <span class="c-m3-radio-button__visual" :class="{ 'c-m3-radio-button__visual--error': hasError, 'c-m3-radio-button__visual--selected': modelValue === value }">
    <!-- Dot when selected -->
    <span v-if="modelValue === value" class="c-m3-radio-button__dot"></span>
  </span>
    <span class="c-m3-radio-button__label-text" :class="{ 'c-m3-radio-button__label-text--error': hasError }" v-if="label">{{ label }}</span>
    <span class="c-m3-radio-button__required" v-if="required && modelValue !== value">*</span>
    
    <div v-if="hasError" :id="`${inputId}-error`" class="c-m3-radio-button__error">
      {{ errorMessage }}
    </div>
  </label>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

import type { Props, Emits } from './settings'
import { defaults } from './settings'

const props = withDefaults(defineProps<Props>(), defaults)

const emit = defineEmits<Emits>()

const inputRef = ref<HTMLInputElement>()

// Computed properties
const inputId = computed(() => props.id || 'radio-' + Math.random().toString(36).substr(2, 9))

const hasError = computed(() => {
  return props.required && props.modelValue !== props.value && props.errorMessage
})

// Handle input change
const handleChange = (event: Event) => {
  const isSelected = props.modelValue === props.value
  emit('update:modelValue', isSelected ? null : props.value)
  if (!isSelected) {
    emit('change', props.value)
  }
}

// Handle blur event
const handleBlur = (event: FocusEvent) => {
  emit('blur', event)
}

// Handle focus event
const handleFocus = (event: FocusEvent) => {
  emit('focus', event)
}
</script>

<script lang="ts">
export default {
  name: 'M3RadioButton'
}
</script>

<style scoped lang="scss" src="./M3RadioButton.scss"></style>

<style lang="scss" src="./M3RadioButton-icons.scss"></style>
