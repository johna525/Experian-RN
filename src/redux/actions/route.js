import * as types from './types';

export const setRouteName = routeName => ({
  type: types.SET_CURRENT_SCREEN,
  payload: routeName
});

export const setLoading = status => ({
  type: types.SET_LOADING,
  payload: status
});
