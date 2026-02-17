import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { ref } from 'vue'
import { mount } from '@vue/test-utils'
import SegmentedButtons from '../../components/segmented-buttons/SegmentedButtons.vue'

describe('SegmentedButtons', () => {
  let wrapper: any

  beforeEach(() => {
    wrapper = null
  })

  afterEach(() => {
    if (wrapper) {
      wrapper.unmount()
    }
  })

  // Basic Rendering Tests
  describe('Rendering', () => {
    it('renders correctly with basic props', () => {
      wrapper = mount(SegmentedButtons, {
        props: {
          modelValue: 'yes',
          options: [
            { value: 'yes', label: 'Yes' },
            { value: 'no', label: 'No' }
          ]
        }
      })

      expect(wrapper.find('.c-segmented-buttons').exists()).toBe(true)
      expect(wrapper.find('.c-segmented-buttons__container').exists()).toBe(true)
      expect(wrapper.findAll('.c-segmented-buttons__button')).toHaveLength(2)
    })

    it('renders correct number of buttons based on options', () => {
      wrapper = mount(SegmentedButtons, {
        props: {
          modelValue: '',
          options: [
            { value: 'small', label: 'Small' },
            { value: 'medium', label: 'Medium' },
            { value: 'large', label: 'Large' }
          ]
        }
      })

      const buttons = wrapper.findAll('.c-segmented-buttons__button')
      expect(buttons).toHaveLength(3)
    })

    it('displays correct labels', () => {
      wrapper = mount(SegmentedButtons, {
        props: {
          modelValue: '',
          options: [
            { value: 'male', label: 'Male' },
            { value: 'female', label: 'Female' }
          ]
        }
      })

      const buttonTexts = wrapper.findAll('.c-segmented-buttons__text')
      expect(buttonTexts[0].text()).toBe('Male')
      expect(buttonTexts[1].text()).toBe('Female')
    })

    it('uses value as label when label is not provided', () => {
      wrapper = mount(SegmentedButtons, {
        props: {
          modelValue: '',
          options: [
            { value: 'Option1' },
            { value: 'Option2' }
          ]
        }
      })

      const buttonTexts = wrapper.findAll('.c-segmented-buttons__text')
      expect(buttonTexts[0].text()).toBe('Option1')
      expect(buttonTexts[1].text()).toBe('Option2')
    })
  })

  // Selection Tests
  describe('Selection', () => {
    it('highlights the correct button based on modelValue', async () => {
      wrapper = mount(SegmentedButtons, {
        props: {
          modelValue: 'yes',
          options: [
            { value: 'yes', label: 'Yes' },
            { value: 'no', label: 'No' }
          ]
        }
      })

      const buttons = wrapper.findAll('.c-segmented-buttons__button')
      expect(buttons[0].classes()).toContain('c-segmented-buttons__button--active')
      expect(buttons[1].classes()).not.toContain('c-segmented-buttons__button--active')
    })

    it('updates selection when clicking a button', async () => {
      wrapper = mount(SegmentedButtons, {
        props: {
          modelValue: 'yes',
          options: [
            { value: 'yes', label: 'Yes' },
            { value: 'no', label: 'No' }
          ]
        }
      })

      const buttons = wrapper.findAll('.c-segmented-buttons__button')
      await buttons[1].trigger('click')

      expect(wrapper.emitted('update:modelValue')).toBeTruthy()
      expect(wrapper.emitted('update:modelValue')[0]).toEqual(['no'])
      expect(wrapper.emitted('change')).toBeTruthy()
      expect(wrapper.emitted('change')[0]).toEqual(['no'])
    })

  })



  // Accessibility Tests
  describe('Accessibility', () => {
    it('sets correct aria-pressed attributes', () => {
      wrapper = mount(SegmentedButtons, {
        props: {
          modelValue: 'yes',
          options: [
            { value: 'yes', label: 'Yes' },
            { value: 'no', label: 'No' }
          ]
        }
      })

      const buttons = wrapper.findAll('.c-segmented-buttons__button')
      expect(buttons[0].attributes('aria-pressed')).toBe('true')
      expect(buttons[1].attributes('aria-pressed')).toBe('false')
    })

    it('sets correct aria-label attributes', () => {
      wrapper = mount(SegmentedButtons, {
        props: {
          modelValue: '',
          options: [
            { value: 'male', label: 'Male' },
            { value: 'female', label: 'Female' }
          ]
        }
      })

      const buttons = wrapper.findAll('.c-segmented-buttons__button')
      expect(buttons[0].attributes('aria-label')).toBe('Male')
      expect(buttons[1].attributes('aria-label')).toBe('Female')
    })

    it('includes hidden input for form compatibility', () => {
      wrapper = mount(SegmentedButtons, {
        props: {
          modelValue: 'yes',
          options: [{ value: 'yes', label: 'Yes' }],
          name: 'test-input'
        }
      })

      const hiddenInput = wrapper.find('input[type="hidden"]')
      expect(hiddenInput.exists()).toBe(true)
      expect(hiddenInput.attributes('name')).toBe('test-input')
      expect(hiddenInput.attributes('value')).toBe('yes')
    })

    it('sets required attribute on hidden input when required', () => {
      wrapper = mount(SegmentedButtons, {
        props: {
          modelValue: '',
          options: [{ value: 'test', label: 'Test' }],
          required: true
        }
      })

      const hiddenInput = wrapper.find('input[type="hidden"]')
      expect(hiddenInput.attributes('required')).toBeDefined()
    })
  })

  // Edge Cases
  describe('Edge Cases', () => {
    it('handles empty options array gracefully', () => {
      expect(() => {
        wrapper = mount(SegmentedButtons, {
          props: {
            modelValue: '',
            options: []
          }
        })
      }).not.toThrow()

      expect(wrapper.findAll('.c-segmented-buttons__button')).toHaveLength(0)
    })

    it('handles single option', () => {
      wrapper = mount(SegmentedButtons, {
        props: {
          modelValue: 'single',
          options: [{ value: 'single', label: 'Single' }]
        }
      })

      const buttons = wrapper.findAll('.c-segmented-buttons__button')
      expect(buttons).toHaveLength(1)
      expect(buttons[0].classes()).toContain('c-segmented-buttons__button--first')
      expect(buttons[0].classes()).toContain('c-segmented-buttons__button--last')
    })

    it('applies correct first and last button classes', () => {
      wrapper = mount(SegmentedButtons, {
        props: {
          modelValue: '',
          options: [
            { value: 'first', label: 'First' },
            { value: 'middle', label: 'Middle' },
            { value: 'last', label: 'Last' }
          ]
        }
      })

      const buttons = wrapper.findAll('.c-segmented-buttons__button')
      expect(buttons[0].classes()).toContain('c-segmented-buttons__button--first')
      expect(buttons[0].classes()).not.toContain('c-segmented-buttons__button--last')
      
      expect(buttons[1].classes()).not.toContain('c-segmented-buttons__button--first')
      expect(buttons[1].classes()).not.toContain('c-segmented-buttons__button--last')
      
      expect(buttons[2].classes()).not.toContain('c-segmented-buttons__button--first')
      expect(buttons[2].classes()).toContain('c-segmented-buttons__button--last')
    })
  })

  // Integration Tests
  describe('Integration', () => {
    it('works with v-model two-way binding', async () => {
      const parent = mount({
        components: { SegmentedButtons },
        template: `
          <SegmentedButtons
            v-model="selectedValue"
            :options="options"
            name="test"
          />
        `,
        setup() {
          const selectedValue = ref('')
          const options = [
            { value: 'yes', label: 'Yes' },
            { value: 'no', label: 'No' }
          ]
          return { selectedValue, options }
        }
      })

      const buttons = parent.findAll('.c-segmented-buttons__button')
      await buttons[1].trigger('click')

      expect(parent.vm.selectedValue).toBe('no')
    })

    it('handles rapid successive clicks', async () => {
      wrapper = mount(SegmentedButtons, {
        props: {
          modelValue: '',
          options: [
            { value: 'yes', label: 'Yes' },
            { value: 'no', label: 'No' }
          ]
        }
      })

      const buttons = wrapper.findAll('.c-segmented-buttons__button')
      
      await buttons[0].trigger('click')
      await buttons[1].trigger('click')
      await buttons[0].trigger('click')

      const emissions = wrapper.emitted('update:modelValue')
      expect(emissions).toHaveLength(3)
      expect(emissions[0]).toEqual(['yes'])
      expect(emissions[1]).toEqual(['no'])
      expect(emissions[2]).toEqual(['yes'])
    })
  })
})
