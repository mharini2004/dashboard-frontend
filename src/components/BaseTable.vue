<template>
  <div class="table-wrapper">
    <table>
      <thead>
        <tr>
          <th v-for="col in columns" :key="col">{{ col }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, i) in rows" :key="i">
          <td v-for="col in columns" :key="col">
            {{ row[col] }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
defineProps({
  columns: Array,
  rows: Array
})
</script>

<style scoped>
.table-wrapper {
  background: white;
  border-radius: 14px;
  box-shadow: 0 10px 25px rgba(0,0,0,0.05);
  overflow-x: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  padding: 14px 18px;
  text-align: left;
  font-size: 14px;
}

thead {
  background: #eef2ff;
}

tbody tr:hover {
  background: #f8fafc;
}
.table-wrapper {
  overflow-x: auto;
}

table {
  min-width: 800px;
}

@media (max-width: 640px) {
  th, td {
    padding: 10px;
    font-size: 13px;
  }
}

</style>
