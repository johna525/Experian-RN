import Axios from 'axios';
import { AsyncStorage } from 'react-native';
import * as types from './types';

export const setPropositionDetail = proposition => ({
  type: types.SET_PROPOSITION_DETAIL,
  payload: proposition
});

export const setExperianDetail = experian => ({
  type: types.SET_EXPERIAN_DETAIL,
  payload: experian
});

export const setRefresh = value => ({
  type: types.SET_REFRESHING,
  payload: value
});

export const fetchAllPropositions = () => (dispatch) => {
  dispatch(setRefresh(true));
  Axios.get(types.URL_FETCH_PROPOSITION)
    .then((res) => {
      dispatch({
        type: types.SET_ALL_PROPOSITIONS,
        payload: res.data
      });
      dispatch(setRefresh(false));
    })
    .catch((e) => {
      console.log(e.toString());
      dispatch(setRefresh(false));
    });
};

export const fetchQuickLinks = () => (dispatch) => {
  dispatch(setRefresh(true));
  Axios.get(types.URL_FETCH_QUICKLINKS)
    .then((res) => {
      dispatch({
        type: types.SET_ALL_QUICKLINKS,
        payload: res.data
      });
      dispatch(setRefresh(false));
    })
    .catch((e) => {
      console.log(e.toString());
      dispatch(setRefresh(false));
    });
};

export const fetchAllFaqs = () => (dispatch) => {
  dispatch(setRefresh(true));
  Axios.get(types.URL_FETCH_FAQS)
    .then((res) => {
      dispatch({
        type: types.SET_ALL_FAQS,
        payload: res.data
      });
      dispatch(setRefresh(false));
    })
    .catch((e) => {
      console.log(e.toString());
      dispatch(setRefresh(false));
    });
};

export const fetchExperian = () => (dispatch) => {
  dispatch(setRefresh(true));
  Axios.get(types.URL_FETCH_POSTS)
    .then((res) => {
      dispatch({
        type: types.SET_EXPERIAN_LIST,
        payload: res.data
      });
      dispatch(setRefresh(false));
    })
    .catch((e) => {
      console.log(e.toString());
      dispatch(setRefresh(false));
    });
};

export const loadFlaggedProposition = () => (dispatch) => {
  AsyncStorage.getItem('flag_proposition_list', (err, flagPropositions) => {
    if (flagPropositions !== null) {
      // We have data!!
      dispatch({
        type: types.SET_FLAG_PROPOSITIONS,
        payload: JSON.parse(flagPropositions)
      });
    }
  });
};

export const loadFlaggedExperian = () => (dispatch) => {
  AsyncStorage.getItem('flag_experian_list', (err, flagExperians) => {
    if (flagExperians !== null) {
      // We have data!!
      dispatch({
        type: types.SET_FLAG_EXPERIANS,
        payload: JSON.parse(flagExperians)
      });
    }
  });
};

export const loadBlockedNotificationIDs = () => (dispatch) => {
  AsyncStorage.getItem('blocked_notification_ids', (err, data) => {
    if (data !== null) {
      // We have data!!
      dispatch({
        type: types.SET_NOTIFCIATION_BLOCK_IDS,
        payload: JSON.parse(data)
      });
    }
  });
};
