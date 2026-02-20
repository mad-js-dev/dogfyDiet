import { describe, it, expect, beforeEach, vi } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useComprehensiveQuestionnaireStore } from '~/stores/comprehensive-questionnaire'

// Mock localStorage composable
const localStorageMock = {
  isLocalStorageAvailable: { value: true },
  saveToLocalStorage: vi.fn(),
  loadFromLocalStorage: vi.fn(),
  hasPersistedData: vi.fn(),
  clearLocalStorage: vi.fn()
}

// Mock useLocalStorage composable
vi.mock('~/composables/useLocalStorage', () => ({
  useLocalStorage: () => localStorageMock
}))

// Mock questionnaireSteps
const mockSteps = [
  { id: 0, title: 'Pet Race', questions: [{ id: 'pet_breed', title: 'Pet Breed' }] },
  { id: 1, title: 'Pet Names', questions: [{ id: 'pet_name', title: 'Pet Name' }] },
  { id: 2, title: 'Pet Gender', questions: [{ id: 'pet_gender', title: 'Pet Gender' }] }
]

vi.mock('~/config/questionnaire-steps', () => ({
  questionnaireSteps: mockSteps
}))

describe('ComprehensiveQuestionnaireStore', () => {
  let store: ReturnType<typeof useComprehensiveQuestionnaireStore>

  beforeEach(() => {
    setActivePinia(createPinia())
    store = useComprehensiveQuestionnaireStore()
    
    // Reset mocks
    vi.clearAllMocks()
    localStorageMock.hasPersistedData.mockReturnValue(false)
    localStorageMock.loadFromLocalStorage.mockReturnValue(null)
    localStorageMock.saveToLocalStorage.mockReturnValue(true)
  })

  describe('State Management', () => {
    it('should initialize with default values', () => {
      expect(store.currentStep).toBe(0)
      expect(store.answers).toEqual([])
      expect(store.isCompleted).toBe(false)
      expect(store.petCount).toBe(1)
      expect(store.uiState).toEqual({
        showIndividualGenders: false,
        showIndividualBirthDates: false,
        showIndividualBodyShapes: false,
        showIndividualActivityLevels: false,
        showIndividualPathologies: false,
        showIndividualGastronomicProfiles: false
      })
    })
  })

  describe('Computed Properties', () => {
    it('should calculate answered questions correctly', () => {
      store.addAnswer('pet_breed', 'Labrador')
      store.addAnswer('pet_name', 'Max')
      store.addAnswer('pet_breed', 'Golden Retriever', 'pet_1') // Should replace, not add
      
      expect(store.answeredQuestions).toBe(2) // pet_breed and pet_name
    })

    it('should calculate progress percentage correctly', () => {
      store.setStep(1)
      const progress = store.progressPercentage
      expect(progress).toBe(Math.round((1 / (mockSteps.length - 1)) * 100))
    })

    it('should calculate completion status correctly', () => {
      store.addAnswer('pet_breed', 'Labrador')
      store.addAnswer('pet_name', 'Max')
      
      const status = store.completionStatus
      expect(status.totalQuestions).toBe(3) // 3 questions across all steps
      expect(status.answeredQuestions).toBe(2)
      expect(status.completionPercentage).toBe(Math.round((2 / 3) * 100))
    })

    it('should find last answered step correctly', () => {
      store.addAnswer('pet_breed', 'Labrador') // Step 0
      store.addAnswer('pet_name', 'Max') // Step 1
      
      expect(store.lastAnsweredStep).toBe(1)
    })

    it('should find next unanswered step correctly', () => {
      store.addAnswer('pet_breed', 'Labrador') // Step 0
      // Step 1 (pet_name) is unanswered
      // Step 2 (pet_gender) is unanswered
      
      expect(store.nextUnansweredStep).toBe(1)
    })

    it('should return last step when all questions are answered', () => {
      store.addAnswer('pet_breed', 'Labrador')
      store.addAnswer('pet_name', 'Max')
      store.addAnswer('pet_gender', 'Male')
      
      expect(store.nextUnansweredStep).toBe(mockSteps.length - 1)
    })
  })

  describe('Answer Management', () => {
    it('should add answer correctly', () => {
      store.addAnswer('pet_breed', 'Labrador')
      
      expect(store.answers).toHaveLength(1)
      expect(store.answers[0]).toEqual({
        questionId: 'pet_breed',
        value: 'Labrador',
        petId: undefined,
        timestamp: expect.any(String)
      })
    })

    it('should add answer with petId correctly', () => {
      store.addAnswer('pet_breed', 'Labrador', 'pet_1')
      
      expect(store.answers).toHaveLength(1)
      expect(store.answers[0]).toEqual({
        questionId: 'pet_breed',
        value: 'Labrador',
        petId: 'pet_1',
        timestamp: expect.any(String)
      })
    })

    it('should update existing answer', () => {
      store.addAnswer('pet_breed', 'Labrador')
      store.addAnswer('pet_breed', 'Golden Retriever')
      
      expect(store.answers).toHaveLength(1)
      expect(store.answers[0].value).toBe('Golden Retriever')
    })

    it('should add smart answer correctly for single pet', () => {
      store.setPetCount(1)
      store.addSmartAnswer('pet_breed', 'Labrador')
      
      expect(store.answers).toHaveLength(1)
      expect(store.answers[0].petId).toBe('pet_1')
    })

    it('should add smart answer as shared for multiple pets', () => {
      store.setPetCount(2)
      store.addSmartAnswer('pet_breed', 'Labrador')
      
      expect(store.answers).toHaveLength(1)
      expect(store.answers[0].petId).toBe(null)
    })

    it('should remove answer correctly', () => {
      store.addAnswer('pet_breed', 'Labrador')
      store.removeAnswer('pet_breed')
      
      expect(store.answers).toHaveLength(0)
    })

    it('should remove answer with petId correctly', () => {
      store.addAnswer('pet_breed', 'Labrador', 'pet_1')
      store.removeAnswer('pet_breed', 'pet_1')
      
      expect(store.answers).toHaveLength(0)
    })

    it('should get answer correctly', () => {
      store.addAnswer('pet_breed', 'Labrador')
      const answer = store.getAnswer('pet_breed')
      
      expect(answer).toBeDefined()
      expect(answer?.value).toBe('Labrador')
    })

    it('should get answer with petId correctly', () => {
      store.addAnswer('pet_breed', 'Labrador', 'pet_1')
      const answer = store.getAnswer('pet_breed', 'pet_1')
      
      expect(answer).toBeDefined()
      expect(answer?.value).toBe('Labrador')
    })

    it('should check for shared answer correctly', () => {
      store.addAnswer('pet_breed', 'Labrador')
      
      expect(store.hasSharedAnswer('pet_breed')).toBe(true)
      expect(store.hasIndividualAnswers('pet_breed')).toBe(false)
    })

    it('should check for individual answers correctly', () => {
      store.addAnswer('pet_breed', 'Labrador', 'pet_1')
      
      expect(store.hasSharedAnswer('pet_breed')).toBe(false)
      expect(store.hasIndividualAnswers('pet_breed')).toBe(true)
    })

    it('should differentiate answers correctly', () => {
      store.setPetCount(2)
      store.addAnswer('pet_breed', 'Labrador') // Shared answer
      
      store.differentiateAnswers('pet_breed')
      
      expect(store.hasSharedAnswer('pet_breed')).toBe(false)
      expect(store.hasIndividualAnswers('pet_breed')).toBe(true)
      expect(store.answers).toHaveLength(2) // pet_1 and pet_2
    })
  })

  describe('Pet Management', () => {
    it('should set pet count correctly', () => {
      store.setPetCount(2)
      
      expect(store.petCount).toBe(2)
      expect(store.answers).toHaveLength(1)
      expect(store.answers[0].questionId).toBe('pet_count')
      expect(store.answers[0].value).toBe(2)
    })

    it('should validate pet count bounds', () => {
      store.setPetCount(0) // Below minimum
      expect(store.petCount).toBe(1)
      
      store.setPetCount(3) // Above maximum
      expect(store.petCount).toBe(2)
    })

    it('should get pet answers correctly', () => {
      store.addAnswer('pet_breed', 'Labrador', 'pet_1')
      store.addAnswer('pet_name', 'Max', 'pet_1')
      store.addAnswer('pet_breed', 'Golden Retriever', 'pet_2')
      
      const pet1Answers = store.getPetAnswers(1)
      expect(pet1Answers).toHaveLength(2)
      expect(pet1Answers[0].petId).toBe('pet_1')
      expect(pet1Answers[1].petId).toBe('pet_1')
    })

    it('should get global answers correctly', () => {
      store.addAnswer('pet_breed', 'Labrador')
      store.addAnswer('user_email', 'test@example.com')
      
      const globalAnswers = store.getGlobalAnswers()
      expect(globalAnswers).toHaveLength(2)
      expect(globalAnswers[0].petId).toBe(null)
      expect(globalAnswers[1].petId).toBe(null)
    })
  })

  describe('UI State Management', () => {
    it('should set UI state correctly', () => {
      store.setUiState('showIndividualGenders', true)
      
      expect(store.uiState.showIndividualGenders).toBe(true)
    })
  })

  describe('Step Management', () => {
    it('should set step correctly', () => {
      store.setStep(2)
      
      expect(store.currentStep).toBe(2)
    })
  })

  describe('Persistence', () => {
    it('should save to localStorage', () => {
      store.addAnswer('pet_breed', 'Labrador')
      
      expect(localStorageMock.saveToLocalStorage).toHaveBeenCalled()
    })

    it('should load from localStorage correctly', () => {
      const mockData = {
        currentStep: 1,
        answers: [{ questionId: 'pet_breed', value: 'Labrador', petId: null, timestamp: '2023-01-01' }],
        petCount: 1,
        isCompleted: false,
        uiState: { showIndividualGenders: true }
      }
      
      localStorageMock.hasPersistedData.mockReturnValue(true)
      localStorageMock.loadFromLocalStorage.mockReturnValue(mockData)
      
      const loaded = store.loadFromLocalStorage()
      
      expect(loaded).toBe(true)
      expect(store.currentStep).toBe(1)
      expect(store.answers).toEqual(mockData.answers)
      expect(store.petCount).toBe(1)
      expect(store.uiState.showIndividualGenders).toBe(true)
    })

    it('should check for persisted data', () => {
      localStorageMock.hasPersistedData.mockReturnValue(true)
      
      expect(store.hasPersistedData()).toBe(true)
      
      localStorageMock.hasPersistedData.mockReturnValue(false)
      
      expect(store.hasPersistedData()).toBe(false)
    })

    it('should clear all data correctly', () => {
      store.addAnswer('pet_breed', 'Labrador')
      store.setStep(2)
      store.setPetCount(2)
      
      store.clearAllData()
      
      expect(store.answers).toEqual([])
      expect(store.currentStep).toBe(0)
      expect(store.petCount).toBe(1)
      expect(localStorageMock.clearLocalStorage).toHaveBeenCalled()
    })

    it('should not save when localStorage is unavailable', () => {
      localStorageMock.isLocalStorageAvailable.value = false
      
      store.addAnswer('pet_breed', 'Labrador')
      
      expect(localStorageMock.saveToLocalStorage).not.toHaveBeenCalled()
    })
  })

  describe('Questionnaire Completion', () => {
    it('should submit questionnaire correctly', () => {
      store.addAnswer('pet_breed', 'Labrador')
      
      const result = store.submitQuestionnaire()
      
      expect(store.isCompleted).toBe(true)
      expect(result).toEqual({
        answers: store.answers,
        petCount: store.petCount,
        submittedAt: expect.any(String)
      })
    })
  })

  describe('Auto-save Functionality', () => {
    it('should trigger auto-save on answer changes', vi.useFakeTimers(), () => {
      store.addAnswer('pet_breed', 'Labrador')
      
      // Should not save immediately
      expect(localStorageMock.saveToLocalStorage).not.toHaveBeenCalled()
      
      // Should save after debounce delay
      vi.advanceTimersByTime(1000)
      expect(localStorageMock.saveToLocalStorage).toHaveBeenCalled()
    })
  })
})
