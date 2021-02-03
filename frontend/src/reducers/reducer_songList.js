import {
  SORT_SONGS, SET_PAGE, SET_ROWS
} from '../actions/songList';

const INITIAL_STATE = {
  rowsPerPage: 10,
  page: 0,
  order: 'asc',
  orderBy: 'title'
}

function songListReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case SORT_SONGS: {
      let order = 'asc'
      if (state.orderBy === action.property && state.order === 'asc') {
        order = 'desc'
      }
      return { ...state, order: order, orderBy: action.property }
    }
    case SET_PAGE:
      return { ...state, page: action.page }
    case SET_ROWS:
      return { ...state, rowsPerPage: action.rows }
    default:
      return state
  }
}

export default songListReducer;
