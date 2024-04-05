import {View, Text, StyleSheet, FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useTheme} from '@react-navigation/native';
import {useCurrency} from '../../hooks/use-currency';

const MusicDevident = ({mapItem, mapIndex}) => {
  const {colors} = useTheme();
  const {formatCurrency} = useCurrency();
  return (
    <>
      <View
        style={{
          flex: 1,
          justifyContent: 'space-between',
          flexDirection: 'row',
        }}>
        <View style={styles.container}>
          <Text style={styles.text1}>
            {mapIndex === 0
              ? '2021 q1'
              : mapIndex === 1
              ? '2021 q2'
              : mapIndex === 2
              ? '2021 q3'
              : mapIndex === 3
              ? '2021 q4'
              : ''}
          </Text>
          <Text style={[styles.text2, {color: colors.text}]}>
            {formatCurrency(
              mapIndex === 0
                ? mapItem['2021 q1']
                : mapIndex === 1
                ? mapItem['2021 q2']
                : mapIndex === 2
                ? mapItem['2021 q3']
                : mapIndex === 3
                ? mapItem['2021 q4']
                : '',
              2,
            )}
          </Text>
        </View>
        <View style={styles.container}>
          <Text style={styles.text1}>
            {mapIndex === 0
              ? '2022 q1'
              : mapIndex === 1
              ? '2022 q2'
              : mapIndex === 2
              ? '2022 q3'
              : mapIndex === 3
              ? '2022 q4'
              : ''}
          </Text>
          <Text style={[styles.text2, {color: colors.text}]}>
            {formatCurrency(
              mapIndex === 0
                ? mapItem['2022 q1']
                : mapIndex === 1
                ? mapItem['2022 q2']
                : mapIndex === 2
                ? mapItem['2022 q3']
                : mapIndex === 3
                ? mapItem['2022 q4']
                : '',
              2,
            )}
          </Text>
        </View>
      </View>
    </>
  );
};

export default MusicDevident;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 20,
    paddingVertical: 5,
    flexDirection: 'row',
  },
  text1: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '500',
    color: '#878C99',
    flex: 1,
    textAlign: 'left',
    alignSelf: 'center',
  },
  text2: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '600',
    flex: 1,
    textAlign: 'right',
  },
});
