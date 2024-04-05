// @flow
import {useTheme} from '@react-navigation/native';
import {Auction_Image} from '../../../assets/images';
import React from 'react';
import {View, StyleSheet, Text, Image} from 'react-native';
import {useCurrency} from '../../../hooks/use-currency';
import moment from 'moment';
import {manupulate} from '../comman/utility';

type AuctionWinnerType = {
  item?: any;
};

const AuctionWinner = ({item}: AuctionWinnerType) => {
  const {colors} = useTheme();
  const {bidPrice, isWinner, name, profilePicture, status} = item;
  const {formatCurrency} = useCurrency();

  return (
    <View style={styles.parent}>
      <Image
        source={profilePicture ? {uri: profilePicture} : Auction_Image}
        style={styles.image}
      />
      <View style={styles.textConatiner}>
        <View style={styles.rowConatiner}>
          <Text style={[styles.subText, {color: colors.lightText}]}>
            Won by
          </Text>
          <Text style={[styles.subText, {color: colors.lightText}]}>
            Winning bid
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <Text
            style={[
              styles.nameText,
              {color: colors.text, paddingBottom: 4},
            ]}>{`${manupulate(name, isWinner)}`}</Text>
          <Text
            style={[styles.nameText, {color: '#33B87A', textAlign: 'right'}]}>
            {formatCurrency(bidPrice, 2)}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  parent: {marginTop: 12, flexDirection: 'row'},
  nameText: {fontSize: 18, lineHeight: 26, fontWeight: '600'},
  image: {height: 56, width: 56, borderRadius: 40},
  rowConatiner: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 4,
  },
  textConatiner: {flex: 1, paddingLeft: 12, justifyContent: 'center'},
  subText: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '500',
  },
});
export default AuctionWinner;
