// @flow
import React from 'react';
import {View, Text} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {SVG_STATUS_COMPLETED} from '../../../../assets/icon/svg/status-complelted';
import {SVG} from '../../../../storybook';
import {SVG_STATUS_PROCESSING} from '../../../../assets/icon/svg/status-processing';
import {SVG_STATUS_FAILUER} from '../../../../assets/icon/svg/status-failuer';
import {SVG_STATUS_CANCALLED} from '../../../../assets/icon/svg/status-cancelled';
import {TRANSACTION_STATUS} from '../../data';
import {styles} from './AmountStatusCard.Style';

type AmountStatusCardType = {
  amount?: string;
  status: string;
};

const AmountStatusCard = ({amount, status}: AmountStatusCardType) => {
  const {colors} = useTheme();

  const getIcon = (value: string): string => {
    switch (value) {
      case TRANSACTION_STATUS.SUCCESS:
        return SVG_STATUS_COMPLETED;
      case TRANSACTION_STATUS.Processing:
        return SVG_STATUS_PROCESSING;
      case TRANSACTION_STATUS.Failure:
        return SVG_STATUS_FAILUER;
      case TRANSACTION_STATUS.Cancelled:
        return SVG_STATUS_CANCALLED;
    }
    return SVG_STATUS_COMPLETED;
  };
  const getStatusColor = (value: string) => {
    switch (value) {
      case TRANSACTION_STATUS.SUCCESS:
        return colors.buy;
      case TRANSACTION_STATUS.Processing:
        return '#F5AF45';
      case TRANSACTION_STATUS.Failure:
        return '#F55353';
      case TRANSACTION_STATUS.Cancelled:
        return '#747E99';
    }
  };
  return (
    <View style={styles.container}>
      <Text style={[styles.amountText, {color: colors.lightText}]}>Amount</Text>
      <Text style={[styles.balanceText, {color: colors.text}]}>{amount}</Text>
      <View style={styles.statusContainer}>
        <SVG name={getIcon(status)} height={13.33} width={13.33} />
        <Text style={[styles.statusText, {color: getStatusColor(status)}]}>
          {status}
        </Text>
      </View>
    </View>
  );
};

export default AmountStatusCard;
