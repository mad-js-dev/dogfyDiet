# SegmentedButtons Component

A Material Design 3 inspired segmented buttons component for binary or multi-choice selections.

## Features

- 🎨 **Material Design 3** styling with smooth transitions
- ♿ **Accessibility** compliant with ARIA attributes
- 📱 **Responsive** design that stacks on mobile
- 🎯 **Flexible** - supports 2 or more options
- 🎭 **Theming** support with CSS custom properties
- ⌨️ **Keyboard** navigation support
- 📏 **Size variants** (small, medium, large)

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `modelValue` | `string` | **required** | Currently selected value |
| `options` | `SegmentedButtonOption[]` | **required** | Array of options to display |
| `name` | `string` | `undefined` | Name for form compatibility |
| `disabled` | `boolean` | `false` | Disable all buttons |
| `required` | `boolean` | `false` | Mark as required field |
| `size` | `'small' \| 'medium' \| 'large'` | `'medium'` | Button size variant |

## Types

```typescript
interface SegmentedButtonOption {
  value: string      // The value to emit when selected
  label?: string     // Display text (defaults to value)
  disabled?: boolean // Disable individual option
}
```

## Events

| Event | Payload | Description |
|-------|---------|-------------|
| `update:modelValue` | `string` | Emitted when selection changes |
| `change` | `string` | Emitted when selection changes |

## Usage Examples

### Basic Usage

```vue
<template>
  <SegmentedButtons
    v-model="selectedGender"
    :options="[
      { value: 'male', label: 'Male' },
      { value: 'female', label: 'Female' }
    ]"
    name="gender"
  />
</template>

<script setup>
import { ref } from 'vue'
import SegmentedButtons from '~/components/segmented-buttons/SegmentedButtons.vue'

const selectedGender = ref('')
</script>
```

### With Disabled Options

```vue
<template>
  <SegmentedButtons
    v-model="selectedPlan"
    :options="[
      { value: 'basic', label: 'Basic' },
      { value: 'pro', label: 'Pro', disabled: true },
      { value: 'enterprise', label: 'Enterprise' }
    ]"
  />
</template>
```

### Size Variants

```vue
<template>
  <!-- Small -->
  <SegmentedButtons
    v-model="smallValue"
    :options="options"
    size="small"
  />
  
  <!-- Medium (default) -->
  <SegmentedButtons
    v-model="mediumValue"
    :options="options"
  />
  
  <!-- Large -->
  <SegmentedButtons
    v-model="largeValue"
    :options="options"
    size="large"
  />
</template>
```

### Disabled State

```vue
<template>
  <SegmentedButtons
    v-model="value"
    :options="options"
    disabled
  />
</template>
```

## Styling & Theming

The component uses CSS custom properties for easy theming:

```css
.c-segmented-buttons {
  --radius: 25px;
  --primary-color: #ffc800;
  --primary-surface-color: #fe9;
  --secondary-color: #c2c2c2;
}
```

## Accessibility

- ✅ **ARIA Attributes**: `aria-pressed` and `aria-label` for screen readers
- ✅ **Keyboard Navigation**: Tab to navigate, Enter/Space to select
- ✅ **Focus Management**: Visible focus indicators
- ✅ **Screen Reader Support**: Proper labeling and state announcement

## Responsive Behavior

On screens ≤ 768px, the buttons stack vertically for better mobile usability:

```css
@media (max-width: 768px) {
  .c-segmented-buttons__container {
    flex-direction: column;
    gap: 4px;
  }
}
```

## Browser Support

- ✅ Chrome 88+
- ✅ Firefox 85+
- ✅ Safari 14+
- ✅ Edge 88+

## Dependencies

- Vue 3 (Composition API)
- No external CSS frameworks required

## Design System Integration

This component follows Material Design 3 guidelines and integrates seamlessly with:
- Color system using CSS custom properties
- Typography scale
- Spacing system
- Motion principles

## Best Practices

1. **Use for 2-5 options**: Segmented buttons work best with limited choices
2. **Clear labels**: Use concise, descriptive labels
3. **Logical order**: Arrange options in a logical sequence
4. **Default selection**: Consider providing a sensible default when appropriate
5. **Consistent sizing**: Use the same size variant within the same context

## Migration from Select Dropdowns

When replacing `<select>` elements:

```vue
<!-- Before -->
<select v-model="value">
  <option value="yes">Yes</option>
  <option value="no">No</option>
</select>

<!-- After -->
<SegmentedButtons
  v-model="value"
  :options="[
    { value: 'yes', label: 'Yes' },
    { value: 'no', label: 'No' }
  ]"
/>
```
