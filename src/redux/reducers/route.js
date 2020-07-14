import * as types from '../actions/types';

const INITIAL_STATE = {
  isLoading: false,
  screenName: '',
  refreshing: false
};

const screenReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.SET_CURRENT_SCREEN:
      return {
        ...state,
        screenName: action.payload
      };
    case types.SET_LOADING:
      return {
        ...state,
        isLoading: action.payload
      };
    case types.SET_REFRESHING:
      return {
        ...state,
        refreshing: action.payload
      };
    default:
      return state;
  }
};

export default screenReducer;
