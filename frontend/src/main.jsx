import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Auth0Provider } from '@auth0/auth0-react'
import './index.css'
import App from './App.jsx'

const domain = import.meta.env.VITE_AUTH0_DOMAIN || 'dev-5241bsurytkacdch.us.auth0.com';
const clientId = import.meta.env.VITE_AUTH0_CLIENT_ID || 'usdL190Zy1K7JuSOHtA7PznX0FNUApCR';

const onRedirectCallback = (appState) => {
  // With HashRouter, navigate using hash
  window.location.hash = appState?.returnTo || '/district-dashboard';
};

const redirectUri = window.location.origin + (window.location.pathname.includes('/NLAMS-1') ? '/NLAMS-1/' : '/');

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      onRedirectCallback={onRedirectCallback}
      authorizationParams={{
        redirect_uri: redirectUri
      }}
    >
      <App />
    </Auth0Provider>
  </StrictMode>,
)
