# SelectAnswer Component

A customizable select dropdown component for questionnaire forms with validation support and accessibility features.

## Features

- **Customizable Options**: Support for dynamic option lists
- **Validation**: Built-in required field validation
- **Accessibility**: Proper ARIA attributes and keyboard navigation
- **Styling**: Clean, modern design with focus states
- **Error Handling**: Visual feedback for validation errors
- **Two-way Binding**: Full v-model support

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `config` | `QuestionConfig` | **Required** | Configuration object containing question details, options, and validation rules |
| `modelValue` | `string \| string[]` | `''` | Current selected value (supports v-model) |
| `disabled` | `boolean` | `false` | Whether the select is disabled |

## Events

| Event | Payload | Description |
|-------|---------|-------------|
| `update:modelValue` | `value: string \| string[]` | Emitted when selection changes (for v-model) |
| `answer` | `value: string \| string[], questionId: string` | Emitted when selection changes with question ID |

## Configuration Object (QuestionConfig)

```typescript
interface QuestionConfig {
  id: string                    // Unique identifier for the question
  type: 'select'               // Must be 'select' for this component
  question: string             // Question text (used as placeholder)
  appliesTo: 'all' | 'individual'  // Whether question applies to all pets or individual
  options: string[]            // Array of option values
  required?: boolean           // Whether field is required (default: false)
  validation?: ValidationRule[] // Array of validation rules
}
```

## Usage Examples

### Basic Usage

```vue
<template>
  <SelectAnswer
    v-model="selectedSize"
    :config="sizeConfig"
  />
</template>

<script setup>
import { ref } from 'vue'
import SelectAnswer from './SelectAnswer.vue'

const selectedSize = ref('')

const sizeConfig = {
  id: 'pet-size',
  type: 'select',
  question: 'What size is your pet?',
  appliesTo: 'individual',
  options: ['Small', 'Medium', 'Large'],
  required: true
}
</script>
</template>
```

### With Validation

```vue
<template>
  <SelectAnswer
    v-model="selectedBreed"
    :config="breedConfig"
    @answer="handleAnswer"
  />
</template>

<script setup>
import { ref } from 'vue'
import SelectAnswer from './SelectAnswer.vue'

const selectedBreed = ref('')

const breedConfig = {
  id: 'pet-breed',
  type: 'select',
  question: 'What breed is your pet?',
  appliesTo: 'individual',
  options: ['Golden Retriever', 'Labrador', 'Poodle', 'Bulldog'],
  required: true,
  validation: [
    {
      type: 'required',
      message: 'Pet breed is required'
    }
  ]
}

const handleAnswer = (value, questionId) => {
  console.log(`Answer for ${questionId}:`, value)
}
</script>
</template>
```

### Disabled State

```vue
<template>
  <SelectAnswer
    v-model="selectedValue"
    :config="config"
    :disabled="true"
  />
</template>
```

## Styling

The component uses BEM CSS classes with the following structure:

```css
.c-select-answer          /* Main container */
.c-select-answer__select /* The select element */
.c-select-answer__error  /* Error message display */
```

### CSS Customization

You can override the default styles by targeting these classes:

```css
.c-select-answer__select {
  /* Custom select styling */
  border-color: #your-color;
  border-radius: 8px;
}

.c-select-answer__select:focus {
  /* Custom focus state */
  border-color: #your-focus-color;
  box-shadow: 0 0 0 2px rgba(your-color, 0.2);
}

.c-select-answer__error {
  /* Custom error styling */
  color: #your-error-color;
  font-weight: 500;
}
```

## Accessibility

- **Keyboard Navigation**: Full keyboard support with Tab, Enter, and Arrow keys
- **ARIA Attributes**: Proper `aria-required`, `aria-disabled`, and `aria-describedby` attributes
- **Screen Reader**: Compatible with screen readers
- **Focus Management**: Clear focus indicators and logical tab order

## Validation

The component supports built-in validation:

- **Required Validation**: Automatically validates required fields on blur
- **Custom Rules**: Supports custom validation rules via the `validation` prop
- **Error Display**: Shows error messages below the select field

## Browser Support

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## Contributing

When contributing to this component:

1. Follow the existing code style
2. Add tests for new features
3. Update documentation
4. Ensure accessibility compliance

## Stories

This component includes comprehensive Storybook stories that demonstrate:

- Default configuration
- Different states (disabled, required, with values)
- Various option counts (few, many, single)
- Interactive examples

Run Storybook to see all examples:

```bash
npm run storybook
```
