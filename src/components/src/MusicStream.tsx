import {View, Text, StyleSheet, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useTheme} from '@react-navigation/native';
import {capitalize, formatNumberInShort} from '../../views/utils';
import {
  SoundCloud_Music,
  spotify_Music,
  YouTube_music,
  Prime_Music,
} from '../../assets/images';

const MusicStream = ({item}: any) => {
  const [streamValue, setSreamValue] = useState(0);
  const {colors} = useTheme();

  const getIcon = (name: string) => {
    switch (name) {
      case 'soundCloud':
        return SoundCloud_Music;
      case 'spotify':
        return spotify_Music;
      case 'youtube':
        return YouTube_music;
      default:
        return Prime_Music;
    }
  };

  useEffect(() => {
    const randomeNumber = (Math.random() * 64.42).toFixed(2);
    setSreamValue(randomeNumber);
  }, []);

  return (
    <View style={styles.container}>
      <View style={[styles.heder, {borderBottomColor: colors.lineBorder}]}>
        <View
          style={{
            paddingRight: 8,
          }}>
          <Image
            source={getIcon(Object.keys(item)[0])}
            style={{
              height: 24,
              width: 24,
            }}
          />
        </View>
        <Text style={[styles.spotify_name, {color: colors.text}]}>
          {capitalize(Object.keys(item ?? {})?.[0] ?? "")}
        </Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          marginHorizontal: 10,
          paddingVertical: 15,
        }}>
        <View style={{flex: 1}}>
          <Text
            style={{
              fontSize: 12,
              lineHeight: 20,
              fontWeight: '400',
              color: colors.text,
            }}>
            {Object.keys(item)[0] === 'youtube' ? 'Views' : 'Streams'}
          </Text>
          <Text
            style={{
              paddingVertical: 4,
              fontSize: 12,
              lineHeight: 16,
              fontWeight: '400',
              color: colors.text,
            }}>
            {Object.keys(item)[0] === 'youtube' ? 'Likes' : 'Popularity'}
          </Text>
        </View>
        <View style={{alignItems: 'flex-end'}}>
          <Text
            style={[styles.valueFont, {lineHeight: 20, color: colors.text}]}>
            {item[Object.keys(item)[0]].plays
              ? formatNumberInShort(item[Object.keys(item)[0]].plays)
              : 'NA'}
          </Text>
          <Text
            style={[
              styles.valueFont,
              {paddingVertical: 4, lineHeight: 16, color: colors.text},
            ]}>
            {Object.keys(item)[0] === 'youtube'
              ? item[Object.keys(item)[0]].likes
                ? formatNumberInShort(item[Object.keys(item)[0]].likes)
                : 'NA'
              : streamValue + '/100'}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 8,
    paddingHorizontal: 10,
  },
  heder: {
    flexDirection: 'row',

    borderBottomWidth: 0.5,
    marginHorizontal: 8,
  },
  spotify_name: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '600',
    paddingVertical: 3,
    marginBottom: 10,
    textAlignVertical: 'center',
    // paddingHorizontal: 15,
  },
  valueFont: {
    fontSize: 12,

    fontWeight: '500',
  },
});
export default MusicStream;
