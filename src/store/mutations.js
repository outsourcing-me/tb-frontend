export default {
  updateUser: function(state, user) {
    state.user = user
  },

  updateUserPhone(state, phone) {
    state.user.phone = phone
  },

  updateSoundSwitch(state, soundSwitch) {
    state.soundSwitch = soundSwitch
  },

  updateUserAssets(state, assets = 0) {
    state.user.assets = assets
  },

  updateLoadingSuccess(state, value = false) {
    state.loadingSuccess = value
  },

  updateToken(state, token) {
    state.token = token
  },

  updateGameToken(state, token) {
    state.gameToken = token
  },

  updateNow(state, date) {
    state.now = date
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
