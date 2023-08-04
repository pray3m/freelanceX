export const HOST = process.env.NEXT_PUBLIC_SERVER_URL;
export const API_URL = `${HOST}/api`;
export const IMAGES_URL = `${HOST}/uploads`;

export const AUTH_ROUTES = `${API_URL}/auth`;
export const GIG_ROUTES = `${API_URL}/gigs`;
export const ORDER_ROUTES = `${API_URL}/orders`;
export const MESSAGE_ROUTES = `${API_URL}/messages`;
export const DASHBOARD_DATA_ROUTES = `${API_URL}/dashboard`;

export const SIGNUP_ROUTE = `${AUTH_ROUTES}/signup`;
export const LOGIN_ROUTE = `${AUTH_ROUTES}/login`;
export const GET_USER_INFO = `${AUTH_ROUTES}/get-user-info`;
export const SET_USER_INFO = `${AUTH_ROUTES}/set-user-info`;
export const SET_USER_IMAGE = `${AUTH_ROUTES}/set-user-image`;

export const ADD_GIG_ROUTE = `${GIG_ROUTES}/add`;
export const GET_ALL_USER_GIGS_ROUTE = `${GIG_ROUTES}`;
export const GET_GIG_BY_ID_ROUTE = `${GIG_ROUTES}/get`;
export const UPDATE_GIG_ROUTE = `${GIG_ROUTES}/edit`;
export const SEARCH_GIGS_ROUTE = `${GIG_ROUTES}/search`;
export const CHECK_USER_ORDERED_GIG_ROUTE = `${GIG_ROUTES}/check-gig-order`;
export const ADD_REVIEW_ROUTE = `${GIG_ROUTES}/review`;

export const CREATE_ORDER = `${ORDER_ROUTES}/create`;
export const ORDER_SUCCESS = `${ORDER_ROUTES}/success`;
export const GET_BUYER_ORDERS = `${ORDER_ROUTES}/get-buyer-orders`;
export const GET_SELLER_ORDERS = `${ORDER_ROUTES}/get-seller-orders`;

export const GET_MESSAGES = `${MESSAGE_ROUTES}/get-messages`;
export const SEND_MESSAGE = `${MESSAGE_ROUTES}/send-message`;

export const GET_SELLER_DATA = `${DASHBOARD_DATA_ROUTES}/seller`;
