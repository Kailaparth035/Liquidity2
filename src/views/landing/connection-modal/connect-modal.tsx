import React, {useEffect, useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {useTheme} from '@react-navigation/native';
import FingerprintScanner from 'react-native-fingerprint-scanner';

import {useInfo} from '../../../states';
import {usePlatform} from '../../../hooks/use-platform';
import {ConnectModalStyles as styles} from './connectModal.styles';
import {Loader} from '../../../storybook/loader';
import {toast} from '../../../libs';

const ConnectModal = () => {
  const [biometryType, setBiometryType] = useState<any>(null);
  const [isLoader, setIsLoader] = useState(false);

  const {updateEvent} = useInfo();
  const {isIOS} = usePlatform();
  const {colors} = useTheme();
  useEffect(() => {
    FingerprintScanner.isSensorAvailable()
      .then((type: any) => {
        setBiometryType({type});
      })
      .catch(error => console.log('isSensorAvailable error => ', error));
  }, []);

  const showAuthenticationDialog = () => {
    setIsLoader(true);
    if (isIOS) {
      if (biometryType !== null && biometryType !== undefined) {
        FingerprintScanner.authenticate({
          description: 'Scan your Face on the device to continue',
          fallbackEnabled: false,
        })
          .then((auth: any) => {
            updateEvent({auth});
            setIsLoader(false);
          })
          .catch(error => {
            setIsLoader(false);
            toast(error);
            console.log('Authentication error is => ', error);
          });
      } else {
        console.log('biometric authentication is not available 2');
      }
    } else {
      updateEvent({auth: true});
      setIsLoader(false);
    }
  };

  return (
    <View>
      <View
        style={[
          styles.head,
          {backgroundColor: colors.ground, borderBottomColor: colors.box},
        ]}>
        <Text style={[styles.createHead, {color: colors.text}]}>
          User Connect
        </Text>
      </View>
      <Text style={[styles.title, {color: colors.text}]}>
        Press the connect button to link
      </Text>
      <View style={[styles.btnArea, {borderTopColor: colors.box}]}>
        <TouchableOpacity
          style={[styles.btn, styles.reject, {backgroundColor: colors.box}]}
          onPress={() => {
            updateEvent({auth: false});
          }}>
          <Text style={[styles.btnTxt, {color: colors.text}]}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.connectBtn}
          onPress={showAuthenticationDialog}
          disabled={isLoader}>
          {isLoader ? (
            <Loader top={0} size="small" />
          ) : (
            <Text style={[styles.btnTxt]}>Connect</Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ConnectModal;
