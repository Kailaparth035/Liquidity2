import React, {Component} from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import {methodButtonStyles} from './methodButton.style';
import {useTheme} from '@react-navigation/native';
import {RightArrow} from '../../../assets/images';

type methodButtonType = {
  title: String;
  icon: any;
  onPress: any;
};

const MethodButton = ({title, icon, onPress}: methodButtonType) => {
  const {colors} = useTheme();
  return (
    <TouchableOpacity
      style={methodButtonStyles.buttonView}
      onPress={() => onPress()}>
      <View style={methodButtonStyles.imageView}>
        <Image source={icon} style={methodButtonStyles.iconStyle} />
      </View>
      <View style={methodButtonStyles.buttonNameView}>
        <Text style={[methodButtonStyles.buttonText, {color: colors.text}]}>
          {title}
        </Text>
        <Image source={RightArrow} style={methodButtonStyles.iconStyle} />
      </View>
    </TouchableOpacity>
  );
};

export default MethodButton;
