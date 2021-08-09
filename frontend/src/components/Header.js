import { Button } from '@material-ui/core';
import React from 'react';
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

export default Header;
