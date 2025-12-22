<template>
  <div class="select-wrapper">
    <label v-if="label">{{ label }}</label>

    <select v-model="model" @change="emitChange">
      <option disabled value="">Select</option>
      <option
        v-for="option in options"
        :key="option.value"
        :value="option.value"
      >
        {{ option.label }}
      </option>
    </select>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  modelValue: String,
  options: Array,
  label: String
})

const emit = defineEmits(['update:modelValue'])

const model = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
})

function emitChange(e) {
  emit('update:modelValue', e.target.value)
}
</script>

<style scoped>
.select-wrapper {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

label {
  font-size: 13px;
  color: #475569;
}

select {
  padding: 10px 14px;
  border-radius: 10px;
  border: 1px solid #cbd5f5;
  background: white;
  font-size: 14px;
  cursor: pointer;
}

select:focus {
  outline: none;
  border-color: #6366f1;
}
</style>
