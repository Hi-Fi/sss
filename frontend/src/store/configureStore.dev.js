import { configureStore as toolkitConfigureStore } from '@reduxjs/toolkit'

import reducer from '../reducers';
import { setToken } from '../utils/api';


export default function configureStore(initialState) {
  if (initialState && initialState.user.user && initialState.user.user.token) {
    setToken(initialState.user.user.token)
  }
  const store = toolkitConfigureStore({
    reducer,
    preloadedState: initialState
  });

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextReducer = require('../reducers');
      store.replaceReducer(nextReducer);
    });
  }

  return store;
}
