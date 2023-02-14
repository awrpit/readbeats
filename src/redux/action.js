import { SET_TOKEN } from "./constants"
import { SET_USER_INFO } from "./constants"
import { SET_MUSIC_DATA } from "./constants"
import { SET_SONGS } from "./constants"

export const setToken = (token) => {
  return {
    type: SET_TOKEN,
    payload: token,
  }
}

export const setUserInfo = (userInfo) => {
  return {
    type: SET_USER_INFO,
    payload: userInfo,
  }
}

export const setMusicData = (musicData) => {
  return {
    type: SET_MUSIC_DATA,
    payload: musicData,
  }
}

export const setSongs = (songs) => {
  return {
    type: SET_SONGS,
    payload: songs,
  }
}
