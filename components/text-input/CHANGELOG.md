# Changelog

All notable changes to the TextInput component will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2026-02-17

### Added
- Initial release of TextInput component
- Support for multiple input types (text, email, tel)
- Comprehensive validation system with the following rules:
  - Required field validation
  - Minimum length validation
  - Maximum length validation
  - Custom pattern validation
  - Email format validation
  - Phone number validation
- Real-time input validation and error display
- Automatic input type detection based on config.type and validation patterns
- Support for v-model two-way binding
- Event emission for answer updates (input and blur)
- Multi-pet form support with petId prop
- Disabled state handling
- BEM CSS methodology for maintainable styles
- SCSS structure with nested selectors
- Comprehensive test suite covering all functionality
- Storybook stories for all use cases and variants
- Complete documentation with examples

### Features
- **Input Type Detection**: Automatically detects email inputs from validation patterns
- **Legacy Support**: Maintains compatibility with existing validation patterns
- **Accessibility**: Proper ARIA attributes and semantic HTML
- **Styling**: Modern design with focus states and transitions
- **Error Handling**: Clear error messages with proper display logic
- **Reactivity**: Responsive to external prop changes

### Technical Details
- Vue 3 Composition API with TypeScript
- SCSS with BEM methodology
- Vitest testing framework
- Storybook documentation
- Comprehensive prop and event interfaces

### Breaking Changes
- Component renamed from `TextAnswer` to `TextInput`
- CSS classes updated to follow BEM convention:
  - `.text-answer` → `.c-text-input`
  - `.text-input` → `.c-text-input__input`
  - `.error-message` → `.c-text-input__error`
- Import path changed from `~/components/TextAnswer.vue` to `~/components/text-input/textInput.vue`

### Migration Guide
To migrate from TextAnswer to TextInput:

1. **Update imports**:
   ```typescript
   // Before
   import TextAnswer from '~/components/TextAnswer.vue'
   
   // After
   import TextInput from '~/components/text-input/textInput.vue'
   ```

2. **Update component usage**:
   ```vue
   <!-- Before -->
   <TextAnswer :config="config" v-model="value" />
   
   <!-- After -->
   <TextInput :config="config" v-model="value" />
   ```

3. **Update CSS selectors** (if targeting styles):
   ```css
   /* Before */
   .text-input { }
   .error-message { }
   
   /* After */
   .c-text-input__input { }
   .c-text-input__error { }
   ```

### Dependencies
- Vue 3
- TypeScript
- SCSS
- Vitest (for testing)
- Storybook (for documentation)

### Documentation
- Complete README with usage examples
- Comprehensive test coverage
- Interactive Storybook stories
- Component API documentation
