// @flow
import React from 'react';
import {View, StyleSheet, Text, Image} from 'react-native';
import moment from 'moment';
import {useRecoilValue} from 'recoil';
import {useTheme} from '@react-navigation/native';
import {Auction_Image} from '../../../assets/images';
import {useCurrency} from '../../../hooks/use-currency';
import {manupulate} from '../comman/utility';
import {auctionDetailsState} from '../states';

type BidType = {
  item?: any;
};

const Bid = ({item}: BidType) => {
  const {colors} = useTheme();
  const AuctionDetails = useRecoilValue(auctionDetailsState);
  const {formatCurrency} = useCurrency();
  return (
    <View style={styles.parent}>
      <Image
        source={{uri: item?.profilePictureUrl} ?? Auction_Image}
        style={styles.image}
      />
      <View style={{flex: 1, paddingLeft: 8,flexDirection: 'row'}}>
        <View
          style={{
            flex:0.7
          }}>
          <Text style={[styles.text, {color: colors.text}]} numberOfLines={1}>
            {item?.userId}
          </Text>
          <Text style={[styles.lightText, {color: colors.lightText,textTransform:"capitalize"}]}>
            {item?.userType}
          </Text>
        </View>
        <View
          style={{
            flex:0.3,
            alignItems:"flex-end"
          }}>
          <Text style={[styles.text, {color: colors.text}]} numberOfLines={1}>
            {formatCurrency(item?.maxBidPrice, 2)}
          </Text>
          <Text style={[styles.lightText, {color: colors.lightText}]}>
            {moment(item?.createdAt).fromNow()}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  parent: {paddingTop: 12, flexDirection: 'row'},
  image: {height: 40, width: 40, borderRadius: 40},
  text: {fontSize: 14, lineHeight: 20, fontWeight: '600'},
  lightText: {fontSize: 12, lineHeight: 16, fontWeight: '500', paddingTop: 4},
});
export default Bid;
