import React, {useState} from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import {useTheme} from '@react-navigation/native';
import WebView from 'react-native-webview';

import {Loader} from '../../storybook/loader';

const INJECTED_JAVASCRIPT = `const meta = document.createElement('meta'); meta.setAttribute('content', 'width=device-width, initial-scale=0.5, maximum-scale=0.5, user-scalable=0'); meta.setAttribute('name', 'viewport'); document.getElementsByTagName('head')[0].appendChild(meta); `;

const NewsWebview = ({url}: any) => {
  const [isWebLoading, setIsWebLoading] = useState(true);
  const {colors} = useTheme();

  const {height} = Dimensions.get('window');

  return (
    <View
      style={{
        backgroundColor: colors.background,
        height: height - 147,
        marginTop: 40,
      }}>
      <WebView
        source={{uri: url}}
        onLoadEnd={() => setIsWebLoading(false)}
        style={{backgroundColor: colors.background, opacity: 0.99}}
        injectedJavaScript={INJECTED_JAVASCRIPT}
        scrollEnabled
        scalesPageToFit
      />
      {isWebLoading && (
        <View
          style={{
            ...StyleSheet.absoluteFillObject,
            backgroundColor: colors.background,
            paddingTop: 100,
          }}>
          <Loader />
        </View>
      )}
    </View>
  );
};

export default NewsWebview;
