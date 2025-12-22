<template>
  <aside class="sidebar">
    <router-link to="/dashboard" class="item">📊 Dashboard</router-link>
    <router-link to="/users" class="item">👤 Users</router-link>
    <router-link to="/reports" class="item">📄 Reports</router-link>
  </aside>
</template>

<style scoped>
.sidebar {
  width: 240px;
  background: #0f172a;
  padding: 16px;
}

.item {
  display: block;
  padding: 12px 16px;
  margin-bottom: 12px;
  border-radius: 8px;
  text-decoration: none;
  color: #cbd5f5;
  font-weight: 500;
}

.item.router-link-active {
  background: #1e293b;
  color: white;
}
</style>
