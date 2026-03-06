<template>
  <div class="c-m3-date-picker">
    <div class="c-m3-date-picker__input-wrapper">
      <input
        type="date"
        :id="inputId"
        :value="modelValue"
        :min="minDate"
        :max="maxDate"
        :disabled="disabled"
        :class="{
          'c-m3-date-picker__input': true,
          'c-m3-date-picker__input--error': hasError
        }"
        @input="handleDateInput"
        @blur="handleBlur"
        @focus="handleFocus"
        :aria-describedby="hasError ? `${inputId}-error` : undefined"
      />
      
      <!-- Calendar -->
      <div class="c-m3-date-picker__calendar" v-if="isOpen">
        <div class="c-m3-date-picker__header">
          <button
            type="button"
            class="c-m3-date-picker__nav-button"
            @click="previousMonth"
            :disabled="!canGoToPreviousMonth"
          >
            ←
          </button>
          
          <div class="c-m3-date-picker__current-month">
            {{ currentMonthName }} {{ currentYear }}
          </div>
          
          <button
            type="button"
            class="c-m3-date-picker__nav-button"
            @click="nextMonth"
            :disabled="!canGoToNextMonth"
          >
            →
          </button>
        </div>
        
        <div class="c-m3-date-picker__weekdays">
          <div 
            v-for="weekday in weekdays" 
            :key="weekday"
            class="c-m3-date-picker__weekday"
          >
            {{ weekday.charAt(0) }}
          </div>
        </div>
        
        <div class="c-m3-date-picker__days">
          <div 
            v-for="week in weeks" 
            :key="`week-${week[0]?.index || 0}`"
            class="c-m3-date-picker__week"
          >
            <div 
              v-for="day in week" 
              :key="day.index"
              :class="{
                'c-m3-date-picker__day': true,
                'c-m3-date-picker__day--other-month': !isCurrentMonth(day),
                'c-m3-date-picker__day--selected': isSelected(day),
                'c-m3-date-picker__day--today': isToday(day),
                'c-m3-date-picker__day--disabled': !isSelectable(day)
              }"
              @click="selectDate(day)"
            >
              {{ day.dayNumber || '' }}
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Value display -->
    <div v-if="showValue" class="c-m3-date-picker__value">
      {{ selectValue }}
    </div>
    
    <!-- Error message -->
    <div v-if="hasError" :id="`${inputId}-error`" class="c-m3-date-picker__error">
      {{ errorMessage }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

interface Props {
  modelValue?: string
  id?: string
  label?: string
  min?: string
  max?: string
  disabled?: boolean
  required?: boolean
  errorMessage?: string
  'aria-label'?: string
  placeholder?: string
}

interface Emits {
  'update:modelValue': [value: string]
  'blur': []
  'focus': []
  'click': [value: any]
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
  required: false
})

const emit = defineEmits<Emits>()

const inputRef = ref<HTMLInputElement>()

// Calendar data
const currentDate = ref(new Date())
const currentMonth = ref(new Date().getMonth())
const currentYear = ref(new Date().getFullYear())
const minDate = computed(() => props.min)
const maxDate = computed(() => props.max)

// Computed properties
const inputId = computed(() => props.id || 'date-picker-' + Math.random().toString(36).substr(2, 9))

const hasError = computed(() => !!props.errorMessage)

const isOpen = ref(false)

const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const monthNames = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
]

const reactiveOptions = computed(() => {
  const options = ['2024-01-01', '2024-01-15', '2024-01-31'] // Example options
  return options
})

const activeStepIndex = computed(() => {
  if (!props.modelValue || reactiveOptions.value.length === 0) return 0
  const index = reactiveOptions.value.indexOf(props.modelValue)
  return index !== -1 ? index : 0
})

const selectedValue = computed(() => {
  return reactiveOptions.value[activeStepIndex.value] || ''
})

const showValue = computed(() => !!props.modelValue)

const selectValue = computed(() => {
  if (!props.modelValue) return ''
  const date = new Date(props.modelValue)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
})

// Computed calendar days
const daysInMonth = computed(() => {
  const date = new Date(currentYear.value, currentMonth.value)
  const firstDay = new Date(date.getFullYear(), date.getMonth(), 1)
  const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0)
  const days = []
  
  // Add empty days at beginning
  const firstDayOfWeek = firstDay.getDay()
  for (let i = 0; i < firstDayOfWeek; i++) {
    days.push({ date: null, dayNumber: null, index: `empty-${i}` })
  }
  
  // Add all days of the month
  for (let day = 1; day <= lastDay.getDate(); day++) {
    days.push({ date: new Date(currentYear.value, currentMonth.value, day), dayNumber: day, index: `day-${day}` })
  }
  
  return days
})

// Computed calendar weeks
const weeks = computed(() => {
  const days = daysInMonth.value
  const weeks = []
  
  for (let i = 0; i < days.length; i += 7) {
    weeks.push(days.slice(i, i + 7))
  }
  
  return weeks
})

// Computed current month name and year
const currentMonthName = computed(() => {
  return monthNames[currentMonth.value]
})

// Computed navigation state
const canGoToPreviousMonth = computed(() => {
  if (props.min) {
    const minDate = new Date(props.min)
    return currentYear.value > minDate.getFullYear() || 
           (currentYear.value === minDate.getFullYear() && currentMonth.value > minDate.getMonth())
  }
  return true
})

const canGoToNextMonth = computed(() => {
  if (props.max) {
    const maxDate = new Date(props.max)
    return currentYear.value < maxDate.getFullYear() || 
           (currentYear.value === maxDate.getFullYear() && currentMonth.value < maxDate.getMonth())
  }
  return true
})

// Handle date input
const handleDateInput = (event: Event) => {
  const value = (event.target as HTMLInputElement).value
  emit('update:modelValue', value)
}

// Handle blur event
const handleBlur = (event: FocusEvent) => {
  emit('blur')
}

// Handle focus event
const handleFocus = (event: FocusEvent) => {
  emit('focus')
}

// Handle date selection
const selectDate = (day: { date: Date | null; dayNumber: number | null }) => {
  if (day.date && day.dayNumber) {
    const dateValue = formatDate(day.date)
    emit('update:modelValue', dateValue)
    currentDate.value = new Date(day.date)
    currentMonth.value = day.date.getMonth()
    currentYear.value = day.date.getFullYear()
  }
}

// Navigation methods
const previousMonth = () => {
  if (currentMonth.value === 0) {
    currentMonth.value = 11
    currentYear.value -= 1
  } else {
    currentMonth.value -= 1
  }
}

const nextMonth = () => {
  if (currentMonth.value === 11) {
    currentMonth.value = 0
    currentYear.value += 1
  } else {
    currentMonth.value += 1
  }
}

// Helper functions
const formatDate = (date: Date) => {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`
}

const isSelectable = (day: { date: Date | null; dayNumber: number | null }) => {
  if (!day.date || !day.dayNumber) return false
  const dateValue = formatDate(day.date)
  const minCheck = !props.min || new Date(dateValue) >= new Date(props.min)
  const maxCheck = !props.max || new Date(dateValue) <= new Date(props.max)
  return minCheck && maxCheck
}

const isSelected = (day: { date: Date | null; dayNumber: number | null }) => {
  if (!day.date || !day.dayNumber || !props.modelValue) return false
  return formatDate(day.date) === props.modelValue
}

const isToday = (day: { date: Date | null; dayNumber: number | null }) => {
  if (!day.date || !day.dayNumber) return false
  const today = new Date()
  return day.date.getDate() === today.getDate() && 
         day.date.getMonth() === today.getMonth() && 
         day.date.getFullYear() === today.getFullYear()
}

const isCurrentMonth = (day: { date: Date | null; dayNumber: number | null }) => {
  if (!day.date || !day.dayNumber) return false
  return day.date.getMonth() === currentMonth.value && 
         day.date.getFullYear() === currentYear.value
}
</script>

<script lang="ts">
export default {
  name: 'M3DatePicker'
}
</script>

<style scoped lang="scss">
@use 'sass:map';
@use '~/assets/styles/_mixins-new.scss' as *;
@use '~/assets/styles/_variables.scss' as *;

.c-m3-date-picker {
  @include component-style(
    $typography-role: body-medium,
    $color-role: surface,
    $elevation-level: 0
  );
  
  position: relative;
  display: inline-block;

  &__input-wrapper {
    position: relative;
  }

  &__input {
    width: 100%;
    padding: 12px 16px;
    @include typography-role(body-medium);
    @include color-role(surface);
    background-color: map.get($color-roles-light, surface, background);
    border: 2px solid map.get($color-roles-light, surface-variant, border);
    border-radius: $radius-md;
    transition: all 0.2s ease;

    &:focus {
      outline: 2px solid map.get($color-roles-light, primary, text);
      outline-offset: 2px;
    }

    &--error {
      border-color: map.get($color-roles-light, error, border);
    }
  }

  &__calendar {
    position: absolute;
    top: 100%;
    left: 0;
    background-color: map.get($color-roles-light, surface, background);
    border: 1px solid map.get($color-roles-light, surface-variant, border);
    border-radius: $radius-md;
    box-shadow: map.get($elevation-shadows, 2);
    z-index: 10;
    min-width: 320px;
  }

  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px;
    border-bottom: 1px solid map.get($color-roles-light, surface-variant, border);
  }

  &__nav-button {
    padding: 8px 12px;
    border: 1px solid map.get($color-roles-light, surface-variant, border);
    border-radius: $radius-sm;
    background-color: map.get($color-roles-light, surface, background);
    color: map.get($color-roles-light, surface, text);
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover {
      @include color-role(surface-variant);
    }

    &:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }
  }

  &__current-month {
    @include typography-role(title-medium);
    @include color-role(surface);
    font-weight: map.get($font-weights, medium);
  }

  &__weekdays {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: 4px;
    margin-bottom: 8px;
  }

  &__weekday {
    padding: 8px 4px;
    @include typography-role(body-small);
    @include color-role(surface);
    text-align: center;
    font-weight: map.get($font-weights, medium);
    text-transform: uppercase;
  }

  &__days {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: 4px;
  }

  &__week {
    display: contents;
  }

  &__day {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 40px;
    border-radius: $radius-md;
    background-color: map.get($color-roles-light, surface, background);
    color: map.get($color-roles-light, surface, text);
    cursor: pointer;
    transition: all 0.2s ease;
    border: 1px solid map.get($color-roles-light, surface-variant, border);

    &:hover {
      @include color-role(surface-variant);
    }

    &--other-month {
      opacity: 0.6;
      color: map.get($color-roles-light, surface-variant, text);
      border-color: map.get($color-roles-light, surface-variant, border);
    }

    &--selected {
      background-color: map.get($color-roles-light, primary, background);
      color: map.get($color-roles-light, primary, text);
      border-color: map.get($color-roles-light, primary, border);
    }

    &--today {
      background-color: map.get($color-roles-light, primary, background);
      color: map.get($color-roles-light, primary, text);
      border: 2px solid map.get($color-roles-light, primary, border);
    }

    &--disabled {
      opacity: 0.4;
      cursor: not-allowed;
      background-color: map.get($color-roles-light, surface-variant, background);
      color: map.get($color-roles-light, surface-variant, text);
      border-color: map.get($color-roles-light, surface-variant, border);
    }
  }

  &__value {
    @include typography-role(body-medium);
    @include color-role(surface);
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
}
</style>
