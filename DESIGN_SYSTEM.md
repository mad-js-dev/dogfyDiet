# Dogfy Diet Design System

A comprehensive design system extracted from [dogfydiet.com](https://dogfydiet.com/) that provides colors, typography, spacing, and component utilities for building consistent and beautiful user interfaces.

## 🎨 Overview

This design system is built with SASS/SCSS and provides:

- **Color Palette** - Primary, accent, and semantic colors extracted from the original site
- **Typography** - Font families, sizes, weights, and utilities
- **Spacing** - Consistent spacing scale based on 8px grid
- **Components** - Pre-built button, card, and form styles
- **Utilities** - Extensive utility classes for rapid development
- **Responsive** - Mobile-first responsive design utilities

## 📁 File Structure

```
assets/styles/
├── _variables.scss      # All design tokens (colors, fonts, spacing, etc.)
├── _mixins.scss         # Reusable mixins (buttons, forms, responsive, etc.)
├── _typography.scss     # Typography base styles and utilities
└── main.scss           # Main entry point and global styles
```

## 🚀 Quick Start

### Installation

The design system is already integrated into the Nuxt.js application. All SASS variables and mixins are automatically available in any component.

### Usage in Components

```vue
<template>
  <div class="questionnaire-card">
    <h1 class="questionnaire-title">Pet Nutrition Questionnaire</h1>
    <p class="questionnaire-subtitle">Get personalized nutrition plans</p>
    
    <button class="button primary">Get Started</button>
    <button class="button secondary outline">Learn More</button>
  </div>
</template>

<style lang="scss" scoped>
.questionnaire-card {
  @include card-base(true, false);
  padding: $spacing-8;
  background: $neutral-lightest;
}

.questionnaire-title {
  @include typography(h1, semibold, primary);
  color: map.get($brand-colors, 'primary');
}

.questionnaire-subtitle {
  @include typography(body-large, regular, secondary);
  color: $neutral-medium;
}
</style>
```

## 🎨 Color System

### Primary Colors

| Variable | Value | Usage |
|----------|-------|-------|
| `map.get($brand-colors, 'primary')` | `#00B67A` | Main brand color, CTAs, important elements |
| `map.get($brand-colors, 'primary-dark')` | `#1BB57C` | Hover states, emphasis |
| `map.get($brand-colors, 'primary-light')` | `#0aaa46` | Success states, secondary actions |
| `map.get($brand-colors, 'primary-darkest')` | `#005128` | Dark backgrounds, contrast |

### Accent Colors

| Variable | Value | Usage |
|----------|-------|-------|
| `$accent-orange` | `#EF6948` | Secondary CTAs, highlights |
| `$accent-orange-dark` | `#ed6948` | Hover states |
| `$accent-yellow` | `#ffc800` | Warnings, highlights |

### Neutral Colors

| Variable | Value | Usage |
|----------|-------|-------|
| `$neutral-darkest` | `#1a1a1a` | Headings, important text |
| `$neutral-dark` | `#3d3d3d` | Body text, primary content |
| `$neutral-medium` | `#767676` | Secondary text, placeholders |
| `$neutral-light` | `#e8e8e8` | Borders, dividers |
| `$neutral-lighter` | `#d6d6d6` | Subtle borders |
| `$neutral-lightest` | `#f7f7f7` | Backgrounds, cards |
| `$neutral-white` | `#ffffff` | Primary background |

### Semantic Colors

| Variable | Value | Usage |
|----------|-------|-------|
| `map.get($semantic-colors, 'success')` | `#0aaa46` | Success messages, valid states |
| `map.get($semantic-colors, 'error')` | `#d80003` | Error messages, invalid states |
| `map.get($semantic-colors, 'warning')` | `#ffc800` | Warnings, caution |
| `map.get($semantic-colors, 'info')` | `#1976D2` | Information messages |

**Note:** Individual variables (`$success`, `$error`, `$warning`, `$info`) are maintained for backward compatibility but new code should use the map syntax above.

### Color Utilities

```html
<!-- Background colors -->
<div class="bg-primary">Primary background</div>
<div class="bg-accent">Accent background</div>
<div class="bg-lightest">Light background</div>

<!-- Text colors -->
<p class="text-primary">Primary text</p>
<p class="text-medium">Secondary text</p>
<p class="text-success">Success text</p>
```

## 📝 Typography System

### Font Families

| Variable | Value | Usage |
|----------|-------|-------|
| `$font-primary` | `'PP Agrandir', sans-serif` | Headings, display text |
| `$font-secondary` | `'Manrope', sans-serif` | Body text, UI elements |
| `$font-mono` | Monospace stack | Code, data |

### Font Sizes

| Variable | Value | Usage |
|----------|-------|-------|
| `$font-size-display-xl` | `74px` | Hero headings |
| `$font-size-display-lg` | `60px` | Large display |
| `$font-size-display-md` | `50px` | Medium display |
| `$font-size-display-sm` | `40px` | Small display |
| `$font-size-h1` | `47.31px` | Main headings |
| `$font-size-h2` | `31.53px` | Section headings |
| `$font-size-h3` | `24px` | Subsection headings |
| `$font-size-h4` | `21px` | Card titles |
| `$font-size-h5` | `18px` | Small headings |
| `$font-size-h6` | `16px` | Micro headings |
| `$font-size-body-large` | `18px` | Important body text |
| `$font-size-body` | `16px` | Regular body text |
| `$font-size-body-small` | `14px` | Small body text |
| `$font-size-caption` | `12px` | Captions, labels |
| `$font-size-caption-small` | `11.43px` | Small captions |

### Font Weights

| Variable | Value | Usage |
|----------|-------|-------|
| `$font-weight-thin` | `300` | Light text |
| `$font-weight-regular` | `400` | Regular text |
| `$font-weight-medium` | `500` | Medium emphasis |
| `$font-weight-semibold` | `600` | Semibold |
| `$font-weight-bold` | `700` | Bold |
| `$font-weight-black` | `900` | Display text |

### Typography Mixins

```scss
// Basic usage
.element {
  @include typography(h2, semibold, primary);
}

// Available parameters
@include typography($size, $weight, $family);

// Sizes: display-xl, display-lg, display-md, display-sm, h1, h2, h3, h4, h5, h6, body-large, body, body-small, caption, caption-small
// Weights: thin, light, regular, medium, semibold, bold, black
// Families: primary, secondary, mono
```

### Typography Utilities

```html
<!-- Font sizes -->
<h1 class="text-5xl">Display heading</h1>
<h2 class="text-3xl">Section heading</h2>
<p class="text-lg">Large body text</p>
<p class="text-base">Regular body text</p>
<p class="text-sm">Small body text</p>
<p class="text-xs">Caption text</p>

<!-- Font weights -->
<p class="font-light">Light text</p>
<p class="font-normal">Regular text</p>
<p class="font-medium">Medium text</p>
<p class="font-semibold">Semibold text</p>
<p class="font-bold">Bold text</p>

<!-- Font families -->
<p class="font-primary">Primary font</p>
<p class="font-secondary">Secondary font</p>
<p class="font-mono">Monospace font</p>
```

## 📏 Spacing System

The spacing system is based on an 8px grid for consistency.

### Spacing Scale

| Class | Value | Variable |
|-------|-------|----------|
| `p-0` / `m-0` | `0` | `$spacing-0` |
| `p-1` / `m-1` | `4px` | `$spacing-1` |
| `p-2` / `m-2` | `8px` | `$spacing-2` |
| `p-3` / `m-3` | `12px` | `$spacing-3` |
| `p-4` / `m-4` | `16px` | `$spacing-4` |
| `p-5` / `m-5` | `20px` | `$spacing-5` |
| `p-6` / `m-6` | `24px` | `$spacing-6` |
| `p-8` / `m-8` | `32px` | `$spacing-8` |
| `p-10` / `m-10` | `40px` | `$spacing-10` |
| `p-12` / `m-12` | `48px` | `$spacing-12` |
| `p-16` / `m-16` | `64px` | `$spacing-16` |
| `p-20` / `m-20` | `80px` | `$spacing-20` |
| `p-24` / `m-24` | `96px` | `$spacing-24` |

### Semantic Spacing

| Class | Value | Variable |
|-------|-------|----------|
| `p-xs` / `m-xs` | `4px` | `$spacing-xs` |
| `p-sm` / `m-sm` | `8px` | `$spacing-sm` |
| `p-md` / `m-md` | `16px` | `$spacing-md` |
| `p-lg` / `m-lg` | `24px` | `$spacing-lg` |
| `p-xl` / `m-xl` | `32px` | `$spacing-xl` |
| `p-2xl` / `m-2xl` | `48px` | `$spacing-2xl` |
| `p-3xl` / `m-3xl` | `64px` | `$spacing-3xl` |

## 🎯 Component System

### Buttons

#### Button Mixin

```scss
@include button-base($size, $variant);

// Sizes: sm, md, lg
// Variants: primary, secondary, outline, ghost
```

#### Button Classes

```html
<!-- Primary buttons -->
<button class="button">Primary</button>
<button class="button secondary">Secondary</button>
<button class="button outline">Outline</button>
<button class="button ghost">Ghost</button>

<!-- Button sizes -->
<button class="button small">Small</button>
<button class="button">Medium</button>
<button class="button large">Large</button>
```

### Cards

#### Card Mixin

```scss
@include card-base($elevated, $bordered);

// $elevated: true/false - Whether card has shadow
// $bordered: true/false - Whether card has border
```

#### Card Classes

```html
<div class="card">Standard card (elevated)</div>
<div class="card bordered">Bordered card</div>
<div class="card flat">Flat card</div>
```

### Form Elements

#### Input Mixin

```scss
@include input-base($size, $state);

// Sizes: sm, md, lg
// States: default, error, success, warning
```

#### Form Classes

```html
<label class="form-label">Label</label>
<input type="text" class="w-full p-3 border-2 border-light rounded-lg" />
<p class="form-error">Error message</p>
<p class="form-success">Success message</p>
```

## 📱 Responsive Design

### Breakpoint System

| Breakpoint | Value | Usage |
|------------|-------|-------|
| `sm` | `640px` | Small tablets |
| `md` | `768px` | Tablets |
| `lg` | `1024px` | Laptops |
| `xl` | `1280px` | Desktop |
| `2xl` | `1536px` | Large desktop |

### Responsive Mixins

```scss
// Mobile-first (min-width)
@include respond-to(sm) { /* Small and up */ }
@include respond-to(md) { /* Medium and up */ }
@include respond-to(lg) { /* Large and up */ }

// Desktop-first (max-width)
@include respond-down-to(mobile) { /* Mobile only */ }
@include respond-down-to(tablet) { /* Tablet and down */ }

// Range between breakpoints
@include respond-between(sm, md) { /* Small to medium */ }
```

### Responsive Utilities

```html
<!-- Hide on specific breakpoints -->
<div class="mobile-hidden">Hidden on mobile</div>
<div class="desktop-hidden">Hidden on desktop</div>

<!-- Responsive typography -->
<p class="text-responsive-sm">Responsive small text</p>
<p class="text-responsive-md">Responsive medium text</p>
<p class="text-responsive-lg">Responsive large text</p>
```

## 🎭 Animations

### Animation Mixins

```scss
@include fade-in($duration);
@include slide-up($distance, $duration);
@include scale-in($scale, $duration);
```

### Animation Classes

```html
<div class="fade-in">Fade in animation</div>
<div class="slide-up">Slide up animation</div>
<div class="scale-in">Scale in animation</div>

<div class="hover-lift">Hover lift effect</div>
<div class="hover-scale">Hover scale effect</div>
```

## 🎨 Utility Classes

### Layout Utilities

```html
<!-- Display -->
<div class="block">Block</div>
<div class="flex">Flex</div>
<div class="grid">Grid</div>
<div class="hidden">Hidden</div>

<!-- Flexbox -->
<div class="flex-row">Row direction</div>
<div class="flex-col">Column direction</div>
<div class="items-center">Align center</div>
<div class="justify-between">Justify between</div>

<!-- Position -->
<div class="relative">Relative</div>
<div class="absolute">Absolute</div>
<div class="fixed">Fixed</div>
```

### Visual Utilities

```html
<!-- Borders -->
<div class="border">Border</div>
<div class="border-2">Thick border</div>
<div class="border-primary">Primary border</div>

<!-- Border radius -->
<div class="rounded-sm">Small radius</div>
<div class="rounded">Medium radius</div>
<div class="rounded-lg">Large radius</div>
<div class="rounded-full">Full radius</div>

<!-- Shadows -->
<div class="shadow-sm">Small shadow</div>
<div class="shadow">Medium shadow</div>
<div class="shadow-lg">Large shadow</div>
<div class="shadow-primary">Primary shadow</div>
```

## 🐾 Questionnaire Specific Styles

### Questionnaire Components

```html
<!-- Questionnaire container -->
<div class="questionnaire-container">
  <div class="questionnaire-card">
    <!-- Progress bar -->
    <div class="progress-bar">
      <div class="progress-fill" style="width: 65%;"></div>
    </div>
    
    <!-- Step content -->
    <h2 class="step-title">Pet Information</h2>
    <p class="step-description">Tell us about your pets</p>
    
    <!-- Pet sections -->
    <div class="pet-section active">
      <h3 class="pet-name">Max</h3>
      <p class="pet-info">Golden Retriever • 3 years</p>
    </div>
    
    <!-- Shared mode toggle -->
    <button class="shared-mode-toggle">Use same answers</button>
    
    <!-- Navigation -->
    <div class="step-navigation">
      <button class="button ghost">Previous</button>
      <button class="button">Next</button>
    </div>
  </div>
</div>
```

### Questionnaire Typography

```html
<h1 class="questionnaire-title">Main title</h1>
<p class="questionnaire-subtitle">Subtitle text</p>
<h2 class="step-title">Step title</h2>
<p class="step-description">Step description</p>
<p class="question-text">Question text</p>
<p class="question-help">Help text</p>
<h3 class="pet-name">Pet name</h3>
<p class="pet-section-title">Section title</p>
```

## 🔧 Customization

### Adding New Colors

1. Add to `_variables.scss`:
```scss
$new-color: #your-color-hex !default;
```

2. Add utilities in `main.scss`:
```scss
.bg-new-color { background-color: $new-color; }
.text-new-color { color: $new-color; }
```

### Adding New Typography

1. Add size/weight to `_variables.scss`:
```scss
$font-size-new: 20px !default;
$font-weight-new: 600 !default;
```

2. Add to typography mixin in `_mixins.scss`:
```scss
@else if $size == new {
  font-size: $font-size-new;
}
```

### Adding New Components

1. Create mixin in `_mixins.scss`:
```scss
@mixin component-base($variant) {
  // Component styles here
}
```

2. Add utilities in `main.scss`:
```scss
.component {
  @include component-base(default);
}
```

## 📚 Best Practices

### 1. Use Design Tokens

```scss
// ✅ Good
.my-component {
  background: map.get($brand-colors, 'primary');
  padding: $spacing-4;
  @include typography(body, regular, secondary);
}

// ❌ Avoid hardcoded values
.my-component {
  background: #00B67A;
  padding: 16px;
  font-family: 'Manrope', sans-serif;
  font-size: 16px;
}
```

### 2. Mobile-First Approach

```scss
// ✅ Good - Mobile-first
.component {
  padding: $spacing-4;
  
  @include respond-to(md) {
    padding: $spacing-6;
  }
}

// ❌ Avoid desktop-first
.component {
  padding: $spacing-6;
  
  @include respond-down-to(mobile) {
    padding: $spacing-4;
  }
}
```

### 3. Use Mixins for Repeated Patterns

```scss
// ✅ Good - Use mixins
.card {
  @include card-base(true, false);
}

.button {
  @include button-base(md, primary);
}

// ❌ Avoid repetition
.card {
  background: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
}
```

### 4. Semantic Class Names

```html
<!-- ✅ Good - Semantic -->
<div class="questionnaire-card">
  <h2 class="step-title">Pet Information</h2>
  <button class="shared-mode-toggle">Toggle Mode</button>
</div>

<!-- ❌ Avoid presentational -->
<div class="white-rounded-card-shadow">
  <h2 class="large-bold-text">Pet Information</h2>
  <button class="blue-rounded-button">Toggle Mode</button>
</div>
```

## 🧪 Testing the Design System

### Design System Demo Page

Visit `/design-system` to see a comprehensive demo of all design system components and utilities.

### Component Testing

```vue
<template>
  <div class="design-test">
    <button class="button">Test Button</button>
    <div class="card">Test Card</div>
    <p class="text-primary">Test Typography</p>
  </div>
</template>

<style lang="scss" scoped>
.design-test {
  // All design system variables are available
  padding: $spacing-8;
  background: $neutral-lightest;
}
</style>
```

## 🔍 Browser Support

- **Modern Browsers**: Chrome 60+, Firefox 60+, Safari 12+, Edge 79+
- **CSS Features**: CSS Grid, Flexbox, Custom Properties, SASS/SCSS
- **Font Loading**: Font-display swap for better performance

## 📖 Resources

- [Live Design System Demo](/design-system)
- [Original Website](https://dogfydiet.com/)
- [SASS Documentation](https://sass-lang.com/documentation)
- [Nuxt.js Styling Guide](https://nuxt.com/docs/getting-started/styling)

## 🤝 Contributing

When adding to the design system:

1. **Follow existing patterns** - Use established naming conventions
2. **Document changes** - Update this documentation
3. **Test thoroughly** - Check all breakpoints and states
4. **Consider accessibility** - Ensure proper contrast and focus states
5. **Maintain consistency** - Keep the system cohesive

---

This design system provides a solid foundation for building consistent, beautiful, and accessible user interfaces that match the Dogfy Diet brand and user experience.
