import React from 'react';
import UserContainer from '../containers/UserContainer'

const Header = ({ user, loginForm, registerForm, logoutUser }) => (
  <div className="header">
    {!user && <button className="button" onClick={() => loginForm(<UserContainer />)}>Login</button>}
    {user && <button className="button" onClick={() => logoutUser()}>Logout</button>}
    <button className="button" onClick={() => registerForm()}>Register</button>
  </div>
);

export default Header;
