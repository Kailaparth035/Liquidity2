import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {textDescriptionStyle} from './textDescription.style';
import {useTheme} from '@react-navigation/native';

const TextDescription = ({headerText, isPrice, price, firstLine, lastLine}) => {
  const {colors} = useTheme();
  return (
    <>
      <Text style={[textDescriptionStyle.headerText, {color: colors.text}]}>
        {headerText}
      </Text>
      <View style={textDescriptionStyle.descriptionView}>
        <Text
          style={[textDescriptionStyle.descriptionText, {color: colors.text}]}>
          {firstLine}
          {isPrice && (
            <Text
              style={[
                textDescriptionStyle.descriptionText,
                {color: colors.text, fontWeight: '700'},
              ]}>
              {price}
            </Text>
          )}
          {lastLine}
        </Text>
      </View>
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2c3e50',
  },
});

export default TextDescription;
