import EventService from '../../services/EventService'
import router from '../../router'
export const namespaced = true
export const state = {
  todos: [
    { id: 1, text: 'todo 1', done: false },
    { id: 2, text: 'todo 2', done: true },
    { id: 3, text: 'todo 3', done: false },
    { id: 4, text: 'todo 4', done: true },
  ],
  eventsOld: [
    { id: 1, title: 'title events 1', organizer: 'organizer 1' },
    { id: 2, title: 'title events 2', organizer: 'organizer 2' },
    { id: 3, title: 'title events 3', organizer: 'organizer 3' },
    { id: 4, title: 'title events 4', organizer: 'organizer 4' },
  ],
  events: [],
  eventDetails: null,
  isLoading: false,
  totalEvents: null,
}
export const mutations = {
  ADD_EVENT(state, event) {
    state.events.push(event)
  },
  SET_EVENTS(state, events) {
    state.events = events
  },
  CHANGE_LOADING(state, value) {
    state.isLoading = value
  },
  SET_TOTAL_EVENTS(state, totalEvents) {
    state.totalEvents = +totalEvents
  },
  SET_EVENT_DETAILS(state, event) {
    state.eventDetails = event
  },
}
export const actions = {
  createEvent({ commit, dispatch, state }, event) {
    console.log('in create event, before POST method')
    EventService.postEvent(event)
      .then(() => {
        console.log('before commit ADD EVENT')
        commit('ADD_EVENT', event)
        console.log('after commit')
        console.log(state.events)
        const notification = {
          type: 'success',
          message: 'Your event has been created!',
        }
        dispatch('notificationsModule/add', notification, { root: true })
        router.push({
          name: 'EventDetails',
          params: { id: event.id },
        })
      })
      .catch((e) => {
        const notification = {
          type: 'error',
          message: 'There was a problem creating event: ' + e.message,
        }
        dispatch('notificationsModule/add', notification, { root: true })
      })
  },
  fetchEvents({ commit, dispatch }, { perPage, page }) {
    commit('CHANGE_LOADING', true)
    EventService.getEvents(perPage, page)
      .then((response) => {
        commit('SET_TOTAL_EVENTS', response.headers['x-total-count'])
        commit('CHANGE_LOADING', false)
        commit('SET_EVENTS', response.data)
        const notification = {
          type: 'success',
          message: 'Successful fetching events!',
        }
        dispatch('notificationsModule/add', notification, { root: true })
      })
      .catch((e) => {
        const notification = {
          type: 'error',
          message: 'There was a problem fetching events: ' + e.message,
        }
        dispatch('notificationsModule/add', notification, { root: true })
        if (e.response && e.response.status === 404) {
          router.push({ name: '404Resource', params: { resource: 'event' } })
        } else {
          router.push({ name: 'NetworkError' })
        }
      })
  },
  fetchEventDetails({ commit, getters, dispatch }, eventID) {
    const event = getters.getEventById(+eventID)
    console.log('it should be after redirect')
    console.log('event!!!!', event)
    if (event) {
      commit('SET_EVENT_DETAILS', event)
    } else {
      EventService.getEvent(eventID)
        .then((response) => {
          commit('SET_EVENT_DETAILS', response.data)
        })
        .catch((e) => {
          const notification = {
            type: 'error',
            message: 'There was a problem fetching event: ' + e.message,
          }
          dispatch('notificationsModule/add', notification, { root: true });
          if (e.response && e.response.status === 404) {
            router.push({ name: '404Resource', params: { resource: 'event' } })
          } else {
            router.push({ name: 'NetworkError' })
          }
        })
    }
  },
}
export const getters = {
  catLength: (state) => state.categories.length,
  doneTodos: (state) => state.todos.filter((todo) => todo.done),
  activeTodos: (state, getters) =>
    state.todos.length - getters.doneTodos.length,
  getEventById: (state) => (id) =>
    state.events.find((event) => event.id === id),
}
