<template>
 <div class="va-dashboard-container">
    <admin-dashboard />
 </div>
</template>

<script>
import adminDashboard from './admin'
export default {
  name: 'Dashboard',
  components: { adminDashboard }
}
</script>
<style lang="scss" scoped>
.va-dashboard-container {
  padding: 32px;
  background: #f0f2f5;
}
</style>