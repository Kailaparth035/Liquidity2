//import liraries
import React, {Component} from 'react';
import {useTheme} from '@react-navigation/native';
import {Text, StyleSheet, TextInput, Platform} from 'react-native';

type CustomeInputeType = {
  title: string;
  placeholderText: string;
  keyboardType: any;
  extraTitleStyle: any;
  value: any;
  onchangeText: any;
  maxLength: any;
};

const CustomeInpute = ({
  title,
  placeholderText,
  keyboardType,
  extraTitleStyle,
  value,
  onchangeText,
  maxLength,
}: CustomeInputeType) => {
  const {colors, dark} = useTheme();
  return (
    <>
      <Text style={[styles.titleText, extraTitleStyle, {color: colors.text}]}>
        {title}
      </Text>
      <TextInput
        placeholderTextColor={'#6C707A'}
        placeholder={placeholderText}
        keyboardType={keyboardType}
        value={value}
        onChangeText={text => onchangeText(text)}
        style={[
          styles.textInputeStyle,
          {backgroundColor: colors.box, color: colors.text},
        ]}
        maxLength={maxLength}
      />
    </>
  );
};

const styles = StyleSheet.create({
  titleText: {fontSize: 12},
  textInputeStyle: {
    padding: Platform.OS === 'ios' ? 12 : 5,
    borderRadius: 4,
    marginTop: 5,
    paddingHorizontal: 10,
    fontSize: 14,
  },
});

export default CustomeInpute;
