import { connect } from 'react-redux'
import { fetchSongs, fetchSongsSuccess, fetchSongsFailure, selectSong, sortSongs, selectAll } from '../actions/songs';
import SongsList from '../components/SongsList';


const mapStateToProps = (state) => {
  return { 
    songsList: state.songs.songsList,
    selected: state.songs.selected,
    songList: state.songs.songList
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchSongs: () => {
      dispatch(fetchSongs()).then((response) => {
            !response.error ? dispatch(fetchSongsSuccess(response.payload.data)) : dispatch(fetchSongsFailure(response.payload.data));
          });
    },
    selectSong: (id) => {
      dispatch(selectSong(id));
    },
    sortList: (event, property) => {
      dispatch(sortSongs(property));
    },
    selectAll: (event) => {
      dispatch(selectAll())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SongsList);
