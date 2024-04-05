// @flow
import React from 'react';
import {TouchableOpacity, Text} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {TRANSACTION_STATUS} from '../../../../views/wallet-transaction/data';
import {styles} from './CustomeButton.style';
import {COLORS} from '../../../../assets';

type ButtonType = {
  label: string;
  status: string;
};

const Button = ({label, status}: ButtonType) => {
  const {colors} = useTheme();
  return (
    <TouchableOpacity
      style={[
        styles.parent,
        {
          backgroundColor:
            status === TRANSACTION_STATUS.Processing
              ? 'rgba(245, 86, 69, 0.15)'
              : colors.box,
        },
      ]}>
      <Text
        style={[
          styles.label,
          {
            color:
              status === TRANSACTION_STATUS.Processing
                ? colors.compulsory
                : COLORS['white'],
          },
        ]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};

export default Button;
