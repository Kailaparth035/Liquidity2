/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './src/app';
import { name as appName } from './app.json';
import Main from './src/main';

AppRegistry.registerComponent(appName, () => Main);
