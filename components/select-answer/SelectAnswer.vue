<template>
  <div class="c-select-answer">
    <!-- Hidden native select for form submission and accessibility -->
    <select
      :id="config.id"
      v-model="selectedValue"
      :disabled="disabled"
      autocomplete="off"
      class="c-select-answer__select c-select-answer__select--native"
      @blur="handleBlur"
    >
      <option value="" disabled>{{ placeholder }}</option>
      <option 
        v-for="option in config.options" 
        :key="option"
        :value="option"
      >
        {{ option }}
      </option>
    </select>
    
    <!-- Custom text input trigger -->
    <div class="c-select-answer__input-wrapper">
      <TextInput
        :id="config.id + '_input'"
        :model-value="inputText"
        :config="{
          id: config.id + '_input',
          type: 'text',
          question: placeholder,
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
    
    <div v-if="error" class="c-select-answer__error">
      {{ error }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch, onMounted, onUnmounted } from 'vue'
import type { QuestionConfig } from '~/types/questionnaire'
import TextInput from '../text-input/textInput.vue'

interface Props {
  config: QuestionConfig
  modelValue?: string | string[]
  disabled?: boolean
  petId?: string
}

interface Emits {
  (e: 'update:modelValue', value: string | string[]): void
  (e: 'answer', value: string | string[], questionId: string, petId?: string): void
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false
})

const emit = defineEmits<Emits>()

const selectedValue = ref(props.modelValue || '')
const error = ref('')
const isTouched = ref(false)
const isOpen = ref(false)
const inputText = ref('')
const focusedOptionIndex = ref(-1)

// Icon SVGs
const chevronDownIcon = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6,9 12,15 18,9"></polyline></svg>'
const chevronUpIcon = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6,15 12,9 18,15"></polyline></svg>'

const placeholder = computed(() => {
  return props.config.question || 'Select an option...'
})

const selectedDisplayText = computed(() => {
  if (selectedValue.value && props.config.options?.includes(selectedValue.value as string)) {
    return selectedValue.value as string
  }
  return placeholder.value
})

const filteredOptions = computed(() => {
  // If input is empty or not set, show all options
  if (!inputText.value || inputText.value.trim() === '') {
    return props.config.options || []
  }
  
  // Otherwise filter options based on input text
  return props.config.options?.filter(option => 
    option.toLowerCase().includes(inputText.value.toLowerCase())
  ) || []
})

const validateInput = (value: string | string[]): boolean => {
  if (!props.config.required) return true
  
  if (Array.isArray(value)) {
    return value.length > 0
  }
  
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
  emit('answer', option, props.config.id, props.petId)
  
  if (isTouched.value) {
    validateInput(option)
  }
}

const handleInputChange = (value: string) => {
  inputText.value = value
  focusedOptionIndex.value = 0 // Reset focus to first option when filtering
  
  // Auto-select if exact match found
  const exactMatch = props.config.options?.find(option => 
    option.toLowerCase() === value.toLowerCase()
  )
  
  if (exactMatch) {
    selectOption(exactMatch)
  } else {
    // Just update the input text for filtering and show dropdown
    selectedValue.value = ''
    emit('update:modelValue', '')
    emit('answer', '', props.config.id, props.petId)
    isOpen.value = true // Show dropdown when typing
  }
}

const handleInputFocus = () => {
  if (!props.disabled) {
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
  emit('answer', safeValue, props.config.id, props.petId)
  
  // Update input text to match selected value
  if (newValue && props.config.options?.includes(newValue as string)) {
    inputText.value = newValue as string
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
    inputText.value = safeValue
    emit('update:modelValue', safeValue)
    emit('answer', safeValue, props.config.id, props.petId)
    
    // Update input text to match selected value
    if (newValue && props.config.options?.includes(newValue as string)) {
      inputText.value = newValue as string
    }
    
    if (isTouched.value) {
      validateInput(safeValue)
    }
  }
})
</script>

<style scoped lang="scss">
.c-select-answer {
  $primary-color: #ffc800;
  $primary-surface-color: #fe9;
  $secondary-color: #ef6948;

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
