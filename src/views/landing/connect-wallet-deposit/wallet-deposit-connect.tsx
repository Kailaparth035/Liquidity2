import React, {useCallback, useEffect, useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {useSetRecoilState} from 'recoil';
import FingerprintScanner from 'react-native-fingerprint-scanner';
import TouchID from 'react-native-touch-id';
import {useTheme} from '@react-navigation/native';

import {IsFundWalletOpenState} from '../../../states';
import {Loader} from '../../../storybook/loader';
import {useNetwork} from '../../../hooks';
import {APIS} from '../../../constants';
import {ConnectModalStyles as styles} from './connectModal.styles';

const WalletDeposit = ({data}: any) => {
  const [biometryType, setBiometryType] = useState<any>(null);
  const setIsWalletVisible = useSetRecoilState(
    IsFundWalletOpenState,
  );

  const {colors} = useTheme();
  const {patch, data: statusData} = useNetwork();
  const [approveLoading, setApproveLoading] = useState(false);
  const [rejectLoading, setRejectLoading] = useState(false);
  const [isEnableFaceId, setIsEnableFaceId] = useState(true);

  const handleStatus = useCallback(
    (value: string) => {
      if(value === 'accepted') setApproveLoading(true);
      else {
        setRejectLoading(true);
      }
      const payload = {
        status: value,
        // testing: true
      };
      if (data?.data?._id) {
        patch(APIS.walletDeposite + data.data._id, payload);
      }
    },
    [data?.data],
  );

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

  const showAuthenticationDialog = (val:string) => {
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
            handleStatus(val);
          })
          .catch((error: any) => {
            console.log('error=', error);
          });
      } else {
        console.log('biometric authentication is not available');
      }
    } else {
      handleStatus(val);
    }
  };

  useEffect(() => {
    if (statusData) {
      setIsWalletVisible(false);
      setApproveLoading(false);
      setRejectLoading(false);
    }
  }, [statusData]);

  return (
    <View>
      <View
        style={[
          styles.head,
          {backgroundColor: colors.ground, borderBottomColor: colors.box},
        ]}>
        <Text style={[styles.createHead, {color: colors.text}]}>
          Fund Wallet
        </Text>
      </View>
      <View style={{alignItems: 'center', padding: 20}}>
        <Text style={[styles.title, {color: colors.text}]}>Amount</Text>
        <Text style={[styles.walletAmount, {color: colors.text}]}>{data?.data?.amount ? `$${data.data.amount}` : '--'}</Text>
      </View>
      <View style={[styles.btnArea, {borderTopColor: colors.box}]}>
        <TouchableOpacity
          style={[styles.btn, styles.reject, {backgroundColor: colors.box}]}
          disabled={rejectLoading}
          onPress={() => showAuthenticationDialog('rejected')}>
          {rejectLoading ? (
            <Loader top={0} size="small" />
          ) : (
            <Text style={[styles.btnTxt, {color: colors.text}]}>Decline</Text>
          )}
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.connectBtn}
          onPress={() => showAuthenticationDialog('accepted')}
          disabled={approveLoading}>
          {approveLoading ? (
            <Loader top={0} size="small" />
          ) : (
            <Text style={[styles.btnTxt]}>Approve</Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default WalletDeposit;
