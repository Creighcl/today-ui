import React, { useContext } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import AppRouter, { history } from './routers/AppRouter';
import { BrowserRouter as Router } from 'react-router-dom';
import configureStore from './store/configureStore';
import 'normalize.css/normalize.css';
import './styles/styles.scss';
import 'react-dates/lib/css/_datepicker.css';
import AuthenticationLayer from './layers/authentication';
import "./firebase/firebase";

const store = configureStore();
const jsx = (
  <Router>
    <Provider store={store}>
      <AuthenticationLayer>
        <AppRouter />
      </AuthenticationLayer>
    </Provider>
  </Router>
);
let hasRendered = false;
const renderApp = () => {
  if (!hasRendered) {
    ReactDOM.render(jsx, document.getElementById('app'));
    hasRendered = true;
  }
};

ReactDOM.render(jsx, document.getElementById('app'));
