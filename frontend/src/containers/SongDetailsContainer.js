import { connect } from 'react-redux';
import { fetchSong, resetActiveSong } from '../actions/songs';
import SongDetails from '../components/SongDetails.js';

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
    },
    resetMe: () => {
      //clean up both activeSong(currrently open) and deletedSong(open and being deleted) states
      dispatch(resetActiveSong());
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SongDetails);
