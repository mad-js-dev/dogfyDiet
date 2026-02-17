<template>
  <div class="pet-gender-section">
    <ConditionalAnswerRenderer 
      :question="{
        id: 'pet_gender',
        type: 'segmented',
        question: 'What is {petName}\'s gender?',
        appliesTo: 'all',
        required: false,
        options: ['Male', 'Female'],
        validation: [
          {
            type: 'required',
            message: 'Pet gender is required'
          }
        ]
      }"
      :initial-mode="showIndividualGenders ? 'individual' : 'shared'"
      :hide-differentiation-button="true"
      :hide-merge-button="true"
    />
    
    <!-- Neutered Question -->
    <ConditionalAnswerRenderer 
      :question="{
        id: 'pet_neutered',
        type: 'segmented',
        question: 'Has {petName} been neutered or spayed?',
        appliesTo: 'all',
        required: false,
        options: ['Yes', 'No'],
        validation: [
          {
            type: 'required',
            message: 'Neutered status is required'
          }
        ]
      }"
      :initial-mode="showIndividualGenders ? 'individual' : 'shared'"
      :hide-differentiation-button="true"
      :hide-merge-button="true"
    />
    
    <!-- Expecting Question (conditional) -->
    <ConditionalAnswerRenderer 
      v-if="shouldShowExpectingQuestionRenderer()"
      :question="{
        id: 'pet_expecting',
        type: 'segmented',
        question: 'Is {petName} expecting puppies or kittens?',
        appliesTo: 'all',
        required: false,
        options: ['Yes', 'No'],
        validation: [
          {
            type: 'required',
            message: 'Expecting status is required'
          }
        ]
      }"
      :initial-mode="showIndividualGenders ? 'individual' : 'shared'"
      :hide-differentiation-button="true"
      :hide-merge-button="true"
    />
    
    <!-- Master Differentiation Button -->
    <div v-if="petCount > 1" class="master-differentiation-controls">
      <div 
        v-if="!showIndividualGenders"
        @click="$emit('toggle-gender-mode')"
        class="differentiate-btn"
      >
        Are your pets different in this aspect?
      </div>
      <button 
        v-else
        @click="$emit('toggle-gender-mode')"
        class="merge-btn"
      >
        Apply same answers to all pets
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import ConditionalAnswerRenderer from '~/components/ConditionalAnswerRenderer.vue'

interface Props {
  showIndividualGenders: boolean
  petCount: number
  shouldShowExpectingQuestionRenderer: () => boolean
}

defineProps<Props>()

defineEmits<{
  'toggle-gender-mode': []
}>()
</script>

<style scoped>
.pet-gender-section {
  width: 100%;
}

.master-differentiation-controls {
  text-align: center;
  padding: 1rem;
}

.differentiate-btn,
.merge-btn {
  background: #6c757d;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 6px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin: 0 auto;
  display: block;
  position: relative;
}

.differentiate-btn:hover,
.merge-btn:hover {
  background: #545b62;
}

.master-differentiation-controls .differentiate-btn,
.master-differentiation-controls .merge-btn {
  display: inline-block;
  border-radius: 6px;
  color: #0a7373;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 500;
  transition: all 0.3s ease;
  position: relative;
  background: transparent;
  border: none;
  padding: 8px 0;

  &:before {
    display: block;
    content: '';
    width: 100%;
    height: 1px;
    background-color: #0a7373;
    position: absolute;
    bottom: -0.3rem;
    left: 0;
    transform: scaleX(0);
    transform-origin: 100% 50%;
    transition: transform 0.3s;
  }
  
  &:hover:before {
    transform: scaleX(1);
  }
}
</style>
