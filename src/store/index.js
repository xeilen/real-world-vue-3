import { createStore } from 'vuex'
import * as user44 from './modules/user'
import * as eventModule from './modules/event'
import * as notificationsModule from './modules/notifications'

export default createStore({
  state: {
    categories: [
      'sustainability',
      'nature',
      'animal welfare',
      'housing',
      'education',
      'food',
      'community',
    ],
  },
  modules: {
    user44,
    eventModule,
    notificationsModule,
  },
})
