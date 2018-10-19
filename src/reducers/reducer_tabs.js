import {ADD_TAB, CHANGE_TAB} from '../actions/tabs'
const INITIAL_STATE = { songTabs: {tabs: []}}


const tabReducer = (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case CHANGE_TAB:
      return action.id;
    case ADD_TAB:
      return { ...state, songTabs: {tabs: action.id}}
    default:
      return state;
  }
}
export default tabReducer;
