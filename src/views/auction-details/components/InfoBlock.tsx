// @flow
import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {useTheme} from '@react-navigation/native';

type InfoBlockType = {
  title: string;
  value: string;
};

const InfoBlock = ({title, value}: InfoBlockType) => {
  const {colors} = useTheme();
  return (
    <View style={styles.parent}>
      <Text style={[styles.titleText, {color: colors.lightText}]}>{title}</Text>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        {value == 'Live' ? <View style={styles.dot} /> : null}
        <Text style={[styles.valueText, {color: colors.text}]}>{value}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  parent: {flex: 1},
  titleText: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '500',
  },
  valueText: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '500',
  },
  dot: {
    width: 8,
    height: 8,
    backgroundColor: 'green',
    borderRadius: 8,
    marginRight: 8,
  },
});
export default InfoBlock;
