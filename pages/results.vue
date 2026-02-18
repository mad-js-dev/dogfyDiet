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
            <span class="stat-label">Submitted At:</span>
            <span class="stat-value">{{ formatDate(questionnaireData.submittedAt) }}</span>
          </div>
        </div>
      </div>

      <div class="json-section">
        <div class="json-header">
          <h2>JSON Results</h2>
          <button @click="copyToClipboard" class="copy-btn">
            {{ copied ? 'Copied!' : 'Copy JSON' }}
          </button>
        </div>
        
        <div class="json-container">
          <pre class="json-content">{{ formattedJson }}</pre>
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
const copied = ref(false)

// Get questionnaire data from store
const questionnaireData = computed(() => {
  return {
    petCount: questionnaire.petCount,
    answers: questionnaire.answers,
    submittedAt: new Date()
  }
})

// Format JSON for display
const formattedJson = computed(() => {
  return JSON.stringify(questionnaireData.value, null, 2)
})

// Format date for display
const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date)
}

// Copy JSON to clipboard
const copyToClipboard = async () => {
  try {
    await navigator.clipboard.writeText(formattedJson.value)
    copied.value = true
    setTimeout(() => {
      copied.value = false
    }, 2000)
  } catch (err) {
    // Failed to copy JSON
  }
}

// Download JSON as file
const downloadJson = () => {
  const dataStr = formattedJson.value
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
  questionnaire.clearAnswers()
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

.json-section {
  margin-bottom: 2rem;
}

.json-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.json-header h2 {
  color: #333;
  margin: 0;
}

.copy-btn {
  padding: 0.5rem 1rem;
  background: #0066cc;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 600;
}

.copy-btn:hover {
  background: #0052a3;
}

.copy-btn:active {
  transform: translateY(1px);
}

.json-container {
  background: #1e1e1e;
  border-radius: 8px;
  padding: 1.5rem;
  max-height: 500px;
  overflow-y: auto;
}

.json-content {
  color: #d4d4d4;
  font-family: 'Courier New', monospace;
  font-size: 0.9rem;
  line-height: 1.5;
  margin: 0;
  white-space: pre-wrap;
  word-wrap: break-word;
}

/* Syntax highlighting for JSON */
.json-content {
  color: #d4d4d4;
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

/* Scrollbar styling */
.json-container::-webkit-scrollbar {
  width: 8px;
}

.json-container::-webkit-scrollbar-track {
  background: #2d2d2d;
  border-radius: 4px;
}

.json-container::-webkit-scrollbar-thumb {
  background: #555;
  border-radius: 4px;
}

.json-container::-webkit-scrollbar-thumb:hover {
  background: #777;
}

/* Responsive design */
@media (max-width: 768px) {
  .results-container {
    padding: 1.5rem;
  }
  
  h1 {
    font-size: 2rem;
  }
  
  .json-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
  
  .copy-btn {
    align-self: flex-end;
  }
  
  .json-container {
    padding: 1rem;
  }
  
  .json-content {
    font-size: 0.8rem;
  }
  
  .actions {
    flex-direction: column;
  }
  
  .download-btn, .new-btn {
    width: 100%;
  }
}
</style>
