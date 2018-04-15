import { read } from '@/storage'
import { STORE_KEY_USER, STORE_KEY_ACCESS_TOKEN, SOUND_SWITCH, STORE_KEY_GAME_TOKEN } from '@/constants'

export const user = read(STORE_KEY_USER) || ''
export const token = read(STORE_KEY_ACCESS_TOKEN) || ''
export const gameToken = read(STORE_KEY_GAME_TOKEN) || ''
export const soundSwitch = read(SOUND_SWITCH) || ''
