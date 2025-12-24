<template>
  <div class="configure-page">
    <!-- LEFT SIDEBAR -->
   

    <!-- RIGHT GRID -->
    <main class="grid">
      <div v-for="i in 120" :key="i" class="grid-box"></div>

      <!-- Footer Buttons -->
      <div class="footer">
        <button class="cancel">Cancel</button>
        <button class="save" @click="goToDashboard">Save</button>
      </div>
      <div v-if="showToast" class="toast">
  ✅ Dashboard configuration saved successfully
</div>
    </main>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const showToast = ref(false)


const toggle = (key) => {
  open[key] = !open[key]
}

const goToDashboard = () => {
  // show toast
  showToast.value = true

  // after 1.5 seconds go to dashboard page
  setTimeout(() => {
    showToast.value = false
    router.push('/dashboard')
  }, 1500)
}

</script>

<style scoped>
.configure-page {
  display: flex;
  height: 100vh;
  background: #7f90a3ff;
}



/* Grid */
.grid {
  flex: 1;
  padding: 20px;
  position: relative;
}

.grid-box {
  width: 80px;
  height: 40px;
  background: #e5e7eb;
  display: inline-block;
  margin: 6px;
  border-radius: 4px;
}

/* Footer */
.footer {
  position: absolute;
  bottom: 20px;
  right: 20px;
}

.cancel {
  background: white;
  border: 1px solid #d1d5db;
  padding: 8px 14px;
  margin-right: 10px;
}

.save {
  background: #22c55e;
  color: white;
  border: none;
  padding: 8px 16px;
}
.toast {
  position: fixed;
  top: 20px;
  right: 20px;
  background: #22c55e;
  color: white;
  padding: 12px 18px;
  border-radius: 10px;
  font-weight: 500;
  box-shadow: 0 10px 25px rgba(0,0,0,0.15);
  z-index: 9999;
  animation: slideIn 0.3s ease;
}

@keyframes slideIn {
  from {
    transform: translateY(-10px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

</style>
