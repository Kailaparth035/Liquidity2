// @flow
import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Image, Text} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useTheme} from '@react-navigation/native';
import {COLORS} from '../../../../assets';
import BottomText from './components/BottomText';
import LinearGradient from 'react-native-linear-gradient';
import {
  ISelectedMusicAssestDetails,
  ISelectedMusicAssets,
} from '../../../../states';
import {useCurrency} from '../../../../hooks/use-currency';
import moment from 'moment';
import {formatNumberInShortForDecimal} from '../../../../views/utils';

type MusicalHeaderType = {
  data: ISelectedMusicAssets;
};

const MusicalHeader = ({data}: MusicalHeaderType) => {
  const {
    name,
    image,
    duration,
    releaseDate,
    artist,
    amount,
    change, 
    changesPercentage,
  } = data ?? {};

  // console.log('data ::::', data);

  const {colors} = useTheme();
  const {formatCurrency, formatCurrencyNumber, valueAfterDecimal} = useCurrency();
  const [openPrice, setOpenPrice] = useState(0);
  const [hightPrice, setHightPrice] = useState(0);
  const [lowPrice, setLowPrice] = useState(0);
  const [closePrice, setClosePrice] = useState(0);

  useEffect(() => {
    const randomeheaderOpenvalue = (Math.random() * 183.77).toFixed(2);
    const randomeheaderHighValue = (Math.random() * 184.9).toFixed(2);
    const randomeheaderLowValue = (Math.random() * 178.77).toFixed(2);
    const randomeheaderCloseValue = (Math.random() * 180.92).toFixed(2);

    setOpenPrice(randomeheaderOpenvalue);
    setHightPrice(randomeheaderHighValue);
    setLowPrice(randomeheaderLowValue);
    setClosePrice(randomeheaderCloseValue);
  }, [1]);

  return (
    <LinearGradient
      colors={['rgba(235, 164, 0, .4)', 'rgba(27, 29, 34, 0)']}
      style={{
        flex: 1,
        paddingLeft: 15,
        paddingRight: 15,
        borderRadius: 5,
      }}>
      <View style={styles.parent}>
        <View style={{flexDirection: 'row'}}>
          <Image source={{uri: image}} style={styles.imageStyle} />
          <View style={{flex: 1}}>
            <Text style={[styles.title, {color: colors.text, flex: 1}]}>
              {name ?? '--'}
            </Text>
            <View style={{flexDirection: 'row', paddingTop: 4}}>
              <Text style={[styles.amount, {color: colors.text}]}>
               
              {formatCurrency(
                    amount,
                    valueAfterDecimal(amount ?? "0")
                  )}
              </Text>

              <View style={styles.statistics}>
                <Icon
                  style={{padding: 4}}
                  size={16}
                  color={
                    change > 0 ? COLORS['price-up'] : COLORS['price-down']
                  }
                  name={change > 0 ? 'arrow-drop-up' : 'arrow-drop-down'}
                />
                <Text
                  style={[
                    styles.statValue,
                    {
                      paddingTop: 4,
                      color:
                        change > 0
                          ? COLORS['price-up']
                          : COLORS['price-down'],
                    },
                  ]}>
                  {change?.toFixed(4) ?? 0}
                </Text>
                <Text
                  style={[
                    styles.percentage,
                    {
                      paddingTop: 4,
                      color:
                        changesPercentage > 0
                          ? COLORS['price-up']
                          : COLORS['price-down'],
                    },
                  ]}>
                  ({changesPercentage?.toFixed(2) ?? 0}%)
                </Text>
              </View>
            </View>
            <View style={{paddingTop: 12}}>
              <View style={{flexDirection: 'row'}}>
                <Text style={[styles.time, {color: colors.text}]}>
                  {moment.utc(duration).format('mm:ss')}
                </Text>
                <View style={styles.dot} />

                <Text style={[styles.year, {color: colors.text}]}>
                  {moment(releaseDate).format('YYYY')}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingTop: 4,
                }}>
                <Image
                  source={{
                    uri: artist?.image_url,
                  }}
                  style={styles.artistImage}
                />
                <Text style={[styles.artestTitle, {color: colors.text}]}>
                  {artist?.name}
                </Text>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.bottomTextContainer}>
          <BottomText title="Open" value={openPrice} />
          <BottomText title="High" value={hightPrice} />
          <BottomText title="Low" value={lowPrice} />
          <BottomText title="Prev. Close" value={closePrice} />
        </View>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  parent: {paddingHorizontal: 16, marginVertical: 24},
  imageStyle: {
    height: 104,
    width: 104,
    marginRight: 16,
    borderRadius: 4,
  },
  title: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '500',
  },
  amount: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '600',
  },
  country: {
    fontSize: 10,
    lineHeight: 15,
    fontWeight: '600',
    alignSelf: 'flex-end',
    paddingBottom: 3,
  },
  statistics: {
    alignItems: 'center',
    flexDirection: 'row',
    marginLeft: 4,
  },
  statValue: {
    color: 'green',
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '500',
    paddingBottom: 3,
    paddingRight: 4,
  },
  percentage: {
    color: 'green',
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '500',
    paddingBottom: 3,
  },
  time: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '400',
  },
  dot: {
    height: 4,
    width: 4,
    borderRadius: 24,
    marginVertical: 6,
    marginHorizontal: 8,
    backgroundColor: '#878C99',
    alignSelf: 'center',
  },
  year: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '400',
  },
  artistImage: {
    height: 24,
    width: 24,
    borderRadius: 40,
    marginRight: 4,
    borderWidth: 1,
    borderColor: 'hsla(0,0%,0%,0.12)',
  },
  bottomTextContainer: {
    flexDirection: 'row',
    marginTop: 16,
    justifyContent: 'space-evenly',
  },
  artestTitle: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '400',
  },
});
export default MusicalHeader;
