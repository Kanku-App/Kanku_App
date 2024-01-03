import {LOGIN, SIGNUP, SIGNOUT, UPDATEPROFILE} from '../Actions';

const initialState = {};

function authReducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN:
      return {...state, ...action.payload};
    case SIGNUP:
      return {...state, ...action.payload};
    case UPDATEPROFILE:
      return {...state, ...action.payload};
    case SIGNOUT:
      return initialState;

    default:
      return state;
  }
}

export default authReducer;
