import {
	LOGIN_USER,
	LOGIN_USER_FAILED,
	LOGIN_USER_SUCCESS,
	LOGOUT_USER,
	REGISTER_USER,
	REGISTER_USER_FAILED,
	REGISTER_USER_SUCCESS,
} from "../actions/user";
import { removeToken, setToken } from "../utils/api";

const INITIAL_STATE = {
	userLoggingIn: false,
	userLoginErrors: "",
	userRegistration: false,
	userRegistrationErrors: "",
	user: undefined,
};

const tabReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case LOGIN_USER: {
			return { ...state, userLoggingIn: true, userLoginErrors: "" };
		}
		case LOGIN_USER_FAILED: {
			return { ...state, userLoggingIn: false, userLoginErrors: action.result };
		}
		case LOGIN_USER_SUCCESS: {
			setToken(action.result.token);
			return { ...state, userLoggingIn: false, user: action.result };
		}
		case LOGOUT_USER: {
			removeToken();
			return { ...state, ...INITIAL_STATE };
		}
		case REGISTER_USER: {
			return { ...state, userLoggingIn: true, userRegistrationErrors: "" };
		}
		case REGISTER_USER_FAILED: {
			return {
				...state,
				userLoggingIn: false,
				userRegistrationErrors: action.result,
			};
		}
		case REGISTER_USER_SUCCESS: {
			return { ...state, userLoggingIn: false, user: action.result };
		}
		default:
			return { ...state, userLoginErrors: "", userRegistrationErrors: "" };
	}
};
export default tabReducer;
