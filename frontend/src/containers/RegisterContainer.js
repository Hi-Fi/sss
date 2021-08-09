import {connect} from 'react-redux';
import RegisterUser from '../components/RegisterUser.js';
import { registerUser } from '../actions/user'

const mapStateToProps = (state) => {
  return {
    registration: state.user.userRegistration,
    registrationErrors: state.user.userRegistrationErrors
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    registerUser: (data) => {
      dispatch(registerUser(data))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterUser);
