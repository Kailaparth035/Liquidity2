import React, {useEffect, useState, useCallback, useMemo,useRef} from 'react';
import {View, Text, TouchableOpacity, SafeAreaView} from 'react-native';
import WebView from 'react-native-webview';
import {Loader} from '../../storybook/loader';
import {useLogout} from '../../hooks/use-logout';
import {Routes} from '../../views/routes/constants';
import {KycStyles as styles} from './Kyc.styles';
import {useInterval, useNetwork} from '../../hooks';
import {APIS} from '../../constants';
import { useSetRecoilState } from 'recoil';
import { KycProfileDataState} from '../../states';

const KycPage = ({navigation, route}: any) => {
  const {dataValue, dataValue2} = route?.params ?? {};
  const [isWebLoading, setIsWebLoading] = useState(true);
  const {get} = useNetwork(false);
  const [userData, SetUserData] = useState<any>({});
  const {logout} = useLogout();
  const [state, setState] = useState(false);
  const setKycProfileData = useSetRecoilState(KycProfileDataState);


  const getProfileDataKyc = useCallback(() => {
    get(APIS.Users).then(userData => {
      if (userData?.data) {
        SetUserData(userData.data);
        setKycProfileData(userData.data)
      }
    });
  }, []);

  useInterval(getProfileDataKyc, 3000);

  const Kyc = userData?.onboardingData;

  const webViewRef = useRef(null);
  const reloadWebView = () => {
    if (webViewRef.current) {
      webViewRef.current.reload();
    }
  };
 
  useEffect(()=>{
    reloadWebView()
  },[dataValue])

  useEffect(() => {
    dataValue ? setState(dataValue) : setState(dataValue2);
  }, [dataValue, dataValue2]);

  useEffect(() => {
    if (Kyc?.isOnboardingComplete == true && Kyc.status === 'completed' && Kyc?.accreditationStatus =="completed") {
      navigation.navigate(Routes.SuccessRejected);
    }
    if (
      Kyc?.kycStatus == 'rejected' &&
      Kyc?.kybStatus == 'rejected' && Kyc.status === 'completed' &&
      state == false
    ) {
      navigation.navigate(Routes.kycKybReview);
    } else if (Kyc?.kycStatus == 'rejected' && Kyc.status === 'completed' && state == false) {
      navigation.navigate(Routes.kycReview);
    } else if (Kyc?.kybStatus == 'rejected' && Kyc.status === 'completed' && state == false) {
      navigation.navigate(Routes.kybReview);
    }
  }, [userData, navigation]);

  useEffect(() => {
    if (
      Kyc?.status == 'completed' &&
      Kyc?.kybStatus == 'pending' &&
      Kyc?.kycStatus == 'pending' &&
      Kyc?.amlStatus == 'pending' &&
      Kyc?.accreditationStatus == 'pending'
    ) {
      navigation.navigate(Routes.UnderReview);
    }
  }, [userData]);


  const dataValue3 = true;
  const explore = () => {
    if(Kyc?.status == 'pending' ){
      navigation.navigate(Routes.KycCheck,{dataValue3});
    }
    if(Kyc?.status == 'completed' ) {
      navigation.replace(Routes.Home,{dataValue3})
    }
  };
  const URL = useMemo(()=>{
   return  (
        Kyc?.complexUrl +
        `&phone=${userData?.phone}&countryCode=${userData?.countryCode}&hideAppleID=true`
      ).trim();
  },[userData?.phone,userData?.countryCode])
  
  return (
    <SafeAreaView>
      <View style={styles.closeKycPage}>
        <Text style={styles.closTxt}
        onPress={explore}
        >X</Text>
      </View>
      <View style={styles.kycPageMain}>
        {isWebLoading && <Loader top={100} color={"#000000"} />}
        <WebView
        allowsInlineMediaPlayback
        ref={webViewRef}
        //mediaPlaybackRequiresUserAction
          style={{opacity: 0.8}}
          onLoadEnd={() => setIsWebLoading(false)}
          source={{uri: URL}}
        />
      </View>
    </SafeAreaView>
  );
};

export default KycPage;
