import { describe, it, expect, beforeEach, vi } from 'vitest'
import { questionnaireService } from '~/services/questionnaire'

// Mock localStorage and sessionStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn()
}

const sessionStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn()
}

// Mock URLSearchParams
class MockURLSearchParams {
  private params: Record<string, string>
  
  constructor(url: string) {
    this.params = {}
    // Simple parsing for test purposes
    const match = url.match(/[?&]([^=#]+)=([^&#]*)/g)
    if (match) {
      match.forEach(param => {
        const [key, value] = param.slice(1).split('=')
        this.params[key] = decodeURIComponent(value)
      })
    }
  }
  
  get(key: string): string | null {
    return this.params[key] || null
  }
}

describe('QuestionnaireService', () => {
  beforeEach(() => {
    // Reset mocks
    vi.clearAllMocks()
    localStorageMock.getItem.mockReturnValue(null)
    sessionStorageMock.getItem.mockReturnValue(null)
    
    // Mock window object
    Object.defineProperty(window, 'localStorage', {
      value: localStorageMock,
      writable: true
    })
    
    Object.defineProperty(window, 'sessionStorage', {
      value: sessionStorageMock,
      writable: true
    })
    
    // Mock URLSearchParams
    global.URLSearchParams = MockURLSearchParams as any
    
    // Mock location
    Object.defineProperty(window, 'location', {
      value: { search: '' },
      writable: true
    })
  })

  describe('getSteps', () => {
    it('should return control group steps by default', () => {
      const steps = questionnaireService.getSteps()
      expect(steps).toBeDefined()
      expect(Array.isArray(steps)).toBe(true)
      expect(steps.length).toBeGreaterThan(0)
    })

    it('should return control group when URL parameter is control', () => {
      Object.defineProperty(window, 'location', {
        value: { search: '?ab_test=control' },
        writable: true
      })
      
      const steps = questionnaireService.getSteps()
      expect(steps).toBeDefined()
      // Control group should have 9 steps (including Pet Activity Level)
      expect(steps.length).toBe(9)
    })

    it('should return test group when URL parameter is test', () => {
      Object.defineProperty(window, 'location', {
        value: { search: '?ab_test=test' },
        writable: true
      })
      
      const steps = questionnaireService.getSteps()
      expect(steps).toBeDefined()
      // Test group should have 8 steps (Pet Activity Level removed)
      expect(steps.length).toBe(8)
    })

    it('should use localStorage when no URL parameter', () => {
      localStorageMock.getItem.mockReturnValue('test')
      
      const steps = questionnaireService.getSteps()
      expect(steps).toBeDefined()
      expect(steps.length).toBe(8)
    })

    it('should fallback to sessionStorage when localStorage is empty', () => {
      localStorageMock.getItem.mockReturnValue(null)
      sessionStorageMock.getItem.mockReturnValue('control')
      
      const steps = questionnaireService.getSteps()
      expect(steps).toBeDefined()
      expect(steps.length).toBe(9)
    })

    it('should randomly assign group when no storage exists', () => {
      const steps = questionnaireService.getSteps()
      expect(steps).toBeDefined()
      expect(steps.length).toBeGreaterThanOrEqual(8)
      expect(steps.length).toBeLessThanOrEqual(9)
    })
  })

  describe('getStepById', () => {
    it('should return correct step by id', () => {
      const step = questionnaireService.getStepById(0)
      expect(step).toBeDefined()
      expect(step?.id).toBe(0)
      expect(step?.title).toBe('Pet Race')
    })

    it('should return undefined for non-existent step', () => {
      const step = questionnaireService.getStepById(999)
      expect(step).toBeUndefined()
    })
  })

  describe('getNextStep', () => {
    it('should return next step when current step exists', () => {
      const nextStep = questionnaireService.getNextStep(0)
      expect(nextStep).toBeDefined()
      expect(nextStep?.id).toBe(1)
    })

    it('should return undefined for last step', () => {
      const steps = questionnaireService.getSteps()
      const lastStepId = steps[steps.length - 1].id
      const nextStep = questionnaireService.getNextStep(lastStepId)
      expect(nextStep).toBeUndefined()
    })
  })

  describe('getPreviousStep', () => {
    it('should return previous step when current step exists', () => {
      const prevStep = questionnaireService.getPreviousStep(1)
      expect(prevStep).toBeDefined()
      expect(prevStep?.id).toBe(0)
    })

    it('should return undefined for first step', () => {
      const prevStep = questionnaireService.getPreviousStep(0)
      expect(prevStep).toBeUndefined()
    })
  })

  describe('getTestGroup', () => {
    it('should return control group from URL parameter', () => {
      Object.defineProperty(window, 'location', {
        value: { search: '?ab_test=control' },
        writable: true
      })
      
      const group = questionnaireService.getTestGroup()
      expect(group).toBe('control')
      expect(localStorageMock.setItem).toHaveBeenCalledWith('ab_test_group', 'control')
      expect(sessionStorageMock.setItem).toHaveBeenCalledWith('ab_test_group', 'control')
    })

    it('should return test group from URL parameter', () => {
      Object.defineProperty(window, 'location', {
        value: { search: '?ab_test=test' },
        writable: true
      })
      
      const group = questionnaireService.getTestGroup()
      expect(group).toBe('test')
      expect(localStorageMock.setItem).toHaveBeenCalledWith('ab_test_group', 'test')
      expect(sessionStorageMock.setItem).toHaveBeenCalledWith('ab_test_group', 'test')
    })

    it('should return group from localStorage', () => {
      localStorageMock.getItem.mockReturnValue('control')
      
      const group = questionnaireService.getTestGroup()
      expect(group).toBe('control')
    })

    it('should return group from sessionStorage when localStorage is empty', () => {
      localStorageMock.getItem.mockReturnValue(null)
      sessionStorageMock.getItem.mockReturnValue('test')
      
      const group = questionnaireService.getTestGroup()
      expect(group).toBe('test')
    })
  })

  describe('setTestGroup', () => {
    it('should set test group and reload page', () => {
      const reloadMock = vi.fn()
      Object.defineProperty(window, 'location', {
        value: { reload: reloadMock },
        writable: true
      })
      
      questionnaireService.setTestGroup('test')
      
      expect(localStorageMock.setItem).toHaveBeenCalledWith('ab_test_group', 'test')
      expect(sessionStorageMock.setItem).toHaveBeenCalledWith('ab_test_group', 'test')
      expect(reloadMock).toHaveBeenCalled()
    })
  })

  describe('clearTestGroup', () => {
    it('should clear test group and reload page', () => {
      const reloadMock = vi.fn()
      Object.defineProperty(window, 'location', {
        value: { reload: reloadMock },
        writable: true
      })
      
      questionnaireService.clearTestGroup()
      
      expect(localStorageMock.removeItem).toHaveBeenCalledWith('ab_test_group')
      expect(sessionStorageMock.removeItem).toHaveBeenCalledWith('ab_test_group')
      expect(reloadMock).toHaveBeenCalled()
    })
  })

  describe('Error Handling', () => {
    it('should handle localStorage errors gracefully', () => {
      localStorageMock.setItem.mockImplementation(() => {
        throw new Error('Storage error')
      })
      
      // Should not throw and should return control as fallback
      expect(() => questionnaireService.getTestGroup()).not.toThrow()
      expect(() => questionnaireService.setTestGroup('control')).not.toThrow()
    })

    it('should handle sessionStorage errors gracefully', () => {
      sessionStorageMock.setItem.mockImplementation(() => {
        throw new Error('Session storage error')
      })
      
      // Should not throw and should return control as fallback
      expect(() => questionnaireService.getTestGroup()).not.toThrow()
      expect(() => questionnaireService.setTestGroup('test')).not.toThrow()
    })
  })
})
