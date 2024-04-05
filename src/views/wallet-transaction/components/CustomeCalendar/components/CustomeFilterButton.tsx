// @flow
import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  StyleProp,
  ViewStyle,
  TextStyle,
} from 'react-native';

type FilterButtonType = {
  label: string;
  customestyle?: StyleProp<ViewStyle>;
  onPress: () => void;
  labelStyle: StyleProp<TextStyle>;
};

const FilterButton = ({
  label,
  customestyle,
  onPress,
  labelStyle,
}: FilterButtonType) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.button, customestyle]}>
      <Text style={labelStyle}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flex: 1,
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
});
export default FilterButton;
