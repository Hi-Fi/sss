import {
	FETCH_SONGS,
	FETCH_SONGS_SUCCESS,
	FETCH_SONGS_FAILURE,
	RESET_SONGS,
	FETCH_SONG,
	FETCH_SONG_SUCCESS,
	FETCH_SONG_FAILURE,
	RESET_ACTIVE_SONG,
	SELECT_SONG,
	SELECT_ALL_SONGS,
	SAVE_SONG_SUCCESS,
	SAVE_SONG_FAILURE,
} from "../actions/songs";
import { cloneDeep } from "lodash";

const INITIAL_STATE = {
	songsList: { songs: [], error: null, loading: false },
	activeSong: { song: null, error: null, loading: false },
	songSubmitErrors: {},
	allSelected: false,
};

function songsReducer(state = INITIAL_STATE, action) {
	let error;
	switch (action.type) {
		case FETCH_SONGS: // start fetching songs and set loading = true
			return { ...state, songsList: { songs: [], error: null, loading: true } };
		case FETCH_SONGS_SUCCESS: {
			// return list of songs and make loading = false
			let songs = action.payload;
			songs.forEach((song) => {
				song.selected = false;
			});
			return {
				...state,
				songsList: { songs: songs, error: null, loading: false },
			};
		}
		case FETCH_SONGS_FAILURE: // return error and make loading = false
			error = action.payload || { message: action.payload.message }; //2nd one is network or server down errors
			return {
				...state,
				songsList: { songs: [], error: error, loading: false },
			};
		case SAVE_SONG_FAILURE: {
			let newSubmitErrors = cloneDeep(state.songSubmitErrors);
			newSubmitErrors[action.id] = action.payload;
			return { ...state, songSubmitErrors: newSubmitErrors };
		}
		case SAVE_SONG_SUCCESS: {
			let newSubmitErrors = cloneDeep(state.songSubmitErrors);
			let songs = cloneDeep(state.songsList.songs);
			let newSong = action.payload;
			let oldSong = songs.find((old) => old.id === newSong.id);
			if (oldSong) {
				oldSong = newSong;
			} else {
				songs.push(newSong);
			}
			delete newSubmitErrors[newSong.id];
			return {
				...state,
				songsList: { songs: songs, error: null, loading: false },
				songSubmitErrors: newSubmitErrors,
			};
		}
		case RESET_SONGS: // reset songsList to initial state
			return {
				...state,
				songsList: { songs: [], error: null, loading: false },
			};

		case FETCH_SONG:
			return { ...state, activeSong: { ...state.activeSong, loading: true } };
		case FETCH_SONG_SUCCESS:
			return {
				...state,
				activeSong: { song: action.payload, error: null, loading: false },
			};
		case FETCH_SONG_FAILURE:
			error = action.payload || { message: action.payload.message }; //2nd one is network or server down errors
			return {
				...state,
				activeSong: { song: null, error: error, loading: false },
			};
		case RESET_ACTIVE_SONG:
			return {
				...state,
				activeSong: { song: null, error: null, loading: false },
			};
		case SELECT_SONG: {
			let newSongList = cloneDeep(state.songsList);
			let selectedSong = newSongList.songs.find(
				(song) => song.id === action.song.id,
			);
			selectedSong.selected = !selectedSong.selected;
			return { ...state, songsList: newSongList };
		}
		case SELECT_ALL_SONGS: {
			let newSongList = state.songsList.songs.slice(0);
			let selected = !state.allSelected;
			newSongList.forEach((song) => (song.selected = selected));
			return {
				...state,
				songsList: { ...state.songsList, songs: newSongList },
				allSelected: selected,
			};
		}
		default:
			return state;
	}
}

export default songsReducer;
