import * as t from '../types/types';

export const setLocation = (location) => {
  return dispatch => {
    dispatch({
      type: t.SET_LOCATION,
      payload: {
        location
      }
    })
  }
}

export const setUser = (user) => {
  return dispatch => {
    dispatch({
      type: t.SET_USER,
      payload: {
        user
      }
    })
  }
}

export const removeUser = () => {
  return dispatch => {
    dispatch({
      type: t.REMOVE_USER,
    })
  }
}