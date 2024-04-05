import React, {useCallback, useEffect, useState, useMemo} from 'react';
import {View, Text, ScrollView, TouchableOpacity} from 'react-native';
import {useRecoilState, useRecoilValue, useSetRecoilState} from 'recoil';
import moment from 'moment';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {useTheme} from '@react-navigation/native';

import {transactionStyles as styles} from './transaction.styles';

import {useInterval} from '../../hooks/use-interval';
import {useNetwork} from '../../hooks/use-network';
import {useCurrency} from '../../hooks/use-currency';

import {
  KeyChainDataState,
  TransactionsState,
  SelectedTransactionMemoState,
  AccessTokenState,
  isDarkModeState,
} from '../../states';

import {Loader} from '../../storybook/loader';
import {TabNavigation} from '../../storybook/tabNavigation';
import {OrderedAssets} from './components';
import {Header} from '../../components';
import {NoData} from '../../components/empty-state';
import LoginButton from '../login/components/login-button';
import {APIS} from '../../constants';
import {useTrackEvents} from '../../helpers';
import {capitalize} from '../utils';
import {Routes} from '../routes/constants';
import {Svg_No_Transaction_light} from '../../assets/icon/svg/noTransactions-light';
import {Svg_No_Transaction} from '../../assets/icon/svg/noTransactions';

const Tab = createMaterialTopTabNavigator();

const Transaction = ({navigation, route}: any) => {
  const tabs = ['Completed', 'Recieved', 'Sent'];
  const {params} = route;

  const [transactions, setTransactions] = useRecoilState(TransactionsState);
  const [isDarkMode, setIsDarkMode] = useRecoilState(isDarkModeState);
  const setSelectedTransactionMemo = useSetRecoilState(
    SelectedTransactionMemoState,
  );
  const keyChainData = useRecoilValue(KeyChainDataState);

  const [isLoader, setIsLoader] = useState(false);
  const {get, isLoaded} = useNetwork();
  const {trackEvents} = useTrackEvents();
  const {formatCurrency} = useCurrency();
  const {colors} = useTheme();

  const accessToken = useRecoilValue(AccessTokenState);
  useEffect(() => {
    if (!accessToken.length) {
      navigation.navigate(Routes.Login);
    }
  }, []);

  const onMemoSelect = useCallback(
    (transaction: any) => {
      trackEvents('transaction-memo-details', {details: transaction});
      setSelectedTransactionMemo(transaction.memo);
      navigation.navigate(Routes.TransactionDetails);
    },
    [navigation],
  );

  const fetchApi = useCallback(
    isSetLoading => {
      if (isSetLoading) {
        setIsLoader(true);
      }
      get(APIS.Transactions).then(res => {
        if (isSetLoading && res?.data) {
          setIsLoader(false);
        }
        if (res?.data) {
          setIsLoader(false);
          setTransactions(res.data);
        }
      });
    },
    [keyChainData, setIsLoader],
  );

  useEffect(() => {
    if (!transactions.length) {
      fetchApi(true);
    }
  }, [keyChainData]);

  useInterval(() => fetchApi(false), 5000);

  const renderRecieveTransaction = useMemo(() => {
    return !isLoaded ? (
      <View style={styles.noDataContainer}>
        <Loader top={20} />
      </View>
    ) : isLoaded && transactions?.length === 0 ? (
      <View style={styles.noDataContainer}>
        <NoData
          msg="Nothing Here"
          svg={
            isDarkMode === true ? Svg_No_Transaction : Svg_No_Transaction_light
          }
          height={240}
        />
      </View>
    ) : (
      transactions?.map((transaction: any, i: any) => {
        const {signature, time, symbol = '---', price = 0} = transaction;
        return (
          <View
            style={[styles.views, {borderTopWidth: i === 0 ? 0 : 0.4}]}
            key={`${i}_${signature}`}>
            <View style={styles.symbol}>
              <Text style={[styles.symbolTxt, {color: colors.text}]}>
                {capitalize(symbol) || '-'}
              </Text>
              <Text
                style={[styles.signTxt, {color: colors.text}]}
                numberOfLines={1}>
                {signature || '-'}
              </Text>
              <Text style={[styles.dateTxt, {color: colors.text}]}>
                {moment(time).format('hh:mm A, ddd MMM, DD YYYY')}
              </Text>
            </View>
            <View style={styles.price}>
              <Text style={[styles.priceTxt, {color: colors.text}]}>
                {formatCurrency(price, 2) ?? 0}
              </Text>
              <TouchableOpacity
                style={styles.memo}
                onPress={() => onMemoSelect(transaction)}>
                <Text style={styles.memoTxt}>Memo</Text>
              </TouchableOpacity>
            </View>
          </View>
        );
      })
    );
  }, [keyChainData, transactions]);

  const goBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const tabPress = (name: string) => {
    trackEvents(`transactions-${name}` as any, {navigate: name});
  };

  return (
    <View style={styles.mainContainer}>
      <Header
        title="Transactions"
        goBack={params?.isBackButton ? goBack : null}
      />
      {!accessToken.length ? (
        <LoginButton navigation={navigation} />
      ) : (
        <TabNavigation width="100%">
          {tabs.map((tab: any, i: number) => (
            <Tab.Screen
              name={tab}
              key={`${tab}__${i}`}
              listeners={{
                tabPress: () => tabPress(tab),
              }}>
              {() => (
                <View
                  style={[
                    styles.container,
                    {backgroundColor: colors.background},
                  ]}>
                  {tab === 'Completed' ? (
                    <OrderedAssets tab={tab} navigation={navigation} />
                  ) : (
                    <ScrollView style={styles.scroll}>
                      {renderRecieveTransaction}
                    </ScrollView>
                  )}
                </View>
              )}
            </Tab.Screen>
          ))}
        </TabNavigation>
      )}
    </View>
  );
};

export default Transaction;
