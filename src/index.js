import React from 'react';
import ReactDOM from 'react-dom';
import App from './containers/App';
import "./css/index.scss"
import Reducer from "./reducers"
import { createStore } from 'redux'
import { Provider } from "react-redux"
//bootstrap
// eslint-disable-next-line 
import $ from 'jquery';
// eslint-disable-next-line 
import Popper from 'popper.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

let store = createStore(Reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>
  ,
  document.getElementById('root'));

