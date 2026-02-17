<template>
  <div class="pet-gastronomic-profile-section">
    <!-- Shared Gastronomic Profile Mode (Default) -->
    <div v-if="!showIndividualGastronomicProfiles" class="shared-gastronomic-profile-mode">
      <div class="gastronomic-profile-inputs">
        <div class="gastronomic-profile-field">
          <QuestionRenderer 
            :question="{
              id: 'shared_gastronomic_profile',
              type: 'range-slider',
              question: 'Select gastronomic profile for all pets:',
              appliesTo: 'all',
              required: true,
              options: [
                'The selective one: has a demanding palate, often struggles to finish their portion and gets tired of food',
                'The gourmet: loves to try new flavors, but isn\'t satisfied with just anything',
                'The glutton: devours all types of food as if they\'ll never taste another bite again'
              ],
              validation: [
                {
                  type: 'required',
                  message: 'Gastronomic profile is required'
                }
              ]
            }"
            :model-value="sharedGastronomicProfile"
            @answer="handleSharedGastronomicProfileChange"
          />
        </div>
      </div>
      
      <div class="master-differentiation-controls">
        <div 
          v-if="Math.max(petCount, 1) > 1"
          @click="$emit('toggle-individual-gastronomic-profiles', true)"
          class="differentiate-btn"
        >
          Are your pets different in this aspect?
        </div>
      </div>
    </div>
    
    <!-- Individual Gastronomic Profile Mode -->
    <div v-else class="individual-gastronomic-profile-mode">
      <div class="pet-answers-grid">
        <div 
          v-for="petNum in Math.max(petCount, 1)" 
          :key="petNum" 
          class="pet-answer-section"
        >
          <h3>{{ petDisplayName(petNum) }}</h3>
          
          <!-- Gastronomic Profile Question -->
          <QuestionRenderer 
            :question="{
              id: 'pet_gastronomic_profile',
              type: 'range-slider',
              question: 'What is ' + petDisplayName(petNum) + '\'s gastronomic profile?',
              appliesTo: 'individual',
              required: true,
              options: [
                'The selective one: has a demanding palate, often struggles to finish their portion and gets tired of food',
                'The gourmet: loves to try new flavors, but isn\'t satisfied with just anything',
                'The glutton: devours all types of food as if they\'ll never taste another bite again'
              ],
              validation: [
                {
                  type: 'required',
                  message: 'Gastronomic profile is required'
                }
              ]
            }"
            :pet-id="`pet_${petNum}`"
            :model-value="getAnswerValue('pet_gastronomic_profile', petNum)"
            @answer="handleAnswer"
          />
        </div>
      </div>
      
      <div class="master-differentiation-controls">
        <button 
          v-if="Math.max(petCount, 1) > 1"
          @click="$emit('toggle-individual-gastronomic-profiles', false)"
          class="merge-btn"
        >
          Apply same gastronomic profile to all pets
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import QuestionRenderer from '~/components/QuestionRenderer.vue'

interface Props {
  showIndividualGastronomicProfiles: boolean
  petCount: number
  sharedGastronomicProfile: string
  getAnswerValue: (questionId: string, petNum: number) => any
  petDisplayName: (petNum: number) => string
}

defineProps<Props>()

const emit = defineEmits<{
  'toggle-individual-gastronomic-profiles': [value: boolean]
  'handle-shared-gastronomic-profile-change': [value: string, questionId: string]
  'handle-answer': [value: any, questionId: string, petId?: string]
}>()

const handleSharedGastronomicProfileChange = (value: string, questionId: string) => {
  emit('handle-shared-gastronomic-profile-change', value, questionId)
}

const handleAnswer = (value: any, questionId: string, petId?: string) => {
  emit('handle-answer', value, questionId, petId)
}
</script>

<style scoped>
.pet-gastronomic-profile-section {
  width: 100%;
}

.shared-gastronomic-profile-mode {
  text-align: center;
}

.gastronomic-profile-inputs {
  max-width: 500px;
  margin: 0 auto;
}

.gastronomic-profile-field {
  margin-bottom: 1rem;
}

.gastronomic-profile-field label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 600;
  color: #333;
}

.gastronomic-profile-select {
  padding: 0.75rem;
  border: 2px solid #e0e0e0;
  border-radius: 6px;
  font-size: 1rem;
  background: white;
  width: 100%;
  min-width: 300px;
}

.gastronomic-profile-select:focus {
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

.individual-gastronomic-profile-mode .gastronomic-profile-select {
  margin-top: 1rem;
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
