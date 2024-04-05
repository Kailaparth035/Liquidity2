// @flow
import React, {useCallback} from 'react';
import {View} from 'react-native';
import moment from 'moment';
import {getType, TRANSACTION, TRANSACTION_STATUS} from '../data';
import {Header} from '../../../components';
import TransactionDetailsRow from '../components/TransactionDetailsRow';
import AmountStatusCard from '../components/AmountStatusCard';
import Button from '../components/CustomeButton';
import {styles} from './WalletTransactionsDetails.style';
import {useCurrency} from '../../../hooks/use-currency';

const WalletTransactionsDetails = ({navigation, route}: any) => {
  const {
    amount,
    status,
    fees,
    transactionId,
    bankName,
    Total,
    flow,
    accountNumber,
    createdAt,
  } = route?.params?.item;
  const {formatCurrency} = useCurrency();
  const goBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  return (
    <View style={styles.parent}>
      <Header goBack={goBack} title={`${getType(flow)} Detail`} />
      <View style={styles.parent}>
        <AmountStatusCard amount={formatCurrency(amount, 2)} status={status} />
        <View>
          <TransactionDetailsRow
            title={'Bank'}
            value={bankName !== '' ? bankName : '--'}
          />
          <TransactionDetailsRow
            type="amount"
            title={'Account Number'}
            value={accountNumber ?? '--'}
          />
          <TransactionDetailsRow
            title={'Transaction ID'}
            value={transactionId ?? '--'}
          />
          <TransactionDetailsRow
            title={'Time & Date'}
            value={moment(createdAt).format(' hh:mmA, DD MMM YYYY')}
          />
          {flow === TRANSACTION.Withdrawal ? (
            <>
              <TransactionDetailsRow
                title={'fees'}
                value={formatCurrency(fees, 2)}
              />
              <TransactionDetailsRow
                title={'Total'}
                value={formatCurrency(Total ?? '--', 2)}
              />
            </>
          ) : null}
        </View>
        {/* will use when apis ready  */}
        {/* <View style={styles.buttonContainer}>
          {status == TRANSACTION_STATUS.Cancelled ||
          status == TRANSACTION_STATUS.SUCCESS ? null : (
            <Button
              label={
                status == TRANSACTION_STATUS.Failure
                  ? 'Retry'
                  : `Cancel ${getType(flow)}`
              }
              status={status}
            />
          )}
        </View> */}
      </View>
    </View>
  );
};

export default WalletTransactionsDetails;
