import React, {useCallback, useEffect, useState} from 'react';
import {View, Modal, Alert, Text, TouchableOpacity, Image} from 'react-native';
import {useRecoilState, useRecoilValue} from 'recoil';
import FingerprintScanner from 'react-native-fingerprint-scanner';
import {useAsyncStorage} from '@react-native-async-storage/async-storage';

import {
  ProfileDataState,
  SendDataState,
  useInfo,
  IsSendModalState,
  SendModalDetailsState,
  IsFirebaseOpenState,
} from '../../../states';
import {useInterval, usePlatform} from '../../../hooks';
import {Storages, API_HOST, APIS} from '../../../constants';
import {styles} from './send.styles';
import {COLORS} from '../../../assets';
import {formatNumber} from '../../utils';
import {ImageView} from '../../../storybook/image';

const SendModal = () => {
  const [biometryType, setBiometryType] = useState<any>(null);
  const [isOpen, setIsOpen] = useRecoilState(IsSendModalState);
  const [createData, setCreateData] = useRecoilState(SendModalDetailsState);
  const isFirebaseOpen = useRecoilValue(IsFirebaseOpenState);

  const {updateEvent} = useInfo('create', 'tokenSend');
  const {isIOS} = usePlatform();

  const profileData = useRecoilValue(ProfileDataState);
  const [approveData, setApproveData] = useRecoilState(SendDataState);

  const {setItem, getItem} = useAsyncStorage(Storages.TokenSend);

  const updateApproved = useCallback(async () => {
    const approved = await getItem();
    setApproveData((preState: any) => ({
      ...preState,
      ...(JSON.parse(approved as string) ?? {}),
    }));
  }, []);

  useEffect(() => {
    updateApproved();
  }, []);

  const apiCall = () => {
    try {
      if (profileData?.id) {
        const data = {
          eventName: 'create',
          channelName: 'tokenSend',
          data: {userId: profileData.id},
        };

        fetch(`${API_HOST}${APIS.Status}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        })
          .then(res => res.json())
          .then(async res => {
            const modalData = approveData[res.data.name];
            const approved = await getItem();
            const tokenData = JSON.parse(approved as string)?.[
              res?.data?.token?.name
            ];
            const obj = {
              ...approveData,
              [res?.data?.token?.name]: res?.data?.nonce,
            };
            if (
              Object.keys(res.data).length &&
              modalData !== res.data.nonce &&
              tokenData !== res.data.nonce
            ) {
              setApproveData(obj);
              setItem(JSON.stringify(obj));
              setCreateData(res.data);
              setIsOpen(true);
            }
          });
      }
    } catch (error) {}
  };

  useInterval(() => {
    if (!isOpen && !isFirebaseOpen) {
      apiCall();
    }
  }, 5000);

  useEffect(() => {
    FingerprintScanner.isSensorAvailable()
      .then((type: any) => {
        setBiometryType({type});
      })
      .catch(error => {
        updateEvent({
          auth: true,
          nonce: createData.nonce,
          blockchain: createData.blockchain,
        });
        setIsOpen(false);
      });
  }, []);

  const showAuthenticationDialog = () => {
    if (isIOS) {
      if (biometryType !== null && biometryType !== undefined) {
        FingerprintScanner.authenticate({
          description: 'Scan your Face on the device to continue',
          fallbackEnabled: false,
        })
          .then((auth: any) => {
            updateEvent({
              auth,
              nonce: createData.nonce,
              blockchain: createData.blockchain,
            });
            setIsOpen(false);
          })
          .catch(error => {
            console.log('Authentication error is => ', error);
          });
      } else {
        console.log('biometric authentication is not available 2');
      }
    } else {
      updateEvent({
        auth: true,
        nonce: createData.nonce,
        blockchain: createData.blockchain,
      });
      setIsOpen(false);
    }
  };

  const onReject = useCallback(() => {
    updateEvent({
      auth: false,
      nonce: createData.nonce,
      blockchain: createData.blockchain,
    });
    setIsOpen(false);
    setItem(JSON.stringify(approveData));
  }, [updateEvent]);

  return (
    <Modal
      style={styles.modalSize}
      animationType="slide"
      transparent={true}
      visible={isOpen}
      onRequestClose={() => {
        Alert.alert('Modal has been closed.');
        setIsOpen((preState: any) => !preState);
      }}>
      <View style={styles.modalView}>
        <View style={styles.head}>
          <Text style={styles.createHead}>Receive Shares</Text>
        </View>
        <View style={styles.container}>
          <View style={{flexDirection: 'row'}}>
            <ImageView
              source={{uri: createData?.image}}
              url={createData?.image}
              style={{
                height: 40,
                width: 40,
                backgroundColor: COLORS['bg-80-dark'],
                borderRadius: 4,
                marginRight: 8,
              }}
              alt={createData?.name?.[0] ?? ''}
            />
            <View style={styles.formContain}>
              <Text style={styles.label}>Name</Text>
              <Text style={styles.name}>{createData?.name}</Text>
            </View>
          </View>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: '70%',
              marginTop: 16,
            }}>
            <View style={styles.formContain}>
              <Text style={styles.label}>Symbol</Text>
              <Text style={styles.name}>{createData?.symbol}</Text>
            </View>
            <View style={styles.formContain}>
              <Text style={styles.label}>Quantity</Text>
              <Text style={styles.name}>
                {formatNumber(createData?.amount)}
              </Text>
            </View>
          </View>

          <View style={[styles.formContain, {marginTop: 16, width: '85%'}]}>
            <Text style={styles.label}>Address</Text>
            <Text style={styles.name}>{createData?.destAccountPubKey}</Text>
          </View>
        </View>

        <View style={styles.btnArea}>
          <TouchableOpacity
            style={[styles.btn, styles.reject]}
            onPress={onReject}>
            <Text style={styles.btnTxt}>Decline</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.connectBtn}
            onPress={showAuthenticationDialog}>
            <Text style={styles.btnTxt}>Accept</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default SendModal;
