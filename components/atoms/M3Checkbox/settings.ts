export interface Props {
  modelValue?: boolean | null
  label?: string
  id?: string
  disabled?: boolean
  required?: boolean
  errorMessage?: string
  'aria-label'?: string
  indeterminate?: boolean
  showCross?: boolean
  showIndeterminateIcon?: boolean
}

export interface Emits {
  'update:modelValue': [value: boolean]
  'blur': []
  'focus': []
  'click': [value: any]
}

export const defaults = {
  disabled: false,
  required: false,
  indeterminate: false,
  showIndeterminateIcon: true
}
