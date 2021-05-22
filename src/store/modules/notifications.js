export const namespaced = true

export const state = {
  notifications: [],
  flashMessage: '',
}

let nextId = 1

export const mutations = {
  PUSH(state, notification) {
    state.notifications.push({
      ...notification,
      id: nextId++,
    })
  },
  DELETE(state, notificationToRemove) {
    state.notifications = state.notifications.filter(
      (notification) => notification.id !== notificationToRemove.id
    )
  },
  SET_FLESH_MESSAGE(state, message) {
    state.flashMessage = message
  },
}

export const actions = {
  add({ commit, state }, notification) {
    console.log(notification)
    console.log(state.notifications)
    commit('PUSH', notification)
  },
  remove({ commit }, notificationToRemove) {
    commit('DELETE', notificationToRemove)
  },
  setFleshMessage({ commit }, message) {
    commit('SET_FLESH_MESSAGE', message)
  },
}
