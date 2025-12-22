<template>
  <div class="configure-page">
    <!-- LEFT SIDEBAR -->
    <aside class="sidebar">
      <h2 class="title">Configure dashboard</h2>
      

      <!-- View Data For -->
      <div class="section">
        <label>Show data for</label>
        <select v-model="dateRange">
          <option>All time</option>
          <option>Today</option>
          <option>Last 7 Days</option>
          <option>Last 30 Days</option>
          <option>Last 90 Days</option>
        </select>
      </div>

      <!-- Widget Library -->
      <div class="section">
        <h3>Widget library</h3>
        

        <!-- Charts -->
        <div class="accordion">
          <div class="accordion-header" @click="toggle('charts')">
            Charts
            <span>{{ open.charts ? '▲' : '▼' }}</span>
          </div>

          <div v-if="open.charts" class="accordion-body">
            <div class="item">📊 Bar Chart</div>
            <div class="item">📈 Line Chart</div>
            <div class="item">🥧 Pie Chart</div>
            <div class="item">📉 Area Chart</div>
            <div class="item">🔵 Scatter Plot</div>
          </div>
        </div>

        <!-- Tables -->
        <div class="accordion">
          <div class="accordion-header" @click="toggle('tables')">
            Tables
            <span>{{ open.tables ? '▲' : '▼' }}</span>
          </div>

          <div v-if="open.tables" class="accordion-body">
            <div class="item">📋 Table</div>
          </div>
        </div>

        <!-- KPIs -->
        <div class="accordion">
          <div class="accordion-header" @click="toggle('kpis')">
            KPIs
            <span>{{ open.kpis ? '▲' : '▼' }}</span>
          </div>

          <div v-if="open.kpis" class="accordion-body">
            <div class="item">📌 KPI Value</div>
          </div>
        </div>
      </div>
    </aside>

    <!-- RIGHT GRID -->
    <main class="grid">
      <div v-for="i in 120" :key="i" class="grid-box"></div>

      <!-- Footer Buttons -->
      <div class="footer">
        <button class="cancel">Cancel</button>
        <button class="save" @click="goToDashboard">Save</button>
      </div>
    </main>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const dateRange = ref('All time')

const WIDGETS = {
  BAR: 'bar',
  LINE: 'line',
  PIE: 'pie',
  TABLE: 'table',
  KPI: 'kpi'
}

const open = reactive({
  charts: true,
  tables: false,
  kpis: false
})

const toggle = (key) => {
  open[key] = !open[key]
}

const goToDashboard = () => {
  router.push('/dashboard')
}
</script>

<style scoped>
.configure-page {
  display: flex;
  height: 100vh;
  background: #7f90a3ff;
}

/* Sidebar */
.sidebar {
  width: 320px;
  background: #f9f8e7ff;
  padding: 20px;
  border-right: 1px solid #ddf195ff;
}

.title {
  font-size: 18px;
  font-weight: 600;
}

.subtitle {
  font-size: 13px;
  color: #6b7280;
  margin-bottom: 20px;
}

.section {
  margin-bottom: 25px;
}

select {
  width: 100%;
  padding: 8px;
  border-radius: 6px;
  border: 1px solid #d1d5db;
}

/* Accordion */
.accordion {
  margin-top: 12px;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
}

.accordion-header {
  padding: 10px;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  background: #f9fafb;
}

.accordion-body {
  padding: 10px;
}

.item {
  padding: 6px;
  cursor: pointer;
  border-radius: 4px;
}

.item:hover {
  background: #eef2ff;
}

/* Grid */
.grid {
  flex: 1;
  padding: 20px;
  position: relative;
}

.grid-box {
  width: 80px;
  height: 40px;
  background: #e5e7eb;
  display: inline-block;
  margin: 6px;
  border-radius: 4px;
}

/* Footer */
.footer {
  position: absolute;
  bottom: 20px;
  right: 20px;
}

.cancel {
  background: white;
  border: 1px solid #d1d5db;
  padding: 8px 14px;
  margin-right: 10px;
}

.save {
  background: #22c55e;
  color: white;
  border: none;
  padding: 8px 16px;
}
</style>
