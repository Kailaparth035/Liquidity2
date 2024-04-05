import React, {useCallback, useMemo} from 'react';
import {View} from 'react-native';
import {useTheme} from '@react-navigation/native';

import {Header} from '../../components';
import {profileStyles as styles} from '../profile/profile.styles';
import Tokens from './tokens';
import WalletScreen from './walletScreen';
import { ENVIRONMENT } from '../../constants/common';

const BalanceDetails = ({navigation}: any) => {
  const {colors} = useTheme();
  const goBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const renderPage = useMemo(() => {
    return <WalletScreen navigation={navigation} />
  //  wallet old component with stellar and solana TOKENS
    //   <Tokens />
  }, [ENVIRONMENT.isProduction]);

  return (
    <View
      style={[
        styles.balanceSheetContainer,
        {backgroundColor: colors.background},
      ]}>
      <Header goBack={goBack} title="My Wallet" />
      {renderPage}
    </View>
  );
};

export default BalanceDetails;
