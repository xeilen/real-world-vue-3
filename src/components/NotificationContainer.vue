<template>
  <div class="notification-container">
    <NotificationBar
      v-for="notification in notifications"
      :key="notification.id"
      :notification="notification"
    />
  </div>
</template>

<script>
import NotificationBar from './NotificationBar'
import { mapState } from 'vuex'
export default {
  name: 'NotificationContainer',
  components: { NotificationBar },
  computed: {
    ...mapState('notificationsModule', ['notifications']),
  }
}
</script>

<style scoped>
.notification-container {
  position: fixed;
  width: 300px;
  right: 0;
  bottom: 0;
  margin-top: 5px;

}
</style>
