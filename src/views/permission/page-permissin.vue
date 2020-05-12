<template>
    <div>Your Roles: {{ roles }}
        
    </div>
</template>
<script>
export default {
    name: 'PagePermission',
    computed: {
        roles() {
            return this.$store.getters.roles[0]
        }
    },
    methods: {
        test() {
            console.log(this.roles)
        }
    }
}
</script>