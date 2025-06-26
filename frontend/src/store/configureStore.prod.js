import { configureStore as toolkitConfigureStore } from '@reduxjs/toolkit'
import rootReducer from '../reducers';
import promise from 'redux-promise';

export default function configureStore(initialState) {
  // Note: only Redux >= 3.1.0 supports passing enhancer as third argument.
  // See https://github.com/rackt/redux/releases/tag/v3.1.0
  return toolkitConfigureStore({
    reducer: rootReducer,
    devTools: false,
    preloadedState: initialState,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(promise),
  });
};
