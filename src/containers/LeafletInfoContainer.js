import { connect } from 'react-redux';
import { fetchSong, fetchSongSuccess, fetchSongFailure } from '../actions/songs';
import LeafletInfo from '../components/LeafletInfo';

function mapStateToProps(globalState, ownProps) {
  return {
    //leafletInfo: globalState.leaflet.info,
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
            }
          })
        }
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LeafletInfo);