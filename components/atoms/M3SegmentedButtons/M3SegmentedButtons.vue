<template>
  <div class="c-segmented-buttons" :class="{ 'c-segmented-buttons--disabled': disabled }">
    <div class="c-segmented-buttons__container">
      <button
        v-for="(option, index) in actualOptions"
        :key="option"
        type="button"
        class="c-segmented-buttons__button"
        :class="{
          'c-segmented-buttons__button--active': isOptionSelected(option),
          'c-segmented-buttons__button--first': index === 0,
          'c-segmented-buttons__button--last': index === actualOptions.length - 1
        }"
        :disabled="disabled"
        :aria-pressed="isOptionSelected(option)"
        :aria-label="option"
        @click="selectOption(option)"
      >
        <span class="c-segmented-buttons__text">
          {{ option }}
        </span>
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
  question?: {
    id: string
    title?: string
    description?: string
    type: string
    required?: boolean
    options?: string[]
  }
  modelValue?: string | string[]
  options?: string[]
  name?: string
  disabled?: boolean
  required?: boolean
  size?: 'small' | 'medium' | 'large'
}

interface Emits {
  (e: 'update:modelValue', value: string | string[]): void
  (e: 'change', value: string | string[]): void
  (e: 'answer', value: string | string[], questionId: string): void
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
  required: false,
  size: 'medium'
})

const emit = defineEmits<Emits>()

// Computed properties to handle both question and direct props
const actualOptions = computed(() => props.question?.options || props.options || [])
const actualName = computed(() => props.question?.id || props.name || 'segmented-buttons')
const actualRequired = computed(() => props.question?.required || props.required || false)
const isMultiple = computed(() => props.question?.type === 'multiple')

const isOptionSelected = (option: string) => {
  if (isMultiple.value) {
    return Array.isArray(props.modelValue) && props.modelValue.includes(option)
  }
  return props.modelValue === option
}

const selectOption = (value: string) => {
  if (props.disabled) return
  
  let newValue: string | string[]
  
  if (isMultiple.value) {
    // Handle multiple selection
    const currentValues = Array.isArray(props.modelValue) ? props.modelValue : []
    if (currentValues.includes(value)) {
      // Remove value if already selected
      newValue = currentValues.filter(v => v !== value)
    } else {
      // Add value if not selected
      newValue = [...currentValues, value]
    }
  } else {
    // Handle single selection
    newValue = value
  }
  
  emit('update:modelValue', newValue)
  emit('change', newValue)
  emit('answer', newValue, actualName.value)
}
</script>

<style scoped lang="scss">
@use "sass:color";
@use "sass:map";
@use "../../../assets/styles/_variables" as *;
.c-segmented-buttons {
  $radius: 25px;
  $primary-color: map.get($brand-colors, 'accent-yellow');
  $primary-surface-color: color.adjust(map.get($brand-colors, 'accent-yellow'), $lightness: 20%);
  $secondary-color: #c2c2c2;
  
  --radius: #{$radius};
  --primary-color: #{$primary-color};
  --primary-surface-color: #{$primary-surface-color};
  --secondary-color: #{$secondary-color};
  
  display: inline-block;

  &__container {
    $center-line-r: color.channel($secondary-color, "red", rgb);
    $center-line-g: color.channel($secondary-color, "green", rgb);
    $center-line-b: color.channel($secondary-color, "blue", rgb);
    display: inline-flex;
    border-radius: var(--radius);
    
    background: linear-gradient(to right,
      rgba($center-line-r, $center-line-g, $center-line-b, 0) calc(50% - 0.5px),
      rgba($center-line-r, $center-line-g, $center-line-b, 1) calc(50% - 0.5px),
      rgba($center-line-r, $center-line-g, $center-line-b, 1) calc(50% + 0.5px),
      rgba($center-line-r, $center-line-g, $center-line-b, 0) calc(50% + 0.5px)
    );
    box-shadow: inset 0 0 2px var(--secondary-color), inset 0 0 2px var(--secondary-color), inset 0 0 2px var(--secondary-color), inset 0 0 2px var(--secondary-color);
  }

  &__button {
    flex: 1;
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-height: 40px;
    padding: 0 16px;
    border: none;
    background: transparent;
    color: #666;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s cubic-bezier(0.2, 0, 0, 1);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    user-select: none;
    -webkit-tap-highlight-color: transparent;

    &:focus {
      outline: none;
    }

    &--first {
      border-radius: var(--radius) 0 0 var(--radius);
    }

    &--last {
      border-radius: 0 var(--radius) var(--radius) 0;
    }

    &--active {
      color: #000;
      border: 1px solid var(--primary-color);
      background-color: var(--primary-surface-color);
    }
  }

  &__text {
    display: block;
    line-height: 1.2;
    text-align: center;
  }

  // Responsive - only apply to very small screens, not Storybook
  @media (max-width: 480px) {
    .c-segmented-buttons__container {
      flex-direction: column;
      gap: 4px;
    }
    
    .c-segmented-buttons__button {
      border-radius: 6px;

      &--first,
      &--last {
        border-radius: 6px;
      }
    }
  }
}
</style>
