//Song list
export const SORT_SONGS = 'SORT_SONGS';
export const SET_ROWS = 'SET_ROWS'
export const SET_PAGE = 'SET_PAGE'

export function sortSongs(property) {
  return {
    type: SORT_SONGS,
    property: property
  }
}

export function setRows(rows) {
  return {
    type: SET_ROWS,
    rows: rows
  }
}

export function setPage(page) {
  return {
    type: SET_PAGE,
    page: page
  }
}




