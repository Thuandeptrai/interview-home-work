import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { applyMiddleware, combineReducers, configureStore, createStore } from '@reduxjs/toolkit'
import createSagaMiddleware from 'redux-saga'
import storage from 'redux-persist/lib/storage'

import {
  authReducer,
} from './redux/reducer'
import { persistStore, persistReducer, persistCombineReducers } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'

import mySaga from './redux/saga'

const persistConfig = {
  key: 'root',
  storage,
}
const sagaMiddleware = createSagaMiddleware()
// create the saga middleware
// combine reducers

const persistedReducers = persistCombineReducers(persistConfig, {
  auth: authReducer,
})
// create a redux store with our reducer above and middleware
const store = configureStore({
  reducer: persistedReducers,
  middleware: [sagaMiddleware]
})

const persistor = persistStore(store)
// mount it on the Store  


export default store

// then run the saga
sagaMiddleware.run(mySaga)

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
   <Provider store={store} >
    <PersistGate loading={null} persistor={persistor}>
    <App />
    </PersistGate>
  </Provider> 
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
