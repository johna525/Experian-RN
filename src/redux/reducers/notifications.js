import * as types from '../actions/types';

const INITIAL_STATE = {
  notifications: [],
  notificationBlockIds: [],
  flagPropositions: [],
  flagExperians: []
};

const authReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.SET_NOTIFICATIONS:
      return {
        ...state,
        notifications: action.payload
      };
    case types.SET_NOTIFCIATION_BLOCK_IDS:
      return {
        ...state,
        notificationBlockIds: action.payload
      };
    case types.SET_FLAG_EXPERIANS:
      return {
        ...state,
        flagExperians: action.payload
      };
    case types.SET_FLAG_PROPOSITIONS:
      return {
        ...state,
        flagPropositions: action.payload
      };
    default:
      return state;
  }
};

export default authReducer;
