import { LOGIN_USER, LOGIN_USER_FAILED, LOGIN_USER_SUCCESS, LOGOUT_USER } from '../actions/user'
import { removeToken, setToken } from '../utils/api';

const INITIAL_STATE = {
  userLoggingIn: false,
  userLoginErrors: "",
  user: undefined,
 }


const tabReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOGIN_USER: {
      return { ...state, userLoggingIn: true };
    }
    case LOGIN_USER_FAILED: {
      return { ...state, userLoggingIn: false, userLoginErrors: action.result };
    }
    case LOGIN_USER_SUCCESS: {
      setToken(action.result.token)
      return { ...state, userLoggingIn: false, user: action.result };
    }
    case LOGOUT_USER: {
      removeToken()
      return { ...state, ...INITIAL_STATE };
    }
    default:
      return state;
  }
}
export default tabReducer;
