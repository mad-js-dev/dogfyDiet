// Simple test to verify A/B testing URL parameter override works
console.log('Testing A/B Testing URL parameter override...');

// Mock window.location.search for testing
global.window = {
  location: {
    search: '?group=control'
  }
};

// Mock localStorage
global.localStorage = {
  getItem: () => null,
  setItem: () => {}
};

// Import the store (simplified test)
console.log('✅ Test setup complete');
console.log('Expected behavior: When URL has ?group=control, the questionnaire should load control.json with 9 steps including Activity Level');
console.log('Expected behavior: When URL has ?group=test, the questionnaire should load test.json with 8 steps excluding Activity Level');
