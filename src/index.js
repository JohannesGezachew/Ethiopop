import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from '@store/store';
import App from './App';
import { makeServer } from './mirage/server';

// Start MirageJS server in development only
if (process.env.NODE_ENV !== 'production') {
  makeServer();
}

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);