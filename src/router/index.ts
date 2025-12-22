import { createRouter, createWebHistory } from 'vue-router'

import DashboardEmpty from '@/views/DashboardEmpty.vue'
import ConfigureDashboard from '@/views/ConfigureDashboard.vue'
import Dashboard from '@/views/Dashboard.vue'

const routes = [
  {
    path: '/',
    redirect: '/dashboard-empty'
  },
  {
    path: '/dashboard-empty',
    name: 'DashboardEmpty',
    component: DashboardEmpty
  },
  {
    path: '/configure-dashboard',
    name: 'ConfigureDashboard',
    component: ConfigureDashboard
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
