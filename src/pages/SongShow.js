import React, { Component } from 'react';
import SongDetailsContainer from '../containers/SongDetailsContainer.js';

class SongsShow extends Component {
  render() {
    return (
      <div className='container'>
        <SongDetailsContainer id={this.props.match.params.id}/>
      </div>
    );
  }
}

export default SongsShow;