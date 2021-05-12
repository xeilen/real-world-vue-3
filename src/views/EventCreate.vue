<template>
  <div class="about">
    <h1>Event Create Component {{ user }}</h1>
    <p>{{ localComputed }}</p>
    <p>CatLen {{ catLength }}</p>
    <ul>
      <li v-for="todo in doneTodos" :key="todo.id">{{ todo.id }} - {{ todo.text }}</li>
    </ul>
    <p>Active {{ activeTodos }}</p>
    <p>Event {{ getEventById(2) }}</p>

    <form>
      <label>Select a category</label>
      <select v-model="event.category">
        <option v-for="cat in categories" :key="cat">{{ cat }}</option>
      </select>

      <h3>Name & describe your event</h3>
      <div class="field">
        <label>Title</label>
        <input type="text" v-model="event.title" placeholder="Add an event title">
      </div>

      <div class="field">
        <label>Description</label>
        <input type="text" v-model="event.description" placeholder="Add a description">
      </div>

      <h3>Where is your event?</h3>
      <div class="field">
        <label>Location</label>
        <input type="text" v-model="event.location" placeholder="Add a location">
      </div>

      <h3>When is your event?</h3>
      <div class="field">
        <label>Date</label>
        <Datepicker v-model="event.date" placeholder="Select a date"/>
      </div>

      <div class="field">
        <label>Select a time</label>
        <select v-model="event.time">
          <option v-for="time in times" :key="time">{{ time }}</option>
        </select>
      </div>
      <input type="submit" class="button -fill-gradient" value="Submit" />
    </form>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import Datepicker from 'vuejs-datepicker'
export default {
  components: {
    Datepicker,
  },
  computed: {
    ...mapState(['user', 'categories']),
    ...mapGetters(['catLength', 'doneTodos', 'activeTodos', 'getEventById']),
    localComputed() {
      return this.user.id + ' local computed property'
    }
  },
}
</script>
