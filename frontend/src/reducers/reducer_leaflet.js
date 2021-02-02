import {
  SELECT_SONG,
} from '../actions/songs';
import {
  LEAFLET_SELECT_ALL_SONGS,
  LEAFLET_DESELECT_ALL_SONGS,
  REORDER_SELECTED_SONGS,
  REORDER_SELECTED_VERSES
} from '../actions/leaflet'
import { cloneDeep } from 'lodash'

const INITIAL_STATE = {
  style: "columns",
  columns: "4",
  fontSize: "10",
  saveEvent: false,
  coverImage: false,
  songsOnCover: false,
  songsOnBack: false,
  songs: [],
}

// eslint-disable-next-line
export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case SELECT_SONG: {
      let selectedSongs = state.songs.slice(0)
      let selectedSong = cloneDeep(action.song)
      if (selectedSongs.find(selectedSong => selectedSong.id === action.song.id)) {
        selectedSongs = selectedSongs.filter(selectedSong => selectedSong.id !== action.song.id)
      } else {
        selectedSongs.push(selectedSong)
      }
      return { ...state, songs: selectedSongs }
    }
    case LEAFLET_SELECT_ALL_SONGS: {
      let allSongSelection = []
        action.songs.forEach(song =>
          allSongSelection.push(cloneDeep(song)))
      return { ...state, songs: allSongSelection }
    }
    case LEAFLET_DESELECT_ALL_SONGS: {
      let allSongSelection = []
      return { ...state, songs: allSongSelection }
    }
    case REORDER_SELECTED_SONGS: {
      let selectedSongs = cloneDeep(state.songs)
      const [removed] = selectedSongs.splice(action.origin, 1);
      selectedSongs.splice(action.target, 0, removed)
      return { ...state, songs: selectedSongs }
    }
    case REORDER_SELECTED_VERSES: {
      let selectedSongs = cloneDeep(state.songs)
      let verses = selectedSongs.find(song => song.id === action.songID).verses
      const [removed] = verses.splice(action.origin, 1);
      verses.splice(action.target, 0, removed)
      return { ...state, songs: selectedSongs }
    }
    default:
      return state
  }
}
