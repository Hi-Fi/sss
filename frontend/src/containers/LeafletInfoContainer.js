import { connect } from 'react-redux';
import LeafletInfo from '../components/LeafletInfo';
import {printLeaflet, storeLeafletInfo} from '../actions/leaflet'

function mapStateToProps(state) {
  return {
    leafletInfo: state.leaflet.info,
    leafletSongs: state.leaflet.songs
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    storeLeafletInfo: (content) => {
      dispatch(storeLeafletInfo(content))
    },
    printLeaflet: () => {
      dispatch(printLeaflet())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LeafletInfo);
