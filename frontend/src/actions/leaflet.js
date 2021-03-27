/*eslint no-unused-vars: [2, { "args": "none" }]*/

import axios from 'axios';
import { toBase64 } from '../utils/helper'
export const LEAFLET_SELECT_ALL_SONGS = 'LEAFLET_SELECT_ALL_SONGS'
export const LEAFLET_DESELECT_ALL_SONGS = 'LEAFLET_DESELECT_ALL_SONGS'
export const REORDER_SELECTED_SONGS = 'REORDER_SELECTED_SONGS'
export const REORDER_SELECTED_VERSES = 'REORDER_SELECTED_VERSES'
export const PRINT_LEAFLET = 'PRINT_LEAFLET'
export const PRINT_LEAFLET_FAILED = 'PRINT_LEAFLET_FAILED'
export const PRINT_LEAFLET_SUCCESS = 'PRINT_LEAFLET_SUCCESS'

export const STORE_LEAFLET_INFO = 'STORE_LEAFLET_INFO'

export const UPDATE_COVER_IMAGE = 'UPDATE_COVER_IMAGE'


const ROOT_URL = process.env.REACT_APP_PRINT_API_BASE_URL

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

export function printLeaflet() {
  return async function printLeafletThunk(dispatch, getState) {
    dispatch({
      type: PRINT_LEAFLET
    })
    const currentState = getState().leaflet
    if (currentState.info.style === 'leaflet') {
      currentState.info.columns = currentState.info.a5columns
    }
    try {
      const response = await axios({
        method: 'post',
        url: `${ROOT_URL}/api/print`,
        data: { ...currentState.info, songs: currentState.songs },
        crossDomain: true,
        responseType: 'blob',
        headers: {
          'Content-Type': 'application/json',
        }
      })
      if (response.status !== 200) {
        dispatch({
          type: PRINT_LEAFLET_FAILED,
          result: response.data.message
        })
      } else {
        dispatch({
          type: PRINT_LEAFLET_SUCCESS,
          result: response.data
        })
      }
    } catch (error) {
      dispatch({
        type: PRINT_LEAFLET_FAILED,
        result: error.message
      })
    }
  }
}

export function storeLeafletInfo(content) {
  return {
    type: STORE_LEAFLET_INFO,
    leafletInfo: content
  }
}

export function updateCoverImage(event) {
  return async function updateCoverImageThunk(dispatch, getState) {
    const coverFile = event.target.files[0]
    const coverImageData = await toBase64(coverFile)
    dispatch(
      {
        type: UPDATE_COVER_IMAGE,
        coverImageName: coverFile.name,
        coverImageData: coverImageData
      }
    )
  }
}
