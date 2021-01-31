import { connect } from 'react-redux'
import { fetchSongs, fetchSongsSuccess, fetchSongsFailure, selectSong, selectAll } from '../actions/songs';
import SongsList from '../components/SongsList';
import { sortSongs, setPage, setRows } from '../actions/songList';


const mapStateToProps = (state) => {
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
            !response.error ? dispatch(fetchSongsSuccess(response.payload.data)) : dispatch(fetchSongsFailure(response.payload.data.message));
          })
          .catch((error) => dispatch(fetchSongsFailure(error.message)))
    },
    selectSong: (song) => {
      dispatch(selectSong(song));
    },
    // eslint-disable-next-line no-unused-vars
    selectAll: (event) => {
      dispatch(selectAll())
    },
    // eslint-disable-next-line no-unused-vars
    sortList: (event, property) => {
      dispatch(sortSongs(property));
    },
    // eslint-disable-next-line no-unused-vars
    changePage: (event, page) => {
      dispatch(setPage(page))
    },
    setRowCount: (event) => {
      dispatch(setRows(event.target.value))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SongsList);
