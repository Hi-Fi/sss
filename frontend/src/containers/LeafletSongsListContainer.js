import { connect } from 'react-redux'
import { reorderSelectedSongs} from '../actions/songs';
import LeafletSongsList from '../components/LeafletSongsList';


const mapStateToProps = (state) => {
  return { 
    selected: state.songs.selected,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    reorderSelectedSongs: (origin, target) => {
      dispatch(reorderSelectedSongs(origin, target))
    } 
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LeafletSongsList);
