import {
  SELECT_SONG,
  // SELECT_ALL_SONGS,
} from '../actions/songs';
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
    // case SELECT_ALL_SONGS: {
    //   let allSongSelection = []
    //     state.songsList.songs.forEach(song =>
    //       allSongSelection.push(cloneDeep(song)))
    //   return { ...state, songs: allSongSelection }
    // }
    default:
      return state
  }
}
