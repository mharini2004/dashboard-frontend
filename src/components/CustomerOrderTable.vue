<template>
  <div class="table-card">
    <div class="table-header">
      <h3>Customer Orders</h3>
      <button @click="addSampleOrder">+ Add Order</button>
    </div>

    <table>
      <thead>
        <tr>
          <th>Customer</th>
          <th>Amount</th>
          <th>Status</th>
          <th>Date</th>
          <th>Action</th>
        </tr>
      </thead>

      <tbody>
        <tr v-if="orders.length === 0">
          <td colspan="5" class="empty">No orders found</td>
        </tr>

        <tr v-for="order in orders" :key="order.id">
          <td>{{ order.customerName }}</td>
          <td>₹ {{ order.amount }}</td>
          <td>{{ order.status }}</td>
          <td>{{ formatDate(order.date) }}</td>
          <td>
            <button class="delete" @click="deleteOrder(order.id)">
              Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { useCustomerOrderStore } from '@/stores/customerOrderStore'

const orderStore = useCustomerOrderStore()
const orders = orderStore.orders

function addSampleOrder() {
  orderStore.addOrder({
    id: Date.now(),
    customerName: 'Customer ' + (orders.length + 1),
    amount: Math.floor(Math.random() * 5000) + 500,
    status: 'Completed',
    date: new Date()
  })
}

function deleteOrder(id) {
  orderStore.deleteOrder(id)
}

function formatDate(date) {
  return new Date(date).toLocaleDateString()
}
</script>

<style scoped>
.table-card {
  background: #fff;
  padding: 20px;
  border-radius: 14px;
  box-shadow: 0 8px 25px rgba(0,0,0,0.06);
}

.table-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

button {
  padding: 6px 12px;
  border: none;
  border-radius: 6px;
  background: #4f46e5;
  color: white;
  cursor: pointer;
}

.delete {
  background: #ef4444;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  padding: 12px;
  text-align: left;
}

th {
  background: #eef2ff;
}

.empty {
  text-align: center;
  color: #6b7280;
}
</style>
