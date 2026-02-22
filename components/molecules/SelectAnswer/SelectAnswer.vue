<template>
  <div class="select-answer">
    <!-- Search Input -->
    <div v-if="searchable" class="search-section">
      <TextInput
        :model-value="searchQuery"
        @update:model-value="handleSearchInput"
        :placeholder="searchPlaceholder"
        :id="`${id}-search`"
        class="search-input"
      />
    </div>
    
    <!-- Dropdown -->
    <div class="dropdown-section">
      <select
        :value="modelValue"
        @change="handleChange"
        :required="required"
        class="select-field"
        :class="{ 'has-error': hasError }"
        :id="selectId"
      >
        <option value="" disabled>{{ placeholder || 'Select an option' }}</option>
        <option
          v-for="option in filteredOptions"
          :key="option"
          :value="option"
        >
          {{ option }}
        </option>
      </select>
      <span v-if="hasError" class="error-message">{{ errorMessage }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import TextInput from '~/components/atoms/TextInput/TextInput.vue'

interface Props {
  modelValue: string
  options: string[]
  placeholder?: string
  required?: boolean
  id?: string
  searchable?: boolean
  searchPlaceholder?: string
  validation?: Array<{
    type: string
    message: string
  }>
}

const props = withDefaults(defineProps<Props>(), {
  required: false,
  placeholder: 'Select an option',
  searchable: false,
  searchPlaceholder: 'Search options...'
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const hasError = ref(false)
const errorMessage = ref('')
const searchQuery = ref('')

const selectId = computed(() => props.id || `select-${Math.random().toString(36).substr(2, 9)}`)

// Filter options based on search query
const filteredOptions = computed(() => {
  if (!props.searchable || !searchQuery.value.trim()) {
    return props.options
  }
  
  const query = searchQuery.value.toLowerCase()
  return props.options.filter(option => 
    option.toLowerCase().includes(query)
  )
})

const handleSearchInput = (value: string) => {
  searchQuery.value = value
}

const handleChange = (event: Event) => {
  const target = event.target as HTMLSelectElement
  const value = target.value
  
  validateInput(value)
  emit('update:modelValue', value)
}

const validateInput = (value: string) => {
  hasError.value = false
  errorMessage.value = ''
  
  for (const rule of props.validation || []) {
    switch (rule.type) {
      case 'required':
        if (!value) {
          hasError.value = true
          errorMessage.value = rule.message
          return
        }
        break
    }
  }
}
</script>

<style scoped>
.select-answer {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.search-section {
  margin-bottom: 0.5rem;
}

.search-input {
  margin-bottom: 0;
}

.dropdown-section {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.select-field {
  padding: 0.75rem;
  border: 2px solid #e0e0e0;
  border-radius: 6px;
  font-size: 1rem;
  transition: border-color 0.3s ease;
  width: 100%;
  background: white;
  cursor: pointer;
}

.select-field:focus {
  outline: none;
  border-color: #0066cc;
}

.select-field.has-error {
  border-color: #dc3545;
}

.error-message {
  color: #dc3545;
  font-size: 0.875rem;
  margin-top: 0.25rem;
}
</style>
