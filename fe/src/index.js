import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { applyMiddleware, configureStore, createStore } from '@reduxjs/toolkit'
import createSagaMiddleware from 'redux-saga'

import  {
  registerReducer,
  authReducer,
  userReducer
}  from './redux/reducer'


import mySaga from './redux/saga'

// create the saga middleware
// combine reducers


const sagaMiddleware = createSagaMiddleware()
// mount it on the Store  
const store = configureStore({
  reducer: {
    user: userReducer,
    auth: authReducer,
    register: registerReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware),
})

export default store

// then run the saga
sagaMiddleware.run(mySaga)

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
   <Provider store={store}>
    <App />
  </Provider> 
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
