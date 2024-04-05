// @flow
import React from 'react';
import {View, StyleSheet} from 'react-native';
import {useTheme} from '@react-navigation/native';

type CardViewType = {};

const CardView = (props: any) => {
  const {colors} = useTheme();
  return (
    <View
      style={[
        styles.parent,
        props.cardContainerStyle,
        {backgroundColor: colors.background},
      ]}>
      {props.children}
    </View>
  );
};

const styles = StyleSheet.create({
  parent: {
    padding: 16,
    marginTop: 1,
  },
});
export default CardView;
