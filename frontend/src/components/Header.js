import { Button } from '@material-ui/core';
import React from 'react';
import PropTypes from 'prop-types';
import RegisterContainer from '../containers/RegisterContainer';
import UserContainer from '../containers/UserContainer'

const Header = ({ user, loginForm, registerForm, logoutUser }) => (
  <div className="header">
    {user && (
      <Button className="button" onClick={() => logoutUser()}>Logout</Button>
    )}
    {!user &&
      <div>
        <Button className="button" onClick={() => loginForm(<UserContainer />)}>Login</Button>
        <Button className="button" onClick={() => registerForm(<RegisterContainer />)}>Register</Button>
      </div>
    }
  </div>
);

Header.propTypes = {
  user: PropTypes.string,
  loginForm: PropTypes.func,
  registerForm: PropTypes.func,
  logoutUser: PropTypes.func,

}
export default Header;
