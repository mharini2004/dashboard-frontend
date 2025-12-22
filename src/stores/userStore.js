import { defineStore } from 'pinia'

export const useUserStore = defineStore('userStore', {
  state: () => ({
    users: [
      { id: 1, name: 'Harini', role: 'Admin', status: 'Active' },
      { id: 2, name: 'Arun', role: 'User', status: 'Inactive' },
      { id: 3, name: 'Priya', role: 'Editor', status: 'Active' }
    ]
  }),

  actions: {
    addUser(user) {
      this.users.push({
        id: Date.now(),
        ...user
      })
    },

    deleteUser(id) {
      this.users = this.users.filter(u => u.id !== id)
    }
  }
})
