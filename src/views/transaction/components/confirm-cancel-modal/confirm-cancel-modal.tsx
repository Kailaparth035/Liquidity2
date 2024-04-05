import React, {useCallback, useEffect, useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {useRecoilState, useRecoilValue} from 'recoil';

import {confirmCancelModalStyles as styles} from './confirm-cancel.styles';
import {Loader} from '../../../../storybook/loader';
import {Modal} from '../../../../storybook/modal';
import {
  IsCancelConfirmationState,
  SelectedOrderState,
} from '../../../../states/open-orders/states';
import {useNetwork} from '../../../../hooks';
import {APIS, CONFIRM_CANCEL_ORDER} from '../../../../constants';
import {KeyChainDataState} from '../../../../states';
import {toast} from '../../../../libs';
import FingerprintScanner from 'react-native-fingerprint-scanner';
import TouchID from 'react-native-touch-id';

const ConfirmCancelModal = ({orders, setOrders, getOpenOrder, isForm}: any) => {
  const keyChainData = useRecoilValue(KeyChainDataState);
  const [isOpen, setIsOpen] = useRecoilState(IsCancelConfirmationState);
  const selectedOrder = useRecoilValue(SelectedOrderState);
  const [biometryType, setBiometryType] = useState<any>(null);
  const [isEnableFaceId, setIsEnableFaceId] = useState(true);
  const [isLoader, setIsLoader] = useState(false);
  const {colors} = useTheme();

  const {remove} = useNetwork();
  const SECRET_KEY = keyChainData?.stellar?.password;

  const handleCancel = useCallback(() => {
    setIsOpen(false);
    setIsLoader(false);
  }, []);

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

  const removeOrder = async () => {
    setIsLoader(true);
    const payload = {
      orderId: selectedOrder.id,
      payer: SECRET_KEY,
      type: selectedOrder.type,
    };
    const resp = await remove(APIS.CancelOrders + selectedOrder.id);
    if (resp) {
      if (isForm === 'assetDetails') {
        let allOrders = [...orders];
        const restOrders = allOrders?.filter(
          (item: any) => item.id !== selectedOrder.id,
        );
        allOrders = restOrders;
        setOrders(allOrders ?? []);
        getOpenOrder(true);
      } else {
        let allOrders = {...orders};
        const restOrders = allOrders.openOrder?.filter(
          (item: any) => item.id !== selectedOrder.id,
        );
        allOrders.openOrder = restOrders;
        setOrders(allOrders);
        getOpenOrder(true);
      }
    } else {
      toast(`Oops! Something went wrong`);
    }
    setIsOpen(false);
    setIsLoader(false);
  };

  const handleConfirm = useCallback(async () => {
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
          .then(async (success: any) => {
            removeOrder();
          })
          .catch((error: any) => {
            console.log('error=', error);
          });
      } else {
        console.log('biometric authentication is not available');
      }
    } else {
      removeOrder();
    }
  }, [selectedOrder, setIsOpen, orders]);

  return (
    <Modal
      isModal={isOpen}
      setIsModal={setIsOpen}
      animationOutTiming={150}
      animationInTiming={150}>
      <View style={styles.container}>
        <View style={[styles.body, {backgroundColor: colors.ground}]}>
          <Text style={[styles.deleteLabel, {color: colors.text}]}>
            Cancel Order
          </Text>
          <Text style={[styles.deleteDesc, {color: colors.text}]}>
            {CONFIRM_CANCEL_ORDER}
          </Text>
          <View style={[styles.footer, {borderColor: colors.box}]}>
            <TouchableOpacity style={styles.cancelBtn} onPress={handleCancel}>
              <Text style={styles.cancelTxt}>No</Text>
            </TouchableOpacity>
            <View style={[styles.footerLine, {borderColor: colors.box}]} />
            <TouchableOpacity style={styles.deleteBtn} onPress={handleConfirm}>
              <Text style={styles.deleteTxt}>
                {!isLoader ? 'Yes' : <Loader size={20} />}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ConfirmCancelModal;
