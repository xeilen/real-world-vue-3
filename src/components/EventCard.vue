<template>
  <router-link
    class="event-link"
    :to="{ name: 'EventDetails', params: { id: event.id } }"
  >
    <div class="event-card">
      <span>@ {{ event.time }} on {{ event.date }}</span>
      <h4>{{ event.title }}</h4>
    </div>
  </router-link>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    event: Object,
  },
  data() {
    return {}
  },
}
</script>

<style scoped>
.event-card {
  padding: 20px;
  width: 250px;
  cursor: pointer;
  border: 1px solid #39495c;
  margin-bottom: 18px;
  transition: transform 0.2s, box-shadow 0.2s;
  will-change: contents;
}
.event-card:hover {
  transform: scale(1.01);
  box-shadow: 0 3px 12px rgba(0, 0, 0, 0.2);
}
.event-link {
  text-decoration: none;
  color: #2c3e50;
}
</style>
