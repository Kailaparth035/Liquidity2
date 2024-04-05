import {useSetRecoilState} from 'recoil';
import {useAsyncStorage} from '@react-native-async-storage/async-storage';
import messaging from '@react-native-firebase/messaging';

import {
  CreateModalDetailsState,
  IsApproveModalState,
  SendModalDetailsState,
  IsSendModalState,
  IsModalOpenState,
  IsFirebaseOpenState,
} from './../states';
import {useNetwork} from './use-network';
import {APIS, Storages} from '../constants';

export const useFirebase = () => {
  const setCreateData = useSetRecoilState(CreateModalDetailsState);
  const setIsApproveModal = useSetRecoilState(IsApproveModalState);

  const setSendModal = useSetRecoilState(SendModalDetailsState);
  const setIsSendModal = useSetRecoilState(IsSendModalState);

  const setIsConnectModal = useSetRecoilState(IsModalOpenState);

  const setIsFirebaseOpen = useSetRecoilState(IsFirebaseOpenState);

  const {getItem: getToken} = useAsyncStorage(Storages.Token);
  const {getItem: getFbToken, setItem: setFbToken} = useAsyncStorage(
    Storages.FirebaseToken,
  );

  const {post} = useNetwork();

  const requestUserPermission = async () => {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;
    if (enabled) {
      registerAppWithFCM();
    }
  };

  const registerAppWithFCM = async () => {
    try {
      // TODO: now create new token every time.
      const fbToken = await getFbToken();
      if (fbToken) {
        getToken().then(() => {
          post(APIS.DeviceTokens, {token: fbToken, type: 'mobile'});
        });
      }

      // if (!fbToken) {
      const isRegister: any =
        await messaging().registerDeviceForRemoteMessages();
      if (isRegister) {
        const fcmToken = await messaging().getToken();
        if (!!fcmToken) {
          // setFbToken(fcmToken);
          post(APIS.DeviceTokens, {token: fcmToken, type: 'mobile'});
        }
      }
      // }
    } catch (error) {
      console.log('error:', error);
    }
  };

  // set state for data
  const openMobileApp = (msg: any) => {
    if (msg) {
      switch (msg.data?.type) {
        case 'create-token':
          setTimeout(() => {
            setIsFirebaseOpen(true);
            setIsApproveModal(true);
            setCreateData(msg.data);
          }, 1000);
          break;
        case 'send-token':
          setTimeout(() => {
            setIsFirebaseOpen(true);
            setIsSendModal(true);
            setSendModal(msg.data);
          }, 1000);
          break;
        case 'user-connect':
          setTimeout(() => {
            setIsFirebaseOpen(true);
            setIsConnectModal(true);
          }, 1000);
          break;
        default:
          break;
      }
    }
  };

  const notificationListener = () => {
    messaging().onNotificationOpenedApp(openMobileApp);
    messaging().getInitialNotification().then(openMobileApp);
    messaging().onMessage(openMobileApp);
  };

  return {
    requestUserPermission,
    notificationListener,
  };
};
