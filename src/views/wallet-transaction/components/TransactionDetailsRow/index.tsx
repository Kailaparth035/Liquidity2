import React from 'react';
import {View, Text} from 'react-native';
import {useTheme} from '@react-navigation/native';

import {styles} from './TransactionDetailsRow.style';

type TransactionDetailsRowType = {
  title: string;
  value: string;
  type?: string;
};

const TransactionDetailsRow = ({
  title,
  value,
  type,
}: TransactionDetailsRowType) => {
  const {colors} = useTheme();
  return (
    <View style={styles.container}>
      <Text style={[styles.textStyle, {color: colors.lightText}]}>{title}</Text>
      {type == 'amount' ? (
        <View style={{flexDirection: 'row'}}>
          <Text style={[styles.textStyle, {color: colors.text}]}>
            ••••••••••{' '}
          </Text>
          <Text style={[styles.textStyle, {color: colors.text}]}>{value}</Text>
        </View>
      ) : (
        <Text
          style={[
            styles.textStyle,
            {color: colors.text, flex: 1, textAlign: 'right'},
          ]}>
          {value}
        </Text>
      )}
    </View>
  );
};

export default TransactionDetailsRow;
