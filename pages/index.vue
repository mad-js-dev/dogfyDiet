<template>
  <div class="welcome-page">
    <div class="welcome-content">
      <h1>🐾 Pet Questionnaire</h1>
      <p>Tell us about your pets to get personalized recommendations</p>
      
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
      
      <button @click="startQuestionnaire" class="start-btn">
        Start Questionnaire
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
const router = useRouter()

const startQuestionnaire = () => {
  router.push('/step/0')
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
  margin-bottom: 3rem;
}

.features {
  display: grid;
  gap: 2rem;
  margin-bottom: 3rem;
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

.start-btn {
  background: linear-gradient(135deg, #0066cc, #0052a3);
  color: white;
  border: none;
  border-radius: 12px;
  padding: 1rem 3rem;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(0, 102, 204, 0.3);
}

.start-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(0, 102, 204, 0.4);
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
  
  .features {
    gap: 1.5rem;
  }
  
  .feature {
    flex-direction: column;
    text-align: center;
  }
  
  .start-btn {
    width: 100%;
    padding: 1rem 2rem;
  }
}
</style>
