import React, {useCallback, useEffect, useMemo} from 'react';
import {FlatList, Text, View} from 'react-native';
import {useRecoilState, useRecoilValue} from 'recoil';

import {useGetAuctionBids} from '../hooks/hooks';
import {Loader, SVG} from '../../../storybook';
import AuctionOrder from '../../../components/AuctionOrder';
import {isDarkModeState} from '../../../states';
import {Svg_No_Auction_Dark, Svg_No_Auction_Light} from '../../../assets';
import {
  OutbidAuctionBidState,
  OutbidAuctionConfigState,
} from '../../../states/open-orders/states';

export const OutbidAuctionBids = () => {
  const outbidAuctionBid = useRecoilValue(OutbidAuctionBidState);
  const [outbidAuctionConfig, setOutbidAuctionBidConfig] = useRecoilState(
    OutbidAuctionConfigState,
  );
  const isDark = useRecoilValue(isDarkModeState);

  const {getAuctionList, isLoading} = useGetAuctionBids();

  useEffect(() => {
    getAuctionList('outbid');
  }, []);

  const noData = useMemo(() => {
    return (
      <View
        style={{
          flex: 1,
          marginTop: '30%',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <SVG
          name={isDark ? Svg_No_Auction_Dark : Svg_No_Auction_Light}
          height={150}
          width={150}
        />
        <Text style={{color: 'gray', textAlign: 'center'}}>
          There are currently no auctions to show. Start bidding on live
          auctions now.
        </Text>
      </View>
    );
  }, [isDark]);

  const onRefresh = useCallback(() => {
    getAuctionList('outbid');
    setOutbidAuctionBidConfig(0);
  }, []);

  const endReached = useCallback(() => {
    getAuctionList('outbid', outbidAuctionConfig + 1);
  }, [outbidAuctionConfig]);

  return (
    <View>
      {isLoading ? (
        <Loader />
      ) : (
        <FlatList
          data={outbidAuctionBid}
          renderItem={({item}) => <AuctionOrder auctionBid={item} />}
          refreshing={false}
          onRefresh={onRefresh}
          keyExtractor={(item: any) => item.id}
          onEndReached={endReached}
          ListEmptyComponent={noData}
        />
      )}
    </View>
  );
};
