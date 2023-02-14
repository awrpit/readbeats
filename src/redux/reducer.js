import {
  SET_TOKEN,
  SET_USER_INFO,
  SET_MUSIC_DATA,
  SET_SONGS,
} from "./constants"

const initialState = {
  token: "",
  userInfo: {},
  musicData: [],
  songs: [],
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_TOKEN:
      return {
        ...state,
        token: action.payload,
      }
    case SET_USER_INFO:
      return {
        ...state,
        userInfo: action.payload,
      }
    case SET_MUSIC_DATA:
      return {
        ...state,
        musicData: action.payload,
      }
    case SET_SONGS:
      return {
        ...state,
        songs: action.payload,
      }
    default:
      return state
  }
}

export default reducer
