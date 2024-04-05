import {View, Text, TouchableOpacity} from 'react-native';
import React, {useCallback} from 'react';
import { useTheme } from '@react-navigation/native';
import { useRecoilState } from 'recoil';
import {SVG} from '../../storybook';
import {Routes} from '../../views/routes/constants';
import {SVG_SUCCESS} from '../../assets/icon/svg/success';
import {SUCCESS_TEXT} from '../../constants';
import {KycStyles as styles} from './Kyc.styles';
import { isDarkModeState } from '../../states';
import { SVG_SUCCESS_LIGHT } from '../../assets/icon/svg/success-light';

const SuccessRejected = ({navigation}: any) => {
  const [isDark, setIsDark] = useRecoilState(isDarkModeState);
  const {colors} = useTheme();
  const dataValue = true;

  const handleButton = useCallback(() => {
    navigation.navigate(Routes.Home,{dataValue});
  }, [navigation]);

  return (
    <View style={styles.successMain}>
      <SVG name={isDark ? SVG_SUCCESS : SVG_SUCCESS_LIGHT}  height={120} />
      <View style={styles.successView}>
        <Text style={[styles.successText,{color:colors.text}]}>Verification done successfully</Text>
        <Text style={styles.successDesc}>{SUCCESS_TEXT}</Text>
      </View>
      <TouchableOpacity style={styles.exploreBtn} onPress={handleButton}>
        <Text style={styles.gotoExchange}>Go to exchange</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SuccessRejected;
