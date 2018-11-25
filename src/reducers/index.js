import { combineReducers } from 'redux';
import SongsReducer from './reducer_songs';
import SongListReducer from './reducer_songList'
import { reducer as formReducer } from 'redux-form';
import TabReducer from './reducer_tabs';

const rootReducer = combineReducers({
  songs: SongsReducer, //<-- Songs
  tabs: TabReducer, // <-- Tabs
  form: formReducer, // <-- redux-form
  songList: SongListReducer
});

export default rootReducer;
