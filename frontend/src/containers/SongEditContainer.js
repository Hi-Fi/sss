import { connect } from 'react-redux';
import { fetchSong, fetchSongSuccess, fetchSongFailure, saveSong, saveSongSuccess, saveSongFailure } from '../actions/songs';
import { addTab, renameTab } from '../actions/tabs';
import SongEdit from '../components/SongEdit';

function mapStateToProps(globalState, ownProps) {
  return {
    activeSong: globalState.songs.activeSong,
    songId: ownProps.id || "new",
    errors: globalState.songs.songSubmitErrors
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchSong: (id) => {
      if (id) {
        dispatch(fetchSong(id))
          .then((result) => {
            // Note: Error's "data" is in result.payload.response.data (inside "response")
            // success's "data" is in result.payload.data
            if (result.payload.response && result.payload.response.status !== 200) {
              dispatch(fetchSongFailure(result.payload.response.data));
            } else {
              dispatch(fetchSongSuccess(result.payload.data))
              dispatch(renameTab(result.payload.data.id, result.payload.data.title))
            }
          })
        }
    },
    saveSong: (song) => {
      dispatch(saveSong(song)).payload
        .then(async (result) => {
          if (result.status !== 200) {
            dispatch(saveSongFailure(song.id, result.statusText))
          } else {
            const response = await result.json();
            dispatch(saveSongSuccess(response))
            dispatch(addTab(response.id))
          }
        })
      .catch((error) => {
        dispatch(saveSongFailure(song.id, error.message))
      })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SongEdit);
