# Range Slider Component

A horizontal slider component for selecting values from discrete options. Perfect for range-based questions like body shape selection, activity levels, or any ordinal data.

## Features

- **Discrete Steps**: Fixed positions for each option, ensuring precise selection
- **Visual Feedback**: Clear indication of selected value and progress
- **Touch & Mouse Support**: Works on both desktop and mobile devices
- **Keyboard Navigation**: Full accessibility support with arrow keys, Home, and End
- **Customizable Labels**: Optional labels for each step
- **Value Display**: Shows the selected option text
- **Validation**: Built-in required field validation
- **Responsive Design**: Adapts to different screen sizes

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `config` | `QuestionConfig` | - | Question configuration object |
| `modelValue` | `string` | - | Currently selected value |
| `disabled` | `boolean` | `false` | Whether the slider is disabled |
| `showLabels` | `boolean` | `true` | Whether to show step labels |
| `showValue` | `boolean` | `true` | Whether to show the selected value display |

## Events

| Event | Payload | Description |
|-------|---------|-------------|
| `update:modelValue` | `string` | Emitted when value changes |
| `answer` | `(value: string, questionId: string)` | Emitted when user selects an option |

## Usage

```vue
<template>
  <RangeSlider
    :config="{
      id: 'body_shape',
      type: 'range-slider',
      question: 'Which silhouette best represents your pet?',
      options: [
        'A bit thin - Narrow waist and ribs are clearly visible',
        'In good shape - Waist is visible and ribs are easy to feel',
        'A bit chubby - Waist is not visible and ribs are hard to feel'
      ],
      required: true,
      appliesTo: 'individual'
    }"
    v-model="selectedValue"
    @answer="handleAnswer"
  />
</template>
```

## Styling

The component uses CSS custom properties for easy theming:

```scss
.c-range-slider {
  --primary-color: #0066cc;
  --secondary-color: #ff6b6b;
  --track-height: 4px;
  --thumb-size: 24px;
  --step-size: 12px;
}
```

## Accessibility

- **ARIA Attributes**: Proper `role="slider"` with `aria-valuemin`, `aria-valuemax`, `aria-valuenow`, and `aria-valuetext`
- **Keyboard Navigation**: Arrow keys for step navigation, Home/End for boundaries
- **Focus Management**: Visible focus indicator
- **Screen Reader Support**: Descriptive labels and value announcements

## Examples

### Basic Usage
Default slider with labels and value display

### With Initial Value
Pre-selects a specific option

### Disabled State
Shows disabled appearance and prevents interaction

### Custom Labels
Shows abbreviated labels for space efficiency

### Five Steps
Demonstrates flexibility with more options

## Testing

The component includes comprehensive unit tests covering:
- Rendering and basic functionality
- User interactions (mouse, touch, keyboard)
- Event emission
- Validation
- Accessibility features
- Edge cases

Run tests with:
```bash
npm test RangeSlider.spec.ts
```

## Development

To develop this component:

1. Navigate to the component directory
2. Run Storybook for visual testing:
   ```bash
   npm run storybook
   ```
3. Run tests:
   ```bash
   npm test
   ```

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Dependencies

- Vue 3
- TypeScript
- SCSS

## License

Internal use only.
