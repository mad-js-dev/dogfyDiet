export interface Props {
  modelValue?: string | number | boolean | null
  value: string | number | boolean
  label?: string
  id?: string
  disabled?: boolean
  required?: boolean
  errorMessage?: string
  name?: string
  'aria-label'?: string
}

export interface Emits {
  'update:modelValue': [value: string | number | boolean | null]
  'change': [value: string | number | boolean]
  'blur': [event: FocusEvent]
  'focus': [event: FocusEvent]
}

export const defaults = {
  disabled: false,
  required: false
}
