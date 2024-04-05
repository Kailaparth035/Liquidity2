import React, {useState, useEffect} from 'react';
import {SafeAreaView, StatusBar, DeviceEventEmitter} from 'react-native';
import {RecoilRoot} from 'recoil';
import {NavigationContainer} from '@react-navigation/native';
import {RootSiblingParent} from 'react-native-root-siblings';
import {createClient, AnalyticsProvider} from '@segment/analytics-react-native';
import 'react-native-gesture-handler';
import {COLORS, darkTheme, lightTheme} from './assets';

import {RoutesComponent} from './views/routes';
import {appStyles as styles} from './app.styles';
import {linking} from './views/routes/linking';
import '../firebase.json';
import App from './app';

const Main = () => {
  const segmentClient = createClient({
    writeKey: 'ZxV1GhUMrLDQVmI8KqZ3YNFjtoj3JGtl',
    trackAppLifecycleEvents: true,
  });

  return (
    <AnalyticsProvider client={segmentClient}>
      <RootSiblingParent>
        <RecoilRoot>
          <App />
        </RecoilRoot>
      </RootSiblingParent>
    </AnalyticsProvider>
  );
};

export default Main;
