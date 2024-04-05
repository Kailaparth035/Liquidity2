import React, {useCallback, useRef, useState} from 'react';
import {View, FlatList, Text, ActivityIndicator} from 'react-native';
import {useRecoilState} from 'recoil';
import {useTheme} from '@react-navigation/native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {TabNavigation} from '../../storybook';
import {Header} from '../../components';
import TransactionRow from './components/transaction-row';
import FilterModal from './components/FilterModal';
import {AllWalletTransactionState} from '../../states/wallet-transaction';
import {APIS} from '../../constants';
import {useNetwork} from '../../hooks';
import {ErrorAlert} from '../../helpers/Alter';
import {styles} from './walletTransaction.style';

const Tab = createMaterialTopTabNavigator();

const WalletTransactions = ({navigation}: any) => {
  const tabs = ['All', 'Deposit', 'Withdrawal'];
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const refRBSheet = useRef();
  const {colors} = useTheme();
  const {get, loading, setLoading} = useNetwork();
  const [walletTransaction, setalletTransaction] = useRecoilState(
    AllWalletTransactionState,
  );

  const filterTab = useCallback(
    (activeTab: any) => {
      let filterArray = [];
      if (activeTab == 'All') {
        return walletTransaction;
      } else if (activeTab == 'Deposit') {
        filterArray = walletTransaction.filter(
          item => item.flow === 'incoming',
        );
      } else {
        filterArray = walletTransaction.filter(
          item => item.flow === 'outgoing',
        );
      }
      return filterArray;
    },
    [walletTransaction],
  );
  const reload = () => {
    setLoading(true);

    get(APIS.walletTransaction)
      .then(res => {
        if (res.data) {
          setalletTransaction(res.data);
        }
        setRefreshing(false);
        setLoading(false);
      })
      .catch(error => {
        setRefreshing(false);
        setLoading(false);
        ErrorAlert('Error', error);
      });
  };
  const goBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const filter = useCallback(() => {
    refRBSheet.current.open();
  }, []);

  return (
    <View style={styles.mainContainer}>
      <Header title="Transactions" goBack={goBack} />
      <TabNavigation width="100%">
        {tabs.map((tab: any, i: number) => (
          <Tab.Screen name={tab} key={`${tab}__${i}`}>
            {() => (
              <View
                style={[
                  styles.container,
                  {backgroundColor: colors.background},
                ]}>
                {filterTab(tab).length == 0 ? (
                  <Text style={[styles.noDataText, {color: colors.text}]}>
                    NO TRANSACTION FOUND
                  </Text>
                ) : (
                  <>
                    {refreshing ? (
                      <ActivityIndicator
                        style={{alignSelf: 'center'}}
                        size={'small'}
                      />
                    ) : null}
                    <FlatList
                      data={filterTab(tab)}
                      refreshing={refreshing}
                      onRefresh={() => {
                        setRefreshing(true);
                        reload();
                      }}
                      ItemSeparatorComponent={() => {
                        return <View style={styles.borderLine} />;
                      }}
                      renderItem={({item, index}) => (
                        <TransactionRow
                          item={item}
                          key={index}
                          navigation={navigation}
                        />
                      )}
                    />
                  </>
                )}
              </View>
            )}
          </Tab.Screen>
        ))}
      </TabNavigation>

      <FilterModal showFilter={refRBSheet} />
    </View>
  );
};

export default WalletTransactions;
