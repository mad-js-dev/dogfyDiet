<template>
  <div class="step-page">
    <StepNavigation :current-step="currentStepId" />
    
    <div class="step-content">
      <!-- Pet Race Step -->
      <div v-if="currentStepId === 0" class="pet-race-section">
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
          :model-value="getAnswerValue('pet_breed', 1)"
          pet-id="pet_1"
          @answer="handleAnswer"
        />
      </div>

      <!-- Pet Names Step -->
      <div v-else-if="currentStepId === 1" class="pet-names-section">
        <ConditionalAnswerRenderer 
          :question="{
            id: 'pet_name',
            type: 'text',
            appliesTo: 'individual',
            required: true,
            validation: [
              {
                type: 'required',
                message: 'Pet name is required'
              },
              {
                type: 'minLength',
                value: 2,
                message: 'Pet name must be at least 2 characters'
              }
            ]
          }"
          :initial-mode="'individual'"
        />
      </div>

      <!-- Pet Gender Step -->
      <div v-else-if="currentStepId === 2" class="pet-gender-section">
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
            @click="toggleGenderMode"
            class="differentiate-btn"
          >
            Are your pets different in this aspect?
          </div>
          <button 
            v-else
            @click="toggleGenderMode"
            class="merge-btn"
          >
            Apply same answers to all pets
          </button>
        </div>
      </div>

      <!-- Pet Birth Date Step -->
      <div v-else-if="currentStepId === 3" class="pet-birth-date-section">
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
              @click="showIndividualBirthDates = true"
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
              @click="showIndividualBirthDates = false"
              class="merge-btn"
            >
              Apply same birth date to all pets
            </button>
          </div>
        </div>
      </div>

      <!-- Pet Body Shape Step -->
      <div v-else-if="currentStepId === 4" class="pet-body-shape-section">
        
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
                v-model="sharedWeight" 
                @answer="handleSharedWeightChange" 
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
              @click="showIndividualBodyShapes = true"
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
              @click="showIndividualBodyShapes = false"
              class="merge-btn"
            >
              Apply same body shape to all pets
            </button>
          </div>
        </div>
      </div>

      <!-- Pet Activity Level Step -->
      <div v-else-if="!excludeActivityLevel && currentStepId === 5" class="pet-activity-level-section">
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
              @click="showIndividualActivityLevels = true"
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
              @click="showIndividualActivityLevels = false"
              class="merge-btn"
            >
              Apply same activity level to all pets
            </button>
          </div>
        </div>
      </div>

          <!-- Pet Pathology Step -->
      <div v-else-if="currentStepId === 6" class="pet-pathology-section">
        <h2>Does your pet{{ Math.max(petCount, 1) > 1 ? 's' : '' }} have any pathology?</h2>
        
        <!-- Shared Pathology Mode (Default) -->
        <div v-if="!showIndividualPathologies" class="shared-pathology-mode">
          <div class="pathology-inputs">
            <div class="pathology-field">
              <label>Does your pet have any pathology?</label>
              <SegmentedButtons
                v-model="sharedHasPathology"
                :options="[
                  { value: 'No', label: 'No' },
                  { value: 'Yes', label: 'Yes' }
                ]"
                name="shared-has-pathology"
                @change="handleSharedPathologyChange"
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
              @click="showIndividualPathologies = true"
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
              @click="showIndividualPathologies = false"
              class="differentiate-btn"
            >
              Apply same pathology to all pets
            </div>
          </div>
        </div>
      </div>

      <!-- Pet Gastronomic Profile Step -->
      <div v-else-if="currentStepId === 7" class="pet-gastronomic-profile-section">
        <h2>What is your pet{{ Math.max(petCount, 1) > 1 ? 's' : '' }} gastronomic profile?</h2>
        
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
              @click="showIndividualGastronomicProfiles = true"
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
              @click="showIndividualGastronomicProfiles = false"
              class="merge-btn"
            >
              Apply same gastronomic profile to all pets
            </button>
          </div>
        </div>
      </div>

      <!-- User Contact Information Step -->
      <div v-else-if="currentStepId === 8" class="user-contact-section">
        <h2>Please provide your contact information</h2>
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

      <!-- Navigation -->
      <div class="navigation">
        <button 
          @click="previousStep" 
          :disabled="currentStepId === 0"
          class="nav-btn secondary"
        >
          Previous
        </button>
        
        <button 
          @click="nextStep" 
          :disabled="!canProceed"
          class="nav-btn primary"
        >
          {{ currentStepIndex === (getTotalSteps(excludeActivityLevel) - 1) ? 'Submit' : 'Next' }}
        </button>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useComprehensiveQuestionnaireStore } from '~/stores/comprehensive-questionnaire'
import { useAbTestingStore } from '~/stores/ab-testing'
import { getQuestionnaireSteps, getStepQuestions, shouldShowQuestion, urlToInternalStep, internalToUrlStep, getTotalSteps, getInternalStepFromUrl, getUrlStepFromInternal } from '~/config/questionnaire-steps'
import { questionnaireQuestions } from '~/config/questionnaire-questions'
import QuestionRenderer from '~/components/QuestionRenderer.vue'
import StepNavigation from '~/components/StepNavigation.vue'
import ConditionalAnswerRenderer from '~/components/ConditionalAnswerRenderer.vue'
import SegmentedButtons from '~/components/segmented-buttons/SegmentedButtons.vue'
import { useRoute, useRouter } from 'vue-router'

const questionnaire = useComprehensiveQuestionnaireStore()
const abTesting = useAbTestingStore()
const route = useRoute()
const router = useRouter()

// A/B Testing: Check if user is in test group (Activity Level removed)
const excludeActivityLevel = computed(() => {
  // Check for manual override via URL parameter first
  const urlGroup = route.query.group as string
  if (urlGroup === 'test') {
    abTesting.assignUserToGroup('activity_level_removal', 'test')
    return true
  }
  if (urlGroup === 'control') {
    abTesting.assignUserToGroup('activity_level_removal', 'control')
    return false
  }
  
  // Fall back to normal A/B testing logic
  return abTesting.isInTestGroup('activity_level_removal')
})

// Track experiment assignment
if (excludeActivityLevel.value !== null) {
  abTesting.trackEvent('activity_level_removal', 'questionnaire_started', {
    exclude_activity_level: excludeActivityLevel.value
  })
  
  // Add visual indicator for development (client-side only)
  if (process.dev) {
    console.log(`🧪 A/B Test Group: ${excludeActivityLevel.value ? 'TEST (8 steps)' : 'CONTROL (9 steps)'}`)
  }
}

// Client-side logging for URL
onMounted(() => {
  if (process.dev && typeof window !== 'undefined') {
    console.log(`📊 URL: ${window.location.pathname}?group=${excludeActivityLevel.value ? 'test' : 'control'}`)
  }
})

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

// Gender mode state
const showIndividualGenders = ref(false)

// Birth date mode state
const showIndividualBirthDates = ref(false)
const sharedBirthYear = ref('')
const sharedBirthMonth = ref('')

// Body shape mode state
const showIndividualBodyShapes = ref(false)
const sharedBodyShape = ref('')
const sharedWeight = ref('')

// Activity level mode state
const showIndividualActivityLevels = ref(false)
const sharedActivityLevel = ref('')

// Pathology mode state
const showIndividualPathologies = ref(false)
const sharedHasPathology = ref('')
const sharedPathology = ref('')

// Gastronomic profile mode state
const showIndividualGastronomicProfiles = ref(false)
const sharedGastronomicProfile = ref('')

// Get step from URL parameter (convert 1-based URL to 0-based internal)
const currentStepId = computed(() => {
  const urlStep = parseInt(route.params.step as string) || 1
  const internalStep = getInternalStepFromUrl(urlStep, excludeActivityLevel.value)
  const maxStep = 8 // Both groups allow up to internal step 8 (User Contact)
  const result = Math.max(0, Math.min(internalStep, maxStep))
  
  console.log('currentStepId calculation:', {
    urlStep,
    internalStep,
    maxStep,
    result,
    excludeActivityLevel: excludeActivityLevel.value,
    route: route.path
  })
  
  return result
})

// Make sure the computed property updates when route changes
watch(() => route.params.step, () => {
  console.log('Route parameter changed:', route.params.step)
}, { immediate: true })

// State
const steps = computed(() => getQuestionnaireSteps(excludeActivityLevel.value))
const currentStep = computed(() => steps.value[currentStepId.value])
const currentStepIndex = computed(() => steps.value.findIndex(step => step.id === currentStepId.value))
const petCount = computed(() => questionnaire.petCount)
const answers = computed(() => questionnaire.answers)

// Computed
const canProceed = computed(() => {
  if (currentStepId.value === 0) {
    // Breed step - check for breed answer (only 1 pet)
    const breedAnswer = answers.value.find(a => 
      a.questionId === 'pet_breed' && 
      a.petId === 'pet_1' && 
      a.value && 
      a.value.trim() !== ''
    )
    console.log('Breed step validation:', {
      currentStepId: currentStepId.value,
      answers: answers.value,
      breedAnswer,
      canProceed: !!breedAnswer
    })
    return !!breedAnswer
  }
  
  if (currentStepId.value === 1) {
    // Names step - need pet names (always individual since names are unique)
    // and breeds for pet 2 (pet 1 breed is from step 1)
    const currentPetCount = petCount.value
    
    // Check pet names
    const petNames = answers.value.filter((a: { questionId: string; petId: any; value: string }) => 
      a.questionId === 'pet_name' && 
        a.petId && 
        a.value && 
        a.value.trim() !== ''
    )
    
    // For single pet: just need name (breed from step 1)
    if (currentPetCount === 1) {
      return petNames.length === 1
    }
    
    // For two pets: need names for both + breed for pet 2
    const hasBothNames = petNames.length === 2
    
    // Check breed for pet 2
    const pet2Breed = answers.value.find(a => 
      a.questionId === 'pet_breed' && 
      a.petId === 'pet_2' && 
      a.value && 
      a.value.trim() !== ''
    )
    
    const hasPet2Breed = !!pet2Breed
    
    return hasBothNames && hasPet2Breed
  }
  
  if (currentStepId.value === 2) {
    // Gender step - ConditionalAnswerRenderer handles validation internally
    // Just need to check if we have the basic required answers
    const currentPetCount = petCount.value
    
    // Check if we have gender answers (required)
    const hasGenderAnswers = questionnaire.hasSharedAnswer('pet_gender') || 
                             questionnaire.hasIndividualAnswers('pet_gender')
    
    // Check if we have neutered answers (required)  
    const hasNeuteredAnswers = questionnaire.hasSharedAnswer('pet_neutered') ||
                               questionnaire.hasIndividualAnswers('pet_neutered')
    
    // Check expecting answers only if the expecting question should be shown
    let hasExpectingAnswers = true
    if (shouldShowExpectingQuestionRenderer()) {
      hasExpectingAnswers = questionnaire.hasSharedAnswer('pet_expecting') ||
                             questionnaire.hasIndividualAnswers('pet_expecting')
    }
    
    return hasGenderAnswers && hasNeuteredAnswers && hasExpectingAnswers
  }
  
  if (currentStepId.value === 3) {
    // Birth date step - check for birth year and month answers
    const currentPetCount = petCount.value
    
    // Check birth year answers
    const petBirthYears = answers.value.filter(a => 
      a.questionId === 'pet_birth_year' && 
        a.petId && 
        a.value && 
        a.value.trim() !== ''
    )
    
    // Check birth month answers
    const petBirthMonths = answers.value.filter(a => 
      a.questionId === 'pet_birth_month' && 
        a.petId && 
        a.value && 
        a.value.trim() !== ''
    )
    
    const hasAllBirthYears = petBirthYears.length === currentPetCount
    const hasAllBirthMonths = petBirthMonths.length === currentPetCount
    
    // For shared mode: just need shared values to be set
    if (!showIndividualBirthDates.value) {
      return sharedBirthYear.value !== '' && sharedBirthMonth.value !== ''
    }
    
    // For individual mode: need all pets to have answers
    return hasAllBirthYears && hasAllBirthMonths
  }
  
  if (currentStepId.value === 4) {
    // Body shape step - check for body shape and weight answers
    const currentPetCount = petCount.value
    
    // Check body shape answers
    const petBodyShapes = answers.value.filter(a => 
      a.questionId === 'pet_body_shape' && 
        a.petId && 
        a.value && 
        a.value.trim() !== ''
    )
    
    // Check weight answers
    const petWeights = answers.value.filter(a => 
      a.questionId === 'pet_weight' && 
        a.petId && 
        a.value && 
        a.value.trim() !== ''
    )
    
    const hasAllBodyShapes = petBodyShapes.length === currentPetCount
    const hasAllWeights = petWeights.length === currentPetCount
    
    // For shared mode: just need shared values to be set
    if (!showIndividualBodyShapes.value) {
      return sharedBodyShape.value !== '' && sharedWeight.value !== ''
    }
    
    // For individual mode: need all pets to have answers
    return hasAllBodyShapes && hasAllWeights
  }
  
  if (currentStepId.value === 5 && !excludeActivityLevel.value) {
    // Activity level step - check for activity level answers
    const currentPetCount = petCount.value
    
    console.log('Activity level validation check:', {
      currentStepId: currentStepId.value,
      excludeActivityLevel: excludeActivityLevel.value,
      currentPetCount,
      showIndividualActivityLevels: showIndividualActivityLevels.value,
      sharedActivityLevel: sharedActivityLevel.value,
      allAnswers: answers.value
    })
    
    // Check activity level answers
    const petActivityLevels = answers.value.filter(a => 
      a.questionId === 'pet_activity_level' && 
        a.petId && 
        a.value && 
        a.value.trim() !== ''
    )
    
    const hasAllActivityLevels = petActivityLevels.length === currentPetCount
    
    console.log('Activity level validation results:', {
      petActivityLevels: petActivityLevels.map(a => ({ questionId: a.questionId, petId: a.petId, value: a.value })),
      hasAllActivityLevels,
      petActivityLevelsLength: petActivityLevels.length
    })
    
    // For shared mode: just need shared value to be set
    if (!showIndividualActivityLevels.value) {
      const result = sharedActivityLevel.value !== ''
      console.log('Shared mode validation result:', { sharedActivityLevel: sharedActivityLevel.value, result })
      return result
    }
    
    // For individual mode: need all pets to have answers
    console.log('Individual mode validation result:', { hasAllActivityLevels })
    return hasAllActivityLevels
  }
  
  if (currentStepId.value === 6) {
    // Pathology step - check for pathology answers
    const currentPetCount = petCount.value
    
    // Check pathology boolean answers
    const petHasPathology = answers.value.filter(a => 
      a.questionId === 'pet_has_pathology' && 
        a.petId && 
        a.value && 
        a.value.trim() !== ''
    )
    
    const hasAllPathologyAnswers = petHasPathology.length === currentPetCount
    
    // For shared mode: just need shared value to be set
    if (!showIndividualPathologies.value) {
      return sharedHasPathology.value !== ''
    }
    
    // For individual mode: need all pets to have answers
    return hasAllPathologyAnswers
  }
  
  if (currentStepId.value === 7) {
    // Gastronomic profile step - check for gastronomic profile answers
    const currentPetCount = petCount.value
    
    // Check gastronomic profile answers
    const petGastronomicProfiles = answers.value.filter(a => 
      a.questionId === 'pet_gastronomic_profile' && 
        a.petId && 
        a.value && 
        a.value.trim() !== ''
    )
    
    const hasAllGastronomicProfileAnswers = petGastronomicProfiles.length === currentPetCount
    
    // For shared mode: just need shared value to be set
    if (!showIndividualGastronomicProfiles.value) {
      return sharedGastronomicProfile.value !== ''
    }
    
    // For individual mode: need all pets to have answers
    return hasAllGastronomicProfileAnswers
  }
  
  if (currentStepId.value === 8) {
    // User contact step - check for contact information
    const userName = answers.value.find(a => a.questionId === 'user_name')
    const userEmail = answers.value.find(a => a.questionId === 'user_email')
    const userPhone = answers.value.find(a => a.questionId === 'user_phone')
    
    return userName?.value && userEmail?.value && userPhone?.value &&
           userName.value.trim() !== '' && 
           userEmail.value.trim() !== '' && 
           userPhone.value.trim() !== ''
  }
  
  return false
})

// Methods
const setPetCount = (count: number) => {
  questionnaire.setPetCount(count)
}

const petDisplayName = (petNum: number) => {
  const petNameAnswer = questionnaire.getAnswer('pet_name', `pet_${petNum}`)
  return petNameAnswer ? petNameAnswer.value : `Pet ${petNum}`
}

const calculatePetAge = (petNum: number) => {
  const yearAnswer = questionnaire.getAnswer('pet_birth_year', `pet_${petNum}`)
  const monthAnswer = questionnaire.getAnswer('pet_birth_month', `pet_${petNum}`)
  
  if (!yearAnswer?.value || !monthAnswer?.value) return null
  
  const birthYear = parseInt(yearAnswer.value)
  const birthMonth = new Date(monthAnswer.value + ' 1').getMonth() + 1
  
  const currentDate = new Date()
  const currentYear = currentDate.getFullYear()
  const currentMonth = currentDate.getMonth() + 1
  
  let years = currentYear - birthYear
  let months = currentMonth - birthMonth
  
  if (months < 0) {
    years--
    months += 12
  }
  
  return { years, months }
}

const handleSharedBirthYearChange = (value: string) => {
  sharedBirthYear.value = value
  if (sharedBirthYear.value && sharedBirthMonth.value) {
    // Apply shared birth date to all pets
    const currentPetCount = petCount.value
    for (let i = 1; i <= currentPetCount; i++) {
      questionnaire.addAnswer('pet_birth_year', sharedBirthYear.value, `pet_${i}`)
      questionnaire.addAnswer('pet_birth_month', sharedBirthMonth.value, `pet_${i}`)
    }
  }
}

const handleSharedBirthMonthChange = (value: string) => {
  sharedBirthMonth.value = value
  if (sharedBirthYear.value && sharedBirthMonth.value) {
    // Apply shared birth date to all pets
    const currentPetCount = petCount.value
    for (let i = 1; i <= currentPetCount; i++) {
      questionnaire.addAnswer('pet_birth_year', sharedBirthYear.value, `pet_${i}`)
      questionnaire.addAnswer('pet_birth_month', sharedBirthMonth.value, `pet_${i}`)
    }
  }
}

const handleSharedBirthDateChange = () => {
  if (sharedBirthYear.value && sharedBirthMonth.value) {
    // Apply shared birth date to all pets
    const currentPetCount = petCount.value
    for (let i = 1; i <= currentPetCount; i++) {
      questionnaire.addAnswer('pet_birth_year', sharedBirthYear.value, `pet_${i}`)
      questionnaire.addAnswer('pet_birth_month', sharedBirthMonth.value, `pet_${i}`)
    }
  }
}

const handleSharedBodyShapeChange = (value: string, questionId: string) => {
  sharedBodyShape.value = value
  if (sharedBodyShape.value) {
    // Apply shared body shape to all pets
    const currentPetCount = petCount.value
    for (let i = 1; i <= currentPetCount; i++) {
      questionnaire.addAnswer('pet_body_shape', sharedBodyShape.value, `pet_${i}`)
    }
  }
}

const handleSharedWeightChange = () => {
  if (sharedWeight.value) {
    // Apply shared weight to all pets
    const currentPetCount = petCount.value
    for (let i = 1; i <= currentPetCount; i++) {
      questionnaire.addAnswer('pet_weight', sharedWeight.value, `pet_${i}`)
    }
  }
}

const handleSharedActivityLevelChange = (value: string, questionId: string) => {
  console.log('handleSharedActivityLevelChange called:', { value, questionId, sharedActivityLevel: sharedActivityLevel.value })
  sharedActivityLevel.value = value
  if (sharedActivityLevel.value) {
    // Apply shared activity level to all pets
    const currentPetCount = petCount.value
    console.log('Adding activity level answers to pets:', { currentPetCount, value })
    for (let i = 1; i <= currentPetCount; i++) {
      questionnaire.addAnswer('pet_activity_level', sharedActivityLevel.value, `pet_${i}`)
    }
  }
}

const handleSharedPathologyChange = (value: string, questionId: string) => {
  // Update the appropriate shared value based on question ID
  if (questionId === 'shared_pathology') {
    sharedPathology.value = value
  }
  
  const currentPetCount = petCount.value
  for (let i = 1; i <= currentPetCount; i++) {
    questionnaire.addAnswer('pet_has_pathology', sharedHasPathology.value, `pet_${i}`)
    if (sharedHasPathology.value === 'Yes' && sharedPathology.value) {
      questionnaire.addAnswer('pet_pathology', sharedPathology.value, `pet_${i}`)
    }
  }
}

const handleSharedGastronomicProfileChange = (value: string, questionId: string) => {
  sharedGastronomicProfile.value = value
  if (sharedGastronomicProfile.value) {
    // Apply shared gastronomic profile to all pets
    const currentPetCount = petCount.value
    for (let i = 1; i <= currentPetCount; i++) {
      questionnaire.addAnswer('pet_gastronomic_profile', sharedGastronomicProfile.value, `pet_${i}`)
    }
  }
}

const shouldShowExpectingQuestionRenderer = () => {
  // Check if we should show the expecting question based on current mode and answers
  if (!showIndividualGenders.value) {
    // Shared mode: check shared answers
    return shouldShowSharedExpectingQuestion()
  } else {
    // Individual mode: show if any pet needs the expecting question
    for (let i = 1; i <= petCount.value; i++) {
      if (shouldShowExpectingQuestion(i)) {
        return true
      }
    }
    return false
  }
}

const shouldShowExpectingQuestion = (petNum: number) => {
  const genderAnswer = questionnaire.getAnswer('pet_gender', `pet_${petNum}`)
  const neuteredAnswer = questionnaire.getAnswer('pet_neutered', `pet_${petNum}`)
  
  // Show expecting question only for female pets that are not neutered
  return genderAnswer?.value === 'Female' && neuteredAnswer?.value === 'No'
}

const shouldShowSharedExpectingQuestion = () => {
  const genderAnswer = questionnaire.getAnswer('pet_gender')
  const neuteredAnswer = questionnaire.getAnswer('pet_neutered')
  
  // Show expecting question only for female pets that are not neutered
  return genderAnswer?.value === 'Female' && neuteredAnswer?.value === 'No'
}

const getAnswerValue = (questionId: string, petNum?: number) => {
  // For user-level questions (no pet), get answer without petId
  if (!petNum) {
    const answer = questionnaire.getAnswer(questionId)
    return answer ? answer.value : null
  }
  
  // For pet-specific questions, include petId in the search
  const answer = questionnaire.getAnswer(questionId, `pet_${petNum}`)
  return answer ? answer.value : null
}

const handlePathologySelect = (event: Event, petNum: number) => {
  const target = event.target as HTMLSelectElement
  questionnaire.addAnswer('pet_pathology', target.value, `pet_${petNum}`)
}

const handleAnswer = (value: any, questionId: string, petId?: string) => {
  questionnaire.addAnswer(questionId, value, petId)
  
  // Auto-clear expecting answer when neutered is set to Yes
  if (questionId === 'pet_neutered' && value === 'Yes') {
    if (petId) {
      // Individual mode - clear expecting for this specific pet
      questionnaire.removeAnswer('pet_expecting', petId)
      console.log(`Cleared expecting answer for ${petId} because neutered is Yes`)
    } else {
      // Shared mode - clear shared expecting answer
      questionnaire.removeAnswer('pet_expecting')
      console.log('Cleared shared expecting answer because neutered is Yes')
    }
  }
}

const toggleGenderMode = () => {
  const wasIndividualMode = showIndividualGenders.value
  console.log('toggleGenderMode called:', { wasIndividualMode, currentMode: showIndividualGenders.value })
  showIndividualGenders.value = !showIndividualGenders.value
  
  if (!wasIndividualMode) {
    // Switching to individual mode - differentiate all gender-related answers
    console.log('Switching to individual mode')
    questionnaire.differentiateAnswers('pet_gender')
    questionnaire.differentiateAnswers('pet_neutered')
    questionnaire.differentiateAnswers('pet_expecting')
  } else {
    // Switching to shared mode - merge all answers to shared
    console.log('Switching to shared mode')
    const genderAnswer = questionnaire.getAnswer('pet_gender', 'pet_1')
    const neuteredAnswer = questionnaire.getAnswer('pet_neutered', 'pet_1')
    const expectingAnswer = questionnaire.getAnswer('pet_expecting', 'pet_1')
    
    console.log('Current answers:', { genderAnswer, neuteredAnswer, expectingAnswer })
    
    // Remove ALL individual answers for all pets
    for (let i = 1; i <= petCount.value; i++) {
      questionnaire.removeAnswer('pet_gender', `pet_${i}`)
      questionnaire.removeAnswer('pet_neutered', `pet_${i}`)
      questionnaire.removeAnswer('pet_expecting', `pet_${i}`)
    }
    
    // Create shared answers from pet_1's values
    if (genderAnswer) {
      questionnaire.addAnswer('pet_gender', genderAnswer.value, null)
      console.log('Merged gender answer:', genderAnswer.value)
    }
    
    if (neuteredAnswer) {
      questionnaire.addAnswer('pet_neutered', neuteredAnswer.value, null)
      console.log('Merged neutered answer:', neuteredAnswer.value)
    }
    
    if (expectingAnswer) {
      questionnaire.addAnswer('pet_expecting', expectingAnswer.value, null)
      console.log('Merged expecting answer:', expectingAnswer.value)
    }
  }
}

const previousStep = () => {
  if (currentStepId.value > 0) {
    const prevUrlStep = internalToUrlStep(currentStepId.value - 1)
    router.push(`/step/${prevUrlStep}`)
  }
}

const nextStep = () => {
  console.log('nextStep called')
  console.log('canProceed.value:', canProceed.value)
  console.log('currentStepId.value:', currentStepId.value)
  
  if (canProceed.value) {
    console.log('Can proceed, navigating to next step')
    const steps = getQuestionnaireSteps(excludeActivityLevel.value)
    const currentStepIndex = steps.findIndex(step => step.id === currentStepId.value)
    const totalSteps = getTotalSteps(excludeActivityLevel.value)
    
    console.log('Navigation debug:', {
      currentStepId: currentStepId.value,
      currentStepIndex,
      totalSteps,
      steps: steps.map(s => ({ id: s.id, title: s.title })),
      excludeActivityLevel: excludeActivityLevel.value
    })
    
    if (currentStepIndex < totalSteps - 1) {
      // Get the next step by index, not by ID
      const nextStep = steps[currentStepIndex + 1]
      const nextUrlStep = getUrlStepFromInternal(nextStep.id, excludeActivityLevel.value)
      console.log('Next step details:', {
        nextStepId: nextStep.id,
        nextStepTitle: nextStep.title,
        nextUrlStep,
        nextUrl: `/step/${nextUrlStep}`
      })
      
      // Track step completion for A/B testing
      abTesting.trackEvent('activity_level_removal', 'step_completed', {
        step_id: currentStepId.value,
        step_url: nextUrlStep,
        exclude_activity_level: excludeActivityLevel.value
      })
      
      router.push(`/step/${nextUrlStep}`)
    } else {
      // User contact is the last step, submit questionnaire
      console.log('Submitting questionnaire')
      
      // Track questionnaire completion for A/B testing
      abTesting.trackEvent('activity_level_removal', 'questionnaire_completed', {
        total_steps: totalSteps,
        exclude_activity_level: excludeActivityLevel.value
      })
      
      submitQuestionnaire()
    }
  } else {
    console.log('Cannot proceed - validation failed')
  }
}

const submitQuestionnaire = () => {
  const result = questionnaire.submitQuestionnaire()
  
  // Navigate to results page
  router.push('/results')
}

// Watch for step parameter changes
watch(() => route.params.step, (newStep) => {
  const urlStep = parseInt(newStep as string) || 1
  const internalStep = getInternalStepFromUrl(urlStep, excludeActivityLevel.value)
  const maxStep = excludeActivityLevel.value ? 7 : 8 // Max internal step (0-based)
  questionnaire.setStep(Math.max(0, Math.min(internalStep, maxStep)))
  
  // Ensure pet count is at least 1 when starting questionnaire
  if (questionnaire.petCount === 0) {
    questionnaire.setPetCount(1)
  }
}, { immediate: true })

// Reset pet count to 1 when entering breed step
watch(currentStepId, (newStepId) => {
  if (newStepId === 0) {
    // Reset to 1 pet for breed step
    questionnaire.setPetCount(1)
    console.log('Reset pet count to 1 for breed step')
  }
})

// Page metadata
definePageMeta({
  title: 'Pet Questionnaire',
  description: 'Tell us about your pets to get personalized recommendations',
  middleware: 'step-validation'
})
</script>

<style scoped>
.step-page {
  min-height: 100vh;
  padding: 0;
}

.step-content {
  max-width: 800px;
  margin: 0 auto;
  background: white;
  border-radius: 16px 16px 0 0;
  padding: 2rem;
  margin-top: 2.4rem;
}

.step-header {
  text-align: center;
  margin-bottom: 2rem;
}

.step-header h1 {
  color: #333;
  margin-bottom: 0.5rem;
}

.step-header p {
  color: #666;
  font-size: 1.1rem;
}

.pet-race-section h2,
.pet-names-section h2,
.pet-gender-section h2,
.pet-birth-date-section h2,
.pet-body-shape-section h2,
.pet-activity-level-section h2,
.pet-sterilization-section h2,
.user-contact-section h2 {
  color: #0066cc;
  margin-bottom: 1.5rem;
  font-size: 1.5rem;
  font-weight: 600;
  text-align: center;
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

.pet-section {
  margin-bottom: 2rem;
  padding: 1.5rem;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  background: #f8f9fa;
}

.pet-answer-section h3 {
  color: #0066cc;
  margin-bottom: 1rem;
  font-size: 1.1rem;
  font-weight: 600;
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

.master-differentiation-controls {
  text-align: center;
  padding: 1rem;
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

.shared-birth-date-mode {
  text-align: center;
  border-radius: 8px;
  margin-bottom: 2rem;
}

.shared-body-shape-mode {
  text-align: center;
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

.activity-level-select {
  padding: 0.75rem;
  border: 2px solid #e0e0e0;
  border-radius: 6px;
  font-size: 1rem;
  background: white;
  width: 100%;
}

.activity-level-select:focus {
  outline: none;
  border-color: #0066cc;
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
}

.body-shape-field label {
  font-weight: 600;
  color: #333;
  margin-bottom: 0.5rem;
}

.body-shape-select {
  padding: 0.75rem;
  border: 2px solid #e0e0e0;
  border-radius: 6px;
  font-size: 1rem;
  background: white;
  width: 100%;
}

.body-shape-select:focus {
  outline: none;
  border-color: #0066cc;
}

.weight-input {
  width: 100%;
  padding: 0.75rem;
  border: 2px solid #e0e0e0;
  border-radius: 6px;
  font-size: 1rem;
  transition: border-color 0.3s ease;
}

.weight-input:focus {
  outline: none;
  border-color: #0066cc;
  box-shadow: 0 0 3px rgba(0, 102, 204, 0.1);
}

.navigation {
  display: flex;
  justify-content: space-between;
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 1px solid #e0e0e0;
}

.nav-btn {
  padding: 0.75rem 2rem;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 600;
}

.nav-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.nav-btn.primary {
  background: #0066cc;
  color: white;
}

.nav-btn.primary:hover:not(:disabled) {
  background: #0052a3;
}

.nav-btn.secondary {
  background: #6c757d;
  color: white;
}

.nav-btn.secondary:hover:not(:disabled) {
  background: #545b62;
}

/* Pathology Step Styles */
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

.pathology-field {
  margin-bottom: 1rem;
}

.pathology-field label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 600;
  color: #333;
}

.shared-pathology-mode {
  text-align: center;
  padding: 2rem;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  background: #f8f9fa;
  margin-bottom: 2rem;
}

.pathology-inputs {
  max-width: 400px;
  margin: 0 auto;
}

.individual-pathology-mode .pathology-select {
  margin-top: 1rem;
}

/* Gastronomic Profile Step Styles */
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

.gastronomic-profile-field {
  margin-bottom: 1rem;
}

.gastronomic-profile-field label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 600;
  color: #333;
}

.shared-gastronomic-profile-mode {
  text-align: center;
  padding: 2rem;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  background: #f8f9fa;
  margin-bottom: 2rem;
}

.gastronomic-profile-inputs {
  max-width: 500px;
  margin: 0 auto;
}

.individual-gastronomic-profile-mode .gastronomic-profile-select {
  margin-top: 1rem;
}

/* User Contact Step Styles */
.contact-form {
  max-width: 600px;
  margin: 0 auto;
  padding: 2rem;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  background: #f8f9fa;
}

.contact-field {
  margin-bottom: 1.5rem;
}

@media (max-width: 768px) {
  .step-content {
    padding: 1.5rem;
  }
  
  .navigation {
    flex-direction: column;
    gap: 1rem;
  }
  
  .nav-btn {
    width: 100%;
  }
}
</style>
