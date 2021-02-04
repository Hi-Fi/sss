import {connect} from 'react-redux';
import Backdrop from '../components/Backdrop.js';

const mapStateToProps = (state) => {
  return {
    modal: state.modal
  };
}

export default connect(mapStateToProps)(Backdrop);
