<template>
  <h1>Oops!</h1>
  <h3>The {{ resource }} you're looking for is not here.</h3>
  <router-link :to="{ name: 'EventList' }">Back ot the home page</router-link>
</template>

<script>
export default {
  name: 'NotFound',
  props: {
    resource: {
      type: String,
      require: true,
      default: 'page',
    },
  },
}
</script>

<style scoped></style>
