<template>
  <div class="pet-body-shape-section">
    <!-- Shared Body Shape Mode (Default) -->
    <div v-if="!showIndividualBodyShapes" class="shared-body-shape-mode">
      <div class="body-shape-inputs">
        <div class="body-shape-field">
          <QuestionRenderer 
            :question="{
              id: 'shared_body_shape',
              type: 'range-slider',
              question: 'Select body shape for all pets:',
              appliesTo: 'all',
              required: true,
              options: [
                'A bit thin - Narrow waist and ribs are clearly visible',
                'In good shape - Waist is visible and ribs are easy to feel',
                'A bit chubby - Waist is not visible and ribs are hard to feel'
              ],
              validation: [
                {
                  type: 'required',
                  message: 'Body shape is required'
                }
              ]
            }"
            :model-value="sharedBodyShape"
            @answer="handleSharedBodyShapeChange"
          />
        </div>
        
        <div class="body-shape-field">
          <label>Enter weight for all pets:</label>
          <TextInput
            :value="sharedWeight" 
            @update:value="handleSharedWeightChange" 
            :config="{
              id: 'shared_weight',
              type: 'text',
              question: 'Enter weight (e.g., 25)',
              appliesTo: 'individual'
            }"
            suffix="Kg"
          />
        </div>
      </div>
      
      <div class="master-differentiation-controls">
        <div 
          v-if="Math.max(petCount, 1) > 1"
          @click="$emit('toggle-individual-body-shapes', true)"
          class="differentiate-btn"
        >
          Are your pets different in this aspect?
        </div>
      </div>
    </div>
    
    <!-- Individual Body Shape Mode -->
    <div v-else class="individual-body-shape-mode">
      <div class="pet-answers-grid">
        <div 
          v-for="petNum in Math.max(petCount, 1)" 
          :key="petNum" 
          class="pet-answer-section"
        >
          
          <!-- Body Shape Question -->
          <QuestionRenderer 
            :question="{
              id: 'pet_body_shape',
              type: 'range-slider',
              question: 'Which silhouette best represents ' + petDisplayName(petNum) + '?',
              appliesTo: 'individual',
              required: true,
              options: [
                'A bit thin - Narrow waist and ribs are clearly visible',
                'In good shape - Waist is visible and ribs are easy to feel',
                'A bit chubby - Waist is not visible and ribs are hard to feel'
              ],
              validation: [
                {
                  type: 'required',
                  message: 'Body shape is required'
                }
              ]
            }"
            :pet-id="`pet_${petNum}`"
            :model-value="getAnswerValue('pet_body_shape', petNum)"
            @answer="handleAnswer"
          />
          
          <!-- Pet Weight Question -->
          <QuestionRenderer 
            :question="{
              id: 'pet_weight',
              type: 'text',
              question: 'What is ' + petDisplayName(petNum) + '\'s weight?',
              appliesTo: 'individual',
              required: true,
              validation: [
                {
                  type: 'required',
                  message: 'Weight is required'
                }
              ]
            }"
            :pet-id="`pet_${petNum}`"
            :model-value="getAnswerValue('pet_weight', petNum)"
            @answer="handleAnswer"
            suffix="Kg"
          />
        </div>
      </div>
      
      <div class="master-differentiation-controls">
        <button 
          v-if="Math.max(petCount, 1) > 1"
          @click="$emit('toggle-individual-body-shapes', false)"
          class="merge-btn"
        >
          Apply same body shape to all pets
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import QuestionRenderer from '~/components/QuestionRenderer.vue'
import TextInput from '~/components/text-input/textInput.vue'

interface Props {
  showIndividualBodyShapes: boolean
  petCount: number
  sharedBodyShape: string
  sharedWeight: string
  getAnswerValue: (questionId: string, petNum: number) => any
  petDisplayName: (petNum: number) => string
}

defineProps<Props>()

const emit = defineEmits<{
  'toggle-individual-body-shapes': [value: boolean]
  'handle-shared-body-shape-change': [value: string, questionId: string]
  'handle-shared-weight-change': [value: string]
  'handle-answer': [value: any, questionId: string, petId?: string]
}>()

const handleSharedBodyShapeChange = (value: string, questionId: string) => {
  emit('handle-shared-body-shape-change', value, questionId)
}

const handleSharedWeightChange = (value: string) => {
  emit('handle-shared-weight-change', value)
}

const handleAnswer = (value: any, questionId: string, petId?: string) => {
  emit('handle-answer', value, questionId, petId)
}
</script>

<style scoped>
.pet-body-shape-section {
  width: 100%;
}

.shared-body-shape-mode {
  text-align: center;
}

.body-shape-inputs {
  display: flex;
  flex-direction: column;
  margin-bottom: 2rem;
  align-items: center;
}

.body-shape-field {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  min-width: 400px;
  width: 100%;
  max-width: 500px;
  margin-bottom: 1rem;
}

.body-shape-field label {
  font-weight: 600;
  color: #333;
  margin-bottom: 0.5rem;
}

.pet-answers-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  margin-top: 1rem;
}

.pet-answer-section {
  flex: 1;
  min-width: 300px;
  max-width: 400px;
  border-radius: 8px;
  background: #f8f9fa;
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
