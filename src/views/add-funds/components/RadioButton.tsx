// @flow
import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {useTheme} from '@react-navigation/native';

import {RadioButtonComponentstyles} from './RadiioButton.style';
type RadioButtonType = {
  isSelected: boolean;
  onPress?: () => void;
  subType?: string;
  mask?: string;
};

const RadioButton = ({subType, mask, isSelected, onPress}: RadioButtonType) => {
  const {colors} = useTheme();
  return (
    <TouchableOpacity
      onPress={onPress}
      style={RadioButtonComponentstyles.parent}>
      <View style={RadioButtonComponentstyles.borderCircle}>
        {isSelected ? (
          <View style={RadioButtonComponentstyles.radioButtonCenter} />
        ) : null}
      </View>
      <Text
        style={[
          RadioButtonComponentstyles.accountText,
          {flex: 1, color: colors.text},
        ]}>
        {subType}
      </Text>
      {mask && <Text
        style={[RadioButtonComponentstyles.accountText, {color: colors.text}]}>
        ... {mask}
      </Text>}
    </TouchableOpacity>
  );
};

export default RadioButton;
