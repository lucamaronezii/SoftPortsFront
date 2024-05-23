import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import './index.css';
import Router from './routes/Router';
import ConfigProvider from './config/ConfigProvider';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <ConfigProvider>
      <Router />
    </ConfigProvider>
  </React.StrictMode>
);

reportWebVitals();
