<template>
  <div class="pet-pathology-section">
    <!-- Shared Pathology Mode (Default) -->
    <div v-if="!showIndividualPathologies" class="shared-pathology-mode">
      <div class="pathology-inputs">
        <div class="pathology-field">
          <label>Does your pet have any pathology?</label>
          <SegmentedButtons
            :model-value="sharedHasPathology"
            :options="[
              { value: 'No', label: 'No' },
              { value: 'Yes', label: 'Yes' }
            ]"
            name="shared-has-pathology"
            @update:model-value="handleSharedPathologyChange"
          />
        </div>
        
        <div v-if="sharedHasPathology === 'Yes'" class="pathology-field">
          <QuestionRenderer 
            :question="{
              id: 'shared_pathology',
              type: 'select',
              question: 'Select pathology that applies to your pet:',
              appliesTo: 'all',
              required: true,
              options: [
                'Food allergies and intolerances',
                'Sensitive digestions',
                'Skin problems',
                'Joint problems',
                'Dental problems',
                'Diabetes',
                'Epilepsy',
                'Otitis',
                'Cushing\'s syndrome',
                'Hypothyroidism'
              ],
              validation: [
                {
                  type: 'required',
                  message: 'Pathology selection is required'
                }
              ]
            }"
            :model-value="sharedPathology"
            @answer="handleSharedPathologyChange"
          />
        </div>
      </div>
      
      <div class="master-differentiation-controls">
        <div 
          v-if="Math.max(petCount, 1) > 1"
          @click="$emit('toggle-individual-pathologies', true)"
          class="differentiate-btn"
        >
          Are your pets different in this aspect?
        </div>
      </div>
    </div>
    
    <!-- Individual Pathology Mode -->
    <div v-else class="individual-pathology-mode">
      <div class="pet-answers-grid">
        <div 
          v-for="petNum in Math.max(petCount, 1)" 
          :key="petNum" 
          class="pet-answer-section"
        >
          <h3>{{ petDisplayName(petNum) }}</h3>
          
          <!-- Pathology Yes/No Question -->
          <div class="pathology-field">
            <label>Does {{ petDisplayName(petNum) }} have any pathology?</label>
            <SegmentedButtons
              :model-value="getAnswerValue('pet_has_pathology', petNum)"
              :options="[
                { value: 'No', label: 'No' },
                { value: 'Yes', label: 'Yes' }
              ]"
              :name="`pet-has-pathology-${petNum}`"
              @update:model-value="(value) => handleAnswer(value, 'pet_has_pathology', `pet_${petNum}`)"
            />
          </div>
          
          <!-- Conditional Pathology Select -->
          <div v-if="getAnswerValue('pet_has_pathology', petNum) === 'Yes'" class="pathology-select">
            <QuestionRenderer 
              :question="{
                id: 'pet_pathology',
                type: 'select',
                question: 'Select pathology that applies to your pet:',
                appliesTo: 'individual',
                required: true,
                options: [
                  'Food allergies and intolerances',
                  'Sensitive digestions',
                  'Skin problems',
                  'Joint problems',
                  'Dental problems',
                  'Diabetes',
                  'Epilepsy',
                  'Otitis',
                  'Cushing\'s syndrome',
                  'Hypothyroidism'
                ],
                validation: [
                  {
                    type: 'required',
                    message: 'Pathology selection is required'
                  }
                ]
              }"
              :pet-id="`pet_${petNum}`"
              :model-value="getAnswerValue('pet_pathology', petNum)"
              @answer="handleAnswer"
            />
          </div>
        </div>
      </div>
      
      <div class="master-differentiation-controls">
        <div 
          v-if="Math.max(petCount, 1) > 1"
          @click="$emit('toggle-individual-pathologies', false)"
          class="differentiate-btn"
        >
          Apply same pathology to all pets
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import QuestionRenderer from '~/components/QuestionRenderer.vue'
import SegmentedButtons from '~/components/segmented-buttons/SegmentedButtons.vue'

interface Props {
  showIndividualPathologies: boolean
  petCount: number
  sharedHasPathology: string
  sharedPathology: string
  getAnswerValue: (questionId: string, petNum: number) => any
  petDisplayName: (petNum: number) => string
}

defineProps<Props>()

const emit = defineEmits<{
  'toggle-individual-pathologies': [value: boolean]
  'handle-shared-pathology-change': [value: string]
  'handle-answer': [value: any, questionId: string, petId?: string]
}>()

const handleSharedPathologyChange = (value: string) => {
  emit('handle-shared-pathology-change', value)
}

const handleAnswer = (value: any, questionId: string, petId?: string) => {
  emit('handle-answer', value, questionId, petId)
}
</script>

<style scoped>
.pet-pathology-section {
  width: 100%;
}

.shared-pathology-mode {
  text-align: center;
}

.pathology-inputs {
  max-width: 400px;
  margin: 0 auto;
}

.pathology-field {
  margin-bottom: 1rem;
}

.pathology-field label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 600;
  color: #333;
}

.pathology-bool-select,
.pathology-select {
  padding: 0.75rem;
  border: 2px solid #e0e0e0;
  border-radius: 6px;
  font-size: 1rem;
  background: white;
  width: 100%;
  min-width: 200px;
}

.pathology-bool-select:focus,
.pathology-select:focus {
  outline: none;
  border-color: #0066cc;
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

.pet-answer-section h3 {
  color: #0066cc;
  margin-bottom: 1rem;
  font-size: 1.1rem;
  font-weight: 600;
}

.individual-pathology-mode .pathology-select {
  margin-top: 1rem;
}

.master-differentiation-controls {
  text-align: center;
  padding: 1rem;
}

.differentiate-btn {
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

.differentiate-btn:hover {
  background: #545b62;
}

.master-differentiation-controls .differentiate-btn {
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
