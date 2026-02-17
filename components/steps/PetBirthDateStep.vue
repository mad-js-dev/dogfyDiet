<template>
  <div class="pet-birth-date-section">
    <h2>When {{ Math.max(petCount, 1) > 1 ? 'were' : 'was' }} your pet{{ Math.max(petCount, 1) > 1 ? 's' : '' }} born?</h2>
    
    <!-- Shared Birth Date Mode (Default) -->
    <div v-if="!showIndividualBirthDates" class="shared-birth-date-mode">
      <div class="birth-date-inputs">
        <div class="birth-date-field">
          <QuestionRenderer 
            :question="{
              id: 'shared_birth_year',
              type: 'select',
              question: '',
              appliesTo: 'all',
              required: true,
              options: yearOptions,
              validation: [
                {
                  type: 'required',
                  message: 'Birth year is required'
                }
              ]
            }"
            :model-value="sharedBirthYear"
            @answer="handleSharedBirthYearChange"
          />
        </div>
        
        <div class="birth-date-field">
          <QuestionRenderer 
            :question="{
              id: 'shared_birth_month',
              type: 'select',
              question: '',
              appliesTo: 'all',
              required: true,
              options: monthOptions,
              validation: [
                {
                  type: 'required',
                  message: 'Birth month is required'
                }
              ]
            }"
            :model-value="sharedBirthMonth"
            @answer="handleSharedBirthMonthChange"
          />
        </div>
      </div>
      
      <div class="master-differentiation-controls">
        <div 
          v-if="Math.max(petCount, 1) > 1"
          @click="$emit('toggle-individual-birth-dates', true)"
          class="differentiate-btn"
        >
          Are your pets different in this aspect?
        </div>
      </div>
    </div>
    
    <!-- Individual Birth Date Mode -->
    <div v-else class="individual-birth-date-mode">
      <div class="pet-answers-grid">
        <div 
          v-for="petNum in Math.max(petCount, 1)" 
          :key="petNum" 
          class="pet-answer-section"
        >              
          <!-- Birth Year Question -->
          <QuestionRenderer 
            :question="{
              id: 'pet_birth_year',
              type: 'select',
              question: '',
              appliesTo: 'individual',
              required: true,
              options: yearOptions,
              validation: [
                {
                  type: 'required',
                  message: 'Birth year is required'
                }
              ]
            }"
            :pet-id="`pet_${petNum}`"
            :model-value="getAnswerValue('pet_birth_year', petNum)"
            @answer="handleAnswer"
          />
          
          <!-- Birth Month Question -->
          <QuestionRenderer 
            :question="{
              id: 'pet_birth_month',
              type: 'select',
              question: '',
              appliesTo: 'individual',
              required: true,
              options: monthOptions,
              validation: [
                {
                  type: 'required',
                  message: 'Birth month is required'
                }
              ]
            }"
            :pet-id="`pet_${petNum}`"
            :model-value="getAnswerValue('pet_birth_month', petNum)"
            @answer="handleAnswer"
          />
        </div>
      </div>
      
      <div class="master-differentiation-controls">
        <button 
          v-if="Math.max(petCount, 1) > 1"
          @click="$emit('toggle-individual-birth-dates', false)"
          class="merge-btn"
        >
          Apply same birth date to all pets
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import QuestionRenderer from '~/components/QuestionRenderer.vue'

interface Props {
  showIndividualBirthDates: boolean
  petCount: number
  sharedBirthYear: string
  sharedBirthMonth: string
  getAnswerValue: (questionId: string, petNum: number) => any
}

defineProps<Props>()

const emit = defineEmits<{
  'toggle-individual-birth-dates': [value: boolean]
  'handle-shared-birth-year-change': [value: string]
  'handle-shared-birth-month-change': [value: string]
  'handle-answer': [value: any, questionId: string, petId?: string]
}>()

// Birth date options
const yearOptions = computed(() => {
  const currentYear = new Date().getFullYear()
  const years = []
  for (let year = currentYear; year >= currentYear - 20; year--) {
    years.push(year.toString())
  }
  return years
})

const monthOptions = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
]

const handleSharedBirthYearChange = (value: string, questionId: string) => {
  emit('handle-shared-birth-year-change', value)
}

const handleSharedBirthMonthChange = (value: string, questionId: string) => {
  emit('handle-shared-birth-month-change', value)
}

const handleAnswer = (value: any, questionId: string, petId?: string) => {
  emit('handle-answer', value, questionId, petId)
}
</script>

<style scoped>
.pet-birth-date-section {
  width: 100%;
}

.birth-date-inputs {
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  justify-content: center;
}

.birth-date-field {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.birth-date-field label {
  font-weight: 600;
  color: #333;
}

.birth-date-select {
  padding: 0.75rem;
  border: 2px solid #e0e0e0;
  border-radius: 6px;
  font-size: 1rem;
  background: white;
  min-width: 150px;
}

.birth-date-select:focus {
  outline: none;
  border-color: #0066cc;
}

.shared-birth-date-mode {
  text-align: center;
  border-radius: 8px;
  margin-bottom: 2rem;
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
