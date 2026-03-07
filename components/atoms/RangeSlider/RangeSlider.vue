<template>
  <div class="c-m3-range-slider">
    <div class="c-m3-range-slider__track-container" ref="trackContainerRef">
      <!-- Track line -->
      <div class="c-m3-range-slider__track"></div>
      
      <!-- Step indicators -->
      <div class="c-m3-range-slider__steps">
        <div
          v-for="(option, index) in reactiveOptions"
          :key="option"
          class="c-m3-range-slider__step"
          :class="{
            'c-m3-range-slider__step--active': index === activeStepIndex,
            'c-m3-range-slider__step--completed': index < activeStepIndex
          }"
        ></div>
      </div>
      
      <!-- Thumb -->
      <div
        class="c-m3-range-slider__thumb"
        :style="{ left: thumbPosition }"
        @mousedown="handleMouseDown"
        @touchstart="handleTouchStart"
        tabindex="0"
        role="slider"
        :aria-valuemin="0"
        :aria-valuemax="(reactiveOptions?.length || 1) - 1"
        :aria-valuenow="activeStepIndex"
        :aria-valuetext="selectedValue"
        @keydown="handleKeyDown"
      ></div>
    </div>
    
    <!-- Labels -->
    <div v-if="showLabels" class="c-m3-range-slider__labels">
      <div
        v-for="(option, index) in reactiveOptions"
        :key="option"
        class="c-m3-range-slider__label"
        :class="{
          'c-m3-range-slider__label--active': index === activeStepIndex
        }"
      >
        {{ getLabel(option) }}
      </div>
    </div>
    
    <!-- Value display -->
    <div v-if="showValue" class="c-m3-range-slider__value">
      {{ selectedValue }}
    </div>
    
    <!-- Error message -->
    <div v-if="error" class="c-m3-range-slider__error">
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
const trackContainerRef = ref<HTMLElement | null>(null)
const isDragging = ref(false)
const error = ref('')

// Computed properties
const activeStepIndex = computed(() => {
  if (!props.modelValue || reactiveOptions.value.length === 0) return 0
  const index = reactiveOptions.value.indexOf(props.modelValue)
  return index !== -1 ? index : 0
})
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
  
  const value = reactiveOptions.value[index]
  
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
  
  event.preventDefault()
  isDragging.value = true
  document.addEventListener('touchmove', handleTouchMove, { passive: false })
  document.addEventListener('touchend', handleTouchEnd)
  
  // Calculate initial position
  updatePositionFromEvent(event)
}

const handleTouchMove = (event: TouchEvent) => {
  if (!isDragging.value || props.disabled) return
  event.preventDefault()
  updatePositionFromEvent(event)
}

const handleTouchEnd = () => {
  isDragging.value = false
  document.removeEventListener('touchmove', handleTouchMove)
  document.removeEventListener('touchend', handleTouchEnd)
}

const updatePositionFromEvent = (event: MouseEvent | TouchEvent) => {
  if (!trackContainerRef.value) return
  
  const rect = trackContainerRef.value.getBoundingClientRect()
  let clientX: number
  
  if ('clientX' in event) {
    clientX = event.clientX
  } else if (event.touches && event.touches.length > 0) {
    clientX = event.touches[0].clientX
  } else {
    return
  }
  
  const relativeX = clientX - rect.left
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

// Emit default value on mount for required questions
onMounted(() => {
  // For required questions, always select the first option if no value is set
  if (props.config.required && !props.modelValue && reactiveOptions.value.length > 0) {
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
  // activeStepIndex is now computed, no need to manually set it
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
@use 'sass:map';
@use '~/assets/styles/_mixins-new.scss' as *;

.c-m3-range-slider {
  @include component-style(
    $typography-role: body-medium,
    $color-role: surface,
    $elevation-level: 0
  );
  
  position: relative;
  max-width: 400px;
  margin: 0 auto;
  padding: 1rem 0;

  &__track-container {
    position: relative;
    height: 24px;
    margin: 1rem 0;
  }

  &__track {
    position: absolute;
    top: 50%;
    left: 0;
    right: 0;
    height: 4px;
    background-color: map.get(map.get($color-roles-light, surface-variant), background);
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
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background-color: map.get(map.get($color-roles-light, surface-variant), background);
    border: 2px solid map.get(map.get($color-roles-light, surface), border);
    box-shadow: map.get($elevation-shadows, 0);
    transition: all 0.3s ease;

    &--active {
      background-color: map.get(map.get($color-roles-light, primary), background);
      transform: scale(1.2);
    }

    &--completed {
      background-color: map.get(map.get($color-roles-light, primary), background);
    }
  }

  &__thumb {
    position: absolute;
    top: 50%;
    width: 24px;
    height: 24px;
    background-color: map.get(map.get($color-roles-light, primary), background);
    border: 3px solid map.get(map.get($color-roles-light, surface), border);
    border-radius: 50%;
    cursor: grab;
    transform: translate(-50%, -50%);
    box-shadow: map.get($elevation-shadows, 2);
    transition: transform 0.2s ease, box-shadow 0.2s ease;

    &:hover {
      transform: translate(-50%, -50%) scale(1.1);
      box-shadow: map.get($elevation-shadows, 3);
    }

    &:active {
      cursor: grabbing;
      transform: translate(-50%, -50%) scale(1.2);
    }
  }

  &__labels {
    display: flex;
    justify-content: space-between;
    margin-top: 1rem;
    padding: 0 0.5rem;
    @include typography-role(body-small);
    @include color-role(surface);
  }

  &__label {
    @include typography-role(body-small);
    @include color-role(surface);
    text-align: center;
    transition: color 0.3s ease;

    &--active {
      @include color-role(primary);
      font-weight: map.get($font-weights, medium);
    }
  }

  &__value {
    text-align: center;
    margin-top: 1.5rem;
    padding: 0.75rem;
    @include component-style(
      $typography-role: body-small,
      $color-role: surface-variant,
      $elevation-level: 1,
      $include-border: true
    );
  }

  &__error {
    @include typography-role(body-small);
    @include color-role(error);
    margin-top: 0.5rem;
    text-align: center;
  }

  // Disabled state
  &.disabled {
    opacity: 0.6;
    pointer-events: none;

    .c-m3-range-slider__thumb {
      cursor: not-allowed;
      background-color: map.get(map.get($color-roles-light, surface-variant), background);
      border-color: map.get(map.get($color-roles-light, surface), border);
    }
  }
}

/* Focus styles */
.c-m3-range-slider:focus-within {
  .c-m3-range-slider__thumb {
    outline: 2px solid map.get(map.get($color-roles-light, primary), border);
    outline-offset: 2px;
  }
}
</style>
