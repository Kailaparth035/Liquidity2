// @flow
import {useTheme} from '@react-navigation/native';
import React from 'react';
import {TouchableOpacity, Text, Image} from 'react-native';
import {styles} from './AddBalanceButton.style';
import {COLORS} from '../../../assets';

type CustomButtonType = {
  label: string;
  number: string;
  icon: string;
  buttonStyle?: StyleProp<ViewStyle>;
  onPress: () => void;
  textColor: string;
};

const AddBalanceButton = ({
  label,
  number,
  icon,
  buttonStyle,
  onPress,
  textColor,
}: CustomButtonType) => {
  const {colors} = useTheme();
  return (
    <TouchableOpacity
      style={[styles.bankDetailsButton, buttonStyle]}
      onPress={() => onPress()}>
      <Image
        source={icon}
        style={[styles.bankIcon, {tintColor: colors.text}]}
      />
      <Text style={[styles.bankNameText, {color: colors.text}]}>{label}</Text>
      <Text
        style={[
          styles.accountText,
          {color: textColor ? textColor : COLORS['primary-dark']},
        ]}>
        {number}
      </Text>
    </TouchableOpacity>
  );
};

export default AddBalanceButton;
