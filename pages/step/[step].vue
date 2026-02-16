<template>
  <div class="step-page">
    <StepNavigation :current-step="currentStepId" />
    
    <div class="step-content">
      <div class="step-header">
        <h1>{{ currentStep?.title }}</h1>
        <p v-if="currentStep?.description">{{ currentStep.description }}</p>
      </div>

      <!-- Pet Race Step -->
      <div v-if="currentStepId === 0" class="pet-race-section">
        <h2>What is your pet's race?</h2>
        <ConditionalAnswerRenderer 
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
          :initial-mode="'individual'"
        />
      </div>

      <!-- Pet Names Step -->
      <div v-else-if="currentStepId === 1" class="pet-names-section">
        <h2>What are your pets' names?</h2>
        <ConditionalAnswerRenderer 
          :question="{
            id: 'pet_name',
            type: 'text',
            question: 'What is your pet\'s name?',
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
        <h2>What is your pet's gender?</h2>
        
        <!-- Shared Mode -->
        <div v-if="!showIndividualGenders" class="shared-answer-mode">
          <!-- Gender Question -->
          <QuestionRenderer 
            :question="{
              id: 'pet_gender',
              type: 'select',
              question: 'What is your pet\'s gender?',
              appliesTo: 'all',
              required: true,
              options: ['Male', 'Female'],
              validation: [
                {
                  type: 'required',
                  message: 'Pet gender is required'
                }
              ]
            }"
            :model-value="getAnswerValue('pet_gender')"
            @answer="handleAnswer"
          />
          
          <!-- Shared Neutered Question -->
          <QuestionRenderer 
            :question="{
              id: 'pet_neutered',
              type: 'select',
              question: 'Are your pets neutered/spayed?',
              appliesTo: 'all',
              required: true,
              options: ['Yes', 'No'],
              validation: [
                {
                  type: 'required',
                  message: 'Neutered status is required'
                }
              ]
            }"
            :model-value="getAnswerValue('pet_neutered')"
            @answer="handleAnswer"
          />
          
          <!-- Shared Expecting Question (only if gender is female and neutered is no) -->
          <QuestionRenderer 
            v-if="shouldShowSharedExpectingQuestion()"
            :question="{
              id: 'pet_expecting',
              type: 'select',
              question: 'Are your pets expecting?',
              appliesTo: 'all',
              required: true,
              options: ['Yes', 'No'],
              validation: [
                {
                  type: 'required',
                  message: 'Expecting status is required'
                }
              ]
            }"
            :model-value="getAnswerValue('pet_expecting')"
            @answer="handleAnswer"
          />
        </div>
        
        <!-- Individual Mode -->
        <div v-else class="individual-answer-mode">
          <div class="pet-answers-grid">
            <div 
              v-for="petNum in petCount" 
              :key="petNum" 
              class="pet-answer-section"
            >
              <h3>{{ petDisplayName(petNum) }}</h3>
              
              <!-- Gender Question -->
              <QuestionRenderer 
                :question="{
                  id: 'pet_gender',
                  type: 'select',
                  question: 'What is ' + petDisplayName(petNum) + '\'s gender?',
                  appliesTo: 'individual',
                  required: true,
                  options: ['Male', 'Female'],
                  validation: [
                    {
                      type: 'required',
                      message: 'Pet gender is required'
                    }
                  ]
                }"
                :pet-id="`pet_${petNum}`"
                :model-value="getAnswerValue('pet_gender', petNum)"
                @answer="handleAnswer"
              />
              
              <!-- Neutered Question -->
              <QuestionRenderer 
                :question="{
                  id: 'pet_neutered',
                  type: 'select',
                  question: 'Is ' + petDisplayName(petNum) + ' neutered/spayed?',
                  appliesTo: 'individual',
                  required: true,
                  options: ['Yes', 'No'],
                  validation: [
                    {
                      type: 'required',
                      message: 'Neutered status is required'
                    }
                  ]
                }"
                :pet-id="`pet_${petNum}`"
                :model-value="getAnswerValue('pet_neutered', petNum)"
                @answer="handleAnswer"
              />
              
              <!-- Expecting Question - Conditional -->
              <QuestionRenderer 
                v-if="shouldShowExpectingQuestion(petNum)"
                :question="{
                  id: 'pet_expecting',
                  type: 'select',
                  question: 'Is ' + petDisplayName(petNum) + ' expecting?',
                  appliesTo: 'individual',
                  required: true,
                  options: ['Yes', 'No'],
                  validation: [
                    {
                      type: 'required',
                      message: 'Expecting status is required'
                    }
                  ]
                }"
                :pet-id="`pet_${petNum}`"
                :model-value="getAnswerValue('pet_expecting', petNum)"
                @answer="handleAnswer"
              />
            </div>
          </div>
        </div>
        
        <!-- Differentiate Button -->
        <div class="answer-actions" v-if="petCount > 1">
          <button 
            v-if="!showIndividualGenders"
            @click="switchToIndividualGenders"
            class="differentiate-btn"
          >
            Are your pets different in this aspect?
          </button>
          
          <button 
            v-else
            @click="switchToSharedGenders"
            class="merge-btn"
          >
            Apply same answer to all pets
          </button>
        </div>
      </div>

      <!-- Pet Birth Date Step -->
      <div v-else-if="currentStepId === 3" class="pet-birth-date-section">
        <h2>When was your pet{{ Math.max(petCount, 1) > 1 ? 's' : '' }} born?</h2>
        
        <!-- Shared Birth Date Mode (Default) -->
        <div v-if="!showIndividualBirthDates" class="shared-birth-date-mode">
          <div class="birth-date-inputs">
            <div class="birth-date-field">
              <label>Year:</label>
              <select v-model="sharedBirthYear" @change="handleSharedBirthDateChange" class="birth-date-select">
                <option value="" disabled>Year</option>
                <option v-for="year in yearOptions" :key="year" :value="year">
                  {{ year }}
                </option>
              </select>
            </div>
            
            <div class="birth-date-field">
              <label>Month:</label>
              <select v-model="sharedBirthMonth" @change="handleSharedBirthDateChange" class="birth-date-select">
                <option value="" disabled>Month</option>
                <option v-for="month in monthOptions" :key="month" :value="month">
                  {{ month }}
                </option>
              </select>
            </div>
          </div>
          
          <button 
            v-if="Math.max(petCount, 1) > 1"
            @click="showIndividualBirthDates = true"
            class="differentiate-btn"
          >
            Are your pets different in this aspect?
          </button>
        </div>
        
        <!-- Individual Birth Date Mode -->
        <div v-else class="individual-birth-date-mode">
          <div class="pet-answers-grid">
            <div 
              v-for="petNum in Math.max(petCount, 1)" 
              :key="petNum" 
              class="pet-answer-section"
            >
              <h3>{{ petDisplayName(petNum) }}</h3>
              
              <!-- Birth Year Question -->
              <QuestionRenderer 
                :question="{
                  id: 'pet_birth_year',
                  type: 'select',
                  question: 'What year was ' + petDisplayName(petNum) + ' born?',
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
                  question: 'What month was ' + petDisplayName(petNum) + ' born?',
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
          
          <button 
            v-if="Math.max(petCount, 1) > 1"
            @click="showIndividualBirthDates = false"
            class="merge-btn"
          >
            Apply same birth date to all pets
          </button>
        </div>
      </div>

      <!-- Pet Body Shape Step -->
      <div v-else-if="currentStepId === 4" class="pet-body-shape-section">
        <h2>Which silhouette best represents your pet{{ Math.max(petCount, 1) > 1 ? 's' : '' }}?</h2>
        
        <!-- Shared Body Shape Mode (Default) -->
        <div v-if="!showIndividualBodyShapes" class="shared-body-shape-mode">
          <div class="body-shape-inputs">
            <div class="body-shape-field">
              <label>Select body shape for all pets:</label>
              <select v-model="sharedBodyShape" @change="handleSharedBodyShapeChange" class="body-shape-select">
                <option value="" disabled>Select body shape</option>
                <option value="A bit thin - Narrow waist and ribs are clearly visible">
                  A bit thin - Narrow waist and ribs are clearly visible
                </option>
                <option value="In good shape - Waist is visible and ribs are easy to feel">
                  In good shape - Waist is visible and ribs are easy to feel
                </option>
                <option value="A bit chubby - Waist is not visible and ribs are hard to feel">
                  A bit chubby - Waist is not visible and ribs are hard to feel
                </option>
              </select>
            </div>
            
            <div class="body-shape-field">
              <label>Enter weight for all pets:</label>
              <input 
                v-model="sharedWeight" 
                @input="handleSharedWeightChange" 
                type="text" 
                placeholder="Enter weight (e.g., 25 kg or 55 lbs)"
                class="weight-input"
              />
            </div>
          </div>
          
          <button 
            v-if="Math.max(petCount, 1) > 1"
            @click="showIndividualBodyShapes = true"
            class="differentiate-btn"
          >
            Are your pets different in this aspect?
          </button>
        </div>
        
        <!-- Individual Body Shape Mode -->
        <div v-else class="individual-body-shape-mode">
          <div class="pet-answers-grid">
            <div 
              v-for="petNum in Math.max(petCount, 1)" 
              :key="petNum" 
              class="pet-answer-section"
            >
              <h3>{{ petDisplayName(petNum) }}</h3>
              
              <!-- Body Shape Question -->
              <QuestionRenderer 
                :question="{
                  id: 'pet_body_shape',
                  type: 'select',
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
              />
            </div>
          </div>
          
          <button 
            v-if="Math.max(petCount, 1) > 1"
            @click="showIndividualBodyShapes = false"
            class="merge-btn"
          >
            Apply same body shape to all pets
          </button>
        </div>
      </div>

      <!-- Pet Activity Level Step -->
      <div v-else-if="currentStepId === 5" class="pet-activity-level-section">
        <h2>What is your pet{{ Math.max(petCount, 1) > 1 ? 's\'' : '' }} activity level?</h2>
        
        <!-- Shared Activity Level Mode (Default) -->
        <div v-if="!showIndividualActivityLevels" class="shared-activity-level-mode">
          <div class="activity-level-inputs">
            <div class="activity-level-field">
              <label>Select activity level for all pets:</label>
              <select v-model="sharedActivityLevel" @change="handleSharedActivityLevelChange" class="activity-level-select">
                <option value="" disabled>Select activity level</option>
                <option value="Couch potato - Daily walks of less than 1h. What they like most is to take a good nap and be very calm">
                  Couch potato - Daily walks of less than 1h. What they like most is to take a good nap and be very calm
                </option>
                <option value="Zen dog - Daily walks of 1 to 2h. Knows how to enjoy good walks, but also knows when to rest">
                  Zen dog - Daily walks of 1 to 2h. Knows how to enjoy good walks, but also knows when to rest
                </option>
                <option value="Energy tornado - Daily walks of more than 2h. Don't let that energy tornado stop!">
                  Energy tornado - Daily walks of more than 2h. Don't let that energy tornado stop!
                </option>
              </select>
            </div>
          </div>
          
          <button 
            v-if="Math.max(petCount, 1) > 1"
            @click="showIndividualActivityLevels = true"
            class="differentiate-btn"
          >
            Are your pets different in this aspect?
          </button>
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
                  type: 'select',
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
          
          <button 
            v-if="Math.max(petCount, 1) > 1"
            @click="showIndividualActivityLevels = false"
            class="merge-btn"
          >
            Apply same activity level to all pets
          </button>
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
              <select v-model="sharedHasPathology" @change="handleSharedPathologyChange" class="pathology-bool-select">
                <option value="" disabled>Select option</option>
                <option value="No">No</option>
                <option value="Yes">Yes</option>
              </select>
            </div>
            
            <div v-if="sharedHasPathology === 'Yes'" class="pathology-field">
              <label>Select pathology that applies to your pet:</label>
              <select v-model="sharedPathology" @change="handleSharedPathologyChange" class="pathology-select">
                <option value="" disabled>Select pathology</option>
                <option value="Food allergies and intolerances">Food allergies and intolerances</option>
                <option value="Sensitive digestions">Sensitive digestions</option>
                <option value="Skin problems">Skin problems</option>
                <option value="Joint problems">Joint problems</option>
                <option value="Dental problems">Dental problems</option>
                <option value="Diabetes">Diabetes</option>
                <option value="Epilepsy">Epilepsy</option>
                <option value="Otitis">Otitis</option>
                <option value="Cushing's syndrome">Cushing's syndrome</option>
                <option value="Hypothyroidism">Hypothyroidism</option>
              </select>
            </div>
          </div>
          
          <button 
            v-if="Math.max(petCount, 1) > 1"
            @click="showIndividualPathologies = true"
            class="differentiate-btn"
          >
            Are your pets different in this aspect?
          </button>
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
              <QuestionRenderer 
                :question="{
                  id: 'pet_has_pathology',
                  type: 'select',
                  question: 'Does ' + petDisplayName(petNum) + ' have any pathology?',
                  appliesTo: 'individual',
                  required: true,
                  options: ['No', 'Yes'],
                  validation: [
                    {
                      type: 'required',
                      message: 'Pathology information is required'
                    }
                  ]
                }"
                :pet-id="`pet_${petNum}`"
                :model-value="getAnswerValue('pet_has_pathology', petNum)"
                @answer="handleAnswer"
              />
              
              <!-- Conditional Pathology Select -->
              <div v-if="getAnswerValue('pet_has_pathology', petNum) === 'Yes'" class="pathology-select">
                <label>Select pathology that applies to your pet:</label>
                <select :value="getAnswerValue('pet_pathology', petNum)" @input="handlePathologySelect($event, petNum)" class="pathology-select">
                  <option value="" disabled>Select pathology</option>
                  <option value="Food allergies and intolerances">Food allergies and intolerances</option>
                  <option value="Sensitive digestions">Sensitive digestions</option>
                  <option value="Skin problems">Skin problems</option>
                  <option value="Joint problems">Joint problems</option>
                  <option value="Dental problems">Dental problems</option>
                  <option value="Diabetes">Diabetes</option>
                  <option value="Epilepsy">Epilepsy</option>
                  <option value="Otitis">Otitis</option>
                  <option value="Cushing's syndrome">Cushing's syndrome</option>
                  <option value="Hypothyroidism">Hypothyroidism</option>
                </select>
              </div>
            </div>
          </div>
          
          <button 
            v-if="Math.max(petCount, 1) > 1"
            @click="showIndividualPathologies = false"
            class="differentiate-btn"
          >
            Apply same pathology to all pets
          </button>
        </div>
      </div>

      <!-- Pet Gastronomic Profile Step -->
      <div v-else-if="currentStepId === 7" class="pet-gastronomic-profile-section">
        <h2>What is your pet{{ Math.max(petCount, 1) > 1 ? 's' : '' }} gastronomic profile?</h2>
        
        <!-- Shared Gastronomic Profile Mode (Default) -->
        <div v-if="!showIndividualGastronomicProfiles" class="shared-gastronomic-profile-mode">
          <div class="gastronomic-profile-inputs">
            <div class="gastronomic-profile-field">
              <label>Select gastronomic profile for all pets:</label>
              <select v-model="sharedGastronomicProfile" @change="handleSharedGastronomicProfileChange" class="gastronomic-profile-select">
                <option value="" disabled>Select gastronomic profile</option>
                <option value="The selective one: has a demanding palate, often struggles to finish their portion and gets tired of food">
                  The selective one: has a demanding palate, often struggles to finish their portion and gets tired of food
                </option>
                <option value="The gourmet: loves to try new flavors, but isn't satisfied with just anything">
                  The gourmet: loves to try new flavors, but isn't satisfied with just anything
                </option>
                <option value="The glutton: devours all types of food as if they'll never taste another bite again">
                  The glutton: devours all types of food as if they'll never taste another bite again
                </option>
              </select>
            </div>
          </div>
          
          <button 
            v-if="Math.max(petCount, 1) > 1"
            @click="showIndividualGastronomicProfiles = true"
            class="differentiate-btn"
          >
            Are your pets different in this aspect?
          </button>
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
                  type: 'select',
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
          
          <button 
            v-if="Math.max(petCount, 1) > 1"
            @click="showIndividualGastronomicProfiles = false"
            class="merge-btn"
          >
            Apply same gastronomic profile to all pets
          </button>
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
          {{ currentStepId === 8 ? 'Submit' : 'Next' }}
        </button>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed } from 'vue'
import { useComprehensiveQuestionnaireStore } from '~/stores/comprehensive-questionnaire'
import { questionnaireSteps, getStepQuestions, shouldShowQuestion, urlToInternalStep, internalToUrlStep } from '~/config/questionnaire-steps'
import { questionnaireQuestions } from '~/config/questionnaire-questions'
import QuestionRenderer from '~/components/QuestionRenderer.vue'
import StepNavigation from '~/components/StepNavigation.vue'
import ConditionalAnswerRenderer from '~/components/ConditionalAnswerRenderer.vue'

const questionnaire = useComprehensiveQuestionnaireStore()
const route = useRoute()
const router = useRouter()

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
  const internalStep = urlToInternalStep(urlStep)
  return Math.max(0, Math.min(internalStep, 8)) // Clamp between 0 and 8
})

// State
const steps = computed(() => questionnaireSteps)
const currentStep = computed(() => steps.value[currentStepId.value])
const petCount = computed(() => questionnaire.petCount)
const answers = computed(() => questionnaire.answers)

// Computed
const canProceed = computed(() => {
  if (currentStepId.value === 0) {
    // Breed step - check for breed answers
    const currentPetCount = petCount.value
    const breedAnswers = answers.value.filter(a => 
      a.questionId === 'pet_breed' && 
      a.petId && 
      a.value && 
      a.value.trim() !== ''
    )
    const result = breedAnswers.length === currentPetCount
    return result
  }
  
  if (currentStepId.value === 1) {
    // Names step - need pet names (always individual since names are unique)
    // and breeds for pet 2 (pet 1 breed is from step 1)
    const currentPetCount = petCount.value
    
    // Check pet names
    const petNames = answers.value.filter(a => 
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
    // Gender step - check for gender, neutered, and expecting answers
    const currentPetCount = petCount.value
    
    if (!showIndividualGenders.value) {
      // Shared mode: check for shared answers
      const genderAnswer = questionnaire.getAnswer('pet_gender')
      const neuteredAnswer = questionnaire.getAnswer('pet_neutered')
      const hasGenderAnswer = genderAnswer && genderAnswer.value && genderAnswer.value.trim() !== ''
      const hasNeuteredAnswer = neuteredAnswer && neuteredAnswer.value && neuteredAnswer.value.trim() !== ''
      
      // Check expecting answer only if gender is female and neutered is no
      let hasExpectingAnswer = true
      if (shouldShowSharedExpectingQuestion()) {
        const expectingAnswer = questionnaire.getAnswer('pet_expecting')
        hasExpectingAnswer = expectingAnswer && expectingAnswer.value && expectingAnswer.value.trim() !== ''
      }
      
      return hasGenderAnswer && hasNeuteredAnswer && hasExpectingAnswer
    } else {
      // Individual mode: check for individual answers
      const petGenders = answers.value.filter(a => 
        a.questionId === 'pet_gender' && 
        a.petId && 
        a.value && 
        a.value.trim() !== ''
      )
      
      const petNeutered = answers.value.filter(a => 
        a.questionId === 'pet_neutered' && 
        a.petId && 
        a.value && 
        a.value.trim() !== ''
      )
      
      const hasAllGenders = petGenders.length === currentPetCount
      const hasAllNeutered = petNeutered.length === currentPetCount
      
      // Check expecting answers only for pets that need them
      let hasRequiredExpecting = true
      for (let i = 1; i <= currentPetCount; i++) {
        if (shouldShowExpectingQuestion(i)) {
          const expectingAnswer = questionnaire.getAnswer('pet_expecting', `pet_${i}`)
          if (!expectingAnswer || !expectingAnswer.value || expectingAnswer.value.trim() === '') {
            hasRequiredExpecting = false
            break
          }
        }
      }
      
      return hasAllGenders && hasAllNeutered && hasRequiredExpecting
    }
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
  
  if (currentStepId.value === 5) {
    // Activity level step - check for activity level answers
    const currentPetCount = petCount.value
    
    // Check activity level answers
    const petActivityLevels = answers.value.filter(a => 
      a.questionId === 'pet_activity_level' && 
        a.petId && 
        a.value && 
        a.value.trim() !== ''
    )
    
    const hasAllActivityLevels = petActivityLevels.length === currentPetCount
    
    // For shared mode: just need shared value to be set
    if (!showIndividualActivityLevels.value) {
      return sharedActivityLevel.value !== ''
    }
    
    // For individual mode: need all pets to have answers
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

const handleSharedBodyShapeChange = () => {
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

const handleSharedActivityLevelChange = () => {
  if (sharedActivityLevel.value) {
    // Apply shared activity level to all pets
    const currentPetCount = petCount.value
    for (let i = 1; i <= currentPetCount; i++) {
      questionnaire.addAnswer('pet_activity_level', sharedActivityLevel.value, `pet_${i}`)
    }
  }
}

const handleSharedPathologyChange = () => {
  const currentPetCount = petCount.value
  for (let i = 1; i <= currentPetCount; i++) {
    questionnaire.addAnswer('pet_has_pathology', sharedHasPathology.value, `pet_${i}`)
    if (sharedHasPathology.value === 'Yes' && sharedPathology.value) {
      questionnaire.addAnswer('pet_pathology', sharedPathology.value, `pet_${i}`)
    }
  }
}

const handleSharedGastronomicProfileChange = () => {
  if (sharedGastronomicProfile.value) {
    // Apply shared gastronomic profile to all pets
    const currentPetCount = petCount.value
    for (let i = 1; i <= currentPetCount; i++) {
      questionnaire.addAnswer('pet_gastronomic_profile', sharedGastronomicProfile.value, `pet_${i}`)
    }
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

const switchToIndividualGenders = () => {
  showIndividualGenders.value = true
  
  // Migrate shared answers to individual mode
  const sharedGender = questionnaire.getAnswer('pet_gender')
  const sharedNeutered = questionnaire.getAnswer('pet_neutered')
  const sharedExpecting = questionnaire.getAnswer('pet_expecting')
  
  // Set answers for pet 1 (keep existing shared answers)
  if (sharedGender) {
    questionnaire.addAnswer('pet_gender', sharedGender.value, 'pet_1')
  }
  if (sharedNeutered) {
    questionnaire.addAnswer('pet_neutered', sharedNeutered.value, 'pet_1')
  }
  if (sharedExpecting) {
    questionnaire.addAnswer('pet_expecting', sharedExpecting.value, 'pet_1')
  }
  
  // Remove shared answers (they're now individual)
  questionnaire.removeAnswer('pet_gender')
  questionnaire.removeAnswer('pet_neutered')
  questionnaire.removeAnswer('pet_expecting')
  
  // Note: Pet 2+ will start with empty answers (as expected)
}

const switchToSharedGenders = () => {
  console.log('switchToSharedGenders called')
  
  // Always switch to shared mode using first pet's answers
  // User understands this may overwrite individual differences
  showIndividualGenders.value = false
  
  const firstPetGender = questionnaire.getAnswer('pet_gender', 'pet_1')
  const firstPetNeutered = questionnaire.getAnswer('pet_neutered', 'pet_1')
  const firstPetExpecting = questionnaire.getAnswer('pet_expecting', 'pet_1')
  
  console.log('Using pet 1 answers:', {
    gender: firstPetGender?.value,
    neutered: firstPetNeutered?.value,
    expecting: firstPetExpecting?.value
  })
  
  // Set shared answers from pet 1
  if (firstPetGender) {
    questionnaire.addAnswer('pet_gender', firstPetGender.value)
  }
  if (firstPetNeutered) {
    questionnaire.addAnswer('pet_neutered', firstPetNeutered.value)
  }
  if (firstPetExpecting) {
    questionnaire.addAnswer('pet_expecting', firstPetExpecting.value)
  }
  
  // Remove all individual answers
  for (let i = 1; i <= petCount.value; i++) {
    questionnaire.removeAnswer('pet_gender', `pet_${i}`)
    questionnaire.removeAnswer('pet_neutered', `pet_${i}`)
    questionnaire.removeAnswer('pet_expecting', `pet_${i}`)
  }
  
  console.log('Switched to shared mode successfully')
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
}

const previousStep = () => {
  if (currentStepId.value > 0) {
    const prevUrlStep = internalToUrlStep(currentStepId.value - 1)
    router.push(`/step/${prevUrlStep}`)
  }
}

const nextStep = () => {
  if (canProceed.value) {
    if (currentStepId.value < 8) {
      const nextUrlStep = internalToUrlStep(currentStepId.value + 1)
      router.push(`/step/${nextUrlStep}`)
    } else {
      // User contact is the last step, submit questionnaire
      submitQuestionnaire()
    }
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
  const internalStep = urlToInternalStep(urlStep)
  questionnaire.setStep(Math.max(0, Math.min(internalStep, 8)))
  
  // Ensure pet count is at least 1 when starting questionnaire
  if (questionnaire.petCount === 0) {
    questionnaire.setPetCount(1)
  }
}, { immediate: true })

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
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 0;
}

.step-content {
  max-width: 800px;
  margin: 0 auto;
  background: white;
  border-radius: 16px 16px 0 0;
  padding: 2rem;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
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
  margin-bottom: 2rem;
  padding: 1.5rem;
  border: 2px solid #e0e0e0;
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
}

.differentiate-btn:hover,
.merge-btn:hover {
  background: #545b62;
}

.shared-birth-date-mode {
  text-align: center;
  padding: 2rem;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  background: #f8f9fa;
  margin-bottom: 2rem;
}

.shared-body-shape-mode {
  text-align: center;
  padding: 2rem;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  background: #f8f9fa;
  margin-bottom: 2rem;
}

.shared-activity-level-mode {
  text-align: center;
  padding: 2rem;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  background: #f8f9fa;
  margin-bottom: 2rem;
}

.activity-level-inputs {
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  justify-content: center;
}

.activity-level-field {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  min-width: 300px;
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
  gap: 1rem;
  margin-bottom: 2rem;
  justify-content: center;
}

.body-shape-field {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  min-width: 300px;
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
