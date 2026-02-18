<template>
  <div class="bool-answer">
    <div class="bool-options">
      <label class="bool-option">
        <input
          :id="`${config.id}-yes`"
          v-model="selectedValue"
          :value="true"
          type="radio"
          :disabled="disabled"
          @change="handleChange"
        />
        <span class="option-label">Yes</span>
      </label>
      
      <label class="bool-option">
        <input
          :id="`${config.id}-no`"
          v-model="selectedValue"
          :value="false"
          type="radio"
          :disabled="disabled"
          @change="handleChange"
        />
        <span class="option-label">No</span>
      </label>
    </div>
    
    <div v-if="error" class="error-message">
      {{ error }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import { useComprehensiveQuestionnaireStore } from '~/stores/comprehensive-questionnaire'
import type { QuestionConfig } from '~/types/questionnaire'

interface Props {
  config: QuestionConfig
  modelValue?: boolean
  disabled?: boolean
  petId?: string
}

interface Emits {
  (e: 'update:modelValue', value: boolean): void
  (e: 'answer', value: boolean, questionId: string, petId?: string): void
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false
})

const emit = defineEmits<Emits>()
const questionnaire = useComprehensiveQuestionnaireStore()

const selectedValue = ref(props.modelValue !== undefined ? props.modelValue : null)
const error = ref('')

const handleChange = () => {
  if (selectedValue.value !== null) {
    error.value = ''
    emit('update:modelValue', selectedValue.value)
    emit('answer', selectedValue.value, props.config.id, props.petId)
  }
}

// Watch for external changes
watch(() => props.modelValue, (newValue) => {
  if (newValue !== selectedValue.value) {
    selectedValue.value = newValue
  }
})

// Validate on mount if required
onMounted(() => {
  if (props.config.required && selectedValue.value === null) {
    const requiredMessage = props.config.validation?.find(v => v.type === 'required')?.message || 'This field is required'
    error.value = requiredMessage
  }
})
</script>

<style scoped>
.bool-answer {
  width: 100%;
}

.bool-options {
  display: flex;
  gap: 1rem;
  margin-bottom: 0.5rem;
}

.bool-option {
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 0.75rem 1rem;
  border: 2px solid #e0e0e0;
  border-radius: 6px;
  transition: all 0.3s ease;
}

.bool-option:hover {
  border-color: #0066cc;
  background-color: rgba(0, 102, 204, 0.05);
}

.bool-option input[type="radio"] {
  margin-right: 0.5rem;
}

.bool-option input[type="radio"]:checked + .option-label {
  color: #0066cc;
  font-weight: 600;
}

.option-label {
  font-size: 1rem;
  user-select: none;
}

.error-message {
  color: #f44336;
  font-size: 0.875rem;
  margin-top: 0.5rem;
}
</style>
