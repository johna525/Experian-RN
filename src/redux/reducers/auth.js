import * as types from '../actions/types';

const INITIAL_STATE = {
  pin: '',
  user: {
    name: 'John Amuesi',
    email: 'john@reactnative.guru',
    userId: 8
  },
  user_decoded: {},
  loggedIn: false,
  logoutDetail: ''
};

const authReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.SET_PIN:
      return {
        ...state,
        pin: action.payload
      };
    case types.SET_USER:
      return {
        ...state,
        user: action.payload
      };
    case types.SET_DECODED_USER:
      return {
        ...state,
        user_decoded: action.payload
      };
    case types.SET_LOGGEDIN:
      return {
        ...state,
        loggedIn: action.payload
      };
    case types.SET_LOGOUT_DETAIL:
      return {
        ...state,
        logoutDetail: action.payload
      };
    default:
      return state;
  }
};

export default authReducer;
