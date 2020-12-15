import axios from 'axios';

//Song list
export const FETCH_SONGS = 'FETCH_SONGS';
export const FETCH_SONGS_SUCCESS = 'FETCH_SONGS_SUCCESS';
export const FETCH_SONGS_FAILURE = 'FETCH_SONGS_FAILURE';
export const RESET_SONGS = 'RESET_SONGS';
export const SORT_SONGS = 'SORT_SONGS'

//Fetch post
export const FETCH_SONG = 'FETCH_SONG';
export const FETCH_SONG_SUCCESS = 'FETCH_SONG_SUCCESS';
export const FETCH_SONG_FAILURE = 'FETCH_SONG_FAILURE';
export const RESET_ACTIVE_SONG = 'RESET_ACTIVE_SONG';

//Leaflet
export const SELECT_SONG = 'SELECT_SONG'
export const SELECT_ALL_SONGS = 'SELECT_ALL_SONGS'
export const REORDER_SELECTED_SONGS = 'REORDER_SELECTED_SONGS'
export const REORDER_SELECTED_VERSES = 'REORDER_SELECTED_VERSES'

//const ROOT_URL = location.href.indexOf('localhost') > 0 ? 'http://localhost:8080' : '/';
const ROOT_URL = 'https://api-dot-sitsitsit-dev.appspot.com'
export function fetchSongs() {
  const request = axios({
    method: 'get',
    url: `${ROOT_URL}/songs`,
    headers: []
  });

  return {
    type: FETCH_SONGS,
    payload: request
  };
}

export function fetchSongsSuccess(songs) {
  return {
    type: FETCH_SONGS_SUCCESS,
    payload: songs
  };
}

export function fetchSongsFailure(error) {
  return {
    type: FETCH_SONGS_FAILURE,
    payload: error
  };
}

export function fetchSong(id) {
  const request = axios({
    method: 'get',
    url: `${ROOT_URL}/song/${id}`,
    headers:[]
  });

  return {
    type: FETCH_SONG,
    payload: request
  };
}

export function fetchSongSuccess(activeSong) {
  return {
    type: FETCH_SONG_SUCCESS,
    payload: activeSong
  };
}

export function fetchSongFailure(error) {
  return {
    type: FETCH_SONG_FAILURE,
    payload: error
  };
}

export function resetActiveSong() {
  return {
    type: RESET_ACTIVE_SONG
  }
}

export function selectSong(id) {
  return {
    type: SELECT_SONG,
    id: id
  }
}

export function selectAll() {
  return {
    type: SELECT_ALL_SONGS
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
