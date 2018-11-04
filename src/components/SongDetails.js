import React, { Component } from 'react';
import {PropTypes} from 'prop-types'


class SongDetails extends Component {
  static contextTypes = {
    router: PropTypes.object
  };

  componentWillUnmount() {
    //Important! If your component is navigating based on some global state(from say componentWillReceiveProps)
    //always reset that global state back to null when you REMOUNT
     this.props.resetMe();
  }

  componentDidMount() {
    this.props.fetchSong(this.props.songId);
  }

  renderVerses(verses) {
    return verses && verses.map((verse) => {
      return (
        <li className="list-group-item" key={verse.id}>
          <div style={{color:'black'}}>
            {verse.lyrics}
          </div>
        </li>
      );
    });
  }

  render() {
    const { song, loading, error } = this.props.activeSong;
    if (loading) {
      return <div className="container">Loading...</div>;
    } else if(error) {
      return  <div className="alert alert-danger">{error.message}</div>
    } else if(!song) {
      return <span className="fromSongDetail" />
    }

    return (
      <div className="container">
        <h3>{song.title}</h3>
        <ol className="verses">
          {this.renderVerses(song.verses)}
        </ol>
      </div>
    );
  }
}

export default SongDetails;