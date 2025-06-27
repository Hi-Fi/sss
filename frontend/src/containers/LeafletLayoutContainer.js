import { connect } from "react-redux";
import {
	reorderSelectedSongs,
	reorderSelectedVerses,
} from "../actions/leaflet";
import LeafletLayout from "../components/LeafletLayout";

const mapStateToProps = (state) => {
	return {
		songs: state.leaflet.songs,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		reorderSelectedSongs: (origin, target) => {
			dispatch(reorderSelectedSongs(origin, target));
		},
		reorderSelectedVerses: (songID, origin, target) => {
			dispatch(reorderSelectedVerses(songID, origin, target));
		},
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(LeafletLayout);
