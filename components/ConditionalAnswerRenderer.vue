<template>
  <div class="conditional-answer-renderer">
    <!-- All Pets Mode (for appliesTo: 'all' questions) -->
    <div v-if="props.question.appliesTo === 'all'" class="conditional-answer-renderer__all-pets-mode">
      <QuestionRenderer 
        :question="props.question"
        :model-value="getAllPetsAnswerValue()"
        @update:model-value="handleAllPetsModelUpdate"
        @answer="handleAllPetsAnswer"
      />
    </div>

    <!-- Shared Answer Mode -->
    <div v-else-if="answerMode === 'shared'" class="conditional-answer-renderer__shared-answer-mode">
      <QuestionRenderer 
        :question="sharedQuestionWithPetNames"
        :model-value="sharedAnswerValue"
        @update:model-value="handleSharedModelUpdate"
        @answer="handleSharedAnswer"
      />
    </div>

    <!-- Individual Answer Mode -->
    <div v-else class="conditional-answer-renderer__individual-answer-mode">
      <div class="conditional-answer-renderer__pet-answers-grid">
        <template v-for="petIndex in petCount" :key="petIndex">
          <div 
            class="conditional-answer-renderer__pet-answer-section"
            v-if="shouldShowQuestionForPet(petIndex)"
          >
            <QuestionRenderer 
              :question="reactiveQuestionForPet(petIndex).value"
              :pet-id="`pet_${petIndex}`"
              :model-value="getAnswerValue(petIndex)"
              @update:model-value="(value) => handleIndividualModelUpdate(petIndex, value)"
              @answer="handleIndividualAnswer"
            />
            
            <!-- Breed selection for pets 2+ (only for pet name step) -->
            <div v-if="props.question.id === 'pet_name' && petIndex > 1" class="conditional-answer-renderer__breed-selection">
              <SelectAnswer
                :config="{
                  id: `pet_breed_${petIndex}`,
                  type: 'select',
                  question: 'Breed:',
                  options: breedOptions,
                  required: false,
                  appliesTo: 'individual'
                }"
                :model-value="getBreedValue(petIndex)"
                :pet-id="`pet_${petIndex}`"
                @answer="(value) => handleBreedChange(petIndex, Array.isArray(value) ? value[0] : value)"
              />
            </div>
          </div>
        </template>
      </div>
    </div>
    
    <!-- Add Pet/Differentiate Button - Shows in both modes -->
    <div class="conditional-answer-renderer__answer-actions">
      <div 
        v-if="showDifferentiationButton"
        @click="handleButtonClick"
        class="conditional-answer-renderer__differentiate-btn"
      >
        {{ isPetNameQuestion ? (petCount === 1 ? 'Have more than one pet?' : 'Maximum 2 pets reached') : 'Are your pets different in this aspect?' }}
    </div>
      
      <div 
        v-if="canMergeAnswers"
        @click="switchToShared"
        class="conditional-answer-renderer__merge-btn"
      >
        Apply same answer to all pets
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useComprehensiveQuestionnaireStore } from '~/stores/comprehensive-questionnaire'
import QuestionRenderer from '~/components/QuestionRenderer.vue'
import SelectAnswer from '~/components/select-answer/SelectAnswer.vue'
import type { QuestionConfig } from '~/types/questionnaire'

interface Props {
  question: QuestionConfig
  initialMode?: 'shared' | 'individual'
  hideDifferentiationButton?: boolean
  hideMergeButton?: boolean
}

const props = defineProps<Props>()
const questionnaire = useComprehensiveQuestionnaireStore()

const answerMode = ref<'shared' | 'individual'>(
  props.initialMode || 'individual' // Always start in individual mode for pet names
)

const petCount = computed(() => questionnaire.petCount)

// Breed options (same as step 1)
const breedOptions = [
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
  'Pembroke Welsh Corgi',
  'Australian Shepherd',
  'Doberman Pinscher',
  'Cavalier King Charles Spaniel',
  'Shih Tzu',
  'Boston Terrier',
  'Pomeranian',
  'Havanese',
  'Shetland Sheepdog',
  'Brittany',
  'Cocker Spaniel',
  'English Springer Spaniel',
  'Border Collie',
  'Bichon Frise',
  'West Highland White Terrier',
  'Basset Hound',
  'Mastiff',
  'Bernese Mountain Dog',
  'Cairn Terrier',
  'Scottish Terrier',
  'Papillon',
  'Bull Terrier',
  'Chihuahua',
  'Maltese',
  'Pekingese',
  'Miniature Schnauzer',
  'Chinese Shar-Pei',
  'Bouviers des Flandres',
  'Bloodhound',
  'Brussels Griffon',
  'Dandie Dinmont Terrier',
  'Lhasa Apso',
  'Lowchen',
  'Norfolk Terrier',
  'Norwich Terrier',
  'Puli',
  'Sealyham Terrier',
  'Skye Terrier',
  'Soft Coated Wheaten Terrier',
  'Vizsla',
  'Wirehaired Pointing Griffon',
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

// Computed properties
const isPetNameQuestion = computed(() => props.question.id === 'pet_name')

const showDifferentiationButton = computed(() => {
  // If explicitly hidden, don't show
  if (props.hideDifferentiationButton) return false
  
  // For pet name question: show + Add Pet button only if less than 2 pets
  if (isPetNameQuestion.value) {
    return petCount.value < 2
  }
  // For other questions: show differentiate button normally
  console.log('showDifferentiationButton check:', {
    petCount: petCount.value,
    answerMode: answerMode.value,
    shouldShow: petCount.value > 1 && answerMode.value === 'shared'
  })
  return petCount.value > 1 && answerMode.value === 'shared'
})

const sharedAnswerValue = computed(() => {
  const sharedAnswer = questionnaire.getAnswer(props.question.id, null)
  return sharedAnswer ? sharedAnswer.value : null
})

const canMergeAnswers = computed(() => {
  if (props.hideMergeButton) return false
  if (petCount.value <= 1) return false
  
  // Check if all pets have the same answer
  const answers: any[] = []
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
  const petNameAnswer = questionnaire.getAnswer('pet_name', `pet_${petNum}`)
  return petNameAnswer ? petNameAnswer.value : `Pet ${petNum}`
}

const shouldShowQuestionForPet = (petNum: number) => {
  // For expecting question, only show for female pets that are not neutered
  if (props.question.id === 'pet_expecting') {
    const genderAnswer = questionnaire.getAnswer('pet_gender', `pet_${petNum}`)
    const neuteredAnswer = questionnaire.getAnswer('pet_neutered', `pet_${petNum}`)
    return genderAnswer?.value === 'Female' && neuteredAnswer?.value === 'No'
  }
  
  // For all other questions, always show
  return true
}

const getQuestionForPet = (petNum: number): QuestionConfig => {
  const petName = petDisplayName(petNum)
  const originalQuestion = props.question.question || `What is ${petName}'s name?`
  const finalQuestion = originalQuestion.includes('{petName}') ? originalQuestion.replaceAll('{petName}', petName) : originalQuestion
  return {
    ...props.question,
    id: props.question.id, // Use base question ID, not individual ID
    question: finalQuestion
  }
}

// Make the question reactive to pet name changes
const reactiveQuestionForPet = (petNum: number) => {
  return computed(() => getQuestionForPet(petNum))
}

// Handle shared mode question with pet names (use pet 1's name or general text)
const sharedQuestionWithPetNames = computed(() => {
  const originalQuestion = props.question.question || `What is your pet's name?`
  
  let finalQuestion
  if (petCount.value === 1) {
    // Single pet - use general text
    finalQuestion = originalQuestion.includes('{petName}') ? 
      originalQuestion.replaceAll('{petName}', 'your pet') : 
      originalQuestion
  } else {
    // Multiple pets with shared answer - use plural text
    finalQuestion = originalQuestion.includes('{petName}') ? 
      originalQuestion.replaceAll('{petName}', 'your pets') : 
      originalQuestion
  }
  
  return {
    ...props.question,
    question: finalQuestion
  }
})

const getAnswerValue = (petNum: number) => {
  return questionnaire.getAnswer(props.question.id, `pet_${petNum}`)?.value || null
}

const getBreedValue = (petNum: number) => {
  return questionnaire.getAnswer('pet_breed', `pet_${petNum}`)?.value || ''
}

const handleBreedChange = (petNum: number, breedValue: string) => {
  questionnaire.addAnswer('pet_breed', breedValue, `pet_${petNum}`)
}

const handleSharedAnswer = (value: any) => {
  // For single pet, store with petId to ensure proper saving
  if (petCount.value === 1) {
    questionnaire.addAnswer(props.question.id, value, 'pet_1')
  } else {
    // Multiple pets with same answer - store as shared to maintain UI consistency
    // Clear any existing individual answers first to prevent mode conflicts
    for (let i = 1; i <= petCount.value; i++) {
      questionnaire.removeAnswer(props.question.id, `pet_${i}`)
    }
    // Add shared answer
    questionnaire.addAnswer(props.question.id, value, null)
  }
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

const handleSharedModelUpdate = (value: any) => {
  // Handle model update for shared mode
  handleSharedAnswer(value)
}

const handleIndividualModelUpdate = (petIndex: number, value: any) => {
  // Handle model update for individual mode
  handleIndividualAnswer(value, props.question.id, `pet_${petIndex}`)
}

const handleAllPetsModelUpdate = (value: any) => {
  // Handle model update for all pets questions
  handleAllPetsAnswer(value, props.question.id)
}

const handleAllPetsAnswer = (value: any, questionId: string) => {
  // For appliesTo: 'all' questions, save as shared (no petId)
  if (props.question.appliesTo === 'all') {
    questionnaire.addAnswer(questionId, value, null)
  }
}

const getAllPetsAnswerValue = () => {
  // Get the shared answer for appliesTo: 'all' questions
  const sharedAnswer = questionnaire.getAnswer(props.question.id, null)
  return sharedAnswer ? sharedAnswer.value : null
}

const handleButtonClick = () => {
  if (isPetNameQuestion.value) {
    // For pet name question: add a new pet only if less than 2
    if (petCount.value < 2) {
      const newPetCount = petCount.value + 1
      questionnaire.setPetCount(newPetCount)
    }
  } else {
    // For other questions: switch to individual mode
    switchToIndividual()
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

<style scoped lang="scss">
.conditional-answer-renderer {
  // Variables
  $primary-color: #0066cc;
  $primary-light: rgba(0, 102, 204, 0.1);
  $background-light: #f8f9fa;
  $border-color: #e0e0e0;
  $border-dark: #dee2e6;
  $text-muted: #6c757d;
  $text-dark: #495057;
  $success-gradient: linear-gradient(135deg, #28a745, #20c997);
  $neutral-gradient: linear-gradient(135deg, #f8f9fa, #e9ecef);
  $border-radius-sm: 6px;
  $border-radius-md: 8px;
  $spacing-xs: 0.5rem;
  $spacing-sm: 0.75rem;
  $spacing-md: 1rem;
  $spacing-lg: 1.5rem;
  $transition-base: all 0.3s ease;

  // Block
  margin-bottom: $spacing-lg;

  // Elements
  &__shared-answer-mode {
    position: relative;
  }

  &__individual-answer-mode {
    width: 100%;
  }

  &__all-pets-mode {
    // Questions that apply to all pets (like breed)
    max-width: 600px;
    margin: 0 auto;
  }

  &__pet-answers-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: $spacing-lg;
    margin-bottom: $spacing-lg;

    @media (max-width: 768px) {
      grid-template-columns: 1fr;
      gap: $spacing-md;
    }
  }

  &__pet-answer-section {
    border-radius: $border-radius-md;
    border-right: 2px solid $border-color;

    @media (max-width: 768px) {
      padding: $spacing-md;
      border-right: none;
      border-bottom: 2px solid $border-color;
    }

    &:last-child {
      border-right: none;

      @media (max-width: 768px) {
        border-bottom: none;
      }
    }

    h3 {
      color: $primary-color;
      margin-bottom: $spacing-md;
      font-size: 1.1rem;
      font-weight: 600;
    }
  }

  &__breed-selection {
    margin-top: $spacing-md;
    display: flex;
    flex-direction: column;
    gap: $spacing-xs;
    padding: 0 25px;
  }

  &__breed-label {
    font-weight: 500;
    color: #555;
    font-size: 0.9rem;
  }

  &__answer-actions {
    display: flex;
    justify-content: center;
    gap: $spacing-md;

    @media (max-width: 768px) {
      flex-direction: column;
    }
  }

  &__differentiate-btn {
    border-radius: $border-radius-md;
    color: #0a7373;
    cursor: pointer;
    font-size: 1rem;
    font-weight: 500;
    transition: $transition-base;
    position: relative;

    &:before {
      display: block;
      content: '';
      width: 100%;
      height: 1px;
      background-color: #0a7373;
      position: absolute;
      bottom: -0.3rem;
      transform: scaleX(0);
      transform-origin: 100% 50%;
      transition: transform 0.3s;
    }
    
    &:hover:before {
      transform: scaleX(1);
    }
  }

  &__merge-btn {
    padding: $spacing-xs $spacing-md;
    background: $success-gradient;
    border: none;
    border-radius: $border-radius-sm;
    color: white;
    cursor: pointer;
    font-size: 0.875rem;
    font-weight: 500;
    transition: $transition-base;

    &:hover {
      background: linear-gradient(135deg, #218838, #1ea085);
      transform: translateY(-1px);
    }

    @media (max-width: 768px) {
      width: 100%;
    }
  }
}
</style>
