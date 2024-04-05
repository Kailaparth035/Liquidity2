import React, {useCallback, useState} from 'react';
import {View, Dimensions} from 'react-native';
import WebView from 'react-native-webview';
import {Header} from '../../components';
import {Loader} from '../../storybook/loader';
import {styles} from './privacy.style';
import {PRIVACY_POLICY_URL} from '../../constants';

export const Privacy = ({navigation}: any) => {
  const [isLoading, setIsLoading] = useState(true);
  const height = Dimensions.get('screen').height;
  const width = Dimensions.get('screen').width;

  const goBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const handleLoader = useCallback(() => setIsLoading(false), []);

  return (
    <View style={styles.container}>
      <Header title="Privacy" goBack={goBack} />
      <WebView
        style={styles.webView}
        source={{uri: PRIVACY_POLICY_URL}}
        onLoadEnd={handleLoader}
      />
      {isLoading && (
        <View
          style={[
            styles.loaderContainer,
            {top: height / 2 - 80, left: width / 2 - 50},
          ]}>
          <Loader size={'large'} color={'white'} style={styles.loader} />
        </View>
      )}
    </View>
  );
};
