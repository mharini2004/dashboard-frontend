<template>
  <div class="dashboard">

    <!-- FILTER -->
    <div class="filter-bar">
      <label>Show orders:</label>
      <select v-model="selectedRange">
        <option value="today">Today</option>
        <option value="7">Last 7 Days</option>
        <option value="30">Last 30 Days</option>
      </select>
    </div>

    <!-- KPI -->
    <div class="kpi-grid">
      <div class="kpi-card">
        <p>Total Orders</p>
        <h2>{{ filteredOrders.length }}</h2>
      </div>

      <div class="kpi-card">
        <p>Total Revenue</p>
        <h2>₹ {{ totalRevenue }}</h2>
      </div>

      <div class="kpi-card">
        <p>Active Customers</p>
        <h2>{{ activeCustomers }}</h2>
      </div>
    </div>

    <!-- TABLE -->
    <div class="table-card">
      <div class="table-header">
        <h3>Customer Orders</h3>
        <button class="add-btn" @click="showModal = true">+ Add Order</button>
      </div>

      <table>
        <thead>
          <tr>
            <th>Customer</th>
            <th>Customer ID</th>
            <th>Email</th>
            <th>Address</th>
            <th>Amount</th>
            <th>Status</th>
            <th>Date</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          <tr v-if="filteredOrders.length === 0">
            <td colspan="5" style="text-align:center;">No orders found</td>
          </tr>

          <tr v-for="order in filteredOrders" :key="order.id">
            <td>{{ order.customer }}</td>
            <td>{{ order.customerId }}</td>
            <td>{{ order.email }}</td>
            <td>{{ order.address }}</td>
            <td>₹ {{ order.amount }}</td>
            <td>
              <span class="status-badge" :class="statusClass(order.status)">
                {{ order.status }}
              </span>
            </td>
            <td>{{ formatDate(order.date) }}</td>
            <td>
              <button class="edit-btn" @click="editOrder(order)">Edit</button>
              <button class="delete-btn" @click="orderStore.deleteOrder(order.id)">
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- CHARTS -->
    <div class="charts-grid">
  <div class="chart-card">
    <h3>Orders Trend</h3>
    <BaseChart
      type="line"
      :labels="ordersByDate.labels"
      :data="ordersByDate.data"
    />
  </div>

  <div class="chart-card">
    <h3>Order Status</h3>
    <BaseChart
      type="bar"
      :labels="ordersByStatus.labels"
      :data="ordersByStatus.data"
    />
  </div>
</div>

    <!-- MODAL -->
    <CreateOrderModal
      v-if="showModal"
      :order="editingOrder"
      @close="showModal = false"
      @save="handleSave"
    />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useCustomerOrderStore } from '@/stores/customerOrderStore'
import CreateOrderModal from '@/components/CreateOrderModal.vue'
import BaseChart from '@/components/BaseChart.vue'


const orderStore = useCustomerOrderStore()

const selectedRange = ref('7')
const showModal = ref(false)
const editingOrder = ref(null)

/* ---------- FILTER ---------- */
const filteredOrders = computed(() => {
  const now = new Date()

  if (selectedRange.value === 'today') {
    return orderStore.orders.filter(
      o => new Date(o.date).toDateString() === now.toDateString()
    )
  }

  const days = Number(selectedRange.value)
  const past = new Date()
  past.setDate(now.getDate() - days)

  return orderStore.orders.filter(o => new Date(o.date) >= past)
})

/* ---------- KPI ---------- */
const totalRevenue = computed(() =>
  filteredOrders.value.reduce((sum, o) => sum + o.amount, 0)
)

const activeCustomers = computed(() =>
  new Set(filteredOrders.value.map(o => o.customer)).size
)

/* ---------- CHARTS ---------- */
const ordersByDate = computed(() => {
  const map = {}

  filteredOrders.value.forEach(order => {
    const date = new Date(order.date).toLocaleDateString()
    map[date] = (map[date] || 0) + 1
  })

  return {
    labels: Object.keys(map),
    data: Object.values(map)
  }
})

const ordersByStatus = computed(() => {
  const statusMap = {
    Pending: 0,
    'In Progress': 0,
    Completed: 0
  }

  filteredOrders.value.forEach(order => {
    statusMap[order.status]++
  })

  return {
    labels: Object.keys(statusMap),
    data: Object.values(statusMap)
  }
})


/* ---------- ACTIONS ---------- */
const editOrder = (order) => {
  editingOrder.value = { ...order }
  showModal.value = true
}

const handleSave = (order) => {
  if (order.id) {
    orderStore.updateOrder(order)
  } else {
    orderStore.addOrder({
  ...order,
  id: Date.now(),
  date: new Date()
})
  }
  showModal.value = false
}


const formatDate = (date) => new Date(date).toLocaleDateString()

const statusClass = (s) =>
  s.toLowerCase().replace(' ', '-')
</script>

<style scoped>
.dashboard { width: 100%; }

/* FILTER */
.filter-bar {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

/* KPI */
.kpi-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin-bottom: 32px;
}

.kpi-card {
  padding: 24px;
  border-radius: 18px;
  color: #111827;
  background: linear-gradient(135deg, #f9fafb, #ffffff);
  box-shadow: 0 12px 30px rgba(0,0,0,0.08);
  transition: transform 0.25s ease, box-shadow 0.25s ease;
  background: linear-gradient(135deg,  #65adddff, #9ceaf6ff);
  color: white;
  padding: 24px;
  border-radius: 18px;
  box-shadow: 0 15px 35px rgba(160, 162, 237, 0.35);
}

.kpi-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 18px 40px rgba(204, 167, 235, 0.12);
}

.kpi-card p {
  font-size: 22px;
  font-weight: 600;
  color: #080c13ff;
  margin-bottom: 8px;
  font-size: 14px;
  opacity: 0.9;
}

.kpi-card h2 {
  font-size: 34px;
  font-weight: 700;
   margin-top: 6px;
  font-size: 28px;
}

/* Color accents */
.kpi-card.orders {
  border-left: 6px solid #6366f1;
}

.kpi-card.revenue {
  border-left: 6px solid #22c55e;
}

.kpi-card.customers {
  border-left: 6px solid #f59e0b;
}


/* TABLE CARD */
.table-card {
  background: #f6f4e5ff;
  padding: 24px;
  border-radius: 14px;
  box-shadow: 0 9px 25px rgba(0,0,0,0.06);
  margin-bottom: 32px;
}

/* HEADER */
.table-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 18px;
}

.table-header h3 {
  margin: 0;
}

/* TABLE */
table {
  width: 100%;
  border-collapse: collapse;
  table-layout: fixed;
}

th, td {
  padding: 14px 12px;
  text-align: center;  
  vertical-align: middle;
}

th {
  background: #eef1ad7a;
  font-weight: 600;
}

td {
  border-bottom: 1px solid #eee;
}

/* CUSTOMER COLUMN LEFT ALIGNED */
td:first-child,
th:first-child {
  text-align: left;
}

/* ACTION COLUMN */
td:last-child,
th:last-child {
  text-align: center;
  white-space: nowrap;
}

/* BUTTONS */
.edit-btn {
  background: #6366f1;
  color: #fff;
  border: none;
  padding: 6px 10px;
  border-radius: 6px;
  margin-right: 6px;
  cursor: pointer;
}

.delete-btn {
  background: #ef4444;
  color: white;
  border: none;
  padding: 6px 12px;
  border-radius: 6px;
  cursor: pointer;
}


.add-btn {
  background: #4f46e5;
  color: white;
  border: none;
  padding: 8px 14px;
  border-radius: 8px;
}



/* STATUS */
.status-badge {
  padding: 6px 12px;
  border-radius: 999px;
  color: white;
  font-size: 13px;
}

.pending { background: orange; }
.in-progress { background: #3b82f6; }
.completed { background: #16a34a; }

/* CHARTS */
.charts-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
  margin-top: 32px;
}


.chart-card {
  background: #f9fbfbff;
  border-radius: 20px;
  padding: 20px 24px 26px;
  box-shadow: 0 14px 35px rgba(0,0,0,0.08);
  transition: transform 0.25s ease;
}

.chart-card:hover {
  transform: translateY(-3px);
}

.chart-card h3 {
  font-size: 16px;
  font-weight: 600;
  color: #111827;
  margin-bottom: 16px;
  border-left: 4px solid #6366f1;
  padding-left: 10px;
}



@media (max-width: 1024px) {
  .kpi-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}


@media (max-width: 640px) {
  .kpi-grid {
    grid-template-columns: 1fr;
  }
}


</style>
