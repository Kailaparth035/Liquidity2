import React, {useEffect, useRef} from 'react';
import {AppState, View} from 'react-native';
import {useSetRecoilState} from 'recoil';

import {IosAppActiveState} from '../states';
import Landing from './landing';
import {styles} from './pages.styles';

const Pages = () => {
  const appState = useRef(AppState.currentState);
  const setIosAppActive = useSetRecoilState(IosAppActiveState);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === 'active'
      ) {
        console.log('App has come to the foreground!');
      }

      appState.current = nextAppState;
      setIosAppActive(appState.current);
    });

    return () => {
      subscription.remove();
    };
  }, []);

  return (
    <View style={styles.container}>
      <Landing />
    </View>
  );
};

export default Pages;
