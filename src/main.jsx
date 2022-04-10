import React from 'react';
import { createRoot } from 'react-dom/client';
import './styles.scss';
import App from './App';

import { Provider } from 'react-redux';
import store from './apps/store';

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
