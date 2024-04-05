// @flow
import {useTheme} from '@react-navigation/native';
import React from 'react';
import {View, StyleSheet, Text} from 'react-native';

type TimeConatinerType = {
  timer?: string | number;
  subtitle?: string;
};

const TimeConatiner = ({timer, subtitle}: TimeConatinerType) => {
  const {colors} = useTheme();
  return (
    <View style={styles.parent}>
      <Text
        style={{
          fontSize: 20,
          lineHeight: 30,
          fontWeight: '500',
          color: colors.text,
        }}>
        {timer}
      </Text>
      <Text
        style={{
          fontSize: 10,
          lineHeight: 16,
          fontWeight: '500',
          color: colors.lightText,
        }}>
        {subtitle}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  parent: {
    height: 46,
    width: 44,
    alignItems: 'center',
  },
});
export default TimeConatiner;
