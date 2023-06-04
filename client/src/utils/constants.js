export const HOST = process.env.NEXT_PUBLIC_SERVER_URL;
export const API_URL = `${HOST}/api`;

export const AUTH_ROUTES = `${API_URL}/auth`;
export const GIG_ROUTES = `${API_URL}/gigs`;

export const SIGNUP_ROUTE = `${AUTH_ROUTES}/signup`;
export const LOGIN_ROUTE = `${AUTH_ROUTES}/login`;
export const GET_USER_INFO = `${AUTH_ROUTES}/get-user-info`;
export const SET_USER_INFO = `${AUTH_ROUTES}/set-user-info`;
export const SET_USER_IMAGE = `${AUTH_ROUTES}/set-user-image`;

export const ADD_GIG_ROUTE = `${GIG_ROUTES}/add`;
