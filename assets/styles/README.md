# Dogfy Diet Design System - Mixing System

## Overview

The Dogfy Diet design system now includes a comprehensive SASS mixing system that allows developers to easily apply typography, colors, and elevation based on semantic roles rather than individual properties.

## 🎯 Key Benefits

- **Role-based styling**: Apply styles by semantic role (display-large, headline-medium, etc.)
- **Theme awareness**: Automatic light/dark theme switching
- **Unified approach**: Combine typography, colors, and elevation in one mixin call
- **Consistency**: Enforces design system rules across all components
- **Maintainability**: Centralized token management and role mappings

## 📁 File Structure

```
assets/styles/
├── _variables.scss          # All design tokens
├── _mixins-new.scss        # New advanced mixing system
├── _utilities.scss          # Generated utility classes
├── _examples.scss           # Usage examples
├── _mixins.scss           # Legacy mixins (preserved)
├── _typography.scss        # Legacy typography (preserved)
└── main.scss              # Main imports and compilation
```

## 🚀 Quick Start

### 1. Basic Component Styling

```scss
.my-component {
  @include component-style(
    $typography-role: body-medium,
    $color-role: surface,
    $elevation-level: 1,
    $weight: medium,
    $include-shadow: true
  );
}
```

### 2. Typography Only

```scss
.my-heading {
  @include typography-role(display-large, bold);
}
```

### 3. Colors Only

```scss
.my-button {
  @include color-role(primary, light);
}
```

### 4. Elevation Only

```scss
.my-card {
  @include elevation-role(2, true);
}
```

### 5. Theme-Aware Component

```scss
.my-component {
  // Light theme (default)
  @include component-style(
    $typography-role: body-medium,
    $color-role: surface,
    $elevation-level: 1
  );
  
  // Dark theme (automatic)
  @media (prefers-color-scheme: dark) {
    @include component-style(
      $typography-role: body-medium,
      $color-role: surface,
      $elevation-level: 1,
      $theme: dark
    );
  }
}
```

## 🎨 Available Roles

### Typography Roles

- `display-large`, `display-medium`, `display-small`
- `headline-large`, `headline-medium`, `headline-small`
- `title-large`, `title-medium`, `title-small`
- `body-large`, `body-medium`, `body-small`
- `label-large`, `label-medium`, `label-small`

### Color Roles

**Light Theme:**
- `primary`, `secondary`, `tertiary`
- `surface`, `surface-variant`
- `inverse`, `error`, `success`, `warning`, `info`

**Dark Theme:**
- Same roles available with automatic dark theme colors

### Elevation Levels

- `0` (flat) to `5` (highest)
- Includes appropriate z-index and shadow values

## 🔧 Advanced Usage

### Custom Weight and Emphasis

```scss
.my-emphasized-text {
  @include typography-role(
    $role: headline-large,
    $weight: semibold,
    $emphasis: true  // Adds letter spacing
  );
}
```

### Multiple States

```scss
.my-advanced-button {
  @include component-style(
    $typography-role: label-medium,
    $color-role: primary,
    $elevation-level: 2,
    $weight: medium,
    $include-shadow: true
  );
  
  // Loading state
  &.loading {
    opacity: 0.7;
    cursor: not-allowed;
  }
  
  // Success state
  &.success {
    @include component-style(
      $typography-role: label-medium,
      $color-role: success,
      $elevation-level: 2,
      $weight: medium
    );
  }
}
```

## 📱 Generated Utilities

The system automatically generates utility classes:

### Text Utilities
- `.text-display-large`, `.text-headline-medium`, etc.
- `.text-display-large-bold`, `.text-headline-medium-em`, etc.

### Color Utilities
- `.color-primary`, `.color-surface`, etc.
- Automatic dark theme support

### Elevation Utilities
- `.elevation-0`, `.elevation-1`, etc.
- Includes z-index and shadow

### Layout Utilities
- Spacing: `.p-4`, `.m-6`, etc.
- Flexbox: `.flex`, `.flex-center`, etc.
- Grid: `.grid-cols-2`, `.grid-cols-3`, etc.

## 🎯 Best Practices

1. **Use roles over individual properties**
   ```scss
   // Good
   @include component-style(
     $typography-role: headline-large,
     $color-role: primary
   );
   
   // Avoid
   font-size: $font-size-headline-large;
   color: map.get($md3-light-primary, 'on');
   ```

2. **Leverage theme awareness**
   ```scss
   // Automatic theme switching
   @include component-style($role: body-medium, $color-role: surface);
   
   // Manual theme control
   @include theme-variable($light-var, $dark-var);
   ```

3. **Use utility classes for rapid prototyping**
   ```scss
   .my-element {
     @extend .text-body-medium;
     @extend .bg-surface;
     @extend .elevation-1;
     @extend .p-4;
   }
   ```

4. **Combine with existing mixins**
   ```scss
   .my-responsive-component {
     @include component-style($typography-role: body-medium);
     @include respond-to(md) {
       @include typography-role(body-large);
     }
   }
   ```

## 🔄 Migration from Legacy

To migrate existing components:

1. **Replace individual properties**:
   ```scss
   // Before
   font-size: $font-size-body-medium;
   font-family: $font-family-secondary;
   color: $md3-light-on-surface;
   box-shadow: $shadow-md;
   
   // After
   @include component-style(
     $typography-role: body-medium,
     $color-role: surface,
     $elevation-level: 2
   );
   ```

2. **Update utility class usage**:
   ```scss
   // Before
   .my-class {
     @include typography(body, regular, secondary);
     @extend .bg-surface;
     @extend .shadow-md;
   }
   
   // After
   .my-class {
     @extend .text-body-medium;
     @extend .color-surface;
     @extend .elevation-2;
   }
   ```

## 📚 Reference

- [Material Design 3 Typography](https://m3.material.io/styles/typography)
- [Material Design 3 Color Roles](https://m3.material.io/styles/color)
- [SASS Documentation](https://sass-lang.com/documentation)

## 🤝 Contributing

When adding new roles or updating existing ones:

1. Add role to `$typography-roles` map
2. Add color role to `$color-roles-light` and `$color-roles-dark` maps
3. Add elevation level to `$elevation-shadows` map
4. Update documentation

This mixing system provides a powerful, flexible foundation for consistent, maintainable styling across the Dogfy Diet application.
