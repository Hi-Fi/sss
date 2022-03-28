import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Provider } from 'react-redux';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'typeface-roboto'
import configureStore from './store/configureStore.js';

import history from './utils/history'
import {loadFromLocalStorage, saveToLocalStorage} from './store/localStorage'
import { Backdrop } from './components/Backdrop';
import { Modal } from './components/Modal';
import { Header } from './components/Header';
import { Tabs } from './pages/Tabs';

const store = configureStore(loadFromLocalStorage());
store.subscribe(() => saveToLocalStorage(store.getState()))

ReactDOM.render(
  <Provider store={store}>
      <Header />
      <BrowserRouter history={history}>
        <Routes>
          <Route exact path='/' element={<Tabs />} />
          <Route path='/addSong' element={<Tabs />} />
          <Route path='/song/:id' element={<Tabs />} />
          <Route exact path='/leaflet' element={<Tabs />} />
          <Route exact path='/leaflet/info' element={<Tabs />} />
          <Route exact path='/leaflet/layout' element={<Tabs />} />
          <Route exact path='/leaflet/preview' element={<Tabs />} />
        </Routes>
      </BrowserRouter>
      <Backdrop />
      <Modal />
  </Provider>, document.getElementById('root'));
