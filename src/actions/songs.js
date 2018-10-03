import axios from 'axios';

//Song list
export const FETCH_SONGS = 'FETCH_SONGS';
export const FETCH_SONGS_SUCCESS = 'FETCH_SONGS_SUCCESS';
export const FETCH_SONGS_FAILURE = 'FETCH_SONGS_FAILURE';
export const RESET_SONGS = 'RESET_SONGS';

//Fetch post
export const FETCH_SONG = 'FETCH_SONG';
export const FETCH_SONG_SUCCESS = 'FETCH_SONG_SUCCESS';
export const FETCH_SONG_FAILURE = 'FETCH_SONG_FAILURE';
export const RESET_ACTIVE_SONG = 'RESET_ACTIVE_SONG';

//const ROOT_URL = location.href.indexOf('localhost') > 0 ? 'http://localhost:8080' : '/';
const ROOT_URL = 'http://localhost:8080'
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

export function fetchSongsSuccess(posts) {
  return {
    type: FETCH_SONGS_SUCCESS,
    payload: posts
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

