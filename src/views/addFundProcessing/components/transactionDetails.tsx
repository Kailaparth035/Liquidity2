import React from 'react';
import {View, Text} from 'react-native';
import {transactionDetails} from './transactionDetails.style';
import {useTheme} from '@react-navigation/native';
import {COLORS} from '../../../assets';

type TransactionDetailsType = {
  textFirst: string;
  ProcessingStatus: string;
  isStatus?: boolean;
  statusView: string;
};

const TransactionDetails = ({
  textFirst,
  ProcessingStatus,
  isStatus,
  statusView,
}: TransactionDetailsType) => {
  const {colors} = useTheme();

  return (
    <View
      style={[
        transactionDetails.centerView,
        {borderBottomColor: colors.border},
      ]}>
      <Text
        style={[transactionDetails.statusText, {color: colors.text, flex: 1}]}>
        {textFirst}
      </Text>
      <View style={transactionDetails.processStatusView}>
        {isStatus && (
          <View
            style={[
              transactionDetails.statusView,
              {
                backgroundColor:
                  statusView === 'Processing'
                    ? COLORS['color-yellow']
                    : statusView === 'Completed'
                    ? COLORS['color-green']
                    : COLORS['color-red'],
              },
            ]}
          />
        )}
        <Text
          style={[
            transactionDetails.statusText,
            {
              fontWeight: '500',
              color: colors.text,
              textAlign: 'right',
            },
          ]}>
          {ProcessingStatus}
        </Text>
      </View>
    </View>
  );
};

export default TransactionDetails;
