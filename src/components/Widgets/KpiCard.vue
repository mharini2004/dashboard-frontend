<template>
  <div class="kpi-card">
    <p class="kpi-title">{{ title }}</p>

    <h2 class="kpi-value">
      {{ formattedValue }}
    </h2>

    <span class="kpi-sub">
      {{ aggregationLabel }}
    </span>
  </div>
</template>

<script setup>
import { computed } from 'vue'

/* ===== PROPS ===== */
const props = defineProps({
  title: String,
  data: {
    type: Array,
    required: true
  },
  metric: String,
  aggregation: {
    type: String, // count | sum | average
    default: 'count'
  },
  format: {
    type: String, // number | currency
    default: 'number'
  }
})

/* ===== AGGREGATION LOGIC ===== */
const value = computed(() => {
  if (!props.data.length) return 0

  if (props.aggregation === 'count') {
    return props.data.length
  }

  const total = props.data.reduce(
    (sum, item) => sum + Number(item[props.metric] || 0),
    0
  )

  if (props.aggregation === 'average') {
    return (total / props.data.length).toFixed(2)
  }

  return total
})

/* ===== FORMAT ===== */
const formattedValue = computed(() => {
  if (props.format === 'currency') {
    return `$${value.value}`
  }
  return value.value
})

const aggregationLabel = computed(() => {
  return props.aggregation.toUpperCase()
})
</script>

<style scoped>
.kpi-card {
  background: white;
  padding: 16px;
  border-radius: 12px;
  box-shadow: 0 4px 16px rgba(0,0,0,0.08);
}

.kpi-title {
  font-size: 14px;
  color: #6b7280;
}

.kpi-value {
  font-size: 28px;
  margin: 8px 0;
  color: #4f46e5;
}

.kpi-sub {
  font-size: 12px;
  color: #9ca3af;
}
</style>
