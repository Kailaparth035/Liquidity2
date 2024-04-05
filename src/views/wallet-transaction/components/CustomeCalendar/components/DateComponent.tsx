// @flow
import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  StyleProp,
  ViewStyle,
  Text,
  TextStyle,
} from 'react-native';

type DateComponentType = {
  onPress: () => void;
  customeStyle: StyleProp<ViewStyle>;
  day: string;
  labelStyle: StyleProp<TextStyle>;
};

const DateComponent = ({
  onPress,
  customeStyle,
  day,
  labelStyle,
}: DateComponentType) => {
  return (
    <TouchableOpacity onPress={onPress} style={customeStyle}>
      <Text style={labelStyle}>{day}</Text>
    </TouchableOpacity>
  );
};

export default DateComponent;
