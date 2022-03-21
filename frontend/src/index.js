import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Provider } from 'react-redux';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
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
      <BrowserRouter history={history}>
        <Routes>
          <Route exact path='/' element={<TabsContainer />} />
          <Route path='/addSong' element={<TabsContainer />} />
          <Route path='/song/:id' element={<TabsContainer />} />
          <Route exact path='/leaflet' element={<TabsContainer />} />
          <Route exact path='/leaflet/info' element={<TabsContainer />} />
          <Route exact path='/leaflet/layout' element={<TabsContainer />} />
          <Route exact path='/leaflet/preview' element={<TabsContainer />} />
        </Routes>
      </BrowserRouter>
      <Backdrop />
      <Modal />
  </Provider>, document.getElementById('root'));
