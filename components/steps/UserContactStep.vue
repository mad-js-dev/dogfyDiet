<template>
  <div class="user-contact-section">
    <div class="contact-form">
      <div class="contact-field">
        <QuestionRenderer 
          :question="{
            id: 'user_name',
            type: 'text',
            question: 'What is your name?',
            appliesTo: 'all',
            required: true,
            validation: [
              {
                type: 'required',
                message: 'Your name is required'
              },
              {
                type: 'minLength',
                value: 2,
                message: 'Name must be at least 2 characters'
              }
            ]
          }"
          :model-value="getAnswerValue('user_name')"
          @answer="handleAnswer"
        />
      </div>

      <div class="contact-field">
        <QuestionRenderer 
          :question="{
            id: 'user_email',
            type: 'email',
            question: 'What is your email address?',
            appliesTo: 'all',
            required: true,
            validation: [
              {
                type: 'required',
                message: 'Email address is required'
              },
              {
                type: 'email',
                message: 'Please enter a valid email address'
              }
            ]
          }"
          :model-value="getAnswerValue('user_email')"
          @answer="handleAnswer"
        />
      </div>

      <div class="contact-field">
        <QuestionRenderer 
          :question="{
            id: 'user_phone',
            type: 'tel',
            question: 'What is your phone number?',
            appliesTo: 'all',
            required: true,
            validation: [
              {
                type: 'required',
                message: 'Phone number is required'
              },
              {
                type: 'phone',
                message: 'Please enter a valid phone number'
              }
            ]
          }"
          :model-value="getAnswerValue('user_phone')"
          @answer="handleAnswer"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import QuestionRenderer from '~/components/QuestionRenderer.vue'

interface Props {
  getAnswerValue: (questionId: string) => any
}

defineProps<Props>()

const emit = defineEmits<{
  'handle-answer': [value: any, questionId: string]
}>()

const handleAnswer = (value: any, questionId: string) => {
  emit('handle-answer', value, questionId)
}
</script>

<style scoped>
.user-contact-section {
  width: 100%;
}

.contact-form {
  max-width: 600px;
  margin: 0 auto;
}

.contact-field {
  margin-bottom: 1.5rem;
}
</style>
