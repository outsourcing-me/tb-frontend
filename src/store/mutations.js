export default {
  updateUser: function(state, user) {
    state.user = user
  },

  updateUserPhone(state, phone) {
    state.user.phone = phone
  },

  updateToken(state, token) {
    state.token = token
  },

  updateUpdaterProgressValue(state, value) {
    state.updaterProgressValue = value
  },

  updateUpdaterProgressVisible(state, value) {
    state.updaterProgressVisible = value
  },

  updateIsPopStated(state, isPopStated = false) {
    state.isPopStated = isPopStated
  },

  updateTransitionName(state, transitionName = 'fade') {
    state.transitionName = transitionName
  },

  updateCurrentStateIndex(state, index = -1) {
    if (state.currentState) state.currentState.index = index
  },

  updateUserName(state, name) {
    state.user.name = name
  }
}