import { SET_LOCATION, SET_USER, REMOVE_USER } from '../types/types';

const initState = {
  location: '',
  user: null
}

const navigationReducer = (state = initState, action) => {
  switch(action.type) {
    
    case SET_LOCATION :
      return {
        ...state, 
        location: action.payload.location
      }

    case SET_USER :
      return {
        ...state, 
        user: action.payload.user
      }
    
    case REMOVE_USER :
      return {
        ...state, 
        user: null
      }
    
    default :
      return state
  }
}

export default navigationReducer;