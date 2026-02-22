import { computed } from 'vue'
import { useAbTestingStore } from '~/stores/ab-testing'

export const useAbTesting = () => {
  const store = useAbTestingStore()
  
  // Computed properties for easy access
  const excludeActivityLevel = computed(() => 
    store.isInTestGroup('activity_level_removal')
  )
  
  const currentGroup = computed(() => 
    store.getExperimentGroup('activity_level_removal')
  )
  
  const isInControlGroup = computed(() => 
    store.isInControlGroup('activity_level_removal')
  )
  
  const isInTestGroup = computed(() => 
    store.isInTestGroup('activity_level_removal')
  )
  
  // Actions
  const assignToControl = () => {
    store.assignUserToGroup('activity_level_removal', 'control')
  }
  
  const assignToTest = () => {
    store.assignUserToGroup('activity_level_removal', 'test')
  }
  
  const clearAssignment = () => {
    store.clearAssignments()
  }
  
  return {
    // Computed
    excludeActivityLevel,
    currentGroup,
    isInControlGroup,
    isInTestGroup,
    
    // Store access
    experiments: store.experiments,
    userAssignments: store.userAssignments,
    events: store.events,
    
    // Actions
    assignToControl,
    assignToTest,
    clearAssignment,
    
    // Store methods
    getExperimentGroup: store.getExperimentGroup,
    isInTestGroup: store.isInTestGroup,
    isInControlGroup: store.isInControlGroup,
    assignUserToGroup: store.assignUserToGroup,
    trackEvent: store.trackEvent,
    getExperimentEvents: store.getExperimentEvents
  }
}
