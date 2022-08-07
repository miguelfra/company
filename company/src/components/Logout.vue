<template>
  <v-btn @click="Logout" color="error">Logout</v-btn>
</template>

<script>
export default {
    methods: {
        Logout() {
            localStorage.removeItem('token');
            localStorage.removeItem('rol');
            window.location.href = '/signin'
        }
    }
}
</script>
