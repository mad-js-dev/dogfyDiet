<template>
  <div class="c-range-slider">
    <div class="c-range-slider__track-container">
      <!-- Track line -->
      <div class="c-range-slider__track"></div>
      
      <!-- Step indicators -->
      <div class="c-range-slider__steps">
        <div
          v-for="(option, index) in reactiveOptions"
          :key="option"
          class="c-range-slider__step"
          :class="{
            'c-range-slider__step--active': index === activeStepIndex,
            'c-range-slider__step--completed': index < activeStepIndex
          }"
        ></div>
      </div>
      
      <!-- Thumb -->
      <div
        class="c-range-slider__thumb"
        :style="{ left: thumbPosition }"
        @mousedown="handleMouseDown"
        @touchstart="handleTouchStart"
        tabindex="0"
        role="slider"
        :aria-valuemin="0"
        :aria-valuemax="(config.options?.length || 1) - 1"
        :aria-valuenow="activeStepIndex"
        :aria-valuetext="selectedValue"
        @keydown="handleKeyDown"
      ></div>
    </div>
    
    <!-- Labels -->
    <div v-if="showLabels" class="c-range-slider__labels">
      <div
        v-for="(option, index) in reactiveOptions"
        :key="option"
        class="c-range-slider__label"
        :class="{
          'c-range-slider__label--active': index === activeStepIndex
        }"
      >
        {{ getLabel(option) }}
      </div>
    </div>
    
    <!-- Value display -->
    <div v-if="showValue" class="c-range-slider__value">
      {{ selectedValue }}
    </div>
    
    <!-- Error message -->
    <div v-if="error" class="c-range-slider__error">
      {{ error }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch, onMounted, onUnmounted } from 'vue'
import type { QuestionConfig } from '~/types/questionnaire'

interface Props {
  config: QuestionConfig
  modelValue?: string
  disabled?: boolean
  showLabels?: boolean
  showValue?: boolean
}

interface Emits {
  (e: 'update:modelValue', value: string): void
  (e: 'answer', value: string, questionId: string): void
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
  showLabels: true,
  showValue: true
})

const emit = defineEmits<Emits>()

// Reactive state
const activeStepIndex = ref(0)
const isDragging = ref(false)
const error = ref('')

// Computed properties
const selectedValue = computed(() => {
  return reactiveOptions.value[activeStepIndex.value] || ''
})

const thumbPosition = computed(() => {
  const optionsLength = reactiveOptions.value.length || 1
  const percentage = (activeStepIndex.value / (optionsLength - 1)) * 100
  return `${percentage}%`
})

// Reactive options
const reactiveOptions = computed(() => {
  const options = props.config.rangeOptions || props.config.options || []
  // If options are objects with value property, extract the values
  return options.map(option => typeof option === 'object' ? option.value : option)
})

// Methods
const getLabel = (option: string): string => {
  // First check if we have rangeOptions with labels
  if (props.config.rangeOptions) {
    const rangeOption = props.config.rangeOptions.find(opt => 
      typeof opt === 'object' ? opt.value === option : opt === option
    )
    if (rangeOption && typeof rangeOption === 'object' && rangeOption.label) {
      return rangeOption.label
    }
  }
  
  // Extract short label from long description (fallback)
  if (option.includes('underweight')) return 'Underweight'
  if (option.includes('ideal')) return 'Ideal Weight'
  if (option.includes('overweight')) return 'Overweight'
  if (option.includes('obese')) return 'Obese'
  if (option.includes('thin')) return 'Thin'
  if (option.includes('good shape')) return 'Good'
  if (option.includes('chubby')) return 'Chubby'
  if (option.includes('selective')) return 'Selective'
  if (option.includes('gourmet')) return 'Regular'
  if (option.includes('glutton')) return 'Glutton'
  if (option.includes('Couch potato')) return 'Low'
  if (option.includes('Zen dog')) return 'Medium'
  if (option.includes('Energy tornado')) return 'High'
  return option.split(' ')[0] // Fallback to first word
}

const updateValue = (index: number) => {
  const optionsLength = reactiveOptions.value.length || 0
  if (index < 0 || index >= optionsLength) return
  
  activeStepIndex.value = index
  const value = selectedValue.value
  
  emit('update:modelValue', value)
  emit('answer', value, props.config.id)
  
  validateInput(value)
}

const validateInput = (value: string): boolean => {
  if (!props.config.required) return true
  
  if (!value || value.trim() === '') {
    error.value = 'Please select an option'
    return false
  }
  
  error.value = ''
  return true
}

const handleMouseDown = (event: MouseEvent) => {
  if (props.disabled) return
  
  isDragging.value = true
  document.addEventListener('mousemove', handleMouseMove)
  document.addEventListener('mouseup', handleMouseUp)
  
  // Calculate initial position
  updatePositionFromEvent(event)
}

const handleMouseMove = (event: MouseEvent) => {
  if (!isDragging.value || props.disabled) return
  updatePositionFromEvent(event)
}

const handleMouseUp = () => {
  isDragging.value = false
  document.removeEventListener('mousemove', handleMouseMove)
  document.removeEventListener('mouseup', handleMouseUp)
}

const handleTouchStart = (event: TouchEvent) => {
  if (props.disabled) return
  
  isDragging.value = true
  document.addEventListener('touchmove', handleTouchMove)
  document.addEventListener('touchend', handleTouchEnd)
  
  // Calculate initial position
  const touch = event.touches[0]
  updatePositionFromEvent(touch as any)
}

const handleTouchMove = (event: TouchEvent) => {
  if (!isDragging.value || props.disabled) return
  const touch = event.touches[0]
  updatePositionFromEvent(touch as any)
}

const handleTouchEnd = () => {
  isDragging.value = false
  document.removeEventListener('touchmove', handleTouchMove)
  document.removeEventListener('touchend', handleTouchEnd)
}

const updatePositionFromEvent = (event: MouseEvent | Touch) => {
  const trackContainer = document.querySelector('.c-range-slider__track-container')
  if (!trackContainer) return
  
  const rect = trackContainer.getBoundingClientRect()
  const relativeX = event.clientX - rect.left
  const percentage = Math.max(0, Math.min(1, relativeX / rect.width))
  
  const stepCount = reactiveOptions.value.length || 1
  const newIndex = Math.round(percentage * (stepCount - 1))
  
  updateValue(newIndex)
}

const handleKeyDown = (event: KeyboardEvent) => {
  if (props.disabled) return
  
  switch (event.key) {
    case 'ArrowLeft':
    case 'ArrowDown':
      event.preventDefault()
      updateValue(activeStepIndex.value - 1)
      break
    case 'ArrowRight':
    case 'ArrowUp':
      event.preventDefault()
      updateValue(activeStepIndex.value + 1)
      break
    case 'Home':
      event.preventDefault()
      updateValue(0)
      break
    case 'End':
      event.preventDefault()
      updateValue((reactiveOptions.value.length || 1) - 1)
      break
  }
}

// Initialize from modelValue
const initializeFromModelValue = () => {
  if (props.modelValue && reactiveOptions.value.length > 0) {
    const index = reactiveOptions.value.indexOf(props.modelValue)
    if (index !== -1) {
      activeStepIndex.value = index
    }
  }
}

// Watch for external changes
watch(() => props.modelValue, initializeFromModelValue, { immediate: true })

// Emit default value on mount for required questions
onMounted(() => {
  // For required questions, always select the first option if no value is set
  if (props.config.required && !props.modelValue && reactiveOptions.value.length > 0) {
    activeStepIndex.value = 0
    const firstValue = reactiveOptions.value[0]
    emit('update:modelValue', firstValue)
    emit('answer', firstValue, props.config.id)
  }
})

// Watch for config changes
watch(() => props.config, (newConfig) => {
  console.log('RangeSlider config changed:', newConfig)
  console.log('RangeSlider options:', newConfig?.rangeOptions)
  console.log('Watch triggered, newConfig.rangeOptions:', newConfig?.rangeOptions)
}, { immediate: true })

// Update reactive options when config changes
watch(() => props.config.rangeOptions, (newOptions) => {
  console.log('Watch triggered, newOptions:', newOptions)
  // No need to manually update reactiveOptions since it's a computed property
  console.log('RangeSlider reactiveOptions will update automatically')
})

// Initialize active step based on modelValue
onMounted(() => {
  console.log('RangeSlider mounted with config:', props.config)
  console.log('RangeSlider config.rangeOptions:', props.config.rangeOptions)
  console.log('RangeSlider reactiveOptions:', reactiveOptions.value)
  
  if (props.modelValue && props.config.rangeOptions) {
    const index = props.config.rangeOptions.findIndex(option => 
      typeof option === 'object' ? option.value === props.modelValue : option === props.modelValue
    )
    if (index >= 0) {
      activeStepIndex.value = index
    }
  }
})

// Cleanup
onUnmounted(() => {
  document.removeEventListener('mousemove', handleMouseMove)
  document.removeEventListener('mouseup', handleMouseUp)
  document.removeEventListener('touchmove', handleTouchMove)
  document.removeEventListener('touchend', handleTouchEnd)
})
</script>

<style scoped lang="scss">
.c-range-slider {
  --primary-color: #0066cc;
  --secondary-color: #ff6b6b;
  --track-height: 4px;
  --thumb-size: 24px;
  --step-size: 12px;
  
  position: relative;
  max-width: 400px;
  margin: 0 auto;
  padding: 1rem 0;

  &__track-container {
    position: relative;
    height: var(--thumb-size);
    margin: 1rem 0;
  }

  &__track {
    position: absolute;
    top: 50%;
    left: 0;
    right: 0;
    height: var(--track-height);
    background: #e0e0e0;
    border-radius: 2px;
    transform: translateY(-50%);
  }

  &__steps {
    position: absolute;
    top: 50%;
    left: 0;
    right: 0;
    display: flex;
    justify-content: space-between;
    transform: translateY(-50%);
  }

  &__step {
    width: var(--step-size);
    height: var(--step-size);
    border-radius: 50%;
    background: #e0e0e0;
    border: 2px solid white;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;

    &--active {
      background: var(--primary-color);
      transform: scale(1.2);
    }

    &--completed {
      background: var(--primary-color);
    }
  }

  &__thumb {
    position: absolute;
    top: 50%;
    width: var(--thumb-size);
    height: var(--thumb-size);
    background: var(--primary-color);
    border: 3px solid white;
    border-radius: 50%;
    cursor: grab;
    transform: translate(-50%, -50%);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    transition: transform 0.2s ease, box-shadow 0.2s ease;

    &:hover {
      transform: translate(-50%, -50%) scale(1.1);
      box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3);
    }

    &:active {
      cursor: grabbing;
      transform: translate(-50%, -50%) scale(1.2);
    }

    &:focus {
      outline: none;
      box-shadow: 0 0 0 3px rgba(0, 102, 204, 0.3);
    }
  }

  &__labels {
    display: flex;
    justify-content: space-between;
    margin-top: 1rem;
    padding: 0 0.5rem;
  }

  &__label {
    font-size: 0.875rem;
    color: #666;
    text-align: center;
    transition: color 0.3s ease;

    &--active {
      color: var(--primary-color);
      font-weight: 600;
    }
  }

  &__value {
    text-align: center;
    margin-top: 1.5rem;
    padding: 0.75rem;
    background: #f8f9fa;
    border-radius: 8px;
    font-size: 0.9rem;
    color: #333;
    border: 1px solid #e0e0e0;
  }

  &__error {
    color: var(--secondary-color);
    font-size: 0.875rem;
    margin-top: 0.5rem;
    text-align: center;
  }

  // Disabled state
  &.disabled {
    opacity: 0.6;
    pointer-events: none;

    .c-range-slider__thumb {
      cursor: not-allowed;
    }
  }
}
</style>
