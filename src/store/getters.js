export default {
  user: function(state) {
    return state.user
  },

  token(state) {
    return state.token
  },

  gameToken(state) {
    return state.gameToken
  },

  soundSwitch(state) {
    return state.soundSwitch
  },

  now(state) {
    return state.now
  },

  loadingSuccess(state) {
    return state.loadingSuccess
  },

  updaterProgressValue(state) {
    return state.updaterProgressValue
  },

  updaterProgressVisible(state) {
    return state.updaterProgressVisible
  },

  isPopStated(state) {
    return state.isPopStated
  },

  transitionName(state) {
    return state.transitionName
  },

  currentState(state) {
    return state.currentState
  }
}
