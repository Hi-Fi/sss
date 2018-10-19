import { combineReducers } from 'redux';
import SongsReducer from './reducer_songs';
import { reducer as formReducer } from 'redux-form';
import TabReducer from './reducer_tabs';

const rootReducer = combineReducers({
  songs: SongsReducer, //<-- Songs
  tabs: TabReducer, // <-- Tabs
  form: formReducer // <-- redux-form
});

export default rootReducer;
