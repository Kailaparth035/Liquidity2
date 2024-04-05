import React, {Component} from 'react';
import {useTheme} from '@react-navigation/native';
import {View, Text, StyleSheet} from 'react-native';
import {styles} from './customeDetailsView.style';

type customeDetailsViewType = {
  title: string;
  detailsText: string;
};

const customeDetailsView = ({title, detailsText}: customeDetailsViewType) => {
  const {colors, dark} = useTheme();
  return (
    <View style={styles.detailsView}>
      <Text style={[styles.titleText, {color: dark ? '#878C99' : colors.text}]}>
        {title}
      </Text>
      <Text style={{color: colors.primary, marginLeft: 10}}>:</Text>
      <Text
        style={[
          styles.detailsText,
          {
            color: colors.primary,
          },
        ]}>
        <Text>{detailsText}</Text>
      </Text>
    </View>
  );
};

export default customeDetailsView;
