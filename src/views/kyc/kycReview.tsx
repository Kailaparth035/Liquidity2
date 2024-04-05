import {View, Text, TouchableOpacity} from 'react-native';
import React, {useCallback} from 'react';
import {useRecoilState} from 'recoil';
import {useTheme} from '@react-navigation/native';
import Entypo from 'react-native-vector-icons/Entypo';
import {SVG} from '../../storybook';
import {RE_INITIATE_KYC} from '../../constants';
import {SVG_KYC} from '../../assets/icon/svg/kyc-rejected';
import {Routes} from '../routes/constants';
import {isDarkModeState} from '../../states';
import {KycStyles as styles} from './Kyc.styles';
import {SVG_KYC_FAIL_LIGHT} from '../../assets/icon/svg/kyc-failed';

const kycReview = ({navigation}: any) => {
  const [isDark, setIsDark] = useRecoilState(isDarkModeState);
  const {colors} = useTheme();
  const dataValue = true;

  const goBack = useCallback(() => {
    navigation.navigate(Routes.Home,{dataValue});

  }, [navigation]);
  const handleCall = useCallback(() => {
    navigation.navigate(Routes.KycPage,{dataValue});
  }, [navigation]);

  return (
    <View style={[styles.KycFailed, {backgroundColor: colors.background}]}>
      <TouchableOpacity style={styles.clossBTN} onPress={goBack}>
        <Entypo name="cross" size={24} color={colors.text} />
      </TouchableOpacity>
        <SVG name={isDark ? SVG_KYC : SVG_KYC_FAIL_LIGHT} height={120} />
      <View style={styles.VeriFFAiled}>
        <Text style={{color: colors.text, alignSelf: 'center'}}>
          KYC verification failed
        </Text>
        <Text style={styles.btnReinitiate}>
       {RE_INITIATE_KYC}
        </Text>
      </View>
      <TouchableOpacity style={styles.viewTouch} onPress={handleCall}>
        <Text style={styles.textBTN}>
     Reinitiate KYC
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default kycReview;
