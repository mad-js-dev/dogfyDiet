import type { Meta, StoryObj } from '@storybook/vue3'
import TextInput from './textInput.vue'

const meta = {
  title: 'Components/TextInput',
  component: TextInput,
  tags: ['autodocs'],
  argTypes: {
    config: {
      control: 'object',
      description: 'Configuration object for text input'
    },
    modelValue: {
      control: 'text',
      description: 'Current value of input'
    },
    disabled: {
      control: 'boolean',
      description: 'Whether input is disabled'
    },
    petId: {
      control: 'text',
      description: 'Pet ID for multi-pet forms'
    },
    suffix: {
      control: 'text',
      description: 'Text suffix to display after input'
    },
    icon: {
      control: 'text',
      description: 'SVG icon to display before suffix'
    }
  },
  parameters: {
    docs: {
      description: {
        component: 'A versatile text input component that supports various input types (text, email, tel) with comprehensive validation options.'
      }
    }
  }
} satisfies Meta<typeof TextInput>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    config: {
      id: 'default-input',
      type: 'text',
      question: 'Enter your name',
      appliesTo: 'individual'
    }
  }
}

export const WithValue: Story = {
  args: {
    config: {
      id: 'value-input',
      type: 'text',
      question: 'Enter your name',
      appliesTo: 'individual'
    },
    modelValue: 'John Doe'
  }
}

export const EmailInput: Story = {
  args: {
    config: {
      id: 'email-input',
      type: 'email',
      question: 'Enter your email address',
      appliesTo: 'individual'
    }
  }
}

export const PhoneInput: Story = {
  args: {
    config: {
      id: 'phone-input',
      type: 'tel',
      question: 'Enter your phone number',
      appliesTo: 'individual'
    }
  }
}

export const Required: Story = {
  args: {
    config: {
      id: 'required-input',
      type: 'text',
      question: 'Enter your address',
      appliesTo: 'individual',
      required: true
    }
  }
}

export const Disabled: Story = {
  args: {
    config: {
      id: 'disabled-input',
      type: 'text',
      question: 'Disabled input',
      appliesTo: 'individual'
    },
    disabled: true
  }
}

export const WithValidation: Story = {
  args: {
    config: {
      id: 'validated-input',
      type: 'text',
      question: 'Enter a username',
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
          message: 'Username can only contain letters, numbers, and underscores'
        }
      ]
    }
  }
}

export const EmailValidation: Story = {
  args: {
    config: {
      id: 'email-validation',
      type: 'email',
      question: 'Enter your email',
      appliesTo: 'individual',
      validation: [
        {
          type: 'required',
          message: 'Email is required'
        },
        {
          type: 'email',
          message: 'Please enter a valid email address'
        }
      ]
    }
  }
}

export const PhoneValidation: Story = {
  args: {
    config: {
      id: 'phone-validation',
      type: 'tel',
      question: 'Enter your phone number',
      appliesTo: 'individual',
      validation: [
        {
          type: 'required',
          message: 'Phone number is required'
        },
        {
          type: 'phone',
          message: 'Please enter a valid phone number (at least 7 digits)'
        }
      ]
    }
  }
}

export const WithPetId: Story = {
  args: {
    config: {
      id: 'pet-input',
      type: 'text',
      question: 'Enter pet name',
      appliesTo: 'individual'
    },
    petId: 'pet-123'
  }
}

export const CustomPlaceholder: Story = {
  args: {
    config: {
      id: 'custom-placeholder',
      type: 'text',
      question: 'Type your message here...',
      appliesTo: 'individual'
    }
  }
}

export const MultipleValidations: Story = {
  args: {
    config: {
      id: 'complex-input',
      type: 'text',
      question: 'Enter a password',
      appliesTo: 'individual',
      validation: [
        {
          type: 'required',
          message: 'Password is required'
        },
        {
          type: 'minLength',
          value: 8,
          message: 'Password must be at least 8 characters'
        },
        {
          type: 'pattern',
          value: '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).+$',
          message: 'Password must contain at least one uppercase letter, one lowercase letter, and one number'
        }
      ]
    }
  }
}

export const WithSuffix: Story = {
  args: {
    config: {
      id: 'suffix-input',
      type: 'text',
      question: 'Enter amount',
      appliesTo: 'individual'
    },
    suffix: 'USD'
  }
}

export const WithIcon: Story = {
  args: {
    config: {
      id: 'icon-input',
      type: 'text',
      question: 'Search',
      appliesTo: 'individual'
    },
    icon: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><path d="m21 21-4.35-4.35"></path></svg>'
  }
}

export const WithIconAndSuffix: Story = {
  args: {
    config: {
      id: 'combined-input',
      type: 'text',
      question: 'Website URL',
      appliesTo: 'individual'
    },
    icon: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a4 4 0 1 1-8 0 4 4 0 0 1 8 0z"></path></svg>',
    suffix: '.com'
  }
}

export const EmailWithIcon: Story = {
  args: {
    config: {
      id: 'email-icon-input',
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
    },
    icon: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>'
  }
}

export const PhoneWithSuffix: Story = {
  args: {
    config: {
      id: 'phone-suffix-input',
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
    },
    suffix: '+1'
  }
}
