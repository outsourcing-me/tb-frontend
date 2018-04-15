export const STORE_KEY_USER = 'user'
export const STORE_KEY_ACCESS_TOKEN = 'user.access_token'
export const STORE_KEY_GAME_TOKEN = 'user.game_token'
export const STORE_KEY_LAST_LOGINED_PHONE = 'phone'
export const SOUND_SWITCH = 'user.soundSwitch'

// ajax 返回的code类型
export const RET_CODE_MAP = {
  OK: 0, // 成功,
  FAILED: 1, // 失败,
  NO_ACCESS: 111 // 鉴权失败
}

// 游戏房间状态
export const ROOM_STATUS_MAP = {
  OTHER_BEGIN_PlAY: 0, // 0:别人开始玩
  SELF_BEGIN_PLAY: 1, // 1:自己开始玩
  KICK_OUT: 2, // 2:一段时间不丢币，推币机将用户踢出游戏
  SELF_STOP_GAME: 3, // 3:自己结束游戏
  OTHER_STOP_GAME: 4 // 4:别人结束游戏
}
