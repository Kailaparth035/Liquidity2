import React, {useEffect, useState,useCallback} from 'react';
import {Image, Text, TouchableOpacity, View,Platform} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {useRecoilState, useRecoilValue, useSetRecoilState} from 'recoil';
import {useAsyncStorage} from '@react-native-async-storage/async-storage';

import ModalIOS from './connection-modal';
import WalletDeposit from './connect-wallet-deposit';
import {
  AccessTokenState,
  IsConnectState,
  IsFundWalletOpenState,
  IsLinkedDeviceState,
  IsModalOpenState,
  IsUserLoginState,
  loginNumberState,
  ProfileDataState,
  PublicDataState,
  useKeyChain,
} from '../../states';
import Main from '../main';
import {useInterval} from '../../hooks/use-interval';
import FingerprintScanner from 'react-native-fingerprint-scanner';
import {landingStyles as styles} from './landing.styles';
import {APIS, API_HOST, Storages} from '../../constants';
import {useCaching, useNetwork} from '../../hooks';
import {NameLogo} from '../../assets/images';
import TouchID from 'react-native-touch-id';
import { Routes } from '../../views/routes/constants';
import DeviceInfo from 'react-native-device-info';
import {useDeviceName} from 'react-native-device-info';

const LandingPage = ({navigation,route}: any) => {
  const {dataValue,dataValue3} = route?.params ?? {};
  const [biometryType, setBiometryType] = useState<any>(null);
  const [modalVisible, setModalVisible] = useRecoilState(IsModalOpenState);
  const [publicData, setPublicData] = useRecoilState(PublicDataState);
  const isUserLogin = useRecoilValue(IsUserLoginState);
  const setPhoneNumber = useSetRecoilState(loginNumberState);
  const {getItem: getMobileNumber} = useAsyncStorage(Storages.MobileNumber);
  const profileData = useRecoilValue(ProfileDataState);
  const [isConnection, setIsConnected] = useRecoilState(IsConnectState);
  const [isWalletVisible, setIsWalletVisible] = useRecoilState(IsFundWalletOpenState);
  const [userDetails,setUserDetails] = useState<any>({}) 
  const linkDeviced = useRecoilValue(IsLinkedDeviceState)

  const [isFaceAuth, setIsFaceAuth] = useState(false);
  const [isTryAgain, setIsTryAgain] = useState(false);
  const setProfileData = useSetRecoilState(ProfileDataState);
  const {setItem: setUserProfileStorage} = useAsyncStorage(
    Storages.UserProfile,
  );

  const {fetchCachingData} = useCaching();
  const {colors} = useTheme();
  const {get, data} = useNetwork();
  const [accessToken, setToken] = useRecoilState(AccessTokenState);
  const [ipAdd,setIpAdd] = useState('')
  const {post} = useNetwork();

  const {result} = useDeviceName();
  let type = DeviceInfo.getDeviceType();

  useEffect(() => {
    DeviceInfo.getIpAddress().then(ip => {
      setIpAdd(ip);
    });
  }, []);

  const getProfileDataKyc = useCallback(() => {
    get(APIS.Users).then(userData => {
      if (userData?.data) {
        setUserDetails(userData.data);
      }
    });
  }, []);

  useEffect(()=>{
      getProfileDataKyc()
  },[dataValue3])
  
  const {getProfileData,getDevicesInfoApi} = useKeyChain();
  const sendData = useCallback(() => {
    const payload = {
      deviceIp: ipAdd,
      device: result,
      deviceOS: Platform.OS,
      deviceBrowser: '',
      deviceType: type,
      deviceToken: accessToken,
    };
    post(APIS.usersDeviceLogin, payload).then((res)=>{
      getDevicesInfoApi()
    })
  }, [result,profileData.id,linkDeviced]);

  useEffect(() => {
    if (result && profileData.id && linkDeviced ) {
      sendData();
    }
  }, [result,profileData.id,linkDeviced]);

  useEffect(()=>{
    if(dataValue){
      getProfileData()
    }
  },[dataValue]) 

  useEffect(() => {
    setUserProfileStorage('');
  }, []);

  useInterval(() => {
    get(APIS.walletDeposite + profileData?.phone)
  }, 3000)

  useEffect(() => {
    if(data?.data?.status === 'pending'){
      setIsWalletVisible(true);
    }
  }, [data])

  //for fututre we commented these code of line 

  // useEffect(() => {
  //   getMobileNumber().then(phone => {
  //     if (phone) {
  //       setPhoneNumber(phone);
  //     }
  //   });
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  const apiCall = () => {
    if (profileData?.id) {
      const data = {
        eventName: isConnection ? 'connect' : 'disconnect',
        channelName: 'users',
        data: {userId: profileData.id},
      };

      fetch(`${API_HOST}${APIS.Status}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
        .then(res => res.json())
        .then(res => {
          if (!!Object.keys(res).length && res.data.status === 'PENDING') {
            setPublicData(res.data);
            // if (profileData.isKyc) {
            setModalVisible(true);
            // } else {
            //   setModalVisible(false);
            // }
          } else if (res.data.status === 'CONNECTED') {
            setIsConnected(true);
          }
        });
    }
  };

  useInterval(apiCall, 5000);

  const dataValue2 = false;

  useEffect(() => {
    if (userDetails?.onboardingData?.status == "pending") {
      navigation.navigate(Routes.KycCheck);
    }
    if (
      userDetails?.onboardingData?.status == 'pending' &&
      (userDetails?.email !== null || '')
    ) {
      navigation.navigate(Routes.KycPage,{dataValue2});
    }
  }, [userDetails, navigation]);

  useEffect(() => {
    FingerprintScanner.isSensorAvailable()
      .then((type: any) => {
        setBiometryType({type});
      })
      .catch(error => {
        setIsFaceAuth(true);
      });
  }, []);

  useEffect(() => {
    showAuthenticationDialog();
  }, [biometryType, isUserLogin]);

  const showAuthenticationDialog = () => {
    if (biometryType !== null && biometryType !== undefined) {
      const optionalConfigObject = {
        title: 'Authentication Required', // Android
        imageColor: '#e00606', // Android
        imageErrorColor: '#ff0000', // Android
        sensorDescription: 'Touch sensor', // Android
        sensorErrorDescription: 'Failed', // Android
        cancelText: 'Cancel', // Android
        fallbackLabel: '', // iOS (if empty, then label is hidden)
        unifiedErrors: false, // use unified error messages (default false)
        passcodeFallback: false, // iOS - allows the device to fall back to using the passcode, if faceid/touch is not available. this does not mean that if touchid/faceid fails the first few times it will revert to passcode, rather that if the former are not enrolled, then it will use the passcode.
      };
      TouchID.authenticate(
        'Please scan biometrics to proceed',
        optionalConfigObject,
      )
        .then((success: any) => {
          if (isTryAgain) setIsTryAgain(false);
          setIsFaceAuth(true);
        })
        .catch((error: any) => {
          setIsTryAgain(true);
          console.log('Authentication error is => ', error);
        });
    } else {
      console.log('biometric authentication is not available');
    }
  };

  // set token in recoil state
  const {getItem: getToken} = useAsyncStorage(Storages.Token);

  useEffect(() => {
    if (!accessToken) {
      getToken().then(res => {
        if (res) {
          setToken(res);
        }
      });
    }
  }, [accessToken]);

  useEffect(() => {
    fetchCachingData();
  }, []);

  return (
    <View style={[styles.container, {backgroundColor: colors.background}]}>
      {modalVisible && isUserLogin && (
        <ModalIOS
          isOpen={modalVisible}
          setIsOpen={setModalVisible}
          publicKey={publicData.publicKey}
        />
      )}
      {isWalletVisible && (
        <WalletDeposit
          isOpen={isWalletVisible}
          setIsOpen={setIsWalletVisible}
          data={data}
        />
      )}
      <View style={[styles.bg, {backgroundColor: colors.background}]}>
        {isFaceAuth ? (
          <Main navigation={navigation} />
        ) : (
          <View style={[styles.logo, {backgroundColor: colors.background}]}>
            <Image source={NameLogo} style={styles.logoSize} />
            {isTryAgain && (
              <TouchableOpacity
                style={styles.try}
                onPress={showAuthenticationDialog}>
                <Text style={{color: colors.text}}>Try again</Text>
              </TouchableOpacity>
            )}
          </View>
        )}
      </View>
    </View>
  );
};

export default LandingPage;
