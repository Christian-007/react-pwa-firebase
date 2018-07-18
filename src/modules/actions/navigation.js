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