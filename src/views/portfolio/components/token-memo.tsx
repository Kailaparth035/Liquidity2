import React, {useMemo} from 'react';
import {View, Text} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {useRecoilValue} from 'recoil';

import {SelectedTransactionMemoState} from '../../../states';
import {tokenDetailsStyles as styles} from './token-details/token-details.styles';
import {useFetchKycData} from '../hooks/fetch-kyc-data';
import {Loader} from '../../../storybook/loader';
import {NOT_AVAILABLE} from '../../../constants';

const TokenMemo = () => {
  const selectedMemo = useRecoilValue(SelectedTransactionMemoState);
  const {colors} = useTheme();

  const {fetchKyc, setKycData, parsedMemo, loading, setLoading} =
    useFetchKycData();

  useMemo(() => {
    setLoading(true);
    if (selectedMemo?.length > 50) {
      setKycData(selectedMemo);
    } else {
      fetchKyc();
    }
  }, [selectedMemo]);

  const {sender, recipient} = parsedMemo as any;

  return loading ? (
    <Loader />
  ) : (
    <>
      <View>
        <Text style={[styles.heading, {color: colors.text}]}>Memo</Text>
      </View>
      <View style={[styles.subHeading, {backgroundColor: colors.background}]}>
        <Text style={[styles.headingText, {color: colors.text}]}>
          Recipient
        </Text>
      </View>
      <View style={styles.contentContainer}>
        <View style={styles.content}>
          <Text style={[styles.memoKey, {color: colors.text}]}>
            Time & Date
          </Text>
          <Text style={[styles.value, {color: colors.text}]}>
            {sender?.kyc_timestamp ?? NOT_AVAILABLE}
          </Text>
        </View>
        <View style={styles.content}>
          <Text style={[styles.memoKey, {color: colors.text}]}>
            KYC Platform
          </Text>
          <Text style={[styles.value, {color: colors.text}]}>
            {sender?.kyc_platform ?? NOT_AVAILABLE}
          </Text>
        </View>
        <View style={styles.content}>
          <Text style={[styles.memoKey, {color: colors.text}]}>AML Id</Text>
          <Text style={[styles.value, {color: colors.text}]}>
            {sender?.kyc_pull_id ?? NOT_AVAILABLE}
          </Text>
        </View>
        <View style={styles.content}>
          <Text style={[styles.memoKey, {color: colors.text}]}>Exchange</Text>
          <Text style={[styles.value, {color: colors.text}]}>Satschel</Text>
        </View>
      </View>

      <View style={styles.subHeading}>
        <Text style={[styles.headingText, {color: colors.text}]}>Sender</Text>
      </View>
      <View style={styles.contentContainer}>
        <View style={styles.content}>
          <Text style={[styles.memoKey, {color: colors.text}]}>
            Time & Date
          </Text>
          <Text style={[styles.value, {color: colors.text}]}>
            {recipient?.kyc_timestamp ?? NOT_AVAILABLE}
          </Text>
        </View>
        <View style={styles.content}>
          <Text style={[styles.memoKey, {color: colors.text}]}>
            KYC Platform
          </Text>
          <Text style={[styles.value, {color: colors.text}]}>
            {recipient?.kyc_platform ?? NOT_AVAILABLE}
          </Text>
        </View>
        <View style={styles.content}>
          <Text style={[styles.memoKey, {color: colors.text}]}>AML Id</Text>
          <Text style={[styles.value, {color: colors.text}]}>
            {recipient?.kyc_pull_id ?? NOT_AVAILABLE}
          </Text>
        </View>
        <View style={styles.content}>
          <Text style={[styles.memoKey, {color: colors.text}]}>Exchange</Text>
          <Text style={[styles.value, {color: colors.text}]}>Satschel</Text>
        </View>
      </View>
    </>
  );
};

export default TokenMemo;
