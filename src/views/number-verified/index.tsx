import React, {Component} from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {RegisterDone} from '../../assets/images';
import {
  VERIFIED_NUMBER_DESCRIPTION,
  VERIFIED_NUMBER_TITLE,
} from '../../views/login/constants';
import {Routes} from '../../views/routes/constants';
import {numberVerifiedStyles} from './number-vcerified.style';

const NumberVerified = ({navigation}: any) => {
  const {colors} = useTheme();
  return (
    <View style={numberVerifiedStyles.mainView}>
      <Image
        source={RegisterDone}
        style={numberVerifiedStyles.verifiedImage}
        resizeMode="cover"
      />
      <Text style={[numberVerifiedStyles.headerText, {color: colors.text}]}>
        {VERIFIED_NUMBER_TITLE}
      </Text>
      <Text
        style={[
          numberVerifiedStyles.descriptionText,
          {
            color: colors.text,
          },
        ]}>
        {VERIFIED_NUMBER_DESCRIPTION}
      </Text>

      <TouchableOpacity
        style={numberVerifiedStyles.btn}
        onPress={() => {}}
        activeOpacity={0.7}>
        <Text style={numberVerifiedStyles.txt}>Register for webAuthn</Text>
      </TouchableOpacity>
      <View style={numberVerifiedStyles.textView}>
        <Text
          style={[numberVerifiedStyles.skipForNowText, {color: colors.text}]}>
          Skip for now and
        </Text>
        <Text
          style={numberVerifiedStyles.loginText}
          onPress={() => {
            navigation.replace(Routes.Home);
          }}>
          login
        </Text>
      </View>
    </View>
  );
};

export default NumberVerified;
