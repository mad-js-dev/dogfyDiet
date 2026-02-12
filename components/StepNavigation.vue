<template>
  <nav class="step-navigation">
    <div class="nav-container">
      <div class="step-indicator">
        <div class="step-dots">
          <div 
            v-for="step in steps" 
            :key="step.id"
            :class="getStepClass(step.id)"
            class="step-dot"
            @click="navigateToStep(step.id)"
          >
            <span class="step-number">{{ step.id + 1 }}</span>
            <span class="step-title">{{ step.title }}</span>
          </div>
        </div>
      </div>
      
      <div class="progress-bar">
        <div class="progress-fill" :style="{ width: `${progressPercentage}%` }"></div>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { questionnaireSteps } from '~/config/questionnaire-steps'

interface Props {
  currentStep: number
}

const props = defineProps<Props>()
const router = useRouter()

const steps = computed(() => questionnaireSteps)

const progressPercentage = computed(() => {
  const totalSteps = 3
  return Math.round((props.currentStep / (totalSteps - 1)) * 100)
})

const getStepClass = (stepId: number) => {
  return {
    'step-completed': stepId < props.currentStep,
    'step-current': stepId === props.currentStep,
    'step-future': stepId > props.currentStep,
    'step-clickable': stepId <= props.currentStep // Can only go back or stay current
  }
}

const navigateToStep = (stepId: number) => {
  if (stepId <= props.currentStep) {
    router.push(`/step/${stepId}`)
  }
}
</script>

<style scoped>
.step-navigation {
  position: sticky;
  top: 0;
  z-index: 100;
  background: white;
  border-bottom: 1px solid #e0e0e0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.nav-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem 2rem;
}

.step-indicator {
  margin-bottom: 1rem;
}

.step-dots {
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
}

.step-dots::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  height: 2px;
  background: #e0e0e0;
  z-index: 0;
  transform: translateY(-50%);
}

.step-dot {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.step-dot.step-clickable:hover {
  transform: scale(1.05);
}

.step-number {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #e0e0e0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 0.875rem;
  transition: all 0.3s ease;
  border: 3px solid white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.step-current .step-number {
  background: #0066cc;
  color: white;
  transform: scale(1.1);
}

.step-completed .step-number {
  background: #4caf50;
  color: white;
}

.step-future .step-number {
  background: #e0e0e0;
  color: #666;
}

.step-title {
  font-size: 0.75rem;
  color: #666;
  text-align: center;
  max-width: 80px;
  line-height: 1.2;
}

.step-current .step-title {
  color: #0066cc;
  font-weight: 600;
}

.step-completed .step-title {
  color: #4caf50;
  font-weight: 600;
}

.step-future .step-title {
  color: #999;
}

.progress-bar {
  height: 4px;
  background: #e0e0e0;
  border-radius: 2px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #0066cc, #0052a3);
  transition: width 0.5s ease;
}

@media (max-width: 768px) {
  .nav-container {
    padding: 1rem;
  }
  
  .step-dots {
    gap: 0.5rem;
  }
  
  .step-number {
    width: 32px;
    height: 32px;
    font-size: 0.75rem;
  }
  
  .step-title {
    font-size: 0.625rem;
    max-width: 60px;
  }
}
</style>
