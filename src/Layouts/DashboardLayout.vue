<template>
  <div class="layout">
    <Sidebar />
    <div class="main">
      <Header />
      <router-view />
    </div>
  </div>
</template>

<script setup>
import Sidebar from "@/components/Sidebar.vue";
import Header from "@/components/Header.vue";
</script>

<style scoped>
.layout {
  display: flex;
  height: 100vh;
}

.main {
  flex: 1;
  background: #dbeafe;
  overflow-y: auto;
}
</style>
