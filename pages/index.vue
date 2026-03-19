<template>
  <div class="welcome-page">
    <div class="welcome-content">
      <h1>🐾 Pet Questionnaire</h1>
      <p>Tell us about your pets to get personalized recommendations</p>
      
      <div class="quick-start-section">
        <h2>Quick Start</h2>
        <p>Already know your pet's race? Select it below to skip ahead!</p>
      </div>
      
      <div class="features">
        <div class="feature">
          <span class="feature-icon">📝</span>
          <h3>Simple Questions</h3>
          <p>Just 3 easy steps to tell us about your pets</p>
        </div>
        <div class="feature">
          <span class="feature-icon">🎯</span>
          <h3>Personalized</h3>
          <p>Get recommendations tailored to your pets</p>
        </div>
        <div class="feature">
          <span class="feature-icon">📊</span>
          <h3>Instant Results</h3>
          <p>See your data in beautiful JSON format</p>
        </div>
      </div>
      
      <div class="actions">
        <button @click="startQuestionnaire" class="start-btn primary">
          Start Questionnaire
        </button>
       
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useComprehensiveQuestionnaireStore } from '~/stores/comprehensive-questionnaire'

const router = useRouter()
const questionnaire = useComprehensiveQuestionnaireStore()

const selectedRace = ref('')

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

const startQuestionnaire = () => {
  router.push('/questionnaire/1')
}

const handleRaceSelection = () => {
  // Auto-continue when race is selected
  if (selectedRace.value) {
    startWithRace()
  }
}

const startWithRace = () => {
  if (!selectedRace.value) return
  
  // Set pet count to 1 (default for quick start)
  questionnaire.setPetCount(1)
  
  // Add the race answer
  questionnaire.addAnswer('pet_race', selectedRace.value)
  
  // Navigate to step 2 (pet names) since race is already selected
  router.push('/step/2')
}

// Page metadata
definePageMeta({
  title: 'Pet Questionnaire - Welcome',
  description: 'Start your pet questionnaire journey'
})
</script>

<style scoped>
.welcome-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem 1rem;
}

.welcome-content {
  max-width: 600px;
  text-align: center;
  background: white;
  border-radius: 20px;
  padding: 3rem;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
}

.welcome-content h1 {
  font-size: 3rem;
  color: #333;
  margin-bottom: 1rem;
}

.welcome-content p {
  font-size: 1.2rem;
  color: #666;
  margin-bottom: 2rem;
}

.quick-start-section {
  background: linear-gradient(135deg, #f8f9fa, #e9ecef);
  border-radius: 12px;
  padding: 2rem;
  margin-bottom: 2rem;
  border: 2px solid #e0e0e0;
}

.quick-start-section h2 {
  color: #0066cc;
  margin-bottom: 0.5rem;
  font-size: 1.5rem;
}

.quick-start-section p {
  color: #666;
  margin-bottom: 1.5rem;
  font-size: 1rem;
}

.race-selector {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.race-label {
  font-weight: 600;
  color: #333;
}

.race-select {
  padding: 0.75rem 1rem;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  font-size: 1rem;
  background: white;
  cursor: pointer;
  transition: all 0.3s ease;
}

.race-select:focus {
  outline: none;
  border-color: #0066cc;
  box-shadow: 0 0 0 3px rgba(0, 102, 204, 0.1);
}

.race-select:hover {
  border-color: #0066cc;
}

.features {
  display: grid;
  gap: 2rem;
  margin-bottom: 2rem;
}

.feature {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  text-align: left;
}

.feature-icon {
  font-size: 2rem;
  flex-shrink: 0;
}

.feature h3 {
  color: #333;
  margin-bottom: 0.5rem;
  font-size: 1.1rem;
}

.feature p {
  color: #666;
  font-size: 0.9rem;
  margin: 0;
}

.actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

.start-btn {
  border: none;
  border-radius: 12px;
  padding: 1rem 2rem;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;
  display: inline-block;
  min-width: 200px;
}

.start-btn.primary {
  background: linear-gradient(135deg, map.get($brand-colors, 'primary'), color.adjust(map.get($brand-colors, 'primary'), $lightness: -15%));
  color: white;
  box-shadow: 0 4px 15px rgba(map.get($brand-colors, 'primary'), 0.3);
}

.start-btn.primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(map.get($brand-colors, 'primary'), 0.4);
}

.start-btn.secondary {
  background: linear-gradient(135deg, #4caf50, #45a049);
  color: white;
  box-shadow: 0 4px 15px rgba(76, 175, 80, 0.3);
}

.start-btn.secondary:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(76, 175, 80, 0.4);
}

.start-btn:active {
  transform: translateY(0);
}

@media (max-width: 768px) {
  .welcome-content {
    padding: 2rem;
  }
  
  .welcome-content h1 {
    font-size: 2rem;
  }
  
  .welcome-content p {
    font-size: 1rem;
  }
  
  .quick-start-section {
    padding: 1.5rem;
  }
  
  .quick-start-section h2 {
    font-size: 1.3rem;
  }
  
  .features {
    gap: 1.5rem;
  }
  
  .feature {
    flex-direction: column;
    text-align: center;
  }
  
  .actions {
    flex-direction: column;
    align-items: center;
  }
  
  .start-btn {
    width: 100%;
    max-width: 300px;
  }
}
</style>
