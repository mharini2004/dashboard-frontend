import { defineStore } from 'pinia'

export const useCustomerOrderStore = defineStore('customerOrders', {
  state: () => ({
    orders: [],
    filterRange: '7'
  }),

  getters: {
    filteredOrders(state) {
      const now = new Date()

      if (state.filterRange === 'today') {
        return state.orders.filter(o =>
          new Date(o.date).toDateString() === now.toDateString()
        )
      }

      const days = Number(state.filterRange)
      const past = new Date()
      past.setDate(now.getDate() - days)

      return state.orders.filter(o => new Date(o.date) >= past)
    },

    totalOrders() {
      return this.filteredOrders.length
    },

    totalRevenue() {
      return this.filteredOrders.reduce((sum, o) => sum + o.amount, 0)
    },

    activeCustomers() {
      return new Set(this.filteredOrders.map(o => o.customer)).size
    }
  },

actions: {
  addOrder(order) {
    this.orders.push(order)
  },

  deleteOrder(id) {
    this.orders = this.orders.filter(o => o.id !== id)
  },

  updateOrder(updatedOrder) {
    const index = this.orders.findIndex(o => o.id === updatedOrder.id)
    if (index !== -1) {
      this.orders[index] = updatedOrder
    }
  }
}}
)
