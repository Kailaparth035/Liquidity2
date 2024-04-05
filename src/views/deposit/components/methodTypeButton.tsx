// @flow
import {useTheme} from '@react-navigation/native';
import React from 'react';
import {TouchableOpacity, Text, Image, View} from 'react-native';
import {styles} from './methodTypeButton.style';

type CustomButtonType = {
  label: string;
  icon: string;
  buttonStyle?: StyleProp<ViewStyle>;
  onPress: () => void;
};

const MethodTypeButton = ({
  label,
  icon,
  buttonStyle,
  onPress,
}: CustomButtonType) => {
  const {colors} = useTheme();
  return (
    <TouchableOpacity
      style={[styles.methodButton, buttonStyle]}
      onPress={() => onPress()}>
      <View
        style={[styles.methodIconView, {backgroundColor: colors.background}]}>
        <Image
          source={icon}
          style={[styles.methodIcon, {tintColor: colors.text}]}
        />
      </View>
      <Text style={[styles.methodNameText, {color: colors.text}]}>{label}</Text>
    </TouchableOpacity>
  );
};

export default MethodTypeButton;
