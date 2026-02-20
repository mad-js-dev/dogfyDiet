import { vi } from 'vitest'

// Mock localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
  length: 0,
  key: vi.fn()
}

// Mock sessionStorage
const sessionStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
  length: 0,
  key: vi.fn()
}

// Setup mocks
Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
  writable: true
})

Object.defineProperty(window, 'sessionStorage', {
  value: sessionStorageMock,
  writable: true
})

// Mock URLSearchParams
global.URLSearchParams = class MockURLSearchParams {
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
} as any

// Mock location
Object.defineProperty(window, 'location', {
  value: {
    search: '',
    reload: vi.fn(),
    href: 'http://localhost:3000'
  },
  writable: true
})

// Mock console methods to avoid noise in tests
global.console = {
  ...console,
  log: vi.fn(),
  error: vi.fn(),
  warn: vi.fn(),
  info: vi.fn()
}

// Export mocks for use in tests
export { localStorageMock, sessionStorageMock }
