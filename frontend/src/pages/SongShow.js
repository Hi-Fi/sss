import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SongDetailsContainer from '../containers/SongDetailsContainer.js';

class SongsShow extends Component {
  render() {
    return (
      <div className='container'>
        <SongDetailsContainer id={this.props.id}/>
      </div>
    );
  }
}

SongsShow.propTypes = {
  id: PropTypes.string.isRequired
}

export default SongsShow;