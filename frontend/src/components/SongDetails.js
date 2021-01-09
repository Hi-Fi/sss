import React, { Component } from 'react';
import {PropTypes} from 'prop-types'

let verseStyle = {
  whiteSpace: 'pre-wrap',
  color: 'black',
  marginBottom: '5px',
  paddingBottom: '5px'
}

let extraStyle = {
  fontStyle: 'italic',
	clear:'both',
	marginTop: '10px',
	paddingTop: '10px'
}

let authorMelodyStyle = {
  fontSize: '80%',
	fontStyle: 'italic',
	margin: '0px',
	padding: '0px',
}

let titleStyle = {
  fontSize: 'x-large',
	marginBottom: '0px',
	paddingBottom: '0px'
}

let authorStyle = {
  paddingRight: "5px"
}

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
    let index=0
    return verses && verses.map((verse) => {
      return (
        <li style={verseStyle} key={index++}>
          <div>
            {verse.lyrics}
          </div>
        </li>
      );
    });
  }

  renderAuthors(authors) {
    let authorNames = []
    authors.map((author) => {
        authorNames.push(author.name)
    })
    return authorNames.join(", ")
  }

  renderTags(tags) {
    let tagTags = []
    console.dir(tags)
    tags.map((tag) => {
      tagTags.push(tag.tag)
    })
    return tagTags.join(", ")
  }

  render() {
    const { song, loading, error } = this.props.activeSong;
    if (loading) {
      return <div className="container">Loading...</div>;
    } else if(error) {
      return  <div className="alert alert-danger">{error}</div>
    } else if(!song) {
      return <span className="fromSongDetail" />
    }

    return (
      <div className="container">
        <h1 style={titleStyle}>{song.title}</h1>
        <div style={authorMelodyStyle}>{song.melody && song.melody.melody}</div>
        <div style={authorMelodyStyle}>
          {song.arrangers && <span style={authorStyle}>Arranger: {this.renderAuthors(song.arrangers)}</span>}
          {song.composers && <span style={authorStyle}>Composer: {this.renderAuthors(song.composers)}</span>}
          {song.lyricists && <span style={authorStyle}>Lyricist: {this.renderAuthors(song.lyricists)}</span>}
        </div>
        <ol>
          {this.renderVerses(song.verses)}
        </ol>
        <div style={extraStyle}>{song.extraInfo}</div>
        {song.tags && <div id="tags"><h2>Tags</h2><div className="tags">{this.renderTags(song.tags)}</div></div>}
      </div>
    );
  }
}

SongDetails.propTypes = {
  resetMe: PropTypes.func,
  fetchSong: PropTypes.func,
  songId: PropTypes.string,
  activeSong: PropTypes.object
}

export default SongDetails;