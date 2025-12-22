<template>
  <div class="table-card">

    <div class="table-header">
      <h3>User List</h3>
      <button @click="addSampleUser">+ Add User</button>
    </div>

    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Role</th>
          <th>Status</th>
          <th>Action</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="user in userStore.users" :key="user.id">
          <td>{{ user.name }}</td>
          <td>{{ user.role }}</td>
          <td>
            <span :class="['status', user.status.toLowerCase()]">
              {{ user.status }}
            </span>
          </td>
          <td>
            <button class="delete" @click="deleteUser(user.id)">
              Delete
            </button>
          </td>
        </tr>

        <tr v-if="userStore.users.length === 0">
          <td colspan="4" class="empty">No users found</td>
        </tr>
      </tbody>
    </table>

  </div>
</template>

<script setup>
import { useUserStore } from '@/stores/userStore'

const userStore = useUserStore()

function addSampleUser() {
  userStore.addUser({
    name: 'New User',
    role: 'User',
    status: 'Active'
  })
}

function deleteUser(id) {
  userStore.deleteUser(id)
}
</script>

<style scoped>
.table-card {
  background: #fff;
  padding: 20px;
  border-radius: 14px;
  box-shadow: 0 6px 20px rgba(0,0,0,0.06);
}

.table-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.table-header button {
  background: #4f46e5;
  color: white;
  border: none;
  padding: 8px 14px;
  border-radius: 8px;
  cursor: pointer;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th {
  background: #eef2ff;
  text-align: left;
  padding: 12px;
}

td {
  padding: 12px;
  border-bottom: 1px solid #eee;
}

.status.active {
  color: green;
  font-weight: 600;
}

.status.inactive {
  color: red;
  font-weight: 600;
}

.delete {
  background: #fee2e2;
  color: #b91c1c;
  border: none;
  padding: 6px 10px;
  border-radius: 6px;
  cursor: pointer;
}

.empty {
  text-align: center;
  color: #6b7280;
}
</style>
