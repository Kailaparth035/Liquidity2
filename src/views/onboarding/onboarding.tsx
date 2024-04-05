import React, {useCallback, useState} from 'react';
import {View} from 'react-native';
import WebView from 'react-native-webview';
import {useSetRecoilState} from 'recoil';
import {useAsyncStorage} from '@react-native-async-storage/async-storage';

import {Loader} from '../../storybook/loader';
import {Routes} from '../routes/constants';
import {APIS, API_ONBOARDING_HOST, Storages} from '../../constants';
import {useInterval, useNetwork} from '../../hooks';
import {AccessTokenState, IsUserLoginState} from '../../states';

export const Onboarding = ({navigation, route}: any) => {
  const {code} = route.params ?? {};

  const [isWebLoading, setIsWebLoading] = useState(true);
  const [isData, setIsData] = useState(false);

  const setToken = useSetRecoilState(AccessTokenState);
  const setIsUserLogin = useSetRecoilState(IsUserLoginState);
  const {setItem: setMobileNumber} = useAsyncStorage(Storages.MobileNumber);

  const {get} = useNetwork(false);

  const getSessionStatus = useCallback(() => {
    if (!isData) {
      get(`${APIS.SessionStatus}/${code}`).then(res => {
        if (res?.data?.status && res?.data?.accessToken?.length > 0) {
          setIsData(true);
          const {accessToken, phone} = res.data;
          setToken(accessToken);
          setMobileNumber(phone);
          setIsUserLogin(true);
          navigation.navigate(Routes.Home);
        }
      });
    }
  }, [code]);

  useInterval(getSessionStatus, 2000);

  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      {isWebLoading && <Loader top={100} />}
      <WebView
        style={{backgroundColor: 'transparent', opacity: 0.99}}
        onLoadEnd={() => setIsWebLoading(false)}
        allowsInlineMediaPlayback={true}
        mediaPlaybackRequiresUserAction={false}
        source={{uri: API_ONBOARDING_HOST + code}}
      />
    </View>
  );
};
