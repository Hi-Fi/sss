import React, { Component } from 'react';
import SongDetailsContainer from '../containers/SongDetailsContainer.js';

class SongsShow extends Component {
  render() {
    console.dir(this.props)
    return (
      <div className='container'>
        <SongDetailsContainer id={this.props.id}/>
      </div>
    );
  }
}

export default SongsShow;