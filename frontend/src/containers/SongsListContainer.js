import { connect } from 'react-redux'
import { selectSong, selectAllSongs, fetchAllSongs } from '../actions/songs';
import SongsList from '../components/SongsList';
import { sortSongs, setPage, setRows } from '../actions/songList';


const mapStateToProps = (state) => {
  return {
    songsList: state.songs.songsList,
    songList: state.songList
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchSongs: () => {
      dispatch(fetchAllSongs)
    },
    selectSong: (song) => {
      dispatch(selectSong(song));
    },
    // eslint-disable-next-line no-unused-vars
    selectAll: (event) => {
      dispatch(selectAllSongs)
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
