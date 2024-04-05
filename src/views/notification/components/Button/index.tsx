import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  StyleProp,
  ViewStyle,
} from 'react-native';
import {useTheme} from '@react-navigation/native';

type ButtonType = {label: string; style?: StyleProp<ViewStyle>};

const Button = ({label, style}: ButtonType) => {
  const {colors} = useTheme();
  return (
    <View>
      <TouchableOpacity style={[style, styles.defaultButton]}>
        <Text style={[styles.label, {color: colors.text}]}>{label}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  defaultButton: {paddingVertical: 12, paddingHorizontal: 54, borderRadius: 4},
  label: {
    fontSize: 14,
    lineHeight: 24,
    fontWeight: '500',
  },
});
export default Button;
