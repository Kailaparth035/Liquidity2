// @flow
import {useTheme} from '@react-navigation/native';
import React from 'react';
import {View, StyleSheet, Text} from 'react-native';

type CardTitleType = {
  title: string;
};

const CardTitle = ({title}: CardTitleType) => {
  const {colors} = useTheme();

  return <Text style={[styles.parent, {color: colors.text}]}>{title} </Text>;
};

const styles = StyleSheet.create({
  parent: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '600',
  },
});
export default CardTitle;
