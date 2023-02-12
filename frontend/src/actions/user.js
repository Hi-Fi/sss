import { fetcher } from '../utils/api';
import { closeModal, openCustomModal } from "./modal";

//User actions
export const LOGIN_USER = 'LOGIN_USER';
export const LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS';
export const LOGIN_USER_FAILED = 'LOGIN_USER_FAILED';

export const LOGOUT_USER = 'LOGOUT_USER';
export const REFRESH_TOKEN = 'REFRESH_TOKEN';
export const REGISTER_USER = 'REGISTER_USER';
export const REGISTER_USER_SUCCESS = 'REGISTER_USER_SUCCESS';
export const REGISTER_USER_FAILED = 'REGISTER_USER_FAILED';

const ROOT_URL = process.env.REACT_APP_AUTH_API_BASE_URL

export function loginUser(username, password) {
  // eslint-disable-next-line no-unused-vars
  return async function loginUserThunk(dispatch, getState) {
    dispatch({
      type: LOGIN_USER
    })
    try {
      const response = await fetcher(`${ROOT_URL}/api/v1/login`, {
        method: 'POST',
        body: JSON.stringify({
          "username": username,
          "password": password
        }),
        headers: {
          'Content-Type': 'application/json',
        }
      })
      if (response.status !== 200) {
        dispatch({
          type: LOGIN_USER_FAILED,
          result: response.statusText || `Request failed with status ${response.status}`
        })
      } else {
        dispatch({
          type: LOGIN_USER_SUCCESS,
          result: await response.json()
        })
        dispatch(closeModal())
      }
    } catch (error) {
      if (error.response) {
        dispatch({
          type: LOGIN_USER_FAILED,
          result: "Invalid credentials"
        })
      }
      dispatch({
        type: LOGIN_USER_FAILED,
        result: error.message
      })
    }
  }
}

export function logoutUser() {
  return {
    type: LOGOUT_USER
  }
}

export function registerUser(data) {
  const body = JSON.stringify(data);
  // eslint-disable-next-line no-unused-vars
  return async function registerUserThunk(dispatch, getState) {
    dispatch({
      type: REGISTER_USER
    })
    try {
      const response = await fetcher(`${ROOT_URL}/api/v1/register`, {
        method: 'POST',
        body,
        headers: {
          'Content-Type': 'application/json',
        }
      })
      const data = await response.json()
      if (response.status !== 200) {
        dispatch({
          type: REGISTER_USER_FAILED,
          result: data.error || response.statusText || `Request failed with status ${response.status}`
        })
      } else {
        dispatch({
          type: REGISTER_USER_SUCCESS,
          result: data
        })
        dispatch(closeModal())
      }
    } catch (error) {
      if (error.response) {
        dispatch({
          type: REGISTER_USER_FAILED,
          result: "Invalid credentials"
        })
      }
      dispatch({
        type: REGISTER_USER_FAILED,
        result: error.message
      })
    }
  }
}

export function loginForm(content) {
  return openCustomModal("User", content)
}

export function registerForm(content) {
  return openCustomModal("Register user", content)
}
