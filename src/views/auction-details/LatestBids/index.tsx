// @flow
import {APIS} from '../../../constants';
import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  RefreshControl,
  Image,
} from 'react-native';
import Bid from '../components/Bid';
import ScreenView from '../components/ScreenView';
import {useNetwork} from '../../../hooks';
import {COLORS} from 'assets';
import {useTheme} from '@react-navigation/native';
import {NoBids_Image} from '../../../assets/images';

type LatestBidsType = {
  navigation: any;
};

const LatestBids = ({navigation, route}: LatestBidsType) => {
  const {get} = useNetwork();
  const [latestBids, setLatestBids] = useState([]);
  const {auctionId} = route.params;
  const {colors} = useTheme();
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    get(APIS.latestBidPriceByAuctionId + auctionId)
      .then(res => {
        setLatestBids(res?.data);
        setRefreshing(false);
      })
      .catch(e => {
        setRefreshing(false);
        console.log('Error in Latest bids=', e);
      });
  }, []);

  useEffect(() => {
    // latest bid
    // https://api.pp.satschel.com/v1/latest-bid-price?auctionId=b082d17c-3c0f-48e7-87f2-35f5961e0026

    //
    get(APIS.latestBidPriceByAuctionId + auctionId)
      .then(res => {
        setLatestBids(res?.data);
      })
      .catch(e => {
        console.log('Error in Latest bids=', e);
      });
  }, []);
  return (
    <ScreenView navigation={navigation} title="Latest bids" iconName={'close'}>
      <View style={{flex: 1}}>
        <ScrollView
          style={styles.parent}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{marginBottom: 32}}>
          {latestBids?.length !== 0 ? (
            latestBids.map(item => <Bid item={item} />)
          ) : (
            <View style={styles.noBidConatiner}>
              <Image source={NoBids_Image} />
              <Text style={[styles.noBis, {color: colors.lightText}]}>
                No Bids Yet
              </Text>
            </View>
          )}
        </ScrollView>
      </View>
    </ScreenView>
  );
};

const styles = StyleSheet.create({
  parent: {},
  noBidConatiner: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  noBis: {
    fontSize: 20,
    lineHeight: 24,
    fontWeight: '600',
    paddingTop: 12,
  },
});
export default LatestBids;
