import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Provider } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';
import SongsIndex from './pages/SongsIndex';
import SongShow from './pages/SongShow';

import configureStore from './store/configureStore.js';
const store = configureStore();

ReactDOM.render(
<Provider store={store}>
<BrowserRouter>
  <div>
    <Route exact path='/'component={SongsIndex} />
    <Route path='/song/:id' component={SongShow} />
  </div>
</BrowserRouter>
</Provider>, document.getElementById('root'));
