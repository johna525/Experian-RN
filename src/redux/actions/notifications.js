import { AsyncStorage } from 'react-native';
import Axios from 'axios';
import * as _ from 'lodash';
import * as types from './types';
import { setRefresh } from './home';

export const setNotifications = data => ({
  type: types.UPDATE_NOTIFCIATION,
  payload: data
});

export const setFavourites = data => ({
  type: types.UPDATE_FAVOURITES,
  payload: data
});

export const setBLockedNotificationIDs = data => (dispatch) => {
  AsyncStorage.setItem('blocked_notification_ids', JSON.stringify(data));
  dispatch({
    type: types.SET_NOTIFCIATION_BLOCK_IDS,
    payload: data
  });
};

export const fetchNotifications = () => (dispatch) => {
  dispatch(setRefresh(true));
  Axios.get(types.URL_FETCH_NOTIFICATION)
    .then((res) => {
      dispatch({
        type: types.SET_NOTIFICATIONS,
        payload: res.data
      });
      dispatch(setRefresh(false));
    })
    .catch((e) => {
      console.log(e.toString());
      dispatch(setRefresh(false));
    });
};

export const deleteFavourites = favourites => (dispatch, getState) => {
  let { flagExperians } = getState().notificationReducer;
  let { flagPropositions } = getState().notificationReducer;
  favourites.map((item) => {
    if (item.type === 'post') {
      flagExperians = _.filter(flagExperians, o => o.id !== item.id);
    } else {
      flagPropositions = _.filter(flagPropositions, o => o.id !== item.id);
    }
    return true;
  });
  AsyncStorage.setItem('flag_experian_list', JSON.stringify(flagExperians), () => {});
  AsyncStorage.setItem('flag_proposition_list', JSON.stringify(flagPropositions), () => {});
  dispatch({
    type: types.SET_FLAG_EXPERIANS,
    payload: flagExperians
  });
  dispatch({
    type: types.SET_FLAG_PROPOSITIONS,
    payload: flagPropositions
  });
};

export const deleteAllFavourites = () => (dispatch) => {
  AsyncStorage.removeItem('flag_experian_list');
  AsyncStorage.removeItem('flag_proposition_list');
  dispatch({
    type: types.SET_FLAG_EXPERIANS,
    payload: []
  });
  dispatch({
    type: types.SET_FLAG_PROPOSITIONS,
    payload: []
  });
};

export const toggleFlag = data => (dispatch, getState) => {
  let { flagExperians } = getState().notificationReducer;
  let { flagPropositions } = getState().notificationReducer;
  if (data.type === 'about_experian') {
    const origin = flagExperians;
    flagExperians = _.filter(flagExperians, o => o.id !== data.id);
    if (origin.length === flagExperians.length) flagExperians.push(data);
    AsyncStorage.setItem('flag_experian_list', JSON.stringify(flagExperians), () => {});
    dispatch({
      type: types.SET_FLAG_EXPERIANS,
      payload: flagExperians
    });
  } else if (data.type === 'propositions') {
    const origin = flagPropositions;
    flagPropositions = _.filter(flagPropositions, o => o.id !== data.id);
    if (origin.length === flagPropositions.length) flagPropositions.push(data);
    AsyncStorage.setItem('flag_proposition_list', JSON.stringify(flagPropositions), () => {});
    dispatch({
      type: types.SET_FLAG_PROPOSITIONS,
      payload: flagPropositions
    });
  }
};
