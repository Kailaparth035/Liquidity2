import React, {useMemo, useState, useCallback} from 'react';
import {View, Text,} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import {useRecoilValue} from 'recoil';
import {useTheme} from '@react-navigation/native';

import {transactionStyles as styles} from './transaction-details.styles';

import {ProfileDataState, SelectedTransactionMemoState} from '../../../states';
import {COLORS} from '../../../assets';
import {Loader} from '../../../storybook/loader';
import {Header} from '../../../components';
import {XORCipher} from '../../../libs';
import {API_HOST} from '../../../constants';

const TransactionDetails = ({navigation}: any) => {
  const [parsedMemo, setParsedMemo] = useState({});
  const [loading, setLoading] = useState(false);

  const selectedMemo = useRecoilValue(SelectedTransactionMemoState);
  const profileData = useRecoilValue(ProfileDataState);
  const {colors} = useTheme();

  const setKycData = useCallback((memo: string) => {
    try {
      if (profileData?.id) {
        const memoDetail = XORCipher.decode(profileData.id, memo);
        if (memoDetail && typeof memoDetail === 'string') {
          const kycDetail = JSON.parse(memoDetail);
          if (kycDetail && typeof kycDetail === 'object') {
            setParsedMemo(kycDetail);
          }
        }
      }
      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  }, []);

  useMemo(() => {
    setLoading(true);
    if (selectedMemo?.length > 50) {
      setKycData(selectedMemo);
    } else {
      fetch(`${API_HOST}${selectedMemo}`)
        .then(res => res.json())
        .then(data => {
          setKycData(data?.memo);
        })
        .catch(err => {
          setLoading(false);
        });
    }
  }, [selectedMemo]);

  const goBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const {sender, recipient} = parsedMemo as any;

  return (
    <View style={[styles.container, {backgroundColor: colors.background}]}>
      <Header goBack={goBack} title="Memo Detail" />
      {loading ? (
        <Loader />
      ) : (
        <>
          <View style={[styles.sender, {backgroundColor: colors.card}]}>
            <View style={styles.senderHeading}>
              <View style={styles.icons}>
                <Icon name="upload" size={24} color={COLORS['primary-dark']} />
              </View>
              <Text style={[styles.recipient, {color: colors.text}]}>
                Sender
              </Text>
            </View>
            <View style={styles.detailsContainer}>
              <View style={styles.details}>
                <Text style={[styles.title, {color: colors.text}]}>
                  Time & Date
                </Text>
                <Text style={[styles.detail, {color: colors.text}]}>
                  {sender?.kyc_timestamp ?? 'N.A.'}
                </Text>
              </View>
              <View style={styles.details}>
                <Text style={[styles.title, {color: colors.text}]}>
                  KYC Platform
                </Text>
                <Text style={[styles.detail, {color: colors.text}]}>
                  {sender?.kyc_platform ?? 'N.A.'}
                </Text>
              </View>
              <View style={styles.details}>
                <Text style={[styles.title, {color: colors.text}]}>AML Id</Text>
                <Text style={[styles.detail, {color: colors.text}]}>
                  {sender?.kyc_pull_id ?? 'N.A.'}
                </Text>
              </View>
              <View style={styles.details}>
                <Text style={[styles.title, {color: colors.text}]}>
                  Exchange
                </Text>
                <Text
                  style={[
                    styles.detail,
                    {color: colors.text, paddingBottom: 8},
                  ]}>
                  Satschel
                </Text>
              </View>
            </View>
          </View>
          <View style={[styles.sender, {backgroundColor: colors.card}]}>
            <View style={styles.senderHeading}>
              <View style={styles.iconsRecipient}>
                <Icon
                  name="download"
                  size={24}
                  color={COLORS['green_download']}
                />
              </View>
              <Text style={[styles.recipient, {color: colors.text}]}>
                Recipient
              </Text>
            </View>
            <View style={styles.detailsContainer}>
              <View style={styles.details}>
                <Text style={[styles.title, {color: colors.text}]}>
                  Time & Date
                </Text>
                <Text style={[styles.detail, {color: colors.text}]}>
                  {recipient?.kyc_timestamp ?? 'N.A.'}
                </Text>
              </View>
              <View style={styles.details}>
                <Text style={[styles.title, {color: colors.text}]}>
                  KYC Platform
                </Text>
                <Text style={[styles.detail, {color: colors.text}]}>
                  {recipient?.kyc_platform ?? 'N.A.'}
                </Text>
              </View>
              <View style={styles.details}>
                <Text style={[styles.title, {color: colors.text}]}>AML Id</Text>
                <Text style={[styles.detail, {color: colors.text}]}>
                  {recipient?.kyc_pull_id ?? 'N.A.'}
                </Text>
              </View>
              <View style={styles.details}>
                <Text style={[styles.title, {color: colors.text}]}>
                  Exchange
                </Text>
                <Text
                  style={[
                    styles.detail,
                    {color: colors.text, paddingBottom: 8},
                  ]}>
                  Satschel
                </Text>
              </View>
            </View>
          </View>
        </>
      )}
    </View>
  );
};

export default TransactionDetails;
