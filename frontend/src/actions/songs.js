import { fetcher } from '../utils/api';
import { cloneDeep } from 'lodash';
import { selectAll as leafletSelectAll, deselectAll as leafletDeselectAll } from '../actions/leaflet'
import { renameTab } from '../actions/tabs';
import { openModal, ERROR_MODAL } from './modal'



//Song list
export const FETCH_SONGS = 'FETCH_SONGS';
export const FETCH_SONGS_SUCCESS = 'FETCH_SONGS_SUCCESS';
export const FETCH_SONGS_FAILURE = 'FETCH_SONGS_FAILURE';
export const RESET_SONGS = 'RESET_SONGS';
export const SORT_SONGS = 'SORT_SONGS'
export const SAVE_SONG = 'SAVE_SONG'
export const SAVE_SONG_SUCCESS = 'SAVE_SONG_SUCCESS';
export const SAVE_SONG_FAILURE = 'SAVE_SONG_FAILURE';

//Fetch song
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
  const request = fetcher(`${ROOT_URL}/api/v1/song`, {
    method: 'POST',
    body: JSON.stringify(submitSong),
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
    fetcher(`${ROOT_URL}/api/v1/songs`, {
      method: 'GET',
    }).then(async (response) => {
      !response.error ? dispatch(fetchSongsSuccess(await response.json())) : dispatch(fetchSongsFailure(response.statusText));
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
      fetcher(`${ROOT_URL}/api/v1/song/${id}`).then(async (response) => {
        const fetchedSong = await response.json();
        if (!response.error) {
          dispatch(fetchSongSuccess(fetchedSong))
          dispatch(renameTab(fetchedSong.id, fetchedSong.title))
        } else {
          dispatch(fetchSongFailure(fetchedSong.message))
          // dispatch(closeTab(id))
          dispatch(openModal(ERROR_MODAL, "Couldn't load song", fetchedSong.message, id))
        }
      }).catch((error) => {
        dispatch(fetchSongFailure(error.message))
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
