export const CMS_BASE_URL = 'https://experian.appcelerator.london/';
export const URL_FETCH_PROPOSITION = `${CMS_BASE_URL}wp-json/wp/v2/propositions`;
export const URL_FETCH_FAQS = `${CMS_BASE_URL}wp-json/wp/v2/mobileappfaqs`;
export const URL_FETCH_QUICKLINKS = `${CMS_BASE_URL}wp-json/wp/v2/quicklinks/?per_page=99`;
export const URL_FETCH_POSTS = `${CMS_BASE_URL}wp-json/wp/v2/about`;
export const URL_FETCH_NOTIFICATION = `${CMS_BASE_URL}wp-json/wp/v2/posts`;

// Router
export const WELCOME = 'WELCOME';
export const SET_CURRENT_SCREEN = 'SET_CURRENT_SCREEN';
export const SET_LOADING = 'SET_LOADING';
export const SET_REFRESHING = 'SET_REFRESHING';

// Authentication
export const SET_PIN = 'SET_PIN';
export const SET_USER = 'SET_USER';
export const SET_DECODED_USER = 'SET_DECODED_USER';
export const SET_LOGGEDIN = 'SET_LOGGEDIN';
export const SET_LOGOUT_DETAIL = 'SET_LOGOUT_DETAIL';

// Notification Tap
export const SET_NOTIFICATIONS = 'SET_NOTIFICATIONS';
export const SET_NOTIFCIATION_BLOCK_IDS = 'SET_NOTIFCIATION_BLOCK_IDS';
export const UPDATE_NOTIFCIATION = 'UPDATE_NOTIFCIATION';
export const UPDATE_FAVOURITES = 'UPDATE_FAVOURITES';
export const FORMAT_NOTIFCIATION = 'FORMAT_NOTIFCIATION';

// Home Tap
export const SET_EXPERIAN_LIST = 'SET_EXPERIAN_LIST';
export const SET_ALL_PROPOSITIONS = 'SET_ALL_PROPOSITIONS';
export const SET_PROPOSITION_DETAIL = 'SET_PROPOSITION_DETAIL';
export const SET_EXPERIAN_DETAIL = 'SET_EXPERIAN_DETAIL';
export const SET_ALL_QUICKLINKS = 'SET_ALL_QUICKLINKS';
export const SET_ALL_FAQS = 'SET_ALL_FAQS';
export const SET_FLAG_PROPOSITIONS = 'SET_FLAG_PROPOSITIONS';
export const SET_FLAG_EXPERIANS = 'SET_FLAG_EXPERIANS';
