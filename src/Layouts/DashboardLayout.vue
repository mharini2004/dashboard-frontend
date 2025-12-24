<template>
  <div class="layout">
    <!-- Sidebar ONLY for allowed pages -->
    <Sidebar v-if="showSidebar" />

    <main class="content">
      <router-view />
    </main>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import Sidebar from '@/components/Sidebar.vue'

const route = useRoute()

/* Sidebar should appear ONLY on these pages */
const showSidebar = computed(() => {
  return route.name === 'ConfigureDashboard' || route.name === 'Dashboard'
})
</script>

<style scoped>
.layout {
  display: flex;
  height: 100vh;
}

.content {
  flex: 1;
}
</style>

