import * as types from '../actions/types';

const INITIAL_STATE = {
  experianList: [],
  propositions: [],
  quicklinks: [],
  faqs: [],
  selectedProposition: {},
  selectedExperian: {},
};

const homeReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.SET_EXPERIAN_LIST:
      return {
        ...state,
        experianList: action.payload
      };
    case types.SET_ALL_PROPOSITIONS:
      return {
        ...state,
        propositions: action.payload
      };
    case types.SET_PROPOSITION_DETAIL:
      return {
        ...state,
        selectedProposition: action.payload
      };
    case types.SET_EXPERIAN_DETAIL:
      return {
        ...state,
        selectedExperian: action.payload
      };
    case types.SET_ALL_QUICKLINKS:
      return {
        ...state,
        quicklinks: action.payload
      };
    case types.SET_ALL_FAQS:
      return {
        ...state,
        faqs: action.payload
      };
    default:
      return state;
  }
};

export default homeReducer;
