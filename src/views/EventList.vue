<template>
  <h1>Events for goods</h1>
  <div v-if="events" class="events">
    <EventCard v-for="event in events" :event="event" :key="event.id" />
  </div>
  <div v-else>Loading...</div>
</template>

<script>
// @ is an alias to /src
import EventCard from '../components/EventCard.vue'
import EventService from '../services/EventService'

export default {
  name: 'EventList',
  components: {
    EventCard,
  },
  data() {
    return {
      events: null,
    }
  },
  created() {
    EventService.getEvents()
      .then((response) => {
        this.events = response.data;
      })
      .catch((e) => console.log(e))
  },
}
</script>

<style>
.events {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
