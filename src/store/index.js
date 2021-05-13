import { createStore } from 'vuex'
import EventService from '../services/EventService'
import * as user from "./modules/user";

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
  },
  mutations: {
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
  },
  actions: {
    createEvent({ commit }, event) {
      EventService.postEvent(event).then(() => commit('ADD_EVENT', event))
    },
    fetchEvents({ commit }, { perPage, page }) {
      commit('CHANGE_LOADING', true)
      EventService.getEvents(perPage, page)
        .then((response) => {
          console.log(response.headers['x-total-count'])
          commit('SET_TOTAL_EVENTS', response.headers['x-total-count'])
          commit('CHANGE_LOADING', false)
          commit('SET_EVENTS', response.data)
        })
        .catch((e) => console.log(e))
    },
    fetchEventDetails({ commit, getters }, eventID) {
      console.log(this.state.events);
      console.log(eventID);
      const event = getters.getEventById(+eventID);
      console.log(event);
      if (event) {
        commit('SET_EVENT_DETAILS', event);
      } else {
        EventService.getEvent(eventID)
          .then((response) => {
            commit('SET_EVENT_DETAILS', response.data)
          })
          .catch((e) => {
            console.log(e)
          })
      }
    },
  },
  getters: {
    catLength: (state) => state.categories.length,
    doneTodos: (state) => state.todos.filter((todo) => todo.done),
    activeTodos: (state, getters) =>
      state.todos.length - getters.doneTodos.length,
    getEventById: (state) => (id) => state.events.find((event) => event.id === id),
  },
  modules: {
    user,
  },
})
