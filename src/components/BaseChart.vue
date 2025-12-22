<template>
  <div class="chart-card">
    <h3>{{ title }}</h3>
    <canvas ref="chartCanvas"></canvas>
  </div>
</template>

<script setup>
import { onMounted, watch, ref } from 'vue'
import {
  Chart,
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  BarController,
  BarElement,
  Tooltip,
  Legend
} from 'chart.js'

Chart.register(
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  BarController,
  BarElement,
  Tooltip,
  Legend
)

const props = defineProps({
  title: String,
  type: String,
  labels: Array,
  data: Array
})

const chartCanvas = ref(null)
let chartInstance = null

const createChart = () => {
  if (chartInstance) chartInstance.destroy()

  const ctx = chartCanvas.value.getContext('2d')

  //  Gradient
  const gradient = ctx.createLinearGradient(0, 0, 0, 300)
  gradient.addColorStop(0, '#6366f1')
  gradient.addColorStop(1, '#a5b4fc')

  chartInstance = new Chart(ctx, {
    type: props.type,
    data: {
      labels: props.labels,
      datasets: [
        {
          label: props.title,
          data: props.data,
          backgroundColor:
            props.type === 'line' ? gradient : '#6366f1',
          borderColor: '#4f46e5',
          fill: props.type === 'line',
          tension: 0.4,
          borderRadius: props.type === 'bar' ? 10 : 0,
          pointRadius: 5,
          pointHoverRadius: 8
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: '#111827',
          titleColor: '#fff',
          bodyColor: '#e5e7eb',
          padding: 12,
          cornerRadius: 10
        }
      },
      scales: {
        x: {
          grid: { display: false },
          ticks: { color: '#6b7280' }
        },
        y: {
          grid: {
            borderDash: [5, 5],
            color: '#e5e7eb'
          },
          ticks: { color: '#6b7280' }
        }
      }
    }
  })
}
onMounted(createChart)
watch(() => props.data, createChart)
</script>

<style scoped>
.chart-card {
  background: white;
  padding: 20px;
  border-radius: 16px;
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.08);
  height: 350px;
}

.chart-card h3 {
  margin-bottom: 12px;
  font-size: 16px;
  font-weight: 600;
}
.charts-grid {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 20px;
}

/* Tablet */
@media (max-width: 1024px) {
  .charts-grid {
    grid-template-columns: 1fr;
  }
}

.chart-card {
  background: white;
  padding: 20px;
  border-radius: 18px;
  box-shadow: 0 10px 25px rgba(0,0,0,0.08);
}

</style>
