// @flow
import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {useTheme} from '@react-navigation/native';
type BottomTextType = {
  title: string;
  value: string;
};

const BottomText = ({title, value}: BottomTextType) => {
  const {colors} = useTheme();
  return (
    <View style={{marginHorizontal: 8, alignItems: 'center'}}>
      <Text
        style={{
          color: colors.text,
          fontSize: 10,
          fontWeight: '400',
          lineHeight: 12,
          paddingBottom: 4,
        }}>
        {title}
      </Text>
      <Text
        style={{
          color: colors.text,
          fontSize: 12,
          fontWeight: '600',
          lineHeight: 16,
        }}>
        {value}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  parent: {},
});
export default BottomText;
