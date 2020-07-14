/**
 * @format
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import { AppRegistry } from 'react-native';
import Amplify, { Storage } from 'aws-amplify';
import { App } from './App';
import { name as appName } from './app.json';
import config from './aws-exports';

Amplify.configure({
  ...config,
  aws_appsync_authenticationType: 'AMAZON_COGNITO_USER_POOLS'
});
Storage.configure({ level: 'private' });
AppRegistry.registerComponent(appName, () => App);
