import { combineReducers } from 'redux';
import SongsReducer from './reducer_songs';
import SongListReducer from './reducer_songList'
import LeafletInfoReducer from './reducer_leafletInfo'
import TabReducer from './reducer_tabs';

const rootReducer = combineReducers({
  songs: SongsReducer, //<-- Songs
  tabs: TabReducer, // <-- Tabs
  songList: SongListReducer,
  leafletInfo: LeafletInfoReducer
});

export default rootReducer;
