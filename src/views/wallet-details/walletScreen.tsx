import React, {useEffect, useMemo, useState} from 'react';
import {View, Text, ScrollView, ActivityIndicator} from 'react-native';
import {useRecoilState, useRecoilValue} from 'recoil';
import {useIsFocused, useTheme} from '@react-navigation/native';
import BalanceCard from './components/BalanceCard';
import AddNewAccountModal from './components/AddNewAccountModal';
import {Routes} from '../routes/constants';
import {COLORS} from '../../assets';
import {InfoDataState} from '../../states';
import {useNetwork} from '../../hooks';
import {APIS} from '../../constants';
import {BankAccountMetadataType} from '../../views/profile/components/bank-accounts/types';
import {ErrorAlert} from '../../helpers/Alter';
import {Loader} from '../../storybook';
import TransactionRow from '../../views/wallet-transaction/components/transaction-row';
import {AllWalletTransactionState} from '../../states/wallet-transaction';
import {styles} from './walletScreen.style';
import {useFortressAccountInfo} from '../../hooks/use-fortressAccountInfo';

const WalletScreen = ({navigation}: any) => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [load, setLoad] = useState<boolean>(false);
  const {colors} = useTheme();
  const info = useRecoilValue(InfoDataState);
  const {balance} = info.stellar ?? {};
  const {get, loading, setLoading} = useNetwork();
  const isFocuse = useIsFocused();
  const [bankAccouts, setBankAccouts] = useState<BankAccountMetadataType[]>([]);
  const [walletTransaction, setalletTransaction] = useRecoilState(
    AllWalletTransactionState,
  );

  const statusCardList = useMemo(() => {
    return walletTransaction
      .slice(0, 4)
      .map((item, index) => (
        <TransactionRow item={item} key={index} navigation={navigation} />
      ));
  }, [walletTransaction]);

  useEffect(() => {
    setLoading(true);
    get(APIS.GetBankAccounts)
      .then(res => {
        if (res?.data) {
          setBankAccouts(res.data);
        }
        setLoading(false);
      })
      .catch(error => {
        setLoading(false);
        ErrorAlert('Error', error);
      });
  }, [isFocuse]);

  useEffect(() => {
    setLoad(true);
    get(APIS.walletTransaction)
      .then(res => {
        if (res?.data) {
          setalletTransaction(res.data);
        }
        setLoad(false);
      })
      .catch(error => {
        setLoad(false);
        ErrorAlert('Error', error);
      });
  }, [isFocuse]);
  const handleTransections = (type: string) => {
    navigation.navigate(Routes.DepositScreen, {transactionType: type});
  };
  if (loading) return <Loader />;
  return (
    <View style={styles.parent}>
      <BalanceCard
        onPress={handleTransections}
        bankAccounts={bankAccouts}
        navigateBankAccount={() => navigation.navigate(Routes.BankAccounts)}
        navigateCard={() => navigation.navigate(Routes.Cards)}
      />
      <View
        style={{
          borderBottomWidth: 1,
          borderBottomColor: COLORS['color-text-light-90'],
          paddingVertical: 10,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <Text style={[styles.headerText, {color: colors.text}]}>
          Recent Transactions
        </Text>
        <Text
          style={[styles.headerText, {color: COLORS['color-yellow']}]}
          onPress={() => navigation.navigate(Routes.WalletTransactions)}>
          See All
        </Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View>
          {load ? (
            <ActivityIndicator size={'small'} />
          ) : walletTransaction.length != 0 ? (
            statusCardList
          ) : (
            <Text style={[styles.noDataText, {color: colors.text}]}>
              NO TRANSACTION FOUND
            </Text>
          )}
        </View>
      </ScrollView>

      <AddNewAccountModal
        onPress={() => {
          setShowModal(false);
          navigation.navigate(Routes.BankAccounts);
        }}
        setShowModal={setShowModal}
        showModal={showModal}
      />
    </View>
  );
};

export default WalletScreen;
