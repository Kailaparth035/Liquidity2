import React from 'react';
import {Text} from 'react-native';
import {useTheme} from '@react-navigation/native';

import {NO_DATA_AVAILABLE} from '../../../constants';
import {tokenDetailsStyles as styles} from './token-details/token-details.styles';

const NoDataAvailable = () => {
  const {colors} = useTheme();
  return (
    <Text style={[styles.noData, {color: colors.text}]}>
      {NO_DATA_AVAILABLE}
    </Text>
  );
};

export default NoDataAvailable;
