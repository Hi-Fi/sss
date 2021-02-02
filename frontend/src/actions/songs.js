import axios from 'axios';
import { cloneDeep } from 'lodash';
import { selectAll as leafletSelectAll, deselectAll as leafletDeselectAll } from '../actions/leaflet'
import { renameTab, closeTab } from '../actions/tabs';
import { openModal, ERROR_MODAL, INFO_MODAL } from './modal'



//Song list
export const FETCH_SONGS = 'FETCH_SONGS';
export const FETCH_SONGS_SUCCESS = 'FETCH_SONGS_SUCCESS';
export const FETCH_SONGS_FAILURE = 'FETCH_SONGS_FAILURE';
export const RESET_SONGS = 'RESET_SONGS';
export const SORT_SONGS = 'SORT_SONGS'
export const SAVE_SONG = 'SAVE_SONG'
export const SAVE_SONG_SUCCESS = 'SAVE_SONG_SUCCESS';
export const SAVE_SONG_FAILURE = 'SAVE_SONG_FAILURE';

//Fetch post
export const FETCH_SONG = 'FETCH_SONG';
export const FETCH_SONG_SUCCESS = 'FETCH_SONG_SUCCESS';
export const FETCH_SONG_FAILURE = 'FETCH_SONG_FAILURE';
export const RESET_ACTIVE_SONG = 'RESET_ACTIVE_SONG';

//Leaflet
export const SELECT_SONG = 'SELECT_SONG'
export const SELECT_ALL_SONGS = 'SELECT_ALL_SONGS'

const ROOT_URL = process.env.REACT_APP_BACKEND_API_BASE_URL

export function saveSong(song) {
  const submitSong = cloneDeep(song)
  // submitSong.composers = submitSong.composers?.map(composer => { return {name: composer}})
  // submitSong.arrangers = submitSong.arrangers?.map(arranger => { return {name: arranger}})
  // submitSong.lyricists = submitSong.lyricists?.map(lyricist => { return {name: lyricist}})
  const request = axios({
    method: 'post',
    url: `${ROOT_URL}/api/v1/song`,
    data: submitSong,
    crossDomain: true,
    headers: {
      'Content-Type': 'application/json',
    }
  })
  return {
    type: SAVE_SONG,
    payload: request,
  }
}

export function saveSongSuccess(song) {
  return {
    type: SAVE_SONG_SUCCESS,
    payload: song
  };
}

export function saveSongFailure(id, error) {
  id = id || "new"
  return {
    type: SAVE_SONG_FAILURE,
    payload: error,
    id: id
  };
}

export async function fetchAllSongs(dispatch, getState) {
  dispatch(fetchSongs())
  let songs = getState().songs.songsList.songs
  if (songs.length > 0) {
    dispatch(fetchSongsSuccess(songs))
  } else {
    axios({
      method: 'get',
      url: `${ROOT_URL}/api/v1/songs`,
      crossDomain: true,
      headers: []
    }).then((response) => {
      !response.error ? dispatch(fetchSongsSuccess(response.data)) : dispatch(fetchSongsFailure(response.data.message));
    }).catch((error) => dispatch(fetchSongsFailure(error.message)))
  }
}

export function fetchSongs() {
  return {
    type: FETCH_SONGS
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
  return async function fetchSong(dispatch, getState) {
    dispatch({type: FETCH_SONG})
    let song = getState().songs.songsList.songs.find(song => song.id === id)
    if (song !== undefined ) {
      dispatch(fetchSongSuccess(song))
      dispatch(renameTab(song.id, song.title))
    } else {
      axios({
        method: 'get',
        url: `${ROOT_URL}/api/v1/song/${id}`,
        crossDomain: true,
      }).then((response) => {
        if (!response.error) {
          dispatch(fetchSongsSuccess(response.data))
          dispatch(renameTab(response.data.id, response.data.title))
        } else {
          dispatch(fetchSongsFailure(response.data.message))
          // dispatch(closeTab(id))
          dispatch(openModal(ERROR_MODAL, "Couldn't load song", response.data.message, id))
        }
      }).catch((error) => {
        dispatch(fetchSongsFailure(error.message))
        // dispatch(closeTab(id))
        dispatch(openModal(ERROR_MODAL, "Couldn't load song", error.message, id))
      })
    }
  }
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

export function selectSong(song) {
  return {
    type: SELECT_SONG,
    song: song
  }
}

export async function selectAllSongs(dispatch, getState) {
  let songs = getState().songs.songsList.songs
  if (getState().songs.allSelected) {
    dispatch(leafletDeselectAll())
  } else {
    dispatch(leafletSelectAll(songs))
  }
  dispatch({
    type: SELECT_ALL_SONGS
  })
}
