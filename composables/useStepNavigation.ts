import { computed, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useComprehensiveQuestionnaireStore } from '~/stores/comprehensive-questionnaire'
import { useAbTestingStore } from '~/stores/ab-testing'
import { getQuestionnaireSteps, getTotalSteps } from '~/config/questionnaire-steps'
import type { StepConfig } from '~/types/questionnaire'

export const useStepNavigation = () => {
  const router = useRouter()
  const route = useRoute()
  const questionnaire = useComprehensiveQuestionnaireStore()
  const { excludeActivityLevel } = useAbTestingStore()
  
  const urlStep = computed(() => parseInt(route.params.step as string))
  const steps = computed(() => getQuestionnaireSteps(excludeActivityLevel.value))
  const totalSteps = computed(() => getTotalSteps(excludeActivityLevel.value))
  
  const currentStepId = computed(() => {
    const urlStepValue = urlStep.value
    const maxStep = totalSteps.value
    
    if (isNaN(urlStepValue) || urlStepValue < 1 || urlStepValue > maxStep) {
      return 0
    }
    
    const stepIndex = urlStepValue - 1
    return steps.value[stepIndex]?.id || 0
  })
  
  const currentStepIndex = computed(() => {
    return steps.value.findIndex((step: StepConfig) => step.id === currentStepId.value)
  })
  
  const canProceed = ref(false)
  
  const nextStep = () => {
    if (canProceed.value && currentStepIndex.value < steps.value.length - 1) {
      const nextStep = steps.value[currentStepIndex.value + 1]
      const nextUrlStep = steps.value.findIndex((s: StepConfig) => s.id === nextStep.id) + 1
      router.push(`/step/${nextUrlStep}`)
    }
  }
  
  const previousStep = () => {
    if (currentStepIndex.value > 0) {
      const prevStep = steps.value[currentStepIndex.value - 1]
      const prevUrlStep = steps.value.findIndex((s: StepConfig) => s.id === prevStep.id) + 1
      router.push(`/step/${prevUrlStep}`)
    }
  }
  
  return {
    currentStepId,
    currentStepIndex,
    steps,
    totalSteps,
    canProceed,
    nextStep,
    previousStep
  }
}
