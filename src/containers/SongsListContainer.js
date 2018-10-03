import { connect } from 'react-redux'
import { fetchSongs, fetchSongsSuccess, fetchSongsFailure } from '../actions/songs';
import SongsList from '../components/SongsList';


const mapStateToProps = (state) => {
  return { 
    songsList: state.songs.songsList
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchSongs: () => {
      dispatch(fetchSongs()).then((response) => {
            !response.error ? dispatch(fetchSongsSuccess(response.payload.data)) : dispatch(fetchSongsFailure(response.payload.data));
          });
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SongsList);
