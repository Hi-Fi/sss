import {connect} from 'react-redux';
import Modal from '../components/Modal.js';
import { closeModal } from '../actions/modal'

const mapStateToProps = (state) => {
  return {
    modal: state.modal
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    closeModal: (id) => {
      dispatch(closeModal(id))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Modal);
