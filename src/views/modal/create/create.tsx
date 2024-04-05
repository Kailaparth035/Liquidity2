import React, {useCallback, useEffect, useState} from 'react';
import {
  View,
  Modal,
  Alert,
  Text,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {useRecoilState, useRecoilValue} from 'recoil';
import {useAsyncStorage} from '@react-native-async-storage/async-storage';
import FingerprintScanner from 'react-native-fingerprint-scanner';

import {
  ApproveDataState,
  CreateModalDetailsState,
  IsApproveModalState,
  IsFirebaseOpenState,
  ProfileDataState,
  useInfo,
} from '../../../states';
import {usePlatform, useInterval} from '../../../hooks';
import {Storages, API_HOST, APIS} from '../../../constants';
import {styles} from './create.styles';
import {Loader} from '../../../storybook/loader';
import {formatNumber} from '../../utils';
import {COLORS} from '../../../assets';

const CreateModal = () => {
  const [biometryType, setBiometryType] = useState<any>(null);
  const [isOpen, setIsOpen] = useRecoilState(IsApproveModalState);
  const [createData, setCreateData] = useRecoilState(CreateModalDetailsState);
  const profileData = useRecoilValue(ProfileDataState);
  const [approveData, setApproveData] = useRecoilState(ApproveDataState);
  const isFirebaseOpen = useRecoilValue(IsFirebaseOpenState);

  const [isLoading, setIsLoading] = useState(false);
  const {colors} = useTheme();

  const {updateEvent} = useInfo('create');
  const {isIOS} = usePlatform();

  const {setItem, getItem} = useAsyncStorage(Storages.ApprovedData);

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
          channelName: 'tokens',
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
            const tokenData = JSON.parse(approved as string)?.[res.data.name];

            if (
              Object.keys(res.data).length &&
              modalData !== res.data.nonce &&
              tokenData !== res.data.nonce
            ) {
              setApproveData((preState: any) => ({
                ...preState,
                [res.data.name]: res.data.nonce,
              }));
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
    setIsLoading(true);
    if (isIOS) {
      if (biometryType !== null && biometryType !== undefined) {
        FingerprintScanner.authenticate({
          description: 'Scan your Face on the device to continue',
          fallbackEnabled: false,
        })
          .then((auth: any) => {
            setItem(JSON.stringify(approveData));
            updateEvent({
              auth,
              nonce: createData.nonce,
              blockchain: createData.blockchain,
            });
          })
          .catch(error => {
            console.log('Authentication error is => ', error);
          });
      } else {
        console.log('biometric authentication is not available');
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
    updateEvent({auth: false, nonce: createData.nonce});
    setItem(JSON.stringify(approveData));
  }, [updateEvent]);

  useEffect(() => {
    setIsLoading(false);
  }, [isOpen]);

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
      <Pressable
        onPress={event => {
          setIsOpen(false);
        }}
        style={{backgroundColor: 'rgba(0,0,0,0.8)', flex: 1}}>
        <Pressable
          onPress={() => {}}
          style={[styles.modalView, {backgroundColor: colors.ground}]}>
          <View
            style={[
              styles.head,
              {
                backgroundColor: colors.ground,
                borderBottomColor: colors.border,
              },
            ]}>
            <Text style={[styles.createHead, {color: colors.text}]}>
              IPO Shares
            </Text>
          </View>
          <View style={styles.container}>
            <View style={styles.formContain}>
              <Text style={[styles.label, {color: colors.text}]}>Name</Text>
              <Text style={[styles.name, {color: colors.text}]}>
                {createData.name ?? 'NA'}
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 16,
                width: '70%',
              }}>
              <View style={styles.formContain}>
                <Text style={[styles.label, {color: colors.text}]}>Symbol</Text>
                <Text style={[styles.name, {color: colors.text}]}>
                  {createData.symbol ?? 'NA'}
                </Text>
              </View>
              <View style={styles.formContain}>
                <Text style={[styles.label, {color: colors.text}]}>Supply</Text>
                <Text style={[styles.name, {color: colors.text}]}>
                  {formatNumber(createData.max_supply)}
                </Text>
              </View>
            </View>
          </View>

          <View style={[styles.btnArea, {borderTopColor: colors.border}]}>
            <TouchableOpacity
              style={[
                styles.btn,
                styles.reject,
                {backgroundColor: COLORS.sell},
              ]}
              onPress={onReject}>
              <Text style={styles.btnTxt}>Reject</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.connectBtn, {backgroundColor: COLORS.buy}]}
              onPress={showAuthenticationDialog}
              disabled={isLoading}>
              {isLoading ? (
                <Loader size={'small'} top={0} />
              ) : (
                <Text style={styles.btnTxt}>Approve</Text>
              )}
            </TouchableOpacity>
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
};

export default CreateModal;
