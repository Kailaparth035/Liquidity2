// @flow
import {useTheme} from '@react-navigation/native';
import React, {useState} from 'react';
import {View, StyleSheet, TouchableOpacity, Text} from 'react-native';
import {ISelectedMusicAssestDetails} from 'states';

type DiscriptionType = {
  artistName?: string;
  discription?: string;
  symbol?: ISelectedMusicAssestDetails | undefined;
  alubmName?: ISelectedMusicAssestDetails | string;
};

const Discription = ({
  artistName,
  discription,
  symbol,
  alubmName,
}: DiscriptionType) => {
  const [showText, setShowText] = useState(false);
  const {colors} = useTheme();
  return (
    <View>
      <View style={[style.title, {borderBottomColor: colors.border}]}>
        <Text style={[style.fontStyle, {color: colors.text}]} numberOfLines={1}>
          {artistName}
        </Text>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: 5,
          }}>
          <Text style={[style.titleText, {color: colors.text}]}>{symbol}</Text>

          <View
            style={{
              width: 4,
              height: 4,
              marginHorizontal: 5,
              borderRadius: 10,
              backgroundColor: colors.text,
              opacity: 0.6,
            }}></View>

          <Text
            style={[style.titleText, {color: colors.text}]}
            numberOfLines={1}>
            {alubmName}
          </Text>
        </View>
        <View style={{flex: 1, flexWrap: 'wrap', flexDirection: 'row'}}>
          <Text
            style={[style.titleText, {color: colors.text, paddingTop: 8}]}
            numberOfLines={showText ? undefined : 3}>
            {discription}
          </Text>
          <TouchableOpacity
            onPress={() => {
              setShowText(!showText);
            }}>
            <Text
              style={{
                fontSize: 12,
                fontWeight: '600',
                lineHeight: 16,
                color: '#F5BA45',
              }}>
              {!showText ? 'More' : 'Less'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  parent: {},
  title: {
    paddingVertical: 10,
    marginHorizontal: 20,
    borderBottomColor: 'grey',
    borderBottomWidth: 0.5,
    fontWeight: '500',
    fontSize: 16,
  },
  fontStyle: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '600',
  },
  titleText: {
    opacity: 0.6,
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '500',
    color: 'rgba(245, 196, 98, 1)',
  },
  whiteTitle: {
    fontWeight: '600',
    fontSize: 14,
    lineHeight: 20,
    color: 'rgba(245, 196, 98, 1)',
  },
});
export default Discription;
