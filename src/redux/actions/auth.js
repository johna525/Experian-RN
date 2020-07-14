import Axios from 'axios';
import * as types from './types';

export const sendResetPasswordRequest = (email, callback) => (dispatch) => {
  setTimeout(() => {
    callback('success');
  }, 2000);
};

export const setPin = pin => ({
  type: types.SET_PIN,
  payload: pin
});

export const setUser = user => ({
  type: types.SET_USER,
  payload: user
});

export const setLoggedIn = value => ({
  type: types.SET_LOGGEDIN,
  payload: value
});

export const setLogoutDetail = value => ({
  type: types.SET_LOGOUT_DETAIL,
  payload: value
});

export const setDecodedUser = data => ({
  type: types.SET_DECODED_USER,
  payload: data
});
