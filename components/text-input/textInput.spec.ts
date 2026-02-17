import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { ref } from 'vue'
import { mount } from '@vue/test-utils'
import TextInput from './textInput.vue'

describe('TextInput', () => {
  let wrapper: any

  beforeEach(() => {
    wrapper = null
  })

  afterEach(() => {
    if (wrapper) {
      wrapper.unmount()
    }
  })

  describe('Rendering', () => {
    it('renders with default props', () => {
      wrapper = mount(TextInput, {
        props: {
          config: {
            id: 'test-input',
            type: 'text',
            question: 'Test Question',
            appliesTo: 'individual'
          }
        }
      })

      const input = wrapper.find('.c-text-input__input')
      expect(input.exists()).toBe(true)
      expect(input.attributes('id')).toBe('test-input')
      expect(input.attributes('type')).toBe('text')
      expect(input.attributes('placeholder')).toBe('Test Question')
    })

    it('renders with custom placeholder', () => {
      wrapper = mount(TextInput, {
        props: {
          config: {
            id: 'test-input',
            type: 'text',
            question: 'Custom placeholder',
            appliesTo: 'individual'
          }
        }
      })

      const input = wrapper.find('.c-text-input__input')
      expect(input.attributes('placeholder')).toBe('Custom placeholder')
    })

    it('renders with modelValue', () => {
      wrapper = mount(TextInput, {
        props: {
          config: {
            id: 'test-input',
            type: 'text',
            question: 'Test Question',
            appliesTo: 'individual'
          },
          modelValue: 'initial value'
        }
      })

      const input = wrapper.find('.c-text-input__input')
      expect(input.element.value).toBe('initial value')
    })

    it('renders disabled state', () => {
      wrapper = mount(TextInput, {
        props: {
          config: {
            id: 'test-input',
            type: 'text',
            question: 'Test Question',
            appliesTo: 'individual'
          },
          disabled: true
        }
      })

      const input = wrapper.find('.c-text-input__input')
      expect(input.attributes('disabled')).toBeDefined()
    })

    it('renders required attribute', () => {
      wrapper = mount(TextInput, {
        props: {
          config: {
            id: 'test-input',
            type: 'text',
            question: 'Test Question',
            appliesTo: 'individual',
            required: true
          }
        }
      })

      const input = wrapper.find('.c-text-input__input')
      expect(input.attributes('required')).toBeDefined()
    })
  })

  describe('Input Types', () => {
    it('renders email input type', () => {
      wrapper = mount(TextInput, {
        props: {
          config: {
            id: 'email-input',
            type: 'email',
            question: 'Email Address',
            appliesTo: 'individual'
          }
        }
      })

      const input = wrapper.find('.c-text-input__input')
      expect(input.attributes('type')).toBe('email')
    })

    it('renders tel input type', () => {
      wrapper = mount(TextInput, {
        props: {
          config: {
            id: 'tel-input',
            type: 'tel',
            question: 'Phone Number',
            appliesTo: 'individual'
          }
        }
      })

      const input = wrapper.find('.c-text-input__input')
      expect(input.attributes('type')).toBe('tel')
    })

    it('detects email type from validation pattern', () => {
      wrapper = mount(TextInput, {
        props: {
          config: {
            id: 'email-input',
            type: 'text',
            question: 'Email',
            appliesTo: 'individual',
            validation: [
              {
                type: 'pattern',
                value: '@',
                message: 'Invalid email'
              }
            ]
          }
        }
      })

      const input = wrapper.find('.c-text-input__input')
      expect(input.attributes('type')).toBe('email')
    })
  })

  describe('Events', () => {
    it('emits update:modelValue on input', async () => {
      wrapper = mount(TextInput, {
        props: {
          config: {
            id: 'test-input',
            type: 'text',
            question: 'Test Question',
            appliesTo: 'individual'
          }
        }
      })

      const input = wrapper.find('.c-text-input__input')
      await input.setValue('test value')

      expect(wrapper.emitted('update:modelValue')).toBeTruthy()
      expect(wrapper.emitted('update:modelValue')[0]).toEqual(['test value'])
    })

    it('emits answer event on input', async () => {
      wrapper = mount(TextInput, {
        props: {
          config: {
            id: 'test-input',
            type: 'text',
            question: 'Test Question',
            appliesTo: 'individual'
          }
        }
      })

      const input = wrapper.find('.c-text-input__input')
      await input.setValue('test value')

      expect(wrapper.emitted('answer')).toBeTruthy()
      expect(wrapper.emitted('answer')[0]).toEqual(['test value', 'test-input', undefined])
    })

    it('emits answer event on blur', async () => {
      wrapper = mount(TextInput, {
        props: {
          config: {
            id: 'test-input',
            type: 'text',
            question: 'Test Question',
            appliesTo: 'individual'
          }
        }
      })

      const input = wrapper.find('.c-text-input__input')
      await input.trigger('blur')

      expect(wrapper.emitted('answer')).toBeTruthy()
      expect(wrapper.emitted('answer')[0]).toEqual(['', 'test-input', undefined])
    })

    it('includes petId in answer event when provided', async () => {
      wrapper = mount(TextInput, {
        props: {
          config: {
            id: 'test-input',
            type: 'text',
            question: 'Test Question',
            appliesTo: 'individual'
          },
          petId: 'pet-123'
        }
      })

      const input = wrapper.find('.c-text-input__input')
      await input.setValue('test value')

      expect(wrapper.emitted('answer')[0]).toEqual(['test value', 'test-input', 'pet-123'])
    })
  })

  describe('Validation', () => {
    it('shows error for required field on blur', async () => {
      wrapper = mount(TextInput, {
        props: {
          config: {
            id: 'test-input',
            type: 'text',
            question: 'Test Question',
            appliesTo: 'individual',
            validation: [
              {
                type: 'required',
                message: 'This field is required'
              }
            ]
          }
        }
      })

      const input = wrapper.find('.c-text-input__input')
      await input.trigger('blur')

      const error = wrapper.find('.c-text-input__error')
      expect(error.exists()).toBe(true)
      expect(error.text()).toBe('This field is required')
    })

    it('validates minLength', async () => {
      wrapper = mount(TextInput, {
        props: {
          config: {
            id: 'test-input',
            type: 'text',
            question: 'Test Question',
            appliesTo: 'individual',
            validation: [
              {
                type: 'minLength',
                value: 5,
                message: 'Minimum 5 characters'
              }
            ]
          }
        }
      })

      const input = wrapper.find('.c-text-input__input')
      await input.setValue('abc')
      await input.trigger('blur')

      const error = wrapper.find('.c-text-input__error')
      expect(error.exists()).toBe(true)
      expect(error.text()).toBe('Minimum 5 characters')
    })

    it('validates maxLength', async () => {
      wrapper = mount(TextInput, {
        props: {
          config: {
            id: 'test-input',
            type: 'text',
            question: 'Test Question',
            appliesTo: 'individual',
            validation: [
              {
                type: 'maxLength',
                value: 10,
                message: 'Maximum 10 characters'
              }
            ]
          }
        }
      })

      const input = wrapper.find('.c-text-input__input')
      await input.setValue('this is too long')
      await input.trigger('blur')

      const error = wrapper.find('.c-text-input__error')
      expect(error.exists()).toBe(true)
      expect(error.text()).toBe('Maximum 10 characters')
    })

    it('validates email pattern', async () => {
      wrapper = mount(TextInput, {
        props: {
          config: {
            id: 'email-input',
            type: 'email',
            question: 'Email',
            appliesTo: 'individual',
            validation: [
              {
                type: 'email',
                message: 'Invalid email format'
              }
            ]
          }
        }
      })

      const input = wrapper.find('.c-text-input__input')
      await input.setValue('invalid-email')
      await input.trigger('blur')

      const error = wrapper.find('.c-text-input__error')
      expect(error.exists()).toBe(true)
      expect(error.text()).toBe('Invalid email format')
    })

    it('validates phone pattern', async () => {
      wrapper = mount(TextInput, {
        props: {
          config: {
            id: 'phone-input',
            type: 'tel',
            question: 'Phone',
            appliesTo: 'individual',
            validation: [
              {
                type: 'phone',
                message: 'Invalid phone number'
              }
            ]
          }
        }
      })

      const input = wrapper.find('.c-text-input__input')
      await input.setValue('123')
      await input.trigger('blur')

      const error = wrapper.find('.c-text-input__error')
      expect(error.exists()).toBe(true)
      expect(error.text()).toBe('Invalid phone number')
    })

    it('validates custom pattern', async () => {
      wrapper = mount(TextInput, {
        props: {
          config: {
            id: 'test-input',
            type: 'text',
            question: 'Test Question',
            appliesTo: 'individual',
            validation: [
              {
                type: 'pattern',
                value: '^[A-Z]+$',
                message: 'Only uppercase letters'
              }
            ]
          }
        }
      })

      const input = wrapper.find('.c-text-input__input')
      await input.setValue('lowercase')
      await input.trigger('blur')

      const error = wrapper.find('.c-text-input__error')
      expect(error.exists()).toBe(true)
      expect(error.text()).toBe('Only uppercase letters')
    })

    it('clears error when valid', async () => {
      wrapper = mount(TextInput, {
        props: {
          config: {
            id: 'test-input',
            type: 'text',
            question: 'Test Question',
            appliesTo: 'individual',
            validation: [
              {
                type: 'required',
                message: 'This field is required'
              }
            ]
          }
        }
      })

      const input = wrapper.find('.c-text-input__input')
      await input.trigger('blur')
      
      let error = wrapper.find('.c-text-input__error')
      expect(error.exists()).toBe(true)

      await input.setValue('valid value')
      await input.trigger('blur')
      
      error = wrapper.find('.c-text-input__error')
      expect(error.exists()).toBe(false)
    })
  })

  describe('Reactivity', () => {
    it('updates when modelValue prop changes', async () => {
      wrapper = mount(TextInput, {
        props: {
          config: {
            id: 'test-input',
            type: 'text',
            question: 'Test Question',
            appliesTo: 'individual'
          },
          modelValue: 'initial'
        }
      })

      const input = wrapper.find('.c-text-input__input')
      expect(input.element.value).toBe('initial')

      await wrapper.setProps({ modelValue: 'updated' })
      expect(input.element.value).toBe('updated')
    })

    it('does not update if modelValue is same as current value', async () => {
      wrapper = mount(TextInput, {
        props: {
          config: {
            id: 'test-input',
            type: 'text',
            question: 'Test Question',
            appliesTo: 'individual'
          },
          modelValue: 'test'
        }
      })

      const input = wrapper.find('.c-text-input__input')
      const originalValue = input.element.value

      await wrapper.setProps({ modelValue: 'test' })
      expect(input.element.value).toBe(originalValue)
    })
  })
})
