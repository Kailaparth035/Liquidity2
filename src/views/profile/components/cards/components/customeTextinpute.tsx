//import liraries

import React, {Component} from 'react';
import {useTheme} from '@react-navigation/native';
import {View, Text, Image} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import {customeTextInputeStyles} from './customeTextinpute.style';
import {COLORS} from '../../../../../assets';

type CustomeTextinputeType = {
  headerText?: string;
  keyboardType?: any;
  placeholderText?: string;
  icon?:any;
  maxlength: any;
  isIcon?: boolean;
};

const CustomeTextinpute = ({
  headerText,
  keyboardType,
  placeholderText,
  icon,
  isIcon,
  maxlength,
}: CustomeTextinputeType) => {
  const {colors} = useTheme();
  return (
    <>
      <Text
        style={[
          customeTextInputeStyles.headerText,
          {
            color: colors.text,
          },
        ]}>
        {headerText}
      </Text>
      <View style={customeTextInputeStyles.textInputView}>
        <TextInput
          maxLength={maxlength}
          style={[
            customeTextInputeStyles.textInpute,
            {
              color: colors.text,
            },
          ]}
          keyboardType={keyboardType}
          placeholder={placeholderText}
          placeholderTextColor={colors.text}
        />
        {isIcon && (
          <Image
            source={icon}
            style={{width: 15, height: 15, tintColor: colors.text}}
          />
        )}
      </View>
    </>
  );
};

export default CustomeTextinpute;
