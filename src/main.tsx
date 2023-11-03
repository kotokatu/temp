// TODO import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app';

import './bootstrap.min.css';
import ErrorBoundry from './components/error-boundry';

ReactDOM.createRoot(document.getElementById('root')!).render(
  //TODO add <React.StrictMode>
  <ErrorBoundry>
    <App />
  </ErrorBoundry>
);
