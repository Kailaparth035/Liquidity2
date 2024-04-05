import React, {useEffect, useState} from 'react';
import {View, TouchableOpacity, Text, Alert} from 'react-native';
import {useRecoilValue} from 'recoil';
import FingerprintScanner from 'react-native-fingerprint-scanner';
import {useTheme} from '@react-navigation/native';
import TouchID from 'react-native-touch-id';
import {COLORS} from '../../../assets';
import {Sell} from '../../../constants';
import {
  BuyLoadingState,
  InfoDataState,
  IsUserLoginState,
  SellLoadingState,
} from '../../../states';
import {Loader} from '../../../storybook/loader';
import {useCurrency} from '../../../hooks/use-currency';
import {useFortressAccountInfo} from '../../../../src/hooks/use-fortressAccountInfo';
import {capitalize} from '../../utils';
import {OrderFooterStyles as styles} from './orderFooter.styles';

let formattedNumber = 0;
export const OrderFooter = ({
  totalPrice,
  handleBuySell,
  tab,
  resetHandleForm,
}: any) => {
  useEffect(() => {
    if (totalPrice !== 0) {
      formattedNumber = totalPrice?.toLocaleString('en-US', {});
    }
  }, [totalPrice]);

  const info = useRecoilValue(InfoDataState);
  const buyLoading = useRecoilValue(BuyLoadingState);
  const sellLoading = useRecoilValue(SellLoadingState);
  const isUserLogin = useRecoilValue(IsUserLoginState);
  const {AccountInfo} = useFortressAccountInfo();
  const balance = parseFloat(AccountInfo?.balance ?? 0);

  const loading = buyLoading || sellLoading;
  const [biometryType, setBiometryType] = useState<any>(null);
  const [isEnableFaceId, setIsEnableFaceId] = useState(true);
  const {colors} = useTheme();

  const {formatCurrency, addSymbolCurrency, formatCurrencyNumber} =
    useCurrency();

  useEffect(() => {
    FingerprintScanner.isSensorAvailable()
      .then((type: any) => {
        setBiometryType({type});
        setIsEnableFaceId(true);
      })
      .catch(error => {
        setIsEnableFaceId(false);
      });
  }, []);

  const totalBalance = formatCurrencyNumber(balance, 2) ?? 0;

  const showAuthenticationDialog = () => {
    if (totalPrice > totalBalance && tab.toLowerCase() !== Sell) {
      Alert.alert(
        'Insufficient funds',
        'More funds are required to place this order.',
        [
          {
            text: 'Ok',
            onPress: () => resetHandleForm(),
            style: 'cancel',
          },
        ],
      );
      return;
    }
    if (isEnableFaceId) {
      if (biometryType !== null && biometryType !== undefined) {
        const optionalConfigObject = {
          title: 'Authentication required', // Android
          imageColor: '#e00606', // Android
          imageErrorColor: '#ff0000', // Android
          sensorDescription: 'Touch sensor', // Android
          sensorErrorDescription: 'Failed', // Android
          cancelText: 'Cancel', // Android
          fallbackLabel: 'Show Passcode', // iOS (if empty, then label is hidden)
          unifiedErrors: false, // use unified error messages (default false)
          passcodeFallback: false, // iOS - allows the device to fall back to using the passcode, if faceid/touch is not available. this does not mean that if touchid/faceid fails the first few times it will revert to passcode, rather that if the former are not enrolled, then it will use the passcode.
        };
        TouchID.authenticate(
          'Please scan biometrics to proceed',
          optionalConfigObject,
        )
          .then((success: any) => {
            handleBuySell();
          })
          .catch((error: any) => {
            console.log('error=', error);
          });
      } else {
        console.log('biometric authentication is not available');
      }
    } else {
      handleBuySell();
    }
  };

  const isDisabled = loading || !isUserLogin || totalPrice === 0;

  return (
    <View style={[styles.accessory, {backgroundColor: colors.ground}]}>
      <View style={[styles.contain, {backgroundColor: colors.ground}]}>
        <View style={[styles.left, {flex: 1}]}>
          <Text style={[styles.total, {color: colors.text}]}>Total</Text>
          <Text style={[styles.price, {color: colors.text}]}>
            {"$"+formattedNumber}
          </Text>
        </View>
        <View style={[styles.left, {flex: 1, justifyContent: 'flex-end'}]}>
          <Text style={[styles.total, {color: colors.text}]}>Balance</Text>
          <Text style={[styles.price, {color: colors.text}]}>
            {formatCurrency(balance, 2)}
          </Text>
        </View>
      </View>

      <TouchableOpacity
        style={
          isDisabled
            ? styles.disabledBtn
            : [
                styles.btn,
                tab.toLowerCase() === Sell && {backgroundColor: COLORS.red},
              ]
        }
        onPress={showAuthenticationDialog}
        disabled={isDisabled}>
        {loading ? (
          <Loader top={0} size={'small'} color={COLORS.white} />
        ) : (
          <Text style={styles.btnTxt}>{capitalize(tab)}</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};
