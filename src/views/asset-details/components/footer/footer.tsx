import {useTheme} from '@react-navigation/native';
import {useNetwork} from '../../../../hooks';
import React, {useCallback, useState, useEffect, useMemo} from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useRecoilValue} from 'recoil';
import {APIS} from '../../../../constants';

import {COLORS} from '../../../../assets';
import {
  IsUserLoginState,
  PortfolioState,
  SelectedAssetSheetState,
} from '../../../../states';
import {Routes} from '../../../routes/constants';
import {footerStyle as styles} from './footer.style';

type AssetsFooterType = {
  navigation: any;
  isMusicalType?: boolean;
};
export const AssetsFooter = ({
  navigation,
  isMusicalType = false,
}: AssetsFooterType) => {
  const {get, data, loading} = useNetwork();
  const [minted, setMinted] = useState([]);
  const portfolio = useRecoilValue(PortfolioState);
  const {id, type} = useRecoilValue(SelectedAssetSheetState);
  const isUserLogin = useRecoilValue(IsUserLoginState);
  const {colors} = useTheme();

  useEffect(() => {
    get(APIS.Tokens);
  }, []);

  useEffect(() => {
    if (data?.data) {
      setMinted(data.data);
    }
  }, [data]);

  const isMyAsset = useMemo(() => {
    return (
      !!portfolio?.privates?.assets?.find(
        (asset: any) => asset.assetId === id,
      ) || !!minted?.find((asset: any) => asset.id === id) || portfolio?.music?.assets?.find(
        (asset: any) => asset.assetId === id,
      )
    );
  }, [portfolio, minted, id]);

  const disabled = type !== 'private' && type !== 'privates' && !isMusicalType;

  const toBuySell = useCallback(
    tab => {
      navigation.navigate(Routes.BuySell, {tab, isMusicalType});
    },
    [navigation],
  );

  return (
    <View
      style={[
        styles.sheetFooter,
        {backgroundColor: colors.ground, shadowColor: colors.text},
      ]}>
      {/* commented this code so that we can use once we need  */}

      {/* <TouchableOpacity disabled style={styles.alert}>
        <Icon size={16} color={colors.text} name="bell-o" />
        <Text style={[styles.alertText,{color:colors.text}]}>Alert</Text>
      </TouchableOpacity> */}

      {isMyAsset ? (
        <TouchableOpacity
          disabled={disabled}
          style={styles.footerBtnDanger}
          onPress={() => toBuySell('Sell')}>
          <Text style={styles.btnText}>Sell</Text>
        </TouchableOpacity>
      ) : null}

      {!disabled && (
        <TouchableOpacity
          disabled={disabled || !isUserLogin}
          style={
            disabled || !isUserLogin
              ? styles.disabledPrimaryBtn
              : styles.footerBtnPrimary
          }
          onPress={() => toBuySell('Buy')}>
          <Text style={styles.btnText}>Buy</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};
