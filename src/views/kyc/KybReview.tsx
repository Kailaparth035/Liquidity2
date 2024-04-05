import {View, Text, TouchableOpacity} from 'react-native';
import React, {useCallback} from 'react';
import {useRecoilState, useRecoilValue} from 'recoil';
import Entypo from 'react-native-vector-icons/Entypo';
import {SVG} from '../../storybook';
import {VERIFY_KYB} from '../../constants';
import {SVG_KYB} from '../../assets/icon/svg/kyb-rejected';

import {Routes} from '../routes/constants';
import {ProfileDataState, isDarkModeState} from '../../states';
import { KycStyles as styles } from './Kyc.styles';
import { SVG_KYB_FAIL_LIGHT } from '../../assets/icon/svg/kyb-fail';
import { useTheme } from '@react-navigation/native';


const KybReview = ({navigation}: any) => {
  const userDetails = useRecoilValue(ProfileDataState);
  const [isDark, setIsDark] = useRecoilState(isDarkModeState);
  const {colors} = useTheme();
  const dataValue = true;

  const goBack = useCallback(() => {
    navigation.navigate(Routes.Home,{dataValue});
  }, [userDetails]);

  const handleCall = useCallback(() => {
    navigation.navigate(Routes.KycPage,{dataValue});
  }, []);

  return (
    <View style={styles.kybMain}>
      <TouchableOpacity
        style={styles.kybClose}
        onPress={goBack}>
            <Entypo name="cross" size={24} color={colors.text} />
      </TouchableOpacity>
      <SVG name={isDark ? SVG_KYB : SVG_KYB_FAIL_LIGHT} height={120} />
      <View style={styles.kybFailed}>
        <Text style={styles.failText}>
          KYB verification failed
        </Text>
        <Text
          style={styles.kybDesc}>
          {VERIFY_KYB}
        </Text>
      </View>
      <TouchableOpacity
        style={styles.kybBtnView}
        onPress={handleCall}>
        <Text
          style={styles.reiniText}>
          Reinitiate KYB
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default KybReview;
