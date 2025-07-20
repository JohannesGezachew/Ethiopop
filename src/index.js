import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from '@store/store';
import App from './App';
import { makeServer } from './mirage/server';

// Start MirageJS server (enabled for demo purposes)
try {
  const server = makeServer({ environment: 'production' });
  console.log('MirageJS server started successfully');
  
  // Add a test to verify the server is working
  window.mirageServer = server;
} catch (error) {
  console.error('Failed to start MirageJS server:', error);
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