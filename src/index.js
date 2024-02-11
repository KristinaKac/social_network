import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import store from './state/redux';
import { Provider } from 'react-redux';

const root = ReactDOM.createRoot(document.getElementById('root'));

export let redrawTree = (state) => {
  root.render(
    <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </React.StrictMode>
  );
}

redrawTree(store.getState());

store.subscribe(() => {
  redrawTree(store.getState());
});
