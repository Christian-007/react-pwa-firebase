import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';

import { Provider } from 'react-redux';
import store from './store';

import { auth } from './modules/firebase/firebase';
import { setUser } from './modules/actions/navigation';

auth.onAuthStateChanged(user => {
  console.log('AUTH');
  if (user) {
    console.log('user is logged in');

    if (store.getState().navigationReducer.user === null) {
      store.dispatch(setUser(user));
    }

  } else {
    // No user is signed in.
    console.log('user is NOT logged in');
  }

  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>
  ,document.getElementById('root'));
  registerServiceWorker();
});
