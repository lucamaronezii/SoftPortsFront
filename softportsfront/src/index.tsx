import { ReactKeycloakProvider } from '@react-keycloak/web';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { keycloak } from './auth/Keycloak';
import ConfigProvider from './config/ConfigProvider';
import ProjectsContext from './context/ProjectsContext';
import './index.css';
import reportWebVitals from './reportWebVitals';
import Router from './routes/Router';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <ReactKeycloakProvider authClient={keycloak} initOptions={{ onLoad: "login-required" }}>
    <React.StrictMode>
      <ConfigProvider>
        <ProjectsContext>
          <Router />
        </ProjectsContext>
      </ConfigProvider>
    </React.StrictMode>
  </ReactKeycloakProvider>

);

reportWebVitals();
