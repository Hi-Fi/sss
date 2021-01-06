import React, { Component } from 'react';
import SongLeafletContainer from '../containers/SongLeafletContainer.js';

class SongsLeaflet extends Component {
  render() {
    return (
      <div className='container'>
        <SongLeafletContainer/>
      </div>
    );
  }
}

export default SongsLeaflet;