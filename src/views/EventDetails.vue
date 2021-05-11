<template>
  <div v-if="event">
    <h1>{{ event.title }}</h1>
    <p>{{ event.time }} on {{ event.date }} @ {{ event.location }}</p>
    <p>{{ event.description }}</p>
  </div>
  <div v-else>Loading...</div>
</template>

<script>
import EventService from '../services/EventService'
export default {
  name: 'EventDetails',
  props: {
    id: Number,
  },
  data() {
    return {
      event: null,
    }
  },
  created() {
    EventService.getEvent(this.id)
      .then((res) => (this.event = res.data))
      .catch((e) => console.log(e))
  },
}
</script>

<style scoped></style>
