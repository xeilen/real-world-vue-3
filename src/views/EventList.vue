<template>
  <h1>Events for {{ user44.userModule.name }}</h1>
  <div v-if="!eventModule.isLoading" class="events">
    <EventCard v-for="singleEvent in eventModule.events" :event="singleEvent" :key="singleEvent.id" />
  </div>
  <div v-else>Loading...</div>

  <router-link
    :to="{ name: 'EventList', query: { page: page - 1 } }"
    rel="prev"
    v-if="$route.query.page && $route.query.page !== '1'"
  >
    Prev Page
  </router-link> |
  <router-link
    :to="{ name: 'EventList', query: { page: page + 1 } }"
    rel="next"
    v-if="!$route.query.page || $route.query.page < calcLastPage"
  >
    Next Page
  </router-link>
</template>

<script>
// @ is an alias to /src
import EventCard from '../components/EventCard.vue'
import { mapState } from 'vuex'

export default {
  name: 'EventList',
  components: {
    EventCard,
  },
  created() {
    this.$store.dispatch('eventModule/fetchEvents', {
      perPage: 3,
      page: this.page,
    })
  },
  computed: {
    ...mapState(['eventModule', 'user44']),
    page() {
      return parseInt(this.$route.query.page) || 1
    },
    calcLastPage() {
      return this.eventModule.totalEvents / 3
    }
  }
}
</script>

<style>
.events {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
