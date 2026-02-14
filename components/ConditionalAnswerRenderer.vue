<template>
  <div class="conditional-answer-renderer">
    <!-- Shared Answer Mode -->
    <div v-if="answerMode === 'shared'" class="shared-answer-mode">
      <QuestionRenderer 
        :question="question"
        :model-value="sharedAnswerValue"
        @answer="handleSharedAnswer"
      />
      
      <button 
        v-if="showDifferentiationButton"
        @click="switchToIndividual"
        class="differentiate-btn"
      >
        Are your pets different in this aspect?
      </button>
    </div>

    <!-- Individual Answer Mode -->
    <div v-else class="individual-answer-mode">
      <div class="pet-answers-grid">
        <div 
          v-for="petNum in Math.max(petCount, 1)" 
          :key="petNum" 
          class="pet-answer-section"
        >
          <h3>{{ petDisplayName(petNum) }}</h3>
          <QuestionRenderer 
            :question="getQuestionForPet(petNum)"
            :pet-id="`pet_${petNum}`"
            :model-value="getAnswerValue(petNum)"
            @answer="handleIndividualAnswer"
          />
        </div>
      </div>
      
      <div class="answer-actions">
        <button 
          @click="switchToShared"
          class="merge-btn"
          v-if="canMergeAnswers"
        >
          Apply same answer to all pets
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useComprehensiveQuestionnaireStore } from '~/stores/comprehensive-questionnaire'
import QuestionRenderer from '~/components/QuestionRenderer.vue'
import type { QuestionConfig } from '~/types/questionnaire'

interface Props {
  question: QuestionConfig
  initialMode?: 'shared' | 'individual'
}

const props = defineProps<Props>()
const questionnaire = useComprehensiveQuestionnaireStore()

const answerMode = ref<'shared' | 'individual'>(
  props.initialMode || (questionnaire.petCount > 1 ? 'shared' : 'individual')
)

const petCount = computed(() => questionnaire.petCount)

// Computed properties
const showDifferentiationButton = computed(() => {
  return petCount.value > 1 && answerMode.value === 'shared'
})

const sharedAnswerValue = computed(() => {
  const sharedAnswer = questionnaire.getAnswer(props.question.id, null)
  return sharedAnswer ? sharedAnswer.value : null
})

const canMergeAnswers = computed(() => {
  if (petCount.value <= 1) return false
  
  // Check if all pets have the same answer
  const answers = []
  for (let i = 1; i <= petCount.value; i++) {
    const answer = questionnaire.getAnswer(props.question.id, `pet_${i}`)
    if (!answer) return false
    answers.push(answer.value)
  }
  
  // All answers exist and are the same
  return answers.every(val => val === answers[0])
})

// Methods
const petDisplayName = (petNum: number) => {
  const petNameAnswer = questionnaire.getAnswer(`pet_name_pet_${petNum}`, `pet_${petNum}`)
  return petNameAnswer ? petNameAnswer.value : `Pet ${petNum}`
}

const getQuestionForPet = (petNum: number): QuestionConfig => {
  return {
    ...props.question,
    id: `${props.question.id}_pet_${petNum}`,
    question: props.question.question.replace('your pet', `${petDisplayName(petNum)}`)
  }
}

const getAnswerValue = (petNum: number) => {
  return questionnaire.getAnswer(props.question.id, `pet_${petNum}`)?.value || null
}

const handleSharedAnswer = (value: any) => {
  questionnaire.addSmartAnswer(props.question.id, value, null)
}

const handleIndividualAnswer = (value: any, questionId: string, petId?: string) => {
  // Use the base question ID, not the individual question ID
  if (petId) {
    // Ensure pet count is set when first answer is provided
    const petNum = parseInt(petId.split('_')[1])
    if (petNum > questionnaire.petCount) {
      questionnaire.setPetCount(petNum)
    }
    // Use the base question ID for storage
    questionnaire.addAnswer(props.question.id, value, petId)
  }
}

const switchToIndividual = () => {
  questionnaire.differentiateAnswers(props.question.id)
  answerMode.value = 'individual'
}

const switchToShared = () => {
  // Get the first pet's answer and apply to all
  const firstAnswer = questionnaire.getAnswer(props.question.id, 'pet_1')
  if (firstAnswer) {
    // Remove all individual answers
    for (let i = 1; i <= petCount.value; i++) {
      questionnaire.removeAnswer(props.question.id, `pet_${i}`)
    }
    // Add shared answer
    questionnaire.addAnswer(props.question.id, firstAnswer.value, null)
    answerMode.value = 'shared'
  }
}

// Watch for pet count changes
watch(petCount, (newCount) => {
  if (newCount === 0) {
    questionnaire.setPetCount(1)
  }
  if (newCount === 1) {
    answerMode.value = 'individual'
  } else if (newCount > 1 && !questionnaire.hasIndividualAnswers(props.question.id)) {
    answerMode.value = 'shared'
  }
}, { immediate: true })

// Watch answer changes to update mode
watch([
  () => questionnaire.hasSharedAnswer(props.question.id),
  () => questionnaire.hasIndividualAnswers(props.question.id)
], ([hasShared, hasIndividual]) => {
  if (hasShared && !hasIndividual) {
    answerMode.value = 'shared'
  } else if (hasIndividual) {
    answerMode.value = 'individual'
  }
}, { immediate: true })
</script>

<style scoped>
.conditional-answer-renderer {
  margin-bottom: 1.5rem;
}

.shared-answer-mode {
  position: relative;
}

.differentiate-btn {
  margin-top: 1rem;
  width: 100%;
  padding: 0.75rem 1rem;
  background: linear-gradient(135deg, #f8f9fa, #e9ecef);
  border: 2px solid #dee2e6;
  border-radius: 8px;
  color: #6c757d;
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 500;
  transition: all 0.3s ease;
}

.differentiate-btn:hover {
  background: linear-gradient(135deg, #e9ecef, #dee2e6);
  border-color: #adb5bd;
  color: #495057;
  transform: translateY(-1px);
}

.individual-answer-mode {
  width: 100%;
}

.pet-answers-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-bottom: 1.5rem;
}

.pet-answer-section {
  background: #f8f9fa;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  padding: 1.5rem;
}

.pet-answer-section h3 {
  color: #0066cc;
  margin-bottom: 1rem;
  font-size: 1.1rem;
  font-weight: 600;
}

.answer-actions {
  display: flex;
  justify-content: center;
  gap: 1rem;
}

.merge-btn {
  padding: 0.5rem 1rem;
  background: linear-gradient(135deg, #28a745, #20c997);
  border: none;
  border-radius: 6px;
  color: white;
  cursor: pointer;
  font-size: 0.875rem;
  font-weight: 500;
  transition: all 0.3s ease;
}

.merge-btn:hover {
  background: linear-gradient(135deg, #218838, #1ea085);
  transform: translateY(-1px);
}

@media (max-width: 768px) {
  .pet-answers-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
  
  .pet-answer-section {
    padding: 1rem;
  }
  
  .answer-actions {
    flex-direction: column;
  }
  
  .merge-btn {
    width: 100%;
  }
}
</style>
