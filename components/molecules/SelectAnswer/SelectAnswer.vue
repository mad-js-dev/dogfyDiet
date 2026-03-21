<template>
  <div class="c-select-answer">
    <!-- Hidden native select for form submission and accessibility -->
    <select
      :id="actualId"
      v-model="selectedValue"
      :disabled="disabled"
      autocomplete="off"
      class="c-select-answer__select c-select-answer__select--native"
      @blur="handleBlur"
    >
      <option value="" disabled>{{ actualPlaceholder }}</option>
      <option 
        v-for="option in actualOptions" 
        :key="option"
        :value="option"
      >
        {{ option }}
      </option>
    </select>
    
    <!-- Custom text input trigger -->
    <div class="c-select-answer__input-wrapper">
      <TextInput
        :id="actualId + '_input'"
        :model-value="inputText"
        :config="{
          id: actualId + '_input',
          type: 'text',
          question: actualPlaceholder,
          appliesTo: 'individual'
        }"
        :disabled="disabled"
        @update:model-value="handleInputChange"
        @blur="handleInputBlur"
        @focus="handleInputFocus"
        @keydown="handleKeyDown"
        :icon="isOpen ? chevronUpIcon : chevronDownIcon"
      />
    </div>
    
    <!-- Custom dropdown -->
    <div 
      v-if="isOpen && !disabled"
      class="c-select-answer__dropdown"
      @click.stop
    >
      <div 
        v-for="(option, index) in filteredOptions" 
        :key="option"
        class="c-select-answer__option"
        :class="{ 
          'c-select-answer__option--selected': option === selectedValue,
          'c-select-answer__option--focused': index === focusedOptionIndex
        }"
        @click="selectOption(option)"
        @mouseenter="focusedOptionIndex = index"
      >
        {{ option }}
      </div>
    </div>
    
    <div v-if="hasError" class="c-select-answer__error">
      {{ errorMessage }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch, onMounted, onUnmounted } from 'vue'
import TextInput from '~/components/atoms/M3TextInput/M3TextInput.vue'

interface Props {
  question?: {
    id: string
    title?: string
    description?: string
    type: string
    required?: boolean
    options?: string[]
  }
  config?: {
    id: string
    type: string
    question?: string
    options?: string[]
    required?: boolean
  }
  modelValue?: string
  options?: string[]
  placeholder?: string
  required?: boolean
  id?: string
  disabled?: boolean
  validation?: Array<{
    type: string
    message: string
  }>
}

interface Emits {
  (e: 'update:modelValue', value: string): void
  (e: 'answer', value: string, questionId: string): void
}

const props = withDefaults(defineProps<Props>(), {
  required: false,
  placeholder: 'Select an option',
  disabled: false
})

const emit = defineEmits<Emits>()

// Computed properties to handle both config and direct props
const actualOptions = computed(() => {
  return props.question?.options || props.config?.options || props.options || []
})
const actualId = computed(() => {
  // Use question.id first, then config.id, then props.id, then generate a deterministic ID
  if (props.question?.id) return props.question.id
  if (props.config?.id) return props.config.id
  if (props.id) return props.id
  
  // Generate deterministic ID based on options to avoid hydration mismatch
  const optionsString = actualOptions.value?.join('-') || ''
  return `select-${optionsString.slice(0, 10).replace(/[^a-zA-Z0-9]/g, '-')}`
})
const actualPlaceholder = computed(() => props.question?.title || props.config?.question || props.placeholder || 'Select an option')
const actualRequired = computed(() => props.question?.required || props.config?.required || props.required || false)

const selectedValue = ref(props.modelValue || '')
const hasError = ref(false)
const errorMessage = ref('')
const isTouched = ref(false)
const isOpen = ref(false)
// Initialize inputText with selected value for display, but it will be cleared on focus
const inputText = ref(props.modelValue || '')
const focusedOptionIndex = ref(-1)

// Icon SVGs
const chevronDownIcon = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6,9 12,15 18,9"></polyline></svg>'
const chevronUpIcon = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6,15 12,9 18,15"></polyline></svg>'

const selectId = computed(() => actualId.value)

const filteredOptions = computed(() => {
  // If input is empty or not set, show all options
  if (!inputText.value || inputText.value.trim() === '') {
    return actualOptions.value || []
  }
  
  // Otherwise filter options based on input text
  return actualOptions.value?.filter(option => 
    option.toLowerCase().includes(inputText.value.toLowerCase())
  ) || []
})

const validateInput = (value: string): boolean => {
  if (!actualRequired.value) return true
  
  return value !== null && value !== undefined && value !== ''
}

const handleBlur = () => {
  isTouched.value = true
  validateInput(selectedValue.value)
  isOpen.value = false
}

const toggleDropdown = () => {
  if (props.disabled) return
  isOpen.value = !isOpen.value
}

const selectOption = (option: string) => {
  selectedValue.value = option
  inputText.value = option // Update input text to match selected option
  isOpen.value = false
  focusedOptionIndex.value = -1
  emit('update:modelValue', option)
  emit('answer', option, actualId.value)
  
  if (isTouched.value) {
    validateInput(option)
  }
}

const handleInputChange = (value: string) => {
  inputText.value = value
  focusedOptionIndex.value = 0 // Reset focus to first option when filtering
  
  // Auto-select if exact match found
  const exactMatch = actualOptions.value?.find(option => 
    option.toLowerCase() === value.toLowerCase()
  )
  
  if (exactMatch) {
    selectOption(exactMatch)
  } else {
    // Just update the input text for filtering and show dropdown
    selectedValue.value = ''
    emit('update:modelValue', '')
    emit('answer', '', actualId.value)
    isOpen.value = true // Show dropdown when typing
  }
}

const handleInputFocus = () => {
  if (!props.disabled) {
    // Clear input text when focusing to allow new selection
    inputText.value = ''
    isOpen.value = true // Show dropdown when input is focused
    focusedOptionIndex.value = 0 // Focus first option when dropdown opens
  }
}

const handleInputBlur = () => {
  isTouched.value = true
  validateInput(selectedValue.value)
  // Don't close dropdown immediately on blur to allow clicking options
  setTimeout(() => {
    isOpen.value = false
    focusedOptionIndex.value = -1
  }, 150)
}

const handleKeyDown = (event: KeyboardEvent) => {
  if (!isOpen.value && (event.key === 'ArrowDown' || event.key === 'ArrowUp' || event.key === 'Enter')) {
    isOpen.value = true
    focusedOptionIndex.value = 0
    event.preventDefault()
    return
  }

  if (!isOpen.value) return

  const options = filteredOptions.value
  if (options.length === 0) return

  switch (event.key) {
    case 'ArrowDown':
      event.preventDefault()
      focusedOptionIndex.value = Math.min(focusedOptionIndex.value + 1, options.length - 1)
      break
    case 'ArrowUp':
      event.preventDefault()
      focusedOptionIndex.value = Math.max(focusedOptionIndex.value - 1, 0)
      break
    case 'Enter':
      event.preventDefault()
      if (focusedOptionIndex.value >= 0 && focusedOptionIndex.value < options.length) {
        selectOption(options[focusedOptionIndex.value])
      }
      break
    case 'Escape':
      isOpen.value = false
      focusedOptionIndex.value = -1
      break
  }
}

// Close dropdown when clicking outside
const handleClickOutside = (event: MouseEvent) => {
  const target = event.target as HTMLElement
  if (!target.closest('.c-select-answer')) {
    isOpen.value = false
    focusedOptionIndex.value = -1
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})

// Watch for changes in selectedValue and emit to parent
watch(selectedValue, (newValue) => {
  const safeValue = newValue || ''
  emit('update:modelValue', safeValue)
  emit('answer', safeValue, actualId.value)
  
  // Update input text to match selected value
  if (newValue && actualOptions.value?.includes(newValue)) {
    inputText.value = newValue
  }
  
  if (isTouched.value) {
    validateInput(safeValue)
  }
})

// Watch for external changes
watch(() => props.modelValue, (newValue) => {
  const safeValue = (newValue as string) || ''
  if (newValue !== selectedValue.value) {
    selectedValue.value = safeValue
    // Only update inputText if it's empty (not being actively edited)
    if (!inputText.value || !isOpen.value) {
      inputText.value = safeValue
    }
    emit('update:modelValue', safeValue)
    emit('answer', safeValue, actualId.value)
    
    if (isTouched.value) {
      validateInput(safeValue)
    }
  }
})
</script>

<style scoped lang="scss">
@use "sass:color";
@use "sass:map";
@use "../../../assets/styles/_variables" as *;
@use "../../../assets/styles/colors/palette" as *;
.c-select-answer {
  $primary-color: map.get($brand-colors, 'accent-yellow');
  $primary-surface-color: color.adjust(map.get($brand-colors, 'accent-yellow'), $lightness: 20%);
  $secondary-color: map.get($brand-colors, 'accent-orange');

  --primary-color: #{$primary-color};
  --primary-surface-color: #{$primary-surface-color};
  --secondary-color: #{$secondary-color};
  position: relative;
  max-width: 320px;
  margin: 0 auto;

  &__select--native {
    position: absolute;
    opacity: 0;
    pointer-events: none;
    z-index: -1;
  }

  &__input-wrapper {
    position: relative;
    width: 100%;
  }

  &__trigger-text {
    flex: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  &__arrow {
    color: #666;
    display: flex;
    align-items: center;
    transition: transform 0.2s ease;
    flex-shrink: 0;
  }

  &__dropdown {
    position: absolute;
    top: calc(100% + 8px);
    left: 0;
    right: 0;
    z-index: 1000;
    background: white;
    border-radius: 6px;
    box-shadow: 0 12px 32px rgba(0, 0, 0, 0.25);
    max-height: 350px;
    max-width: 320px;
    overflow-y: auto;
  }

  &__option {
    padding: 0.75rem 1rem;
    cursor: pointer;
    transition: background-color 0.2s ease;

    &:last-child {
      border-bottom: none;
    }

    &:hover {
      background-color: #f8f9fa;
      color: var(--secondary-color);
    }

    &--selected {
      background-color: #e3f2fd;
      color: var(--secondary-color);
      font-weight: 500;
    }

    &--focused {
      background-color: #f0f7ff;
      color: var(--secondary-color);
      font-weight: 500;
      box-shadow: inset 0 0 0 2px rgba(239, 105, 72, 0.3);
    }
  }

  &__select {
    outline: none;
    border-color: #fe9;
    box-shadow: 0 0 0 2px #fe9;

    &:disabled {
      background-color: #f5f5f5;
      cursor: not-allowed;
    }
  }

  &__error {
    color: #f44336;
    font-size: 0.875rem;
    margin-top: 1rem;
  }
}
</style>
