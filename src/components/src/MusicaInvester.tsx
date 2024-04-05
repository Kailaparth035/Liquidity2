import {View, Text, Image, StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useTheme} from '@react-navigation/native';
import {useCurrency} from '../../hooks/use-currency';

type MusicStreamType = {
  artist: any;
};
const MusicStream = ({artist}: MusicStreamType) => {
  const {name, image_url, album} = artist;
  const {name: albumName} = album[0];

  const {colors} = useTheme();
  const [songInvestedPrice, setSongInvestedPrice] = useState('');
  const [songRealPrice, setSongRealPrice] = useState('0');
  const [songRealPricePercentage, setSongRealPricePercentage] = useState('0');
  const {formatCurrency} = useCurrency();
  useEffect(() => {
    const randomeNumberInvestedPrice = (Math.random() * 139.09).toFixed(2);
    const randomeNumberRealPrice = (Math.random() * 0.56).toFixed(2);
    const randomeNumberPercentagePrice = (Math.random() * 0.25).toFixed(2);
    setSongInvestedPrice(randomeNumberInvestedPrice);
    setSongRealPrice(randomeNumberRealPrice);
    setSongRealPricePercentage(randomeNumberPercentagePrice);
  }, []);

  return (
    <View style={styles.container}>
      <View style={{margin: 10, flexDirection: 'row'}}>
        <Image source={{uri: image_url}} style={styles.image} />
        <View style={styles.text1}>
          <Text
            style={(styles.header, {color: colors.text, width: 150})}
            numberOfLines={1}
            ellipsizeMode={'tail'}>
            {name ?? '---'}
          </Text>
          <Text
            style={{
              fontSize: 12,
              fontWeight: '400',
              lineHeight: 16,
              color: colors.text,
              width: 150,
            }}
            numberOfLines={1}>
            {albumName ?? '---'}
          </Text>
        </View>
        <View style={styles.text2}>
          <Text style={[styles.header, {color: colors.text}]}>
            {formatCurrency(songInvestedPrice, 2)}
          </Text>
          <Text
            style={{
              fontSize: 12,
              lineHeight: 16,
              fontWeight: '500',
              color: '#008000',
            }}>
            {formatCurrency(songRealPrice, 2)}(+{songRealPricePercentage}%)
          </Text>
        </View>
      </View>
    </View>
  );
};
export default MusicStream;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 5,
    borderTopWidth: 0.5,
    borderTopColor: 'grey',
    marginHorizontal: 15,
  },
  image: {
    height: 50,
    width: 50,
    borderRadius: 100,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  text1: {
    flex: 1,
    marginLeft: 15,
    justifyContent: 'center',
    textAlign: 'center',
  },
  text2: {
    flex: 1,
    alignItems: 'flex-end',
    marginRight: 5,
    justifyContent: 'center',
    textAlign: 'center',
  },
  header: {
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 20,
  },
});
