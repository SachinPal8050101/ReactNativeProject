import React from 'react';

import {Auth0Provider} from 'react-native-auth0';

import config from './auth0-configuration';
import MainApp from './src';

const App = () => {
  return (
    <Auth0Provider domain={config.domain} clientId={config.clientId}>
      <MainApp />
    </Auth0Provider>
  );
};

export default App;
