import React from 'react';
import {View, Image} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {logoGIF, NameLogo} from '../../assets/images';
import {styles} from './splashScreen.style';
type SplashScreenType = {};
export const SplashScreen = ({}: SplashScreenType) => {
  const {colors} = useTheme();

  return (
    <View style={[styles.parent, {backgroundColor: colors.background}]}>
      <Image source={logoGIF} style={styles.gifStyle} />
      <Image source={NameLogo} style={styles.logoSize} />
    </View>
  );
};
