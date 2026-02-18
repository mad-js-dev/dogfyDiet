<template>
  <div class="question-renderer">
    <QuestionRenderer 
      :question="{
        id: 'pet_breed',
        type: 'select',
        question: 'What is your pet\'s breed?',
        appliesTo: 'individual',
        required: true,
        options: allBreeds,
        validation: [
          {
            type: 'required',
            message: 'Pet breed is required'
          }
        ]
      }"
      :model-value="breedAnswer"
      pet-id="pet_1"
      @answer="handleBreedAnswer"
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useComprehensiveQuestionnaireStore } from '~/stores/comprehensive-questionnaire'
import QuestionRenderer from '~/components/QuestionRenderer.vue'

const questionnaire = useComprehensiveQuestionnaireStore()

const allBreeds = [
  // Dog Breeds
  'Labrador Retriever',
  'German Shepherd', 
  'Golden Retriever',
  'French Bulldog',
  'Bulldog',
  'Poodle',
  'Beagle',
  'Rottweiler',
  'German Shorthaired Pointer',
  'Yorkshire Terrier',
  'Dachshund',
  'Siberian Husky',
  'Great Dane',
  'Boxer',
  'Chihuahua',
  // Cat Breeds
  'Persian',
  'Maine Coon',
  'British Shorthair',
  'Siamese',
  'American Shorthair',
  'Ragdoll',
  'Bengal',
  'Russian Blue',
  'Scottish Fold',
  'Birman',
  'Oriental Shorthair',
  'Devon Rex',
  'Himalayan',
  'American Curl',
  'Selkirk Rex'
]

const breedAnswer = computed(() => {
  const answer = questionnaire.getAnswer('pet_breed', 'pet_1')
  return answer ? answer.value : ''
})

const handleBreedAnswer = (value: string, questionId: string, petId?: string) => {
  questionnaire.addAnswer(questionId, value, petId)
}
</script>

<style scoped>
.breed-step {
  text-align: center;
}

.breed-step h2 {
  margin-bottom: 2rem;
  color: #333;
  font-size: 1.5rem;
  font-weight: 600;
}
</style>
