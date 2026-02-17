# TextInput Component

A versatile text input component that supports various input types (text, email, tel) with comprehensive validation options.

## Features

- **Multiple Input Types**: Supports text, email, and telephone inputs
- **Built-in Validation**: Comprehensive validation rules including required, minLength, maxLength, pattern, email, and phone
- **Real-time Updates**: Emits events on both input and blur for immediate feedback
- **Accessibility**: Proper ARIA attributes and semantic HTML
- **Styling**: Clean, modern design with focus states and disabled styling
- **BEM Methodology**: Follows BEM CSS naming convention for maintainable styles

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `config` | `QuestionConfig` | - | Configuration object containing question metadata |
| `modelValue` | `string` | `''` | Current value of input (v-model) |
| `petId` | `string` | `undefined` | Pet ID for multi-pet forms |
| `disabled` | `boolean` | `false` | Whether input is disabled |
| `suffix` | `string` | `undefined` | Text suffix to display after input (e.g., "USD", ".com") |
| `icon` | `string` | `undefined` | SVG icon to display before suffix (HTML string) |

## Events

| Event | Payload | Description |
|-------|---------|-------------|
| `update:modelValue` | `value: string` | Emitted when input value changes |
| `answer` | `value: string, questionId: string, petId?: string` | Emitted on input and blur with answer data |

## CSS Classes (BEM)

| Class | Description |
|-------|-------------|
| `.c-text-input` | Main component container |
| `.c-text-input__wrapper` | Wrapper div for input and suffix layout |
| `.c-text-input__input` | The input element |
| `.c-text-input__input--with-suffix` | Modifier for input when suffix/icon is present |
| `.c-text-input__suffix` | Container for suffix and/or icon |
| `.c-text-input__icon` | SVG icon element |
| `.c-text-input__suffix-text` | Text suffix element |
| `.c-text-input__error` | Error message container |

## Input Type Detection

The component automatically detects the appropriate input type:

1. **Explicit Type**: Uses `config.type` if it's 'email' or 'tel'
2. **Legacy Detection**: Checks validation patterns for '@' to detect email fields
3. **Default**: Falls back to 'text' type

## Validation Rules

### Required
```typescript
{
  type: 'required',
  message: 'This field is required'
}
```

### Minimum Length
```typescript
{
  type: 'minLength',
  value: 5,
  message: 'Minimum 5 characters required'
}
```

### Maximum Length
```typescript
{
  type: 'maxLength',
  value: 50,
  message: 'Maximum 50 characters allowed'
}
```

### Custom Pattern
```typescript
{
  type: 'pattern',
  value: '^[A-Z]+$',
  message: 'Only uppercase letters allowed'
}
```

### Email Validation
```typescript
{
  type: 'email',
  message: 'Please enter a valid email address'
}
```

### Phone Validation
```typescript
{
  type: 'phone',
  message: 'Please enter a valid phone number'
}
```

## Usage Examples

### Basic Text Input
```vue
<TextInput
  :config="{
    id: 'name',
    type: 'text',
    question: 'Enter your name',
    appliesTo: 'individual'
  }"
  v-model="name"
/>
```

### Email Input with Validation
```vue
<TextInput
  :config="{
    id: 'email',
    type: 'email',
    question: 'Email Address',
    appliesTo: 'individual',
    validation: [
      {
        type: 'required',
        message: 'Email is required'
      },
      {
        type: 'email',
        message: 'Please enter a valid email'
      }
    ]
  }"
  v-model="email"
/>
```

### Phone Input with Validation
```vue
<TextInput
  :config="{
    id: 'phone',
    type: 'tel',
    question: 'Phone Number',
    appliesTo: 'individual',
    validation: [
      {
        type: 'required',
        message: 'Phone number is required'
      },
      {
        type: 'phone',
        message: 'Please enter a valid phone number'
      }
    ]
  }"
  v-model="phone"
/>
```

### Complex Validation
```vue
<TextInput
  :config="{
    id: 'username',
    type: 'text',
    question: 'Username',
    appliesTo: 'individual',
    validation: [
      {
        type: 'required',
        message: 'Username is required'
      },
      {
        type: 'minLength',
        value: 3,
        message: 'Username must be at least 3 characters'
      },
      {
        type: 'maxLength',
        value: 20,
        message: 'Username must not exceed 20 characters'
      },
      {
        type: 'pattern',
        value: '^[a-zA-Z0-9_]+$',
        message: 'Only letters, numbers, and underscores allowed'
      }
    ]
  }"
  v-model="username"
/>
```

### Multi-Pet Form
```vue
<TextInput
  :config="{
    id: 'pet-name',
    type: 'text',
    question: 'Pet Name',
    appliesTo: 'individual'
  }"
  v-model="petName"
  pet-id="pet-123"
/>
```

### With Suffix
```vue
<TextInput
  :config="{
    id: 'amount',
    type: 'text',
    question: 'Enter amount',
    appliesTo: 'individual'
  }"
  v-model="amount"
  suffix="USD"
/>
```

### With Icon
```vue
<TextInput
  :config="{
    id: 'search',
    type: 'text',
    question: 'Search',
    appliesTo: 'individual'
  }"
  v-model="searchQuery"
  icon="<svg width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><circle cx='11' cy='11' r='8'></circle><path d='m21 21-4.35-4.35'></path></svg>"
/>
```

### With Icon and Suffix
```vue
<TextInput
  :config="{
    id: 'website',
    type: 'text',
    question: 'Website URL',
    appliesTo: 'individual'
  }"
  v-model="website"
  icon="<svg width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><path d='M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71'></path><path d='M14 11a4 4 0 1 1-8 0 4 4 0 0 1 8 0z'></path></svg>"
  suffix=".com"
/>
```

## Styling

The component uses SCSS with BEM methodology. You can customize the appearance by overriding the CSS variables or modifying the styles:

```scss
.c-text-input {
  &__wrapper {
    // Custom wrapper styles
    display: flex;
    align-items: center;
  }
  
  &__input {
    // Custom input styles
    border-color: your-color;
    
    &:focus {
      // Custom focus styles
    }
    
    &:disabled {
      // Custom disabled styles
    }
    
    &--with-suffix {
      // Custom padding when suffix is present
      padding-right: your-custom-padding;
    }
  }
  
  &__suffix {
    // Custom suffix container styles
    color: your-suffix-color;
    right: your-custom-position;
  }
  
  &__icon {
    // Custom icon styles
    font-size: your-icon-size;
    color: your-icon-color;
  }
  
  &__suffix-text {
    // Custom suffix text styles
    font-weight: your-font-weight;
  }
  
  &__error {
    // Custom error message styles
    color: your-error-color;
  }
}
```

## Accessibility

- Proper `id` attribute linking to label
- Semantic HTML5 input elements
- Appropriate input types for better mobile keyboards
- Disabled state handling
- Error message association

## Testing

The component includes comprehensive tests covering:
- Rendering with different props
- Input type detection
- Event emission
- Validation rules
- Reactivity to prop changes
- Error display

Run tests with:
```bash
npm run test:nuxt -- textInput.spec.ts
```

## Storybook

View interactive examples and documentation in Storybook:
```bash
npm run storybook
```

Navigate to Components/TextInput to see all variants and use cases.
