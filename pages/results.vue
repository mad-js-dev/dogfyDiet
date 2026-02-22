<template>
  <div class="results-page">
    <div class="results-container">
      <h1>🎉 Questionnaire Complete!</h1>
      
      <div class="summary-section">
        <h2>Summary</h2>
        <div class="summary-stats">
          <div class="stat-item">
            <span class="stat-label">Pet Count:</span>
            <span class="stat-value">{{ questionnaireData.petCount }}</span>
          </div>
          <div class="stat-item">
            <span class="stat-label">Total Answers:</span>
            <span class="stat-value">{{ questionnaireData.answers.length }}</span>
          </div>
          <div class="stat-item">
            <span class="stat-label">Progress:</span>
            <span class="stat-value">{{ Math.round(questionnaireData.progressPercentage) }}%</span>
          </div>
          <div class="stat-item">
            <span class="stat-label">Status:</span>
            <span class="stat-value">{{ questionnaireData.isCompleted ? 'Completed' : 'In Progress' }}</span>
          </div>
          <div class="stat-item">
            <span class="stat-label">Submitted At:</span>
            <span class="stat-value">{{ formatDate(questionnaireData.submittedAt) }}</span>
          </div>
        </div>
      </div>

      <div class="answers-section">
        <h2>Answers</h2>
        <div class="answers-container">
          <div v-if="questionnaireData.answers.length === 0" class="no-answers">
            No answers recorded
          </div>
          <div v-else class="answers-list">
            <div 
              v-for="answer in questionnaireData.answers" 
              :key="`${answer.questionId}-${answer.petId || 'shared'}`"
              class="answer-item"
            >
              <div class="answer-header">
                <span class="question-id">{{ answer.questionId }}</span>
                <span v-if="answer.petId" class="pet-id">Pet: {{ answer.petId }}</span>
                <span v-else class="pet-id shared">Shared</span>
              </div>
              <div class="answer-value">
                <strong>Value:</strong> {{ formatAnswerValue(answer.value) }}
              </div>
              <div class="answer-timestamp">
                <small>{{ formatDate(answer.timestamp) }}</small>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="actions">
        <button @click="downloadJson" class="download-btn">
          📥 Download JSON
        </button>
        <button @click="startNew" class="new-btn">
          🔄 Start New Questionnaire
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useComprehensiveQuestionnaireStore } from '~/stores/comprehensive-questionnaire'

const questionnaire = useComprehensiveQuestionnaireStore()
const router = useRouter()

// Get questionnaire data from store
const questionnaireData = computed(() => {
  return {
    petCount: questionnaire.petCount,
    currentStep: questionnaire.currentStep,
    isCompleted: questionnaire.isCompleted,
    answers: questionnaire.answers,
    progressPercentage: questionnaire.progressPercentage,
    submittedAt: new Date()
  }
})

// Format date for display
const formatDate = (date: Date | string) => {
  const dateObj = typeof date === 'string' ? new Date(date) : date
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(dateObj)
}

// Format answer value for display
const formatAnswerValue = (value: any) => {
  if (Array.isArray(value)) {
    return value.join(', ')
  }
  if (typeof value === 'object' && value !== null) {
    return JSON.stringify(value)
  }
  return String(value)
}

// Download JSON as file
const downloadJson = () => {
  const dataStr = JSON.stringify(questionnaireData.value, null, 2)
  const dataBlob = new Blob([dataStr], { type: 'application/json' })
  const url = URL.createObjectURL(dataBlob)
  
  const link = document.createElement('a')
  link.href = url
  link.download = `questionnaire-results-${Date.now()}.json`
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}

// Start new questionnaire
const startNew = () => {
  questionnaire.resetQuestionnaire()
  router.push('/')
}

// Page metadata
definePageMeta({
  title: 'Questionnaire Results',
  description: 'View your questionnaire results in JSON format'
})
</script>

<style scoped>
.results-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 2rem 1rem;
}

.results-container {
  max-width: 900px;
  margin: 0 auto;
  background: white;
  border-radius: 16px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  padding: 2rem;
}

h1 {
  text-align: center;
  color: #333;
  margin-bottom: 2rem;
  font-size: 2.5rem;
}

.summary-section {
  margin-bottom: 2rem;
  padding: 1.5rem;
  background: #f8f9fa;
  border-radius: 12px;
  border-left: 4px solid #0066cc;
}

.summary-section h2 {
  color: #333;
  margin-bottom: 1rem;
}

.summary-stats {
  display: grid;
  gap: 1rem;
}

.stat-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 0;
  border-bottom: 1px solid #e0e0e0;
}

.stat-item:last-child {
  border-bottom: none;
}

.stat-label {
  font-weight: 600;
  color: #666;
}

.stat-value {
  font-weight: 700;
  color: #0066cc;
}

.answers-section {
  margin-bottom: 2rem;
  padding: 1.5rem;
  background: #f8f9fa;
  border-radius: 12px;
  border-left: 4px solid #28a745;
}

.answers-section h2 {
  color: #333;
  margin-bottom: 1rem;
}

.answers-container {
  max-height: 400px;
  overflow-y: auto;
}

.no-answers {
  text-align: center;
  color: #666;
  font-style: italic;
  padding: 2rem;
}

.answers-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.answer-item {
  background: white;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 1rem;
  transition: all 0.2s ease;
}

.answer-item:hover {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transform: translateY(-1px);
}

.answer-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
}

.question-id {
  font-weight: 600;
  color: #0066cc;
  font-family: 'Courier New', monospace;
  background: #e3f2fd;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.9rem;
}

.pet-id {
  font-size: 0.85rem;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  background: #fff3cd;
  color: #856404;
}

.pet-id.shared {
  background: #d1ecf1;
  color: #0c5460;
}

.answer-value {
  margin-bottom: 0.5rem;
  color: #333;
  word-wrap: break-word;
}

.answer-timestamp {
  color: #666;
  font-size: 0.8rem;
}

.actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

.download-btn, .new-btn {
  padding: 0.75rem 2rem;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;
}

.download-btn {
  background: #28a745;
  color: white;
}

.download-btn:hover {
  background: #218838;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(40, 167, 69, 0.3);
}

.new-btn {
  background: #6c757d;
  color: white;
}

.new-btn:hover {
  background: #545b62;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(108, 117, 125, 0.3);
}

/* Responsive design */
@media (max-width: 768px) {
  .results-container {
    padding: 1.5rem;
  }
  
  h1 {
    font-size: 2rem;
  }
  
  .actions {
    flex-direction: column;
  }
  
  .download-btn, .new-btn {
    width: 100%;
  }
}
</style>
