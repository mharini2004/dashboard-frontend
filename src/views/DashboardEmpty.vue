<template>
  <div class="empty-wrapper">
    <div class="empty-card">
      <div class="icon">📊</div>
      <h2>Dashboard Not Configured</h2>
      <p>Configure your dashboard to start viewing analytics</p>

      <button class="configure-btn" @click="goToConfigure">
        ⚙ Configure dashboard
      </button>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const goToConfigure = () => {
  router.push('/configure-dashboard')
}
</script>

<style scoped>
.empty-wrapper {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #bdd0eeff;
}

.empty-card {
  background: white;
  padding: 40px;
  text-align: center;
  border-radius: 12px;
  width: 420px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.08);
}

.icon {
  font-size: 40px;
  margin-bottom: 15px;
}

.configure-btn {
  margin-top: 20px;
  padding: 10px 18px;
  background: #10b981;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
}
</style>
