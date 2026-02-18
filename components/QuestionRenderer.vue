<template>
  <div class="question-renderer">
    <div class="question-wrapper">
      <label :for="question.id" class="question-label">
        {{ question.question }}
      </label>
      
      <component 
        :is="answerComponent"
        :config="question"
        :model-value="currentAnswer"
        :pet-id="petId"
        :required="question.required"
        @answer="(value: any) => {
          $emit('answer', value, question.id, petId)
        }"
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
  required?: boolean
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

// Error state (could be passed from parent)
const error = computed(() => {
  // This would be handled by parent component
  return null
})
</script>

<style scoped>
.question-wrapper {
  background: white;
  border-radius: 8px;
  text-align: center;
}


.question-label {
  display: block;
  font-weight: 400;
  color: #333;
  margin-bottom: 1rem;
  font-size: 2rem;
  line-height: 1.4;
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
