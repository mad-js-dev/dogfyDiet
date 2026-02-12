<template>
  <div class="age-answer">
    <div class="age-inputs">
      <div class="age-group">
        <label :for="`${config.id}-years`">Years</label>
        <select
          :id="`${config.id}-years`"
          v-model="ageValue.years"
          :disabled="disabled"
          class="age-select"
          @change="handleChange"
        >
          <option value="">Years</option>
          <option v-for="year in yearOptions" :key="year" :value="year">
            {{ year }} {{ year === 1 ? 'year' : 'years' }}
          </option>
        </select>
      </div>
      
      <div class="age-group">
        <label :for="`${config.id}-months`">Months</label>
        <select
          :id="`${config.id}-months`"
          v-model="ageValue.months"
          :disabled="disabled"
          class="age-select"
          @change="handleChange"
        >
          <option value="">Months</option>
          <option v-for="month in monthOptions" :key="month" :value="month">
            {{ month }}
          </option>
        </select>
      </div>
    </div>
    
    <div v-if="error" class="error-message">
      {{ error }}
    </div>
  </div>
</template>

<script setup lang="ts">
import type { QuestionConfig } from '~/types/questionnaire'

interface Props {
  config: QuestionConfig
  modelValue?: { years: number; months: number }
  disabled?: boolean
}

interface Emits {
  (e: 'update:modelValue', value: { years: number; months: number }): void
  (e: 'answer', questionId: string, value: { years: number; months: number }): void
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false
})

const emit = defineEmits<Emits>()

const ageValue = ref(props.modelValue || { years: 0, months: 0 })
const error = ref('')
const isTouched = ref(false)

const yearOptions = computed(() => {
  const options = []
  for (let i = 0; i <= 30; i++) {
    options.push(i)
  }
  return options
})

const monthOptions = computed(() => {
  return Array.from({ length: 12 }, (_, i) => i + 1)
})

const validateInput = (value: { years: number; months: number }): boolean => {
  if (!props.config.required) return true
  
  if (!value || value.years < 0 || value.years > 30) return false
  if (value.months < 0 || value.months > 11) return false
  
  return true
}

const handleChange = () => {
  emit('update:modelValue', ageValue.value)
  
  if (isTouched.value) {
    validateInput(ageValue.value)
  }
  
  emit('answer', props.config.id, ageValue.value)
}

const handleBlur = () => {
  isTouched.value = true
  validateInput(ageValue.value)
}

// Watch for external changes
watch(() => props.modelValue, (newValue) => {
  if (newValue && JSON.stringify(newValue) !== JSON.stringify(ageValue.value)) {
    ageValue.value = { ...newValue }
  }
})
</script>

<style scoped>
.age-answer {
  width: 100%;
}

.age-inputs {
  display: flex;
  gap: 1rem;
}

.age-group {
  flex: 1;
}

.age-group label {
  display: block;
  font-weight: 600;
  color: #333;
  margin-bottom: 0.5rem;
}

.age-select {
  width: 100%;
  padding: 0.75rem;
  border: 2px solid #e0e0e0;
  border-radius: 6px;
  font-size: 1rem;
  background: white;
  transition: border-color 0.3s ease;
}

.age-select:focus {
  outline: none;
  border-color: #0066cc;
  box-shadow: 0 0 0 3px rgba(0, 102, 204, 0.1);
}

.age-select:disabled {
  background-color: #f5f5f5;
  cursor: not-allowed;
}

.error-message {
  color: #f44336;
  font-size: 0.875rem;
  margin-top: 0.5rem;
}
</style>
