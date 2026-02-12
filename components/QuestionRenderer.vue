<template>
  <div class="question-renderer">
    <div class="question-wrapper">
      <label :for="question.id" class="question-label">
        {{ question.question }}
        <span v-if="question.required" class="required-indicator">*</span>
      </label>
      
      <component 
        :is="answerComponent"
        :config="question"
        :model-value="currentAnswer"
        :pet-id="petId"
        @update:model-value="handleAnswer"
        @answer="handleAnswer"
      />
      
      <div v-if="error" class="error-message">
        {{ error }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { QuestionFactory } from '~/factories/QuestionFactory'
import type { QuestionConfig } from '~/types/questionnaire'

interface Props {
  question: QuestionConfig
  petId?: string
  modelValue?: any
}

interface Emits {
  (e: 'update:modelValue', value: any): void
  (e: 'answer', questionId: string, value: any, petId?: string): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

// Create question instance using factory
const questionInstance = computed(() => {
  return QuestionFactory.createQuestion(props.question)
})

// Get the answer component
const answerComponent = computed(() => {
  return questionInstance.value.getAnswerComponent()
})

// Get current answer for this question
const currentAnswer = computed(() => {
  return props.modelValue
})

// Handle answer changes
const handleAnswer = (value: any) => {
  emit('update:modelValue', value)
  emit('answer', props.question.id, value, props.petId)
}

// Error state (could be passed from parent)
const error = computed(() => {
  // This would be handled by parent component
  return null
})
</script>

<style scoped>
.question-renderer {
  margin-bottom: 1.5rem;
}

.question-wrapper {
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  border: 1px solid #e0e0e0;
  transition: border-color 0.3s ease;
}

.question-wrapper:hover {
  border-color: #0066cc;
}

.question-label {
  display: block;
  font-weight: 600;
  color: #333;
  margin-bottom: 1rem;
  font-size: 1.1rem;
  line-height: 1.4;
}

.required-indicator {
  color: #f44336;
  margin-left: 0.25rem;
}

.error-message {
  color: #f44336;
  font-size: 0.875rem;
  margin-top: 0.5rem;
  padding: 0.5rem;
  background: #ffebee;
  border-radius: 4px;
  border-left: 3px solid #f44336;
}

.individual-toggle {
  margin-top: 1rem;
  text-align: center;
}

.toggle-btn {
  background: #f8f9fa;
  border: 1px solid #dee2e6;
  border-radius: 6px;
  padding: 0.5rem 1rem;
  color: #6c757d;
  cursor: pointer;
  font-size: 0.875rem;
  transition: all 0.3s ease;
}

.toggle-btn:hover {
  background: #e9ecef;
  border-color: #adb5bd;
  color: #495057;
}

.toggle-btn:focus {
  outline: 2px solid #0066cc;
  outline-offset: 2px;
}
</style>
