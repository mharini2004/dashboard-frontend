<template>
  <div class="card">
    <p class="label">{{ title }}</p>
    <h2 class="value">{{ value }}</h2>
    <p v-if="subtitle" class="subtitle">{{ subtitle }}</p>
  </div>
</template>

<script setup>
defineProps({
  title: String,
  value: [String, Number],
  subtitle: String
})
</script>

<style scoped>
.card {
  background: white;
  padding: 22px;
  border-radius: 14px;
  box-shadow: 0 12px 30px rgba(0,0,0,0.06);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.card:hover {
  transform: translateY(-6px);
  box-shadow: 0 20px 40px rgba(0,0,0,0.08);
}

.label {
  color: #64748b;
  font-size: 14px;
}

.value {
  font-size: 30px;
  font-weight: bold;
  color: #4f46e5;
  margin-top: 6px;
}

.subtitle {
  font-size: 13px;
  color: #94a3b8;
  margin-top: 6px;
}
</style>
