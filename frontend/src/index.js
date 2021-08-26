import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Provider } from 'react-redux';
import { Router, Route } from 'react-router-dom';
import 'typeface-roboto'
import configureStore from './store/configureStore.js';
import TabsContainer from './containers/TabsContainer'
import Backdrop from './containers/BackdropContainer'
import Modal from './containers/ModalContainer'
import Header from './containers/HeaderContainer'

import history from './utils/history'
import {loadFromLocalStorage, saveToLocalStorage} from './store/localStorage'

const store = configureStore(loadFromLocalStorage());
store.subscribe(() => saveToLocalStorage(store.getState()))

ReactDOM.render(
  <Provider store={store}>
      <Header />
      <Router history={history}>
        <div>
          <Route exact path='/' component={TabsContainer} />
          <Route path='/addSong' component={TabsContainer} />
          <Route path='/song/:id' component={TabsContainer} />
          <Route exact path='/leaflet' component={TabsContainer} />
          <Route exact path='/leaflet/info' component={TabsContainer} />
          <Route exact path='/leaflet/layout' component={TabsContainer} />
          <Route exact path='/leaflet/preview' component={TabsContainer} />
        </div>
      </Router>
      <Backdrop />
      <Modal />
  </Provider>, document.getElementById('root'));
