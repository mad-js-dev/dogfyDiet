# Plan: Direct Sass Variable Usage in JavaScript

## Current Problem
The `colors.js` file contains hardcoded values that need manual syncing with Sass variables.

## Proposed Solution
Use CSS custom properties as a bridge between Sass and JavaScript, eliminating the need for migration scripts.

## Implementation Plan

### 1. Create CSS Custom Properties from Sass Variables ✅
- **File**: `assets/styles/_css-variables.scss`
- **Purpose**: Convert Sass variables to CSS custom properties using Sass interpolation
- **Example**: `--primary-green: #{$primary-green};`

### 2. Import CSS Variables in Main Stylesheet ✅
- **File**: `assets/styles/main.scss`
- **Change**: Add `@use './css-variables' as *;`
- **Result**: CSS custom properties are generated and available globally

### 3. Update JavaScript to Read CSS Custom Properties ✅
- **File**: `.storybook/utils/colors-direct.js`
- **Approach**: Use getters that read from CSS custom properties at runtime
- **Benefits**: 
  - No migration scripts needed
  - Always uses current Sass values
  - Falls back to sensible defaults

### 4. Replace Current colors.js File
- **Action**: Replace existing `colors.js` with `colors-direct.js`
- **Result**: Direct integration with Sass variables

## Technical Details

### CSS Custom Properties Generated
```css
:root {
  --primary-green: #00B67A;
  --accent-orange: #EF6948;
  --accent-yellow: #ffc800;
  /* ... and all other colors */
}
```

### JavaScript Access Pattern
```javascript
get primaryGreen() {
  return getCssProperty('--primary-green', '#00B67A')
}
```

## Benefits
1. **No Migration Scripts**: Colors are read directly from CSS custom properties
2. **Always Synced**: JavaScript always gets current Sass values
3. **Type Safety**: Maintains the same API as current implementation
4. **Performance**: Only reads properties when accessed
5. **Fallbacks**: Provides sensible defaults if CSS properties aren't available

## Required Changes
1. ✅ Create `_css-variables.scss`
2. ✅ Update `main.scss` import
3. ✅ Create new `colors.js` implementation
4. ⏳ Replace existing `colors.js` file
5. ⏳ Test Storybook integration

## Migration Steps
1. Backup current `colors.js`
2. Replace with new implementation
3. Test Storybook components
4. Update any direct imports if needed

This approach provides a clean, maintainable solution without requiring build-time scripts.
