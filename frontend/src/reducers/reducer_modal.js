import { OPEN_MODAL, CLOSE_MODAL } from "../actions/modal";

function modalReducer(state = null, action) {
	switch (action.type) {
		case OPEN_MODAL:
			return action.data;
		case CLOSE_MODAL:
			return null;
		default:
			return state;
	}
}

export default modalReducer;
