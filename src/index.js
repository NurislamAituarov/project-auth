import React from 'react';
import { Provider } from 'react-redux';
import { createRoot } from 'react-dom/client';

import App from './app';
import 'normalize.css';
import './assets/styles/main.scss';
import { store } from './store';

const root = createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
);
