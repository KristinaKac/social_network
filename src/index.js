import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import store from './state/redux';

const root = ReactDOM.createRoot(document.getElementById('root'));

export let redrawTree = (state) => {
  root.render(
    <React.StrictMode>
      <App state={state} store={store} />
    </React.StrictMode>
  );
}

redrawTree(store.getState());

store.subscribe(() => {
  redrawTree(store.getState());
});
