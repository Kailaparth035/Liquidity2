import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  StatusBar,
  DeviceEventEmitter,
  Platform,
  View,
  Text,
} from 'react-native';
import {RecoilRoot, useRecoilState, useResetRecoilState} from 'recoil';
import {NavigationContainer, useTheme} from '@react-navigation/native';
import {RootSiblingParent} from 'react-native-root-siblings';
import {createClient, AnalyticsProvider} from '@segment/analytics-react-native';
import 'react-native-gesture-handler';
import {COLORS, darkTheme, lightTheme} from './assets';
// import NetInfo from '@react-native-community/netinfo';
import {RoutesComponent} from './views/routes';
import {appStyles as styles} from './app.styles';
import {linking} from './views/routes/linking';
import '../firebase.json';
import {isDarkModeState, IsUserLoginState} from './states/';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {MODE} from './constants';
// import {socketService} from '../src/socketIo';
// import {
//   DatadogProviderConfiguration,
//   DatadogProvider,
// } from '@datadog/mobile-react-native';
// import {} from '@datadog/browser-rum';
import Icons from 'react-native-vector-icons/MaterialIcons';

const App = () => {
  const [darkApp, setDarkApp] = useRecoilState(isDarkModeState);
  const [connection, setConnection] = useState<any>(null);
  const {colors} = useTheme();

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setConnection(state?.isConnected);
    });
    AsyncStorage.getItem(MODE.DARK).then(isDarkMode => {
      if (!isDarkMode) return;
      setDarkApp(JSON.parse(isDarkMode));
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const config = new DatadogProviderConfiguration(
    'ecfd708-6148-414a-a7a2-b633657518b6',
    'pub80973164a98f66f35ee6eaedaad7c079',
    'PP',
    true, // track user interactions (such as a tap on buttons).
    true, // track XHR resources
    true, // track errors
  );
  config.site = 'US1';

  // Initialize socket connection done from fronted side when backend is implemnent and given url then connection and implement.

  // useEffect(() => {
  //   console.log(Platform.Version);
  //   socketService.initializeSocket();
  //   socketService.on('new_message', (data: any) => {
  //     console.log('receiveMessage from server side ====>', data);
  //     let messages: any = messagesArray;
  //     console.log(messages);
  //   });
  // }, []);

  return (
    // <DatadogProvider configuration={config}>
      <NavigationContainer
        linking={linking}
        theme={darkApp === true ? darkTheme : lightTheme}>
        <StatusBar
          animated={true}
          backgroundColor={darkApp === true ? '#1B1C1F' : '#F5F5F5'}
          translucent
          barStyle={darkApp === true ? 'light-content' : 'dark-content'}
        />
        <SafeAreaView
          style={[
            styles.appContainer,
            darkApp === true
              ? {backgroundColor: COLORS['bg-90-dark']}
              : {backgroundColor: COLORS['bg-90-light']},
          ]}>
          {connection === false ? (
            <View
              style={[
                styles.container,
                {
                  backgroundColor:
                    darkApp === true
                      ? darkTheme.colors.background
                      : lightTheme.colors.background,
                },
              ]}>
              <Icons
                size={64}
                name="signal-cellular-connected-no-internet-4-bar"
                color={
                  darkApp === true
                    ? darkTheme.colors.text
                    : lightTheme.colors.text
                }
              />
              <Text
                style={[
                  styles.text,
                  {
                    color:
                      darkApp === true
                        ? darkTheme.colors.text
                        : lightTheme.colors.text,
                  },
                ]}>
                No Internet Connection
              </Text>
            </View>
          ) : (
            <RoutesComponent />
          )}
        </SafeAreaView>
      </NavigationContainer>
    // </DatadogProvider>
  );
};

export default App;
