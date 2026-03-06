<template>
  <div class="c-date-picker">
    <div class="c-date-picker__input-wrapper">
      <input
        type="date"
        :id="inputId"
        :value="modelValue"
        :min="minDate"
        :max="maxDate"
        :disabled="disabled"
        :class="{
          'c-date-picker__input': true,
          'c-date-picker__input--error': hasError
        }"
        @input="handleDateInput"
        @blur="handleBlur"
        @focus="handleFocus"
        :aria-describedby="hasError ? `${inputId}-error` : undefined"
      />
      
      <!-- Calendar -->
      <div class="c-date-picker__calendar" v-if="isOpen">
        <div class="c-date-picker__header">
          <button
            type="button"
            class="c-date-picker__nav-button"
            @click="previousMonth"
            :disabled="!canGoToPreviousMonth"
          >
            ←
          </button>
          
          <div class="c-date-picker__current-month">
            {{ currentMonthName }} {{ currentYear }}
          </div>
          
          <button
            type="button"
            class="c-date-picker__nav-button"
            @click="nextMonth"
            :disabled="!canGoToNextMonth"
          >
            →
          </button>
        </div>
        
        <div class="c-date-picker__weekdays">
          <div 
            v-for="weekday in weekdays" 
            :key="weekday"
            class="c-date-picker__weekday"
          >
            {{ weekday.charAt(0) }}
          </div>
        </div>
        
        <div class="c-date-picker__days">
          <div 
            v-for="week in weeks" 
            :key="`week-${week[0]?.index || 0}`"
            class="c-date-picker__week"
          >
            <div 
              v-for="day in week" 
              :key="day.index"
              :class="{
                'c-date-picker__day': true,
                'c-date-picker__day--other-month': !isCurrentMonth(day),
                'c-date-picker__day--selected': isSelected(day),
                'c-date-picker__day--today': isToday(day),
                'c-date-picker__day--disabled': !isSelectable(day)
              }"
              @click="selectDate(day)"
            >
              {{ day.dayNumber || '' }}
            </div>
          </div>
        </div>
      </div>
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

const isSelected = (day: { date: Date | null; dayNumber: number | null }) => {
  if (!day.date || !day.dayNumber || !props.modelValue) return false
  return formatDate(day.date) === props.modelValue
}

const isSelectable = (day: { date: Date | null; dayNumber: number | null }) => {
  if (!day.date || !day.dayNumber) return false
  const dateValue = formatDate(day.date)
  const minCheck = !props.min || new Date(dateValue) >= new Date(props.min)
  const maxCheck = !props.max || new Date(dateValue) <= new Date(props.max)
  return minCheck && maxCheck
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

<style scoped>
.c-date-picker {
  position: relative;
  display: inline-block;
}

.c-date-picker__input-wrapper {
  position: relative;
}

.c-date-picker__input {
  width: 100%;
  padding: 12px 16px;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  font-size: 16px;
  line-height: 24px;
  color: #1a1a1a;
  background-color: #ffffff;
  transition: all 0.2s ease;
}

.c-date-picker__input--error {
  border-color: #d80003;
}

.c-date-picker__calendar {
  position: absolute;
  top: 100%;
  left: 0;
  background-color: #ffffff;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  z-index: 10;
  min-width: 320px;
}

.c-date-picker__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  border-bottom: 1px solid #e0e0e0;
}

.c-date-picker__nav-button {
  padding: 8px 12px;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  background-color: #ffffff;
  color: #1a1a1a;
  cursor: pointer;
  transition: all 0.2s ease;
}

.c-date-picker__nav-button:hover {
  background-color: #f5f5f5;
}

.c-date-picker__nav-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.c-date-picker__current-month {
  font-size: 18px;
  font-weight: 600;
  color: #1a1a1a;
}

.c-date-picker__weekdays {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 4px;
  margin-bottom: 8px;
}

.c-date-picker__weekday {
  padding: 8px 4px;
  text-align: center;
  font-size: 12px;
  font-weight: 500;
  color: #6c757d;
  text-transform: uppercase;
}

.c-date-picker__week {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 4px;
}

.c-date-picker__day {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 40px;
  border-radius: 8px;
  background-color: #ffffff;
  color: #1a1a1a;
  cursor: pointer;
  transition: all 0.2s ease;
  border: 1px solid #e0e0e0;
}

.c-date-picker__day:hover {
  background-color: #f5f5f5;
}

.c-date-picker__day--selected {
  background-color: #00B67A;
  color: #ffffff;
  border-color: #00B67A;
}

.c-date-picker__day--today {
  background-color: #00B67A;
  color: #ffffff;
  border: 2px solid #00B67A;
}

.c-date-picker__day--disabled {
  opacity: 0.4;
  cursor: not-allowed;
  background-color: #f5f5f5;
  color: #9e9e9e;
  border-color: #e0e0e0;
}

.c-date-picker__day--other-month {
  opacity: 0.6;
  color: #6c757d;
  border-color: #e0e0e0;
}

.c-date-picker__day--other-month:hover {
  opacity: 0.8;
  background-color: #f5f5f5;
}

/* Focus styles */
.c-date-picker__input:focus {
  outline: 2px solid #00B67A;
  outline-offset: 2px;
}

.c-date-picker__day:focus {
  outline: 2px solid #00B67A;
  outline-offset: 2px;
}

/* Animation */
.c-date-picker__day {
  transition: all 0.2s ease;
}

.c-date-picker__calendar {
  transition: all 0.2s ease;
}

.c-date-picker__header {
  transition: all 0.2s ease;
}
</style>
