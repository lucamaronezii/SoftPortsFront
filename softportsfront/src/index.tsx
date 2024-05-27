import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import './index.css';
import Router from './routes/Router';
import ConfigProvider from './config/ConfigProvider';
import GlobalContext from './context/GlobalContext';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <ConfigProvider>
      <GlobalContext>
        <Router />
      </GlobalContext>
    </ConfigProvider>
  </React.StrictMode>
);

reportWebVitals();
