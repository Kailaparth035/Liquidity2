import React, {useCallback, useEffect} from 'react';
import {View, Text, Image, ScrollView, TouchableOpacity} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {useRecoilValue, useSetRecoilState} from 'recoil';
import IonIcon from 'react-native-vector-icons/Ionicons';

import {tokenDetailsStyles as styles} from './token-details.styles';
import {
  SelectedTokenState,
  SelectedTransactionMemoState,
} from '../../../../states';
import TokenMemo from '../token-memo';
import {Creators} from '../creators';
import {Files} from '../files';
import {WhiteList} from '../white-lists';
import {Signatures} from '../signatures';
import {COLORS} from '../../../../assets';
import {NOT_AVAILABLE} from '../../../../constants';
import {useCurrency} from '../../../../hooks/use-currency';

const TokenDetails = ({navigation}: any) => {
  const token = useRecoilValue(SelectedTokenState);
  const setSelectedMemo = useSetRecoilState(SelectedTransactionMemoState);
  const {colors} = useTheme();

  const {name, symbol, price, maxSupply, logo: uri, metadata} = token ?? {};
  const {properties, memo} = metadata ?? {};
  const {
    creators = [],
    files = [],
    whitelisted: whitelists = [],
    signers: signatures = [],
  } = properties ?? {};

  useEffect(() => {
    setSelectedMemo(memo);
  }, [memo]);

  const goBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const {formatCurrency} = useCurrency();
  const totalAmount = parseFloat(maxSupply) * parseFloat(price);
  const totalPrice = formatCurrency(totalAmount ?? 0, 2);
  const unitPrice = formatCurrency(price ?? 0, 2);

  return (
    <View style={[styles.mainContainer, {backgroundColor: colors.background}]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.headerView}>
          <TouchableOpacity onPress={goBack}>
            <IonIcon name="arrow-back-sharp" size={24} color={colors.text} />
          </TouchableOpacity>
          <View style={styles.headerTitle}>
            <Text style={[styles.formTitle, {color: colors.text}]}>
              IPO Details
            </Text>
          </View>
        </View>
        <View style={styles.container}>
          <View style={styles.token}>
            <View style={styles.image}>
              <Image
                source={{uri}}
                height={100}
                width={100}
                style={styles.image}
              />
            </View>
            <View style={styles.header}>
              <View style={styles.desc}>
                <View>
                  <Text style={[styles.title, {color: colors.text}]}>
                    {symbol ?? NOT_AVAILABLE}
                  </Text>
                </View>
                <View>
                  <Text
                    style={[
                      styles.description,
                      {color: colors.text, width: 100},
                    ]}
                    numberOfLines={1}
                    ellipsizeMode={'tail'}>
                    ({name ?? NOT_AVAILABLE})
                  </Text>
                </View>
              </View>
              <View>
                <View style={styles.data}>
                  <Text style={[styles.headingText, {color: colors.text}]}>
                    Quantity
                  </Text>
                  <Text style={[styles.value, {color: colors.text}]}>
                    {maxSupply ?? NOT_AVAILABLE}
                  </Text>
                </View>
                <View style={styles.data}>
                  <Text style={[styles.headingText, {color: colors.text}]}>
                    Unit price
                  </Text>
                  <Text style={[styles.value, {color: colors.text}]}>{`${
                    unitPrice ?? NOT_AVAILABLE
                  }`}</Text>
                </View>
                <View style={styles.data}>
                  <Text style={[styles.headingText, {color: colors.text}]}>
                    Total amount
                  </Text>
                  <Text style={[styles.value, {color: colors.text}]}>{`${
                    totalPrice ?? NOT_AVAILABLE
                  }`}</Text>
                </View>
              </View>
            </View>
          </View>
          <View style={styles.sections}>
            <View>
              <Text style={[styles.heading, {color: colors.text}]}>
                Creators
              </Text>
            </View>
            <View
              style={[styles.subHeading, {backgroundColor: colors.background}]}>
              <Text style={[styles.headingText, {color: colors.text}]}>
                Address
              </Text>
              <Text style={[styles.headingText, {color: colors.text}]}>
                Share
              </Text>
            </View>
            <View style={styles.contentContainer}>
              <Creators creators={creators} />
            </View>
          </View>
          <View style={styles.sections}>
            <View>
              <Text style={[styles.heading, {color: colors.text}]}>Files</Text>
            </View>
            <View
              style={[styles.subHeading, {backgroundColor: colors.background}]}>
              <Text style={[styles.headingText, {color: colors.text}]}>
                File Name
              </Text>
              <Text style={[styles.headingText, {color: colors.text}]}>
                Actions
              </Text>
            </View>
            <View style={styles.contentContainer}>
              <Files files={files} />
            </View>
          </View>
          <View style={styles.sections}>
            <TokenMemo />
          </View>
          <View style={styles.sections}>
            <View>
              <Text style={[styles.heading, {color: colors.text}]}>
                WhiteList Addresses
              </Text>
            </View>
            <View
              style={[styles.subHeading, {backgroundColor: colors.background}]}>
              <Text style={[styles.headingText, {color: colors.text}]}>
                Address
              </Text>
            </View>
            <View style={styles.contentContainer}>
              <WhiteList whitelists={whitelists} />
            </View>
          </View>
          <View style={styles.sections}>
            <View>
              <Text style={[styles.heading, {color: colors.text}]}>
                Signature Addresses
              </Text>
            </View>
            <View style={styles.subHeading}>
              <Text style={[styles.headingText, {color: colors.text}]}>
                Address
              </Text>
            </View>
            <View style={styles.contentContainer}>
              <Signatures signatures={signatures} />
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default TokenDetails;
