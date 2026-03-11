<template>
  <label class="c-m3-checkbox">
    <input
      type="checkbox"
      :id="inputId"
      :checked="indeterminate ? false : Boolean(modelValue)"
      :disabled="disabled"
      :indeterminate="indeterminate"
      class="c-m3-checkbox__input"
      @change="handleChange"
      @blur="handleBlur"
      @focus="handleFocus"
      :aria-describedby="hasError ? `${inputId}-error` : undefined"
    />
    <span class="c-m3-checkbox__visual" :class="{ 'c-m3-checkbox__visual--error': hasError }">
    <!-- Cross icon when unchecked and showCross is true -->
    <span v-if="effectiveShowCross && !modelValue && !indeterminate" class="c-m3-checkbox__cross"></span>
    
    <!-- Checkmark icon when checked -->
    <span v-if="modelValue && !indeterminate" class="c-m3-checkbox__checkmark"></span>
    
    <!-- Minus icon when indeterminate -->
    <span v-if="indeterminate && showIndeterminateIcon" class="c-m3-checkbox__minus"></span>
  </span>
    <span class="c-m3-checkbox__label-text" :class="{ 'c-m3-checkbox__label-text--error': hasError }" v-if="label">{{ label }}</span>
    <span class="c-m3-checkbox__required" v-if="required && !modelValue">*</span>
    
    <div v-if="hasError" :id="`${inputId}-error`" class="c-m3-checkbox__error">
      {{ errorMessage }}
    </div>
  </label>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'

import type { Props, Emits } from './settings'
import { defaults } from './settings'

const props = withDefaults(defineProps<Props>(), defaults)

const emit = defineEmits<Emits>()

const inputRef = ref<HTMLInputElement>()

// Computed properties
const inputId = computed(() => props.id || 'checkbox-' + Math.random().toString(36).substr(2, 9))

const hasError = computed(() => {
  return props.required && !props.modelValue && props.errorMessage
})

// Automatically enable cross when indeterminate icon is disabled
const effectiveShowCross = computed(() => props.showCross || !props.showIndeterminateIcon)

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

<style lang="scss" src="./M3Checkbox-icons.scss"></style>

<style scoped lang="scss" src="./M3Checkbox.scss"></style>
