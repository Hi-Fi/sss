import { connect } from 'react-redux'
import { reorderSelectedSongs, reorderSelectedVerses } from '../actions/songs';
import LeafletLayout from '../components/LeafletLayout';


const mapStateToProps = (state) => {
  return { 
    selected: state.songs.selected,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    reorderSelectedSongs: (origin, target) => {
      dispatch(reorderSelectedSongs(origin, target))
    },
    reorderSelectedVerses: (songID, origin, target) => {
      dispatch(reorderSelectedVerses(songID, origin, target))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LeafletLayout);
