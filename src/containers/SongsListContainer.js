import { connect } from 'react-redux'
import { fetchSongs, fetchSongsSuccess, fetchSongsFailure, selectSong, selectAll } from '../actions/songs';
import SongsList from '../components/SongsList';
import { sortSongs, setPage, setRows } from '../actions/songList';


const mapStateToProps = (state) => {
  console.dir(state)
  return { 
    songsList: state.songs.songsList,
    selected: state.songs.selected,
    songList: state.songList
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
    selectAll: (event) => {
      dispatch(selectAll())
    },
    sortList: (event, property) => {
      dispatch(sortSongs(property));
    },
    changePage: (event, page) => {
      dispatch(setPage(page))
    },
    setRowCount: (event) => {
      dispatch(setRows(event.target.value))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SongsList);
