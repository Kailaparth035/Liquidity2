import type {IRequest} from './type';

import React, {useCallback, useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import {useTheme} from '@react-navigation/native';
import FingerprintScanner from 'react-native-fingerprint-scanner';

import {toast} from '../../../libs';
import {usePlatform} from '../../../hooks';
import {UseRequestApis} from '../hooks/use-request-api';
import {RequestStyles as styles} from '../request.styles';
import {
  PENDING,
  APPROVED,
  ALREADY_REJECTED,
  ALREADY_APPROVED,
  NO_REQUESTS,
} from '../constants';
import {Loader} from '../../../storybook/loader';

const RequestList = () => {
  const [requests, setRequests] = useState<any>([]);
  const [biometryType, setBiometryType] = useState<any>(null);

  const {isIOS} = usePlatform();
  const {requestsList, reject, approve, requestLoading, getRequestList} =
    UseRequestApis();
  const {colors} = useTheme();

  useEffect(() => {
    getRequestList();
  }, []);

  useEffect(() => {
    let sort_requestList = requestsList.sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
    );
    setRequests([...sort_requestList]);
  }, [requestsList]);

  useEffect(() => {
    FingerprintScanner.isSensorAvailable()
      .then((type: any) => {
        setBiometryType({type});
      })
      .catch(error => console.log('isSensorAvailable error => ', error));
  }, []);

  const handleApprove = useCallback((data: IRequest, index: number) => {
    if (isIOS) {
      if (biometryType !== null && biometryType !== undefined) {
        FingerprintScanner.authenticate({
          description: 'Scan Face on the device to continue',
          fallbackEnabled: false,
        })
          .then((auth: any) => {
            approve(data, index);
          })
          .catch(error => {
            toast(`Authentication error is =>${error}`);
          });
      } else {
        console.log('biometric authentication is not available');
      }
    } else {
      approve(data, index);
    }
  }, []);

  const handleReject = useCallback((data, index) => {
    reject(data, index);
  }, []);

  return requestLoading ? (
    <Loader />
  ) : requests.length ? (
    requests.map((request: IRequest, index: number) => {
      const {status, token} = request;
      const {blockchain, metaData} = token ?? {};
      const {name, symbol, image: uri} = metaData ?? {};
      const firstLet = (symbol || 'S').charAt(0);
      return (
        <View key={`${name}_${symbol}_${index}`}>
          <View style={[styles.container, {borderBottomColor: colors.text}]}>
            <View style={styles.request}>
              <View style={styles.image}>
                {uri ? (
                  <Image
                    source={{uri}}
                    height={80}
                    width={80}
                    style={styles.image}
                  />
                ) : (
                  <Text style={styles.imageTxt}>{firstLet}</Text>
                )}
              </View>
              <View style={styles.header}>
                <View style={styles.desc}>
                  <View>
                    <Text style={[styles.title, {color: colors.text}]}>
                      {symbol || 'Symbol'}
                    </Text>
                  </View>
                  <View>
                    <Text
                      numberOfLines={1}
                      style={[styles.description, {color: colors.text}]}>{`(${
                      name || 'Name'
                    })`}</Text>
                  </View>
                </View>
                <View>
                  <View style={styles.data}>
                    <Text style={[styles.blockchain, {color: colors.text}]}>
                      Blockchain
                    </Text>
                    <Text style={styles.value}>
                      {blockchain || 'blockchain'}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
            <View style={styles.buttons}>
              {status === PENDING ? (
                <>
                  <TouchableOpacity
                    onPress={() => handleReject(request, index)}>
                    <Text style={styles.denyBtn}>Deny</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => handleApprove(request, index)}>
                    <Text style={styles.approveBtn}>Approve</Text>
                  </TouchableOpacity>
                </>
              ) : status === APPROVED ? (
                <Text style={styles.requestDoneTxt}>{ALREADY_APPROVED}</Text>
              ) : (
                <Text style={styles.requestDoneTxt}>{ALREADY_REJECTED}</Text>
              )}
            </View>
          </View>
        </View>
      );
    })
  ) : (
    <Text style={styles.noPending}>{NO_REQUESTS}</Text>
  );
};

export default RequestList;
