// @flow
import React from 'react';
import {View, StyleSheet, Text, Image} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {MusicLogo_Image} from '../../assets/images';
import InfoBlock from '../../views/auction-details/components/InfoBlock';
import moment from 'moment';

const AuctionOrder = ({auctionBid}: any) => {
  const {colors} = useTheme();

  const {
    name,
    bidPrice,
    assetIcon,
    currentPrice,
    status,
    bidStatus,
    endTime,
    symbol,
    symbolValue,
    category,
    tradeType,
    product,
  } = auctionBid ?? {};

  const auctionTypesList = [tradeType, product, category];

  return (
    <View
      style={[
        styles.parent,
        {
          backgroundColor: colors.background,

          borderColor: colors.border,
        },
      ]}>
      <View style={{flexDirection: 'row'}}>
        <Image source={assetIcon?.length ? assetIcon : MusicLogo_Image} />
        <View style={styles.textContainer}>
          <Text style={[styles.title, {color: colors.text}]}>
            {name ?? 'NA'}
          </Text>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={[styles.subText, {color: colors.lightText}]}>
              {symbolValue ?? 'NA'}
            </Text>
            <View style={styles.dot} />
            <Text style={[styles.subText, {color: colors.lightText}]}>
              {symbol ?? 'NA'}
            </Text>
          </View>
        </View>
        <View>
          <Text style={[styles.timeText, {color: colors.text}]}>
            {moment(endTime).format('hh:mm:ss') ?? 'NA'}
          </Text>
        </View>
      </View>
      <View style={{paddingVertical: 8}}>
        <View style={{flexDirection: 'row'}}>
          <InfoBlock title="My bid price" value={bidPrice ?? 'NA'} />
          <InfoBlock title="Current bid price" value={currentPrice ?? 'NA'} />
        </View>
        <View style={{flexDirection: 'row', paddingTop: 8}}>
          <InfoBlock title="Your Bid status" value={bidStatus ?? 'NA'} />
          <InfoBlock title="Auction Status" value={status ?? 'NA'} />
        </View>
      </View>
      <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
        {auctionTypesList?.map((item, index) => {
          return (
            <View
              style={{
                backgroundColor: colors.border,
                marginLeft: 4,
                borderRadius: 4,
              }}
              key={index}>
              <Text style={[styles.category, {color: colors.text}]}>
                {item}
              </Text>
            </View>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  parent: {paddingHorizontal: 16, paddingVertical: 12, borderBottomWidth: 1},
  textContainer: {
    flex: 1,
    paddingLeft: 12,
    paddingTop: 4,
  },
  title: {
    lineHeight: 20,
    fontWeight: '600',
    fontSize: 14,
  },
  subText: {
    lineHeight: 16,
    fontWeight: '500',
    fontSize: 12,
  },
  dot: {
    width: 4,
    height: 4,
    backgroundColor: 'rgba(214, 214, 214, 1)',
    borderRadius: 4,
    margin: 6,
  },
  timeText: {lineHeight: 20, fontWeight: '500', fontSize: 14},
  category: {
    lineHeight: 16,
    fontWeight: '500',
    fontSize: 12,

    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
});
export default AuctionOrder;
