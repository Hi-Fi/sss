export const LEAFLET_SELECT_ALL_SONGS = 'LEAFLET_SELECT_ALL_SONGS'
export const LEAFLET_DESELECT_ALL_SONGS = 'LEAFLET_DESELECT_ALL_SONGS'
export const REORDER_SELECTED_SONGS = 'REORDER_SELECTED_SONGS'
export const REORDER_SELECTED_VERSES = 'REORDER_SELECTED_VERSES'

export function selectAll(songs) {
  return {
    type: LEAFLET_SELECT_ALL_SONGS,
    songs: songs
  }
}

export function deselectAll() {
  return {
    type: LEAFLET_DESELECT_ALL_SONGS,
  }
}

export function reorderSelectedSongs(origin, target) {
  return {
    type: REORDER_SELECTED_SONGS,
    origin: origin,
    target: target
  }
}

export function reorderSelectedVerses(songID, origin, target) {
  return {
    type: REORDER_SELECTED_VERSES,
    songID: songID,
    origin: origin,
    target: target
  }
}
