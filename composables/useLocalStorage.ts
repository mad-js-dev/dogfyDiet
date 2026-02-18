import { ref, computed } from 'vue'

// LocalStorage key for questionnaire data
const STORAGE_KEY = 'dogfyDiet_questionnaire'
const CURRENT_VERSION = '1.0.0'

// Data structure for persisted questionnaire data
export interface PersistedQuestionnaireData {
  version: string
  currentStep: number
  answers: Array<{
    questionId: string
    value: any
    petId?: string | null
    timestamp: string
  }>
  petCount: number
  isCompleted: boolean
  uiState: {
    showIndividualGenders: boolean
    showIndividualBirthDates: boolean
    showIndividualBodyShapes: boolean
    showIndividualActivityLevels: boolean
    showIndividualPathologies: boolean
    showIndividualGastronomicProfiles: boolean
  }
  metadata: {
    lastSaved: string
    sessionId: string
    excludeActivityLevel: boolean
  }
}

// Default state for new questionnaires
const defaultState: Omit<PersistedQuestionnaireData, 'version' | 'metadata'> = {
  currentStep: 0,
  answers: [],
  petCount: 1,
  isCompleted: false,
  uiState: {
    showIndividualGenders: false,
    showIndividualBirthDates: false,
    showIndividualBodyShapes: false,
    showIndividualActivityLevels: false,
    showIndividualPathologies: false,
    showIndividualGastronomicProfiles: false
  }
}

export const useLocalStorage = () => {
  // Check if localStorage is available
  const isLocalStorageAvailable = computed(() => {
    if (typeof window === 'undefined') return false
    try {
      const test = '__localStorage_test__'
      localStorage.setItem(test, test)
      localStorage.removeItem(test)
      return true
    } catch {
      return false
    }
  })

  // Generate session ID
  const generateSessionId = () => {
    return Date.now().toString(36) + Math.random().toString(36).substr(2)
  }

  // Validate persisted data structure
  const validateData = (data: any): data is PersistedQuestionnaireData => {
    if (!data || typeof data !== 'object') {
      return false
    }
    
    const required = ['version', 'currentStep', 'answers', 'petCount', 'isCompleted', 'uiState', 'metadata']
    const missingKeys = required.filter(key => !(key in data))
    if (missingKeys.length > 0) {
      return false
    }
    
    if (!Array.isArray(data.answers)) {
      return false
    }
    if (typeof data.currentStep !== 'number') {
      return false
    }
    if (typeof data.petCount !== 'number') {
      return false
    }
    if (typeof data.isCompleted !== 'boolean') {
      return false
    }
    
    return true
  }

  // Attempt to recover corrupted data
  const attemptDataRecovery = (data: any): PersistedQuestionnaireData | null => {
    try {
      // Create a recovered object with defaults
      const recovered: PersistedQuestionnaireData = {
        version: CURRENT_VERSION,
        currentStep: typeof data.currentStep === 'number' ? data.currentStep : 0,
        answers: Array.isArray(data.answers) ? data.answers : [],
        petCount: typeof data.petCount === 'number' ? data.petCount : 1,
        isCompleted: typeof data.isCompleted === 'boolean' ? data.isCompleted : false,
        uiState: typeof data.uiState === 'object' && data.uiState !== null ? {
          showIndividualGenders: Boolean(data.uiState.showIndividualGenders),
          showIndividualBirthDates: Boolean(data.uiState.showIndividualBirthDates),
          showIndividualBodyShapes: Boolean(data.uiState.showIndividualBodyShapes),
          showIndividualActivityLevels: Boolean(data.uiState.showIndividualActivityLevels),
          showIndividualPathologies: Boolean(data.uiState.showIndividualPathologies),
          showIndividualGastronomicProfiles: Boolean(data.uiState.showIndividualGastronomicProfiles)
        } : defaultState.uiState,
        metadata: {
          lastSaved: new Date().toISOString(),
          sessionId: generateSessionId(),
          excludeActivityLevel: false
        }
      }
      
      return recovered
    } catch (error) {
      return null
    }
  }

  // Migrate data from older versions
  const migrateData = (data: any): PersistedQuestionnaireData => {
    // For now, just ensure current version
    // Add migration logic here for future versions
    return {
      ...data,
      version: CURRENT_VERSION,
      metadata: {
        ...data.metadata,
        lastSaved: new Date().toISOString()
      }
    }
  }

  // Save data to localStorage
  const saveToLocalStorage = (data: Omit<PersistedQuestionnaireData, 'version' | 'metadata'>): boolean => {
    if (!isLocalStorageAvailable.value) return false

    try {
      const persistedData: PersistedQuestionnaireData = {
        ...data,
        version: CURRENT_VERSION,
        metadata: {
          lastSaved: new Date().toISOString(),
          sessionId: generateSessionId(),
          excludeActivityLevel: data.uiState?.showIndividualActivityLevels !== undefined ? !data.uiState.showIndividualActivityLevels : false
        }
      }

      localStorage.setItem(STORAGE_KEY, JSON.stringify(persistedData))
      return true
    } catch (error) {
      return false
    }
  }

  // Load data from localStorage
  const loadFromLocalStorage = (): PersistedQuestionnaireData | null => {
    if (!isLocalStorageAvailable.value) return null

    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (!stored) return null

      const data = JSON.parse(stored)
      
      if (!validateData(data)) {
        const recovered = attemptDataRecovery(data)
        if (recovered) {
          // Save the recovered data
          localStorage.setItem(STORAGE_KEY, JSON.stringify(recovered))
          return recovered
        } else {
          clearLocalStorage()
          return null
        }
      }

      // Migrate if needed
      if (data.version !== CURRENT_VERSION) {
        return migrateData(data)
      }

      return data
    } catch (error) {
      clearLocalStorage()
      return null
    }
  }

  // Check if persisted data exists
  const hasPersistedData = (): boolean => {
    if (!isLocalStorageAvailable.value) return false
    return localStorage.getItem(STORAGE_KEY) !== null
  }

  // Clear localStorage data
  const clearLocalStorage = (): boolean => {
    if (!isLocalStorageAvailable.value) return false

    try {
      localStorage.removeItem(STORAGE_KEY)
      return true
    } catch (error) {
      return false
    }
  }

  // Get storage usage info
  const getStorageInfo = () => {
    if (!isLocalStorageAvailable.value) return null

    try {
      const data = localStorage.getItem(STORAGE_KEY)
      const size = data ? new Blob([data]).size : 0
      const quota = 5 * 1024 * 1024 // 5MB typical localStorage quota
      
      return {
        used: size,
        quota,
        percentage: (size / quota) * 100,
        available: quota - size
      }
    } catch (error) {
      return null
    }
  }

  // Export data as JSON (for backup)
  const exportData = (): string | null => {
    const data = loadFromLocalStorage()
    if (!data) return null
    
    try {
      return JSON.stringify(data, null, 2)
    } catch (error) {
      return null
    }
  }

  // Import data from JSON
  const importData = (jsonData: string): boolean => {
    try {
      const data = JSON.parse(jsonData)
      
      if (!validateData(data)) {
        return false
      }

      const { version, metadata, ...stateData } = data
      return saveToLocalStorage(stateData)
    } catch (error) {
      return false
    }
  }

  return {
    // State
    isLocalStorageAvailable,
    
    // Core functions
    saveToLocalStorage,
    loadFromLocalStorage,
    hasPersistedData,
    clearLocalStorage,
    
    // Utility functions
    getStorageInfo,
    exportData,
    importData,
    
    // Constants
    STORAGE_KEY,
    CURRENT_VERSION,
    defaultState
  }
}
