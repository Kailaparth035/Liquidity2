import React, {useEffect} from 'react';
import {View} from 'react-native';

import AssetsList from './portfolios';
import {portfolioStyles as styles} from './portfolio.styles';
import LoginButton from '../login/components/login-button';
import {useRecoilValue} from 'recoil';
import {AccessTokenState, SelectedLanguageState} from '../../states';
import {Routes} from '../routes/constants';
import {Header} from '../../components';
import {useTheme} from '@react-navigation/native';

const Portfolio = ({navigation}: any) => {
  const accessToken = useRecoilValue(AccessTokenState);
  const language = useRecoilValue(SelectedLanguageState);
  const {colors} = useTheme();

  useEffect(() => {
    if (!accessToken.length) {
      navigation.navigate(Routes.Login);
    }
  }, []);

  return (
    <View
      style={[styles.portfolioContainer, {backgroundColor: colors.background}]}>
    
      {!accessToken.length ? (
        <LoginButton navigation={navigation} />
      ) : (
        <AssetsList navigation={navigation} />
      )}
    </View>
  );
};

export default Portfolio;
