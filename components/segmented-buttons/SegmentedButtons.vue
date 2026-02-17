<template>
  <div class="c-segmented-buttons" :class="{ 'c-segmented-buttons--disabled': disabled }">
    <div class="c-segmented-buttons__container">
      <button
        v-for="(option, index) in options"
        :key="option.value"
        type="button"
        class="c-segmented-buttons__button"
        :class="{
          'c-segmented-buttons__button--active': modelValue === option.value,
          'c-segmented-buttons__button--first': index === 0,
          'c-segmented-buttons__button--last': index === options.length - 1
        }"
        :disabled="disabled"
        :aria-pressed="modelValue === option.value"
        :aria-label="option.label || option.value"
        @click="selectOption(option.value)"
      >
        <span class="c-segmented-buttons__text">
          {{ option.label || option.value }}
        </span>
      </button>
    </div>
    
    <!-- Hidden input for form compatibility -->
    <input
      type="hidden"
      :name="name"
      :value="modelValue"
      :required="required"
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface SegmentedButtonOption {
  value: string
  label?: string
  disabled?: boolean
}

interface Props {
  modelValue: string
  options: SegmentedButtonOption[]
  name?: string
  disabled?: boolean
  required?: boolean
  size?: 'small' | 'medium' | 'large'
}

interface Emits {
  (e: 'update:modelValue', value: string): void
  (e: 'change', value: string): void
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
  required: false,
  size: 'medium'
})

const emit = defineEmits<Emits>()

const selectOption = (value: string) => {
  if (props.disabled) return
  
  emit('update:modelValue', value)
  emit('change', value)
}
</script>

<style scoped lang="scss">
.c-segmented-buttons {
  --radius: 25px;
  --primary-color: #ffc800;
  --primary-surface-color: #fe9;
  --secondary-color: #c2c2c2;
  display: inline-block;

  &__container {
    display: inline-flex;
    box-shadow: inset 0 0 1px #0f0;

    border-radius: var(--radius);
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

  // Size variants
  &--small {
    .c-segmented-buttons__button {
      min-height: 32px;
      padding: 0 12px;
      font-size: 12px;
    }
  }

  &--large {
    .c-segmented-buttons__button {
      min-height: 48px;
      padding: 0 20px;
      font-size: 16px;
    }
  }

  // Responsive
  @media (max-width: 768px) {
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
