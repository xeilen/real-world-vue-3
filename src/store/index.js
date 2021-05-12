import { createStore } from "vuex";

export default createStore({
  state: {
    user: {
      name: 'Nazar',
      id: 123,
    },
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
    events: [
      { id: 1, title: 'title events 1', organizer: 'organizer 1'},
      { id: 2, title: 'title events 2', organizer: 'organizer 2'},
      { id: 3, title: 'title events 3', organizer: 'organizer 3'},
      { id: 4, title: 'title events 4', organizer: 'organizer 4'},
    ]
  },
  mutations: {},
  actions: {},
  getters: {
    catLength: state => state.categories.length,
    doneTodos: state => state.todos.filter(todo => todo.done),
    activeTodos: (state, getters) => state.todos.length - getters.doneTodos.length,
    getEventById: state => id => state.events.find(event => event.id === id)
  },
  modules: {},
});
