import React from 'react';
import { YellowBox } from 'react-native';
import { Provider } from 'react-redux';
import { ApolloProvider } from 'react-apollo';
import { Rehydrated } from 'aws-appsync-react';
import Amplify, { Auth } from 'aws-amplify';
import AWSAppSyncClient from 'aws-appsync';
import config from './aws-exports';
import store from './src/redux/store';
import AppWithNav from './src/navigation/AppWithNav';

Amplify.configure(config);
export const appsyncClient = new AWSAppSyncClient({
  url: config.aws_appsync_graphqlEndpoint,
  region: config.aws_appsync_region,
  auth: {
    type: config.aws_appsync_authenticationType,
    apiKey: config.aws_appsync_apiKey,
    jwtToken: async () => (await Auth.currentSession()).getAccessToken().getJwtToken()
  }
});
YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);
console.disableYellowBox = true;

export const App = () => (
  <ApolloProvider client={appsyncClient}>
    <Provider store={store}>
      <AppWithNav />
    </Provider>
  </ApolloProvider>
);
