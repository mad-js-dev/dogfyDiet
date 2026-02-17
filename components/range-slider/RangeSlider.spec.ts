import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import RangeSlider from './RangeSlider.vue'

describe('RangeSlider', () => {
  let wrapper: any

  beforeEach(() => {
    wrapper = mount(RangeSlider, {
      props: {
        config: {
          id: 'test-slider',
          type: 'range-slider',
          question: 'Test question',
          options: [
            'Option 1',
            'Option 2',
            'Option 3'
          ],
          required: true,
          appliesTo: 'individual'
        }
      }
    })
  })

  it('renders correctly', () => {
    expect(wrapper.find('.c-range-slider').exists()).toBe(true)
    expect(wrapper.find('.c-range-slider__track').exists()).toBe(true)
    expect(wrapper.find('.c-range-slider__thumb').exists()).toBe(true)
    expect(wrapper.findAll('.c-range-slider__step')).toHaveLength(3)
  })

  it('displays labels when showLabels is true', () => {
    expect(wrapper.findAll('.c-range-slider__label')).toHaveLength(3)
    expect(wrapper.find('.c-range-slider__label--active').exists()).toBe(true)
  })

  it('hides labels when showLabels is false', async () => {
    await wrapper.setProps({ showLabels: false })
    expect(wrapper.findAll('.c-range-slider__label')).toHaveLength(0)
  })

  it('displays value when showValue is true', () => {
    expect(wrapper.find('.c-range-slider__value').exists()).toBe(true)
    expect(wrapper.find('.c-range-slider__value').text()).toBe('Option 1')
  })

  it('hides value when showValue is false', async () => {
    await wrapper.setProps({ showValue: false })
    expect(wrapper.find('.c-range-slider__value').exists()).toBe(false)
  })

  it('emits update:modelValue when thumb is moved', async () => {
    const trackContainer = wrapper.find('.c-range-slider__track-container')
    
    // Simulate click at middle position
    const rect = { left: 0, width: 200 }
    trackContainer.element.getBoundingClientRect = vi.fn(() => rect)
    
    await trackContainer.trigger('mousedown', { clientX: 100 })
    
    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    expect(wrapper.emitted('answer')).toBeTruthy()
  })

  it('emits answer event with correct parameters', async () => {
    const trackContainer = wrapper.find('.c-range-slider__track-container')
    
    const rect = { left: 0, width: 200 }
    trackContainer.element.getBoundingClientRect = vi.fn(() => rect)
    
    await trackContainer.trigger('mousedown', { clientX: 100 })
    
    const answerEvent = wrapper.emitted('answer')[0]
    expect(answerEvent).toHaveLength(2)
    expect(answerEvent[1]).toBe('test-slider') // questionId
  })

  it('handles keyboard navigation', async () => {
    const thumb = wrapper.find('.c-range-slider__thumb')
    
    // Test arrow right
    await thumb.trigger('keydown', { key: 'ArrowRight' })
    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    
    // Test arrow left
    await thumb.trigger('keydown', { key: 'ArrowLeft' })
    expect(wrapper.emitted('update:modelValue')).toHaveLength(2)
  })

  it('handles Home and End keys', async () => {
    const thumb = wrapper.find('.c-range-slider__thumb')
    
    // Test Home key
    await thumb.trigger('keydown', { key: 'Home' })
    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    
    // Test End key
    await thumb.trigger('keydown', { key: 'End' })
    expect(wrapper.emitted('update:modelValue')).toHaveLength(2)
  })

  it('disables when disabled prop is true', async () => {
    await wrapper.setProps({ disabled: true })
    expect(wrapper.find('.c-range-slider').classes()).toContain('disabled')
  })

  it('initializes from modelValue prop', async () => {
    await wrapper.setProps({ modelValue: 'Option 2' })
    
    // Check if the correct step is active
    const steps = wrapper.findAll('.c-range-slider__step')
    expect(steps[1].classes()).toContain('c-range-slider__step--active')
  })

  it('validates required input', async () => {
    // Test with empty value
    await wrapper.setProps({ 
      config: {
        ...wrapper.props().config,
        required: true
      },
      modelValue: ''
    })
    
    expect(wrapper.find('.c-range-slider__error').exists()).toBe(true)
  })

  it('extracts labels correctly', () => {
    const wrapperWithOptions = mount(RangeSlider, {
      props: {
        config: {
          id: 'body-shape',
          type: 'range-slider',
          question: 'Body shape',
          options: [
            'A bit thin - Narrow waist and ribs are clearly visible',
            'In good shape - Waist is visible and ribs are easy to feel',
            'A bit chubby - Waist is not visible and ribs are hard to feel'
          ],
          required: true,
          appliesTo: 'individual'
        }
      }
    })

    const labels = wrapperWithOptions.findAll('.c-range-slider__label')
    expect(labels[0].text()).toBe('Thin')
    expect(labels[1].text()).toBe('Good')
    expect(labels[2].text()).toBe('Chubby')
  })

  it('handles edge cases with no options', () => {
    const wrapperNoOptions = mount(RangeSlider, {
      props: {
        config: {
          id: 'no-options',
          type: 'range-slider',
          question: 'No options',
          options: [],
          required: false,
          appliesTo: 'individual'
        }
      }
    })

    expect(wrapperNoOptions.find('.c-range-slider').exists()).toBe(true)
    expect(wrapperNoOptions.findAll('.c-range-slider__step')).toHaveLength(0)
  })
})
