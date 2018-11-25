import {
  FETCH_SONGS, FETCH_SONGS_SUCCESS, FETCH_SONGS_FAILURE, RESET_SONGS,
  FETCH_SONG, FETCH_SONG_SUCCESS,  FETCH_SONG_FAILURE, RESET_ACTIVE_SONG,
  SELECT_SONG,
  SORT_SONGS,
  SELECT_ALL_SONGS
} from '../actions/songs';

const INITIAL_STATE = { songsList: {songs: [], error:null, loading: false},
                        activeSong: {song:null, error:null, loading: false},                          
                        selected: [],
                        songList: {rowsPerPage: 5, page: 0, order: 'asc', orderBy: 'title'} 
                      }

export default function(state = INITIAL_STATE, action) {
  let error;
  switch(action.type) {

  case FETCH_SONGS:// start fetching songs and set loading = true
  	return { ...state, songsList: {songs:[], error: null, loading: true} }; 
  case FETCH_SONGS_SUCCESS:// return list of songs and make loading = false
    return { ...state, songsList: {songs: action.payload, error:null, loading: false} };
  case FETCH_SONGS_FAILURE:// return error and make loading = false
    error = action.payload || {message: action.payload.message};//2nd one is network or server down errors
    return { ...state, songsList: {songs: [], error: error, loading: false} };
  case RESET_SONGS:// reset postList to initial state
    return { ...state, songsList: {songs: [], error:null, loading: false} };

  case FETCH_SONG:
    return { ...state, activeSong:{...state.activeSong, loading: true}};
  case FETCH_SONG_SUCCESS:
    return { ...state, activeSong: {song: action.payload, error:null, loading: false}};
  case FETCH_SONG_FAILURE:
    error = action.payload || {message: action.payload.message};//2nd one is network or server down errors
    return { ...state, activeSong: {song: null, error:error, loading:false}};
  case RESET_ACTIVE_SONG:
    return { ...state, activeSong: {song: null, error:null, loading: false}};
  case SELECT_SONG:
    let selectedSongs = state.selected.slice(0)
    if (selectedSongs.includes(action.id)) {
      selectedSongs = selectedSongs.filter ( function(selectedSong) {return selectedSong !== action.id})
    } else {
      selectedSongs.push(action.id)
    }
    return { ...state, selected: selectedSongs }
  case SELECT_ALL_SONGS:
    let allSongSelection = []
    if (state.songsList.songs.length !== state.selected.length) {
      state.songsList.songs.forEach (song =>
        allSongSelection.push(song.id))
    }
    return { ...state, selected: allSongSelection }
  case SORT_SONGS:
    let order = 'asc'
    if (state.songList.orderBy === action.property && state.songList.order === 'asc') {
      order = 'desc'
    }
    return { ...state, songList: {...state.songList, order: order, orderBy: action.property}}
  default:
    return state;
  }
}
