<template>
  <div v-if="event">
    <div class="event-header">
      <h1 class="title">{{ event.title }}</h1>
      <span class="eyebrow">{{ event.time }} on {{ event.date }} @ {{ event.location }}</span>
      <h5>Organized by {{ event.organizer }}</h5>
      <h5>Category: {{ event.category }}</h5>
    </div>
    <h1>Test commit</h1>

    <BaseIcon name="map"><h2>Location</h2></BaseIcon>

    <address>{{ event.location }}</address>

    <h2>Events Details</h2>
    <p>{{ event.description }}</p>

    <h2>Attendees
      <span class="badge -fill-gradient">{{ event.attendees ? event.attendees.length : 0 }}</span>
    </h2>

    <ul class="list-group">
      <li v-for="(attendee, index) in event.attendees" :key="index" class="list-item">
        <b>{{ attendee.name }}</b>
      </li>
    </ul>
  </div>
  <div v-else>Loading...</div>
</template>

<script>
import BaseIcon from "../components/BaseIcon";
import { mapState, mapActions } from 'vuex'
export default {
  name: 'EventDetails',
  components: { BaseIcon },
  props: {
    id: [Number, String],
  },
  data() {
    return {
    }
  },
  created() {
    // this.$store.dispatch('eventModule/fetchEventDetails', this.id)
    this.fetchEventDetails(this.id)
  },
  computed: {
    ...mapState({
      event: state => state.eventModule.eventDetails,
    }),
  },
  methods: mapActions('eventModule',['fetchEventDetails'])
}
</script>

<style scoped>
.event-header > .title {
  margin: 0;
}
.list-group {
  margin: 0;
  padding: 0;
  list-style: none;
}
.list-group > .list-item {
  padding: 1em 0;
  border-bottom: 1px solid #e5e5e5;
}
</style>
