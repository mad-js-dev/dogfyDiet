# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2025-02-17

### Added
- Initial implementation of RangeSlider component
- Horizontal slider with discrete step functionality
- Touch and mouse interaction support
- Keyboard navigation (arrow keys, Home, End)
- Visual feedback with step indicators and progress
- Optional labels and value display
- Accessibility features with ARIA attributes
- Comprehensive unit test coverage
- Storybook documentation and examples
- TypeScript support with proper type definitions
- SCSS styling with CSS custom properties for theming
- Validation support for required fields
- Responsive design for mobile and desktop

### Features
- **Discrete Step Selection**: Fixed positions ensure precise option selection
- **Visual Progress Indicators**: Shows completed and current steps
- **Smart Label Extraction**: Automatically generates short labels from long descriptions
- **Event Emission**: Emits both v-model updates and custom answer events
- **Error Handling**: Built-in validation with error display
- **Component Structure**: Follows established component architecture patterns

### Technical Details
- Built with Vue 3 Composition API
- TypeScript for type safety
- SCSS for styling with CSS custom properties
- Vitest for unit testing
- Storybook for documentation and visual testing
- Full accessibility compliance
- Mobile-responsive design

### Browser Support
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

### Dependencies
- Vue 3
- TypeScript
- SCSS
- Vitest (testing)
- Storybook (documentation)
