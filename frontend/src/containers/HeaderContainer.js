import {connect} from 'react-redux';
import Header from '../components/Header.js';
import { registerUser, loginForm, logoutUser } from '../actions/user.js';

const mapStateToProps = (state) => {
  return {
    user: state.user.user
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    registerForm: () => {
      dispatch(registerUser())
    },
    loginForm: (content) => {
      dispatch(loginForm(content))
    },
    logoutUser: () => {
      dispatch(logoutUser())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
