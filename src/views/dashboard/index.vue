<template>
  <h1>
    {{ this.$store.state.user.name }}
  </h1>
</template>

<script>
export default {
  name: 'Dashboard',
}
</script>