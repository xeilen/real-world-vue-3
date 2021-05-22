<template>
  <p>Register for event here</p>
  <button @click="register">Register me!</button>
</template>

<script>
export default {
  name: 'Register',
  props: {
    event: Object,
  },
  methods: {
    register() {
      const message = 'You are successfully registered for ' + this.event.title
      this.$store.dispatch('notificationsModule/setFleshMessage', message)

      setTimeout(() => {
        this.$store.dispatch('notificationsModule/setFleshMessage', '')
      }, 3000)

      this.$router.push({
        name: 'EventDetails',
      })
    },
  },
}
</script>

<style scoped></style>
