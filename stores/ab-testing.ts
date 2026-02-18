import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'
import type { ExperimentConfig, ExperimentGroup, ExperimentEvent } from '~/config/ab-testing'
import { ACTIVITY_LEVEL_EXPERIMENT } from '~/config/ab-testing'

export const useAbTestingStore = defineStore('ab-testing', () => {
  // State
  const experiments = ref<Record<string, ExperimentConfig>>({
    activity_level_removal: ACTIVITY_LEVEL_EXPERIMENT
  })
  
  const userAssignments = ref<Record<string, ExperimentGroup>>({})
  const events = ref<ExperimentEvent[]>([])

  // Getters
  const getExperimentGroup = (experimentName: string): ExperimentGroup | null => {
    // Check if user is already assigned
    if (userAssignments.value[experimentName]) {
      return userAssignments.value[experimentName]
    }

    const experiment = experiments.value[experimentName]
    if (!experiment || !experiment.enabled) {
      return null
    }

    // Assign user to a group
    const random = Math.random()
    const group = random < experiment.variants.control.weight ? 'control' : 'test'
    
    // Store assignment
    userAssignments.value[experimentName] = group
    
    // Track assignment event
    trackEvent(experimentName, 'assigned', { group })
    
    return group
  }

  const isInTestGroup = (experimentName: string): boolean => {
    return getExperimentGroup(experimentName) === 'test'
  }

  const isInControlGroup = (experimentName: string): boolean => {
    return getExperimentGroup(experimentName) === 'control'
  }

  // Actions
  const assignUserToGroup = (experimentName: string, group: ExperimentGroup) => {
    userAssignments.value[experimentName] = group
    trackEvent(experimentName, 'manual_assignment', { group })
  }

  const trackEvent = (experimentName: string, event: string, data?: Record<string, any>) => {
    const group = getExperimentGroup(experimentName)
    if (!group) return

    const experimentEvent: ExperimentEvent = {
      experiment: experimentName,
      group,
      event,
      timestamp: new Date(),
      data
    }

    events.value.push(experimentEvent)

    // Also send to analytics service (implement later)
    sendToAnalytics(experimentEvent)
  }

  const sendToAnalytics = (event: ExperimentEvent) => {
    // TODO: Implement analytics integration
    // For now, just track internally
  }

  const getExperimentEvents = (experimentName: string, group?: ExperimentGroup) => {
    return events.value.filter(event => 
      event.experiment === experimentName && 
      (!group || event.group === group)
    )
  }

  const clearAssignments = () => {
    userAssignments.value = {}
    events.value = []
  }

  // Persistence
  const loadFromStorage = () => {
    try {
      const stored = localStorage.getItem('ab_testing_assignments')
      if (stored) {
        userAssignments.value = JSON.parse(stored)
      }
    } catch (error) {
      // Failed to load A/B test assignments from storage
    }
  }

  const saveToStorage = () => {
    try {
      localStorage.setItem('ab_testing_assignments', JSON.stringify(userAssignments.value))
    } catch (error) {
      // Failed to save A/B test assignments to storage
    }
  }

  // Auto-save assignments when they change
  watch(userAssignments, saveToStorage, { deep: true })

  // Load assignments on initialization
  loadFromStorage()

  return {
    // State
    experiments,
    userAssignments,
    events,
    
    // Getters
    getExperimentGroup,
    isInTestGroup,
    isInControlGroup,
    
    // Actions
    assignUserToGroup,
    trackEvent,
    getExperimentEvents,
    clearAssignments,
    
    // Persistence
    loadFromStorage,
    saveToStorage
  }
})
