<template>
  <div class="pet-activity-level-section">
    <h2>What is your pet{{ Math.max(petCount, 1) > 1 ? 's\'' : '' }} activity level?</h2>
    
    <!-- Shared Activity Level Mode (Default) -->
    <div v-if="!showIndividualActivityLevels" class="shared-activity-level-mode">
      <div class="activity-level-inputs">
        <div class="activity-level-field">
          <QuestionRenderer 
            :question="{
              id: 'shared_activity_level',
              type: 'range-slider',
              question: 'Select activity level for all pets:',
              appliesTo: 'all',
              required: true,
              options: [
                'Couch potato - Daily walks of less than 1h. What they like most is to take a good nap and be very calm',
                'Zen dog - Daily walks of 1 to 2h. Knows how to enjoy good walks, but also knows when to rest',
                'Energy tornado - Daily walks of more than 2h. Don\'t let that energy tornado stop!'
              ],
              validation: [
                {
                  type: 'required',
                  message: 'Activity level is required'
                }
              ]
            }"
            :model-value="sharedActivityLevel"
            @answer="handleSharedActivityLevelChange"
          />
        </div>
      </div>
      
      <div class="master-differentiation-controls">
        <div 
          v-if="Math.max(petCount, 1) > 1"
          @click="$emit('toggle-individual-activity-levels', true)"
          class="differentiate-btn"
        >
          Are your pets different in this aspect?
        </div>
      </div>
    </div>
    
    <!-- Individual Activity Level Mode -->
    <div v-else class="individual-activity-level-mode">
      <div class="pet-answers-grid">
        <div 
          v-for="petNum in Math.max(petCount, 1)" 
          :key="petNum" 
          class="pet-answer-section"
        >
          <h3>{{ petDisplayName(petNum) }}</h3>
          
          <!-- Activity Level Question -->
          <QuestionRenderer 
            :question="{
              id: 'pet_activity_level',
              type: 'range-slider',
              question: 'What is ' + petDisplayName(petNum) + '\'s activity level?',
              appliesTo: 'individual',
              required: true,
              options: [
                'Couch potato - Daily walks of less than 1h. What they like most is to take a good nap and be very calm',
                'Zen dog - Daily walks of 1 to 2h. Knows how to enjoy good walks, but also knows when to rest',
                'Energy tornado - Daily walks of more than 2h. Don\'t let that energy tornado stop!'
              ],
              validation: [
                {
                  type: 'required',
                  message: 'Activity level is required'
                }
              ]
            }"
            :pet-id="`pet_${petNum}`"
            :model-value="getAnswerValue('pet_activity_level', petNum)"
            @answer="handleAnswer"
          />
        </div>
      </div>
      
      <div class="master-differentiation-controls">
        <button 
          v-if="Math.max(petCount, 1) > 1"
          @click="$emit('toggle-individual-activity-levels', false)"
          class="merge-btn"
        >
          Apply same activity level to all pets
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import QuestionRenderer from '~/components/QuestionRenderer.vue'

interface Props {
  showIndividualActivityLevels: boolean
  petCount: number
  sharedActivityLevel: string
  getAnswerValue: (questionId: string, petNum: number) => any
  petDisplayName: (petNum: number) => string
}

defineProps<Props>()

const emit = defineEmits<{
  'toggle-individual-activity-levels': [value: boolean]
  'handle-shared-activity-level-change': [value: string, questionId: string]
  'handle-answer': [value: any, questionId: string, petId?: string]
}>()

const handleSharedActivityLevelChange = (value: string, questionId: string) => {
  emit('handle-shared-activity-level-change', value, questionId)
}

const handleAnswer = (value: any, questionId: string, petId?: string) => {
  emit('handle-answer', value, questionId, petId)
}
</script>

<style scoped>
.pet-activity-level-section {
  width: 100%;
}

.shared-activity-level-mode {
  text-align: center;
  margin-bottom: 2rem;
}

.activity-level-inputs {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  margin-bottom: 2rem;
  align-items: center;
}

.activity-level-field {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  min-width: 400px;
  width: 100%;
  max-width: 500px;
}

.activity-level-field label {
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

.pet-answer-section h3 {
  color: #0066cc;
  margin-bottom: 1rem;
  font-size: 1.1rem;
  font-weight: 600;
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
