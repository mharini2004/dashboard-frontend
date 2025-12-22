<template>
  <div class="modal-backdrop" @click.self="close">
    <div class="modal">
      <h2>Create Order</h2>

      <!-- CUSTOMER INFORMATION -->
      <h4>Customer Information</h4>

      <div class="grid">
        <input v-model="form.firstName" placeholder="First Name *" />
        <input v-model="form.lastName" placeholder="Last Name *" />
        <input v-model="form.email" placeholder="Email *" />
        <input v-model="form.phone" placeholder="Phone Number *" />
        <input v-model="form.address" placeholder="Street Address *" />
        <input v-model="form.city" placeholder="City *" />
        <input v-model="form.state" placeholder="State / Province *" />
        <input v-model="form.postalCode" placeholder="Postal Code *" />

        <select v-model="form.country">
          <option disabled value="">Select Country</option>
          <option>United States</option>
          <option>Canada</option>
          <option>Australia</option>
          <option>India</option>
          <option>Hong Kong</option>
          <option>Singapore</option>
          
        </select>
      </div>

      <!-- ORDER INFORMATION -->
      <h4>Order Information</h4>

      <div class="grid">
        <select v-model="form.product">
          <option disabled value="">Choose Product</option>
          <option value="Fiber Internet 300 Mbps">Fiber Internet 300 Mbps</option>
          <option value="5G Unlimited Mobile Plan">5G Unlimited Mobile Plan</option>
          <option value="Fiber Internet 1 Gbps">Fiber Internet 1 Gbps</option>
          <option value="Business Internet 500 Mbps">Business Internet 500 Mbps</option>
          <option value="VoIP Corporate Package">VoIP Corporate Package</option>
        </select>

        <input type="number" min="1" v-model.number="form.quantity" />
        <input type="number" v-model.number="form.unitPrice" placeholder="Unit Price" disabled />
        <input type="text" :value="totalAmount" disabled />
        
        <select v-model="form.status">
          <option>Pending</option>
          <option>In Progress</option>
          <option>Completed</option>
        </select>

        <select v-model="form.createdBy">
          <option>Mr. Michael Harris</option>
          <option>Mr. Ryan Cooper</option>
          <option>Ms. Ramya</option>
          <option>Ms. Olivia Carter</option>
          <option>Mr. Lucas Martin</option>
          <option>Ms. Indra</option>
        </select>
      </div>
     

      <!-- ACTIONS -->
      <div class="actions">
       <p v-if="errorMessage" class="error-msg">
  {{ errorMessage }}
</p>
        <button @click="$emit('close')">Cancel</button>
        <button class="save" @click="saveOrder">Create Order</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, computed, watch } from 'vue'
import { useCustomerOrderStore } from '@/stores/customerOrderStore'
import { ref } from 'vue'

const emit = defineEmits(['close', 'save'])
const orderStore = useCustomerOrderStore()
const errorMessage = ref('')

const form = reactive({
  customerId: '',
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  address: '',
  city: '',
  state: '',
  postalCode: '',
  country: '',
  product: '',
  quantity: 1,
  unitPrice: 0,
  status: 'Pending',
  createdBy: 'Mr. Michael Harris'
})


const productPrices = {
  'Fiber Internet 300 Mbps': 1200,
  '5G Unlimited Mobile Plan': 800,
  'Fiber Internet 1 Gbps': 2000,
  'Business Internet 500 Mbps': 1500,
  'VoIP Corporate Package': 500
}
const props = defineProps({
  order: Object
})
watch(
  () => props.order,
  (val) => {
    if (val) {
      Object.assign(form, {
        customerId: val.customerId,
        firstName: val.customer?.split(' ')[0] || '',
        lastName: val.customer?.split(' ')[1] || '',
        email: val.email,
        phone: val.phone,
        address: val.address,
        product: val.product,
        quantity: val.quantity,
        unitPrice: val.unitPrice,
        status: val.status,
        createdBy: val.createdBy
      })
    }
  },
  { immediate: true }
)



watch(() => form.product, (val) => {
  form.unitPrice = productPrices[val] || 0
})

const totalAmount = computed(() => `₹ ${form.quantity * form.unitPrice}`)

const saveOrder = () => {
  if (
  !form.firstName ||
  !form.lastName ||
  !form.email ||
  !form.phone ||
  !form.product ||
  form.quantity <= 0 ||
  form.unitPrice <= 0
) {
  errorMessage.value = 'Please select product and valid quantity'
  return
}


  errorMessage.value = ''

  emit('save', {
  id: form.id,
  customerId: 'CUST-' + Date.now(),
  customer: `${form.firstName} ${form.lastName}`,
  email: form.email,
  phone: form.phone,
  address: `${form.address}, ${form.city}, ${form.state}, ${form.postalCode}, ${form.country}`,
  product: form.product,
  quantity: form.quantity,
  unitPrice: form.unitPrice,
  amount: form.quantity * form.unitPrice,
  status: form.status,
  createdBy: form.createdBy,
  date: new Date()
})

  emit('close')
}



const resetForm = () => {
  Object.assign(form, {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    postalCode: '',
    country: '',
    product: '',
    quantity: 1,
    unitPrice: 0,
    status: 'Pending',
    createdBy: ''
  })
}



const close = () => emit('close')
</script>

<style scoped>
.modal-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.45);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal {
  background: #fff;
  width: 800px;
  max-height: 90vh;
  overflow-y: auto;
  padding: 24px;
  border-radius: 16px;
}

h2 {
  margin-bottom: 10px;
}

h4 {
  margin: 20px 0 10px;
}

.grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
}

input, select {
  padding: 10px;
  border-radius: 8px;
  border: 1px solid #ccc;
}

.actions {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 20px;
}

.cancel {
  background: #e5e7eb;
  border: none;
  padding: 10px 16px;
  border-radius: 8px;
}

.save {
  background: #4f46e5;
  color: white;
  border: none;
  padding: 10px 16px;
  border-radius: 8px;
}
.error-text {
  color: #dc2626;
  font-size: 14px;
  margin-bottom: 12px;
}

</style>

