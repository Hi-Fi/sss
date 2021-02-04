import { combineReducers } from 'redux';
import SongsReducer from './reducer_songs';
import SongListReducer from './reducer_songList'
import LeafletReducer from './reducer_leaflet'
import ModalReducer from './reducer_modal'
import TabReducer from './reducer_tabs';

const rootReducer = combineReducers({
  songs: SongsReducer, //<-- Songs
  tabs: TabReducer, // <-- Tabs
  songList: SongListReducer,
  leaflet: LeafletReducer,
  modal: ModalReducer
});

export default rootReducer;
