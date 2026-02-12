<template>
  <button 
    :class="['btn', `btn-${variant}`, { 'btn-disabled': disabled }]"
    :disabled="disabled"
    @click="$emit('click')"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
interface Props {
  variant?: 'primary' | 'secondary' | 'danger'
  disabled?: boolean
}

withDefaults(defineProps<Props>(), {
  variant: 'primary',
  disabled: false
})

defineEmits<{
  click: []
}>()
</script>

<style scoped>
.btn {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  transition: all 0.3s ease;
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
}

.btn-primary {
  background-color: #0066cc;
  color: white;
  
  &:hover:not(:disabled) {
    background-color: #0052a3;
  }
}

.btn-secondary {
  background-color: #6c757d;
  color: white;
  
  &:hover:not(:disabled) {
    background-color: #545b62;
  }
}

.btn-danger {
  background-color: #dc3545;
  color: white;
  
  &:hover:not(:disabled) {
    background-color: #c82333;
  }
}
</style>
