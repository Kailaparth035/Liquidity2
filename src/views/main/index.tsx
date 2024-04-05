import React, {useCallback, useEffect, useState} from 'react';
import {View} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {useRecoilValue, useSetRecoilState} from 'recoil';
import messaging from '@react-native-firebase/messaging';
import PushNotification from 'react-native-push-notification';

import {
  AccessTokenState,
  ProfileDataState,
  SelectedAssetSheetState,
  useKeyChain,
} from '../../states';
import CreateModal from '../modal/create/create';
import SendModal from '../modal/send/send';
import MainPage from './mainPage';
import {mainStyles as styles} from './main.styles';
import {Loader} from '../../storybook/loader';
import {useFirebase} from '../../hooks';
import {useTrackEvents} from '../../helpers';
import {usePortfolioApi} from '../portfolio/hooks/use-portfolio-api';
import {Routes} from './../../views/routes/constants';

const Main = ({navigation}: any) => {
  const {requestUserPermission, notificationListener} = useFirebase();
  const {trackEvents} = useTrackEvents();
  const setSelectedSheet = useSetRecoilState(SelectedAssetSheetState);
  const profileData = useRecoilValue(ProfileDataState);
  const accessToken = useRecoilValue(AccessTokenState);
  const [notificationData, setNotificationData] = useState<any>(null);

  const {getPortfolios} = usePortfolioApi();
  const {colors} = useTheme();

  const {getKeyChainAccess, getProfileData} = useKeyChain();

  PushNotification.configure({
    onNotification: function(notification){
      navigationManager();
    },
  })

  useEffect(() => {
    getKeyChainAccess();
  }, []);

  useEffect(() => {
    getProfileData();
  }, [accessToken]);

  const navigationManager = useCallback(() => {
    
    if (notificationData?.data?.assetId && notificationData?.data?.type) {
      const obj = {
        id:
        notificationData?.data?.assetId ?? 'a303560b-8305-45c1-aa55-ff103c357e3c',
        symbol: notificationData?.data?.assetSymbol ?? 'HeraAlvi.MGO',
        type: notificationData?.data?.type ?? 'privates',
      };
      trackEvents('home-assets-details', obj);
      setSelectedSheet(obj);
      setTimeout(() => {
        navigation.navigate(Routes.AssetDetail);
      }, 1000);
    }
  }, [notificationData]);

  useEffect(() => {

    //When application killed
    messaging()
      .getInitialNotification()
      .then((messageNotifiction: any) => {
        setNotificationData(messageNotifiction);
        PushNotification.localNotification({
          data: messageNotifiction?.data,
          title: messageNotifiction?.notification?.title, // (optional)
          message: messageNotifiction?.notification?.body,
          playSound: true, // (optional) default: true
          soundName: 'default',
          invokeApp: true,
          vibrate: true,
        });
      });

    // forground lister
    messaging().onMessage((message: any) => {
      setNotificationData(message);
      PushNotification.localNotification({
        data: message?.data,
        title: message?.notification?.title, // (optional)
        message: message?.notification?.body,
        playSound: true, // (optional) default: true
        soundName: 'default',
        invokeApp: true,
        vibrate: true,
      });
    })

    //When application open in background
    messaging().onNotificationOpenedApp((notification: any) => {
      try {
        setNotificationData(notification);
        PushNotification.localNotification({
          data: notification?.data,
          title: notification?.notification?.title, // (optional)
          message: notification?.notification?.body,
          playSound: true, // (optional) default: true
          soundName: 'default',
          invokeApp: true,
          vibrate: true
        });
      } catch (error) {
        console.error('Error handling notification:', error);
      }
    });

    requestUserPermission();
    notificationListener();
    getPortfolios();
  }, []);

  if (!Object.keys(profileData ?? {}).length && accessToken.length) {
    return (
      <View
        style={[
          styles.activityIndicator,
          {backgroundColor: colors.background},
        ]}>
        <Loader />
      </View>
    );
  }

  return (
    <>
      <CreateModal />
      <SendModal />
      <MainPage navigation={navigation} />
    </>
  );
};

export default Main;
