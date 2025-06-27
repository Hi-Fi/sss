import { SELECT_SONG } from "../actions/songs";
import {
	LEAFLET_SELECT_ALL_SONGS,
	LEAFLET_DESELECT_ALL_SONGS,
	REORDER_SELECTED_SONGS,
	REORDER_SELECTED_VERSES,
	PRINT_LEAFLET,
	PRINT_LEAFLET_FAILED,
	PRINT_LEAFLET_SUCCESS,
	STORE_LEAFLET_INFO,
	UPDATE_COVER_IMAGE,
} from "../actions/leaflet";
import { cloneDeep, isEqual } from "lodash";
import { saveAs } from "file-saver";

export const INITIAL_STATE = {
	info: {
		event: "",
		description: "",
		style: "columns",
		columns: 4,
		a5columns: 2,
		fontSize: 10,
		saveEvent: false,
		useCoverImage: false,
		coverImage: "",
		coverImageName: "",
		songsOnCover: false,
		songsOnBack: false,
	},
	songs: [],
};

function leafletReducer(state = INITIAL_STATE, action) {
	switch (action.type) {
		case SELECT_SONG: {
			let selectedSongs = state.songs.slice(0);
			let selectedSong = cloneDeep(action.song);
			if (
				selectedSongs.find((selectedSong) => selectedSong.id === action.song.id)
			) {
				selectedSongs = selectedSongs.filter(
					(selectedSong) => selectedSong.id !== action.song.id,
				);
			} else {
				selectedSongs.push(selectedSong);
			}
			return { ...state, songs: selectedSongs };
		}
		case LEAFLET_SELECT_ALL_SONGS: {
			let allSongSelection = [];
			action.songs.forEach((song) => allSongSelection.push(cloneDeep(song)));
			return { ...state, songs: allSongSelection };
		}
		case LEAFLET_DESELECT_ALL_SONGS: {
			let allSongSelection = [];
			return { ...state, songs: allSongSelection };
		}
		case REORDER_SELECTED_SONGS: {
			let selectedSongs = cloneDeep(state.songs);
			const [removed] = selectedSongs.splice(action.origin, 1);
			selectedSongs.splice(action.target, 0, removed);
			return { ...state, songs: selectedSongs };
		}
		case REORDER_SELECTED_VERSES: {
			let selectedSongs = cloneDeep(state.songs);
			let verses = selectedSongs.find(
				(song) => song.id === action.songID,
			).verses;
			const [removed] = verses.splice(action.origin, 1);
			verses.splice(action.target, 0, removed);
			return { ...state, songs: selectedSongs };
		}
		case PRINT_LEAFLET: {
			return { ...state, leafletPrintLoading: true };
		}
		case PRINT_LEAFLET_FAILED: {
			return {
				...state,
				leafletPrintLoading: false,
				leafletPrintErrors: action.result,
			};
		}
		case PRINT_LEAFLET_SUCCESS: {
			saveAs(action.result, "leaflet.pdf");
			return { ...state, leafletPrintLoading: false, leafletPrintErrors: "" };
		}
		case STORE_LEAFLET_INFO: {
			let newInfo = cloneDeep(state.info);
			newInfo = { ...newInfo, ...action.leafletInfo };
			if (!isEqual(state.info, newInfo)) {
				return { ...state, info: newInfo };
			} else {
				return state;
			}
		}
		case UPDATE_COVER_IMAGE: {
			let newInfo = cloneDeep(state.info);
			newInfo.coverImageName = action.coverImageName;
			newInfo.coverImage = action.coverImageData;
			return { ...state, info: newInfo };
		}
		default:
			return state;
	}
}

export default leafletReducer;
