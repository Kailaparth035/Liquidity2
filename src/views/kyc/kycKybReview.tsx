import {View, Text, TouchableOpacity} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import { useTheme } from '@react-navigation/native';
import {useRecoilState, useRecoilValue} from 'recoil';
import Entypo from 'react-native-vector-icons/Entypo';
import {SVG} from '../../storybook';
import {Routes} from '../../views/routes/constants';
import {ProfileDataState, isDarkModeState, isReInitiateState} from '../../states';
import {SVG_KYCKYB_REJECTED} from '../../assets/icon/svg/kyckyb-rejected';
import { KycStyles as styles} from './Kyc.styles';
import { SVG_KYCKYB_REJECTED_LIGHT } from '../../assets/icon/svg/kyckyb-light';

const kycKybReview = ({navigation}: any) => {
  const [isDark, setIsDark] = useRecoilState(isDarkModeState);
  const userDetails = useRecoilValue(ProfileDataState);
  const [isReinitiate, setReinitiate] = useRecoilState(isReInitiateState);
  const {colors} = useTheme()
  const dataValue = true;

  useEffect(()=>{
 if( userDetails?.onboardingData?.isOnboardingComplete == true) {
  navigation.navigate(Routes.SuccessRejected);
    }
  },[userDetails,navigation])
  

  const goBack = useCallback(() => {
    navigation.navigate(Routes.Home,{dataValue});
  }, [navigation]);

  const handleCall = useCallback(() => {
    navigation.navigate(Routes.KycPage);
    setReinitiate((previousState: any) => !previousState);
  }, [navigation]);

  return (
    <View style={[styles.kyckybMain,{backgroundColor:colors.background}]}>
      <TouchableOpacity
        style={styles.clossBtn}
        onPress={goBack}>
        <Entypo name="cross" size={24} color={colors.text} />
      </TouchableOpacity>
      <SVG name={ isDark ?  SVG_KYCKYB_REJECTED : SVG_KYCKYB_REJECTED_LIGHT} height={120} />
      <View style={styles.verifailed}>
        <Text style={{color: colors.text, alignSelf: 'center'}}>
          KYC & KYB verification failed
        </Text>
        <Text
          style={styles.reasonFailed}>
          Reason for rejection
        </Text>
      </View>
      <TouchableOpacity
        style={styles.kyckybBtn}
        onPress={handleCall}>
        <Text
          style={styles.reiniKycKyb}>
          Reinitiate Kyc & Kyb
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default kycKybReview;
