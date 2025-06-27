import { connect } from "react-redux";
import { reorderSelectedSongs } from "../actions/leaflet";
import LeafletSongsList from "../components/LeafletSongsList";

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
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(LeafletSongsList);
