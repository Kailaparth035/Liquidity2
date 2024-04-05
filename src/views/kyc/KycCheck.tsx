import {View, Text, TouchableOpacity} from 'react-native';
import React, {useCallback, useEffect} from 'react';
import {SVG} from '../../storybook';
import {Svg_Start_Verification} from '../../assets';
import { useTheme } from '@react-navigation/native';
import Entypo from 'react-native-vector-icons/Entypo';
import {Routes} from '../../views/routes/constants';
import {VERIFY_KYC} from '../../constants';
import {useLogout} from '../../hooks';
import {KycStyles as styles} from './Kyc.styles';
import { useRecoilState, useRecoilValue } from 'recoil';
import { ProfileDataState, isDarkModeState, isReInitiateState } from '../../states';
import { SVG_START_VERI_LIGHT } from '../../assets/icon/svg/startVeri-light';

const KycCheck = ({navigation}: any) => {
  const [isDark, setIsDark] = useRecoilState(isDarkModeState);
  const [isReinitiate, setReinitiate] = useRecoilState(isReInitiateState);
  const userDetails = useRecoilValue(ProfileDataState);
  const {logout} = useLogout();
  const {colors} = useTheme()
  const dataValue2 = false;

  const handleClick = useCallback(() => {
    navigation.navigate(Routes.KycPage,{dataValue2});
  }, []);

  const goBack = useCallback(() => {
    navigation.navigate(Routes.Home);
  }, []);

  return (
    <View style={[styles.mainCont,{backgroundColor:colors.background}]}>
      <TouchableOpacity onPress={goBack} style={styles.clossBtn}>
        <Entypo name="cross" size={24} color={colors.text} />
      </TouchableOpacity>
      <SVG name={isDark ? Svg_Start_Verification : SVG_START_VERI_LIGHT} height={120} />
      <View style={styles.veriRequired}>
        <Text style={[styles.veriText,{color:colors.text}]}>Verification required</Text>
        <Text style={styles.veriDesc}>{VERIFY_KYC}</Text>
      </View>
      <TouchableOpacity style={styles.touchBtn} onPress={handleClick}>
        <Text style={styles.startBtn}>Start verification</Text>
      </TouchableOpacity>
    </View>
  );
};

export default KycCheck;
