import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import moment from 'moment';
import {useTheme} from '@react-navigation/native';
import {styles} from './transaction-row.style';
import {SVG_DOT_PROCESSING} from '../../../../assets/icon/svg/dotProcessing';
import {SVG} from '../../../../storybook';
import {SVG_DOT_FAILURE} from '../../../../assets/icon/svg/dotFailure';
import {SVG_DOT_COMPLETED} from '../../../../assets/icon/svg/dotCompleted';
import {SVG_ARROW_UP} from '../../../../assets/icon/svg/circle-up';
import {SVG_ARROW_DOWN} from '../../../../assets/icon/svg/circle-down';
import {Routes} from '../../../routes/constants';
import {
  TRANSACTION,
  TRANSACTION_STATUS,
  getType,
} from '../../../../views/wallet-transaction/data';
import {useCurrency} from '../../../../hooks/use-currency';

type TransactionRowType = {
  navigation: any;
  item: any;
};

const TransactionRow = ({item, navigation}: TransactionRowType) => {
  const {colors} = useTheme();
  const {
    status,
    flow,
    amount,
    bankName,
    accountNumber,
    createdAt,
    transactionId,
    type
  } = item;
  const {formatCurrency} = useCurrency();
  const getDotColor = (status: string): string => {
    switch (status) {
      case TRANSACTION_STATUS.SUCCESS:
        return SVG_DOT_COMPLETED;
      case TRANSACTION_STATUS.Processing:
        return SVG_DOT_PROCESSING;
      case TRANSACTION_STATUS.Failure:
        return SVG_DOT_FAILURE;
      default:
        return '';
    }
  };

 const converter = (name:any) =>{
  return name.charAt(0) + name.slice(1).toLowerCase(); 
}

  return (
    <TouchableOpacity
      style={styles.parent}
      onPress={() => {
        navigation.navigate(Routes.WalletTransactionsDetails, {
          item,
        });
      }}>
      <View style={styles.container}>
        <View style={[styles.image, {backgroundColor: colors.box}]}>
          <SVG
            name={
              flow == TRANSACTION.Withdrawal ? SVG_ARROW_DOWN : SVG_ARROW_UP
            }
            height={15}
            width={16}
          />
        </View>
        <View style={styles.rowContainer}>
          <View style={{flex: 1, paddingRight: 10}}>
            <Text style={[styles.boldText, {color: colors.text}]}>
            {converter(type)}
            </Text>
            <Text
              numberOfLines={1}
              ellipsizeMode="tail"
              style={[styles.subText, {color: colors.lightText, flex: 1}]}>
              {transactionId}
            </Text>
          </View>
          <View>
            <Text
              style={[
                styles.boldText,
                {textAlign: 'right', color: colors.text},
              ]}>
              {formatCurrency(amount, 2)}
            </Text>
            <View style={styles.directionRow}>
              <View style={styles.dotContainer}>
                <SVG name={getDotColor(status)} height={6} width={6} />
              </View>
              <Text
                style={[
                  styles.subText,
                  {textAlign: 'right', color: colors.lightText},
                ]}>
                {status}
              </Text>
            </View>
          </View>
        </View>
      </View>
      <View style={styles.rowContainer}>
        <Text style={[styles.subText, {color: colors.lightText}]}>
          {bankName} (****-{accountNumber})
        </Text>
        <Text style={[styles.subText, {color: colors.lightText}]}>
          {moment(createdAt).fromNow()}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default TransactionRow;
