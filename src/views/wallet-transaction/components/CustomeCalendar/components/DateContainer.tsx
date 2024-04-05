// @flow
import React from 'react';
import {StyleSheet, TouchableOpacity, Text} from 'react-native';
import Icons from 'react-native-vector-icons/MaterialIcons';
import {useTheme} from '@react-navigation/native';

type DateContainerType = {
  date: string;
};

const DateContainer = ({date}: DateContainerType) => {
  const {colors} = useTheme();
  return (
    <TouchableOpacity style={[styles.parent, {backgroundColor: colors.box}]}>
      <Text style={[styles.text, {color: colors.text}]}>{date}</Text>
      <Icons
        name={'calendar-today'}
        size={22}
        color={colors.lightText}
        style={{marginRight: 18}}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  parent: {
    marginRight: 4,
    paddingVertical: 16,
    flex: 1,
    borderRadius: 8,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  text: {
    paddingLeft: 16,
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '500',
  },
});
export default DateContainer;
