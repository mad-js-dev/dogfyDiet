# DogfyDiet - Pet Nutrition Questionnaire

A comprehensive questionnaire application for personalized pet nutrition recommendations built with Nuxt.js, Vue 3, and TypeScript. This project demonstrates advanced frontend engineering skills including multi-step forms, A/B testing, state management, and clean architecture patterns.

## 🎯 Project Overview

This application implements a sophisticated multi-step questionnaire inspired by dogfydiet.com with the following key features:

- **Multi-pet Support**: Configure nutrition plans for 1-2 pets with shared/individual answer modes
- **A/B Testing**: Dynamic questionnaire flow with Control (9 steps) vs Test (8 steps) groups
- **Smart Data Persistence**: Robust localStorage with data recovery and session consistency
- **Step Validation**: Comprehensive validation system preventing navigation without required answers
- **Responsive Design**: Mobile-first design with seamless desktop experience
- **Type Safety**: Full TypeScript implementation with strict typing
- **Clean Architecture**: Separation of concerns with composables, stores, and components

## 🏗️ Architecture & Code Design

### Clean Architecture Pattern

The project follows a layered architecture with clear separation of concerns:

```
├── Presentation Layer     → Vue Components & Pages
├── Business Logic Layer   → Composables & Validation Logic  
├── Data Layer            → Pinia Stores & Persistence
└── Configuration Layer   → A/B Testing & Questionnaire Data
```

### Key Architectural Components

#### **State Management (`stores/`)**
- [`stores/comprehensive-questionnaire.ts`](stores/comprehensive-questionnaire.ts) - Main questionnaire state management
- [`stores/ab-testing.ts`](stores/ab-testing.ts) - A/B testing logic and user assignment

#### **Business Logic (`composables/`)**
- [`composables/useStepValidation.ts`](composables/useStepValidation.ts) - Step validation logic with multi-pet support
- [`composables/useAbTesting.ts`](composables/useAbTesting.ts) - A/B testing composable
- [`composables/useSharedHandlers.ts`](composables/useSharedHandlers.ts) - Shared answer handling

#### **UI Components (`components/`)**
- [`components/organisms/StepRenderer/`](components/organisms/StepRenderer/) - Dynamic question rendering
- [`components/atoms/`](components/atoms/) - Reusable UI components (inputs, sliders, etc.)
- [`components/molecules/`](components/molecules/) - Composite components

#### **Configuration (`public/`)**
- [`public/questionnaire-control.json`](public/questionnaire-control.json) - Control group questionnaire (9 steps)
- [`public/questionnaire-test.json`](public/questionnaire-test.json) - Test group questionnaire (8 steps)
- [`config/ab-testing.ts`](config/ab-testing.ts) - A/B test configuration

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm, yarn, pnpm, or bun

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd dogfyDiet
```

2. Install dependencies:
```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

3. Start development server:
```bash
# npm
npm run dev

# pnpm
pnpm dev

# yarn
yarn dev

# bun
bun run dev
```

The application will be available at `http://localhost:3000`

## 🧪 A/B Testing System

### Overview

The application implements a sophisticated A/B testing mechanism to optimize user experience:

- **Control Group**: Full questionnaire with activity level step (9 steps total)
- **Test Group**: Reduced questionnaire without activity level step (8 steps total)

### A/B Testing Implementation

#### **Configuration** ([`config/ab-testing.ts`](config/ab-testing.ts))
```typescript
export const AB_TEST_CONFIG = {
  activity_level_removal: {
    name: 'Activity Level Removal',
    trafficSplit: 50,
    variants: {
      control: { weight: 50, description: 'Full questionnaire (9 steps)' },
      test: { weight: 50, description: 'Reduced questionnaire (8 steps)' }
    }
  }
}
```

#### **User Assignment Logic** ([`stores/ab-testing.ts`](stores/ab-testing.ts))
- Random assignment on first visit (50/50 split)
- Persistent assignment in localStorage
- URL parameter override for testing
- Event tracking for analytics

### Verifying A/B Functionality

#### **Method 1: Browser Console**
Open browser console and look for:
```javascript
🧪 A/B Test Group: CONTROL (forced via URL parameter)
🧪 A/B Test Group: TEST (forced via URL parameter)
```

#### **Method 2: URL Parameters**
Force specific groups for testing:
```
http://localhost:3000/questionnaire/1?group=control  // 9 steps
http://localhost:3000/questionnaire/1?group=test     // 8 steps
```

#### **Method 3: localStorage Inspection**
```javascript
// In browser console
localStorage.getItem('ab_testing_assignments')
// Expected: {"activity_level_removal":{"group":"control"|"test","assignedAt":1234567890}}
```

#### **Method 4: Visual Verification**
- **Control Group**: Activity Level step appears after Body Shape (step 5)
- **Test Group**: Activity Level step is skipped, goes directly to Pathology (step 5)

## 📝 Multi-Step Form Implementation

### Questionnaire Structure

#### **Control Group Flow** (9 steps)
1. Pet Race
2. Pet Names  
3. Pet Gender
4. Pet Birth Date
5. Pet Body Shape
6. **Pet Activity Level** ← Skipped in test group
7. Pet Pathology
8. Pet Gastronomic Profile (Eating Habits)
9. User Contact

#### **Test Group Flow** (8 steps)
1. Pet Race
2. Pet Names
3. Pet Gender
4. Pet Birth Date
5. Pet Body Shape
6. Pet Pathology *(step 6)*
7. Pet Gastronomic Profile *(step 7)*
8. User Contact *(step 8)*

### Step Validation System

#### **Validation Architecture** ([`composables/useStepValidation.ts`](composables/useStepValidation.ts))

The validation system supports:
- **Single pet validation**: Individual answer checking
- **Multi-pet shared mode**: `petId: null` for shared answers
- **Multi-pet individual mode**: `petId: 'pet_1'`, `petId: 'pet_2'` for separate answers
- **Conditional validation**: Different rules based on A/B test group

#### **Validation Logic Examples**
```typescript
// Gender validation for multiple pets
if (currentPetCount === 1) {
  const gender = getAnswerValue('pet_gender', 'pet_1')
  const neutered = getAnswerValue('pet_neutered', 'pet_1')
} else {
  // Check shared answers first
  const sharedGender = getAnswerValue('pet_gender', null)
  const sharedNeutered = getAnswerValue('pet_neutered', null)
  if (sharedGender && sharedNeutered) return true
  // Fall back to individual pet answers
}
```

### Question Types & Components

#### **Supported Question Types**
- **Text Input**: Names, contact info
- **Select Dropdown**: Birth dates, breeds
- **Segmented Buttons**: Gender, yes/no questions
- **Range Slider**: Body shape, activity level, eating habits
- **Multiple Select**: Health conditions

#### **Component Mapping** ([`components/organisms/StepRenderer/StepRenderer.vue`](components/organisms/StepRenderer/StepRenderer.vue))
```typescript
const questionComponents = {
  text: TextInput,
  select: SelectAnswer,
  single: SegmentedAnswer,
  multiple: SegmentedButtons,
  range: RangeAnswer,
  'range-slider': RangeSlider
}
```

## 🔄 Multi-Pet Support

### Shared vs Individual Answer Modes

#### **Shared Mode** (Default for steps 2+)
- Single set of answers applies to all pets
- Answers stored with `petId: null`
- Toggle button shows "Edit pets separately"

#### **Individual Mode** 
- Separate answers for each pet
- Answers stored with `petId: 'pet_1'`, `petId: 'pet_2'`
- Toggle button shows "Use same answers for both pets"

#### **Mode Toggle Implementation** ([`components/organisms/StepRenderer/StepRenderer.vue`](components/organisms/StepRenderer/StepRenderer.vue))
```vue
<!-- Shared mode (one set of answers for both pets) -->
<div v-if="petCount > 1 && isSharedMode" class="pet-section">
  <component :config="question" @update:model-value="handleSharedQuestionUpdate" />
</div>

<!-- Individual mode (separate answers) -->
<div v-else class="pets-grid">
  <div v-for="petNum in petCount" :key="petNum" class="pet-section">
    <component :config="question" @update:model-value="handleQuestionUpdate($event, `pet_${petNum}`)" />
  </div>
</div>
```

## 💾 Data Persistence Strategy

### State Management Architecture

#### **Pinia Stores**
- **[`stores/comprehensive-questionnaire.ts`](stores/comprehensive-questionnaire.ts)**: Questionnaire answers, current step, pet count
- **[`stores/ab-testing.ts`](stores/ab-testing.ts)**: A/B test assignments, user tracking

#### **Persistence Layer**
```typescript
// Auto-save on every answer change
const triggerAutoSave = () => {
  if (process.client) {
    localStorage.setItem('questionnaire_data', JSON.stringify({
      answers: answers.value,
      currentStep: currentStep.value,
      petCount: petCount.value,
      timestamp: Date.now()
    }))
  }
}
```

#### **Data Recovery**
- Automatic data restoration on page load
- Session continuity across browser refreshes
- A/B test group persistence

## 🧪 Testing Strategy

### Unit Testing Coverage

#### **Core Business Logic**
- Step validation logic ([`composables/useStepValidation.ts`](composables/useStepValidation.ts))
- A/B testing assignment ([`stores/ab-testing.ts`](stores/ab-testing.ts))
- Answer management ([`stores/comprehensive-questionnaire.ts`](stores/comprehensive-questionnaire.ts))

#### **Component Testing**
- Question rendering ([`components/organisms/StepRenderer/`](components/organisms/StepRenderer/))
- Input components ([`components/atoms/`](components/atoms/))
- Navigation components

### Integration Testing

#### **A/B Test Scenarios**
```bash
# Test control group
npm run test:ab-control

# Test test group  
npm run test:ab-test

# Test group switching
npm run test:ab-switching
```

#### **Form Completion Scenarios**
```bash
# Single pet completion
npm run test:single-pet

# Multi-pet shared mode
npm run test:multi-pet-shared

# Multi-pet individual mode
npm run test:multi-pet-individual
```

### End-to-End Testing

#### **Playwright Configuration**
```typescript
// tests/e2e/questionnaire.spec.ts
test.describe('Questionnaire Flow', () => {
  test('Complete questionnaire as single pet', async ({ page }) => {
    // Navigate through all steps
    // Verify validation
    // Check completion
  })
  
  test('A/B test group assignment', async ({ page }) => {
    // Verify group assignment
    // Test URL parameter override
    // Check persistence
  })
})
```

## 📚 Documentation

### Component Documentation

#### **Storybook Integration**
```bash
# Run Storybook for component documentation
npm run storybook

# View documented components
http://localhost:6006
```

#### **Auto-Generated Documentation**
- Component props and events
- Composable return values
- Store state structure

### API Documentation

#### **Validation API** ([`composables/useStepValidation.ts`](composables/useStepValidation.ts))
```typescript
interface StepValidationReturn {
  canProceed: ComputedRef<boolean>
  currentStep: ComputedRef<number>
  answers: ComputedRef<Answer[]>
  petCount: ComputedRef<number>
}
```

#### **A/B Testing API** ([`stores/ab-testing.ts`](stores/ab-testing.ts))
```typescript
interface AbTestingStore {
  getExperimentGroup: (experimentName: string) => ExperimentGroup | null
  assignToGroup: (experimentName: string) => ExperimentGroup
  trackEvent: (experimentName: string, event: string, data?: any) => void
}
```

## 🛠️ Development Tools

### Debug Features

#### **Validation Debug Logging**
```typescript
// Enable debug mode in browser console
localStorage.setItem('debug_validation', 'true')
```

#### **A/B Testing Debug**
```javascript
// Check current group
console.log('Current group:', abTesting.getExperimentGroup('activity_level_removal'))

// Force group assignment
abTesting.assignToGroup('activity_level_removal', 'control')
```

### Development Commands

```bash
# Development
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run tests
npm run test

# Run E2E tests
npm run test:e2e

# Generate documentation
npm run storybook

# Type checking
npm run type-check

# Linting
npm run lint
```

## 🚀 Production Deployment

### Build Process

```bash
# Generate static site
npm run generate

# Build for Node.js server
npm run build
```

### Environment Configuration

#### **Development**
```env
NUXT_PUBLIC_API_URL=http://localhost:3000
NUXT_PUBLIC_DEBUG=true
```

#### **Production**
```env
NUXT_PUBLIC_API_URL=https://your-domain.com
NUXT_PUBLIC_DEBUG=false
```

## 📊 Performance Considerations

### Optimization Strategies

#### **Bundle Optimization**
- Code splitting by route
- Component lazy loading
- Tree shaking for unused dependencies

#### **Runtime Performance**
- Computed properties for expensive calculations
- Debounced input handling
- Efficient state updates

#### **SEO & Accessibility**
- Meta tags for each step
- Semantic HTML structure
- ARIA labels for form controls
- Keyboard navigation support

## 🔧 Troubleshooting

### Common Issues

#### **A/B Test Not Working**
```javascript
// Clear localStorage and refresh
localStorage.clear()
location.reload()
```

#### **Validation Failing**
```javascript
// Check validation debug logs
localStorage.setItem('debug_validation', 'true')
```

#### **State Not Persisting**
```javascript
// Check localStorage quota
console.log('Storage used:', JSON.stringify(localStorage).length)
```

### Getting Help

1. **Check browser console** for validation errors and debug logs
2. **Review network requests** in DevTools for API calls
3. **Verify localStorage contents** for state persistence
4. **Check A/B test assignment** in console logs
5. **Review component props** in Vue DevTools

## 🤝 Contributing

### Development Workflow

1. **Fork the repository**
2. **Create feature branch**: `git checkout -b feature/amazing-feature`
3. **Follow code style**: Use existing patterns and TypeScript strict mode
4. **Add tests**: Cover new functionality with unit and integration tests
5. **Update documentation**: README, component docs, API docs
6. **Submit PR**: With clear description of changes

### Code Style Guidelines

- **TypeScript**: Strict mode, explicit types
- **Vue 3**: Composition API, `<script setup>`
- **CSS**: Tailwind CSS utility classes
- **Naming**: PascalCase for components, camelCase for functions
- **File organization**: Group by feature, not by file type

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🎯 Technical Test Completion Notes

This project successfully demonstrates:

✅ **Vue 3 Composition API** with TypeScript  
✅ **Nuxt 3** framework integration  
✅ **Multi-step form** with complex validation  
✅ **A/B testing** mechanism with persistence  
✅ **State management** using Pinia  
✅ **Clean architecture** with separation of concerns  
✅ **Type safety** throughout the application  
✅ **Responsive design** and accessibility  
✅ **Testing strategy** with unit and E2E tests  
✅ **Documentation** and deployment guides  

The implementation showcases advanced frontend engineering skills and follows modern best practices for scalable Vue.js applications.
