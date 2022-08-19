import React from 'react';
import { AuthenticationProvider } from '@axa-fr/react-oidc-context';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import { App } from './components';
import oidcConfiguration from './configuration';
import CustomCallback from './shared/ui/CustomCallback/CustomCallback';
import { store } from './store';

import './index.scss';
import ScrollToTop from './helper/ScrollToTop';

ReactDOM.render(
  <AuthenticationProvider
    configuration={oidcConfiguration}
    callbackComponentOverride={CustomCallback}
    notAuthenticated={CustomCallback}
    notAuthorized={CustomCallback}
    authenticating={CustomCallback}
    isEnabled
  >
    <React.StrictMode>
      <Provider store={store}>
        <BrowserRouter>
          <ScrollToTop>
            <App />
          </ScrollToTop>
        </BrowserRouter>
      </Provider>
    </React.StrictMode>
  </AuthenticationProvider>,
  document.getElementById('root'),
);
