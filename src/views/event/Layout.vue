<template>
  <div v-if="event">
    <div class="event-header">
      <h1 class="title">{{ event.title }}</h1>
      <div id="nav">
        <router-link :to="{ name: 'EventDetails' }"
          >Details</router-link
        >
        <router-link :to="{ name: 'EventRegister' }">Register</router-link>
        <router-link :to="{ name: 'EventEdit' }"
          >Edit</router-link
        >
      </div>
      <router-view :event="event"/>
    </div>
  </div>
  <div v-else>Loading...</div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  name: 'EventDetails',
  props: {
    id: [Number, String],
  },
  data() {
    return {}
  },
  created() {
    // this.$store.dispatch('eventModule/fetchEventDetails', this.id)
    this.fetchEventDetails(this.id)
  },
  computed: {
    ...mapState({
      event: (state) => state.eventModule.eventDetails,
    }),
  },
  methods: mapActions('eventModule', ['fetchEventDetails']),
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
#nav {
  display: flex;
  justify-content: space-around;
}
</style>
