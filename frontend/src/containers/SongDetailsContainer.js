import { connect } from 'react-redux';
import { fetchSong, fetchSongSuccess, fetchSongFailure, resetActiveSong } from '../actions/songs';
import SongDetails from '../components/SongDetails.js';
import { renameTab } from '../actions/tabs';

function mapStateToProps(globalState, ownProps) {
  return {
    activeSong: globalState.songs.activeSong,
    songId: ownProps.id
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchSong: (id) => {
      dispatch(fetchSong(id))
        .then((result) => {
          // Note: Error's "data" is in result.payload.response.data (inside "response")
          // success's "data" is in result.payload.data
          if (result.payload.response && result.payload.response.status !== 200) {
            dispatch(fetchSongFailure(result.payload.response.data.message));
          } else {
            dispatch(fetchSongSuccess(result.payload.data))
            dispatch(renameTab(result.payload.data.id, result.payload.data.title))
          }
        })
        .catch((error) => dispatch(fetchSongFailure(error.message))
        )
    },
    resetMe: () => {
      //clean up both activeSong(currrently open) and deletedSong(open and being deleted) states
      dispatch(resetActiveSong());
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SongDetails);