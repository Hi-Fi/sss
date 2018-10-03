import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';
import SongsIndex from './pages/SongsIndex';

import configureStore from './store/configureStore.js';
const store = configureStore();

ReactDOM.render(
<Provider store={store}>
<BrowserRouter>
  <div>
    <Route path='/'component={SongsIndex} />
  </div>
</BrowserRouter>
</Provider>, document.getElementById('root'));
