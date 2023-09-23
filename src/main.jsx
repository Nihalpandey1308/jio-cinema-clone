
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.scss'
import { store } from './store/Store.js'
import { Provider } from 'react-redux'
import { Auth0Provider } from '@auth0/auth0-react';
 
ReactDOM.createRoot(document.getElementById('root')).render(
    <Auth0Provider
    domain="dev-o7gwsryg1bsy0208.us.auth0.com"
    clientId="G50rgUh3o0c8z9ybH0i2jBmj8cm3tu9I"
    authorizationParams={{
      redirect_uri: window.location.origin
    }}
  >
 <Provider store={store}>
    <App />
    </Provider>
    </Auth0Provider>
 
)
