import React, {useCallback, useEffect, useMemo} from 'react';
import {FlatList, Text, View} from 'react-native';
import {useRecoilState, useRecoilValue} from 'recoil';

import {useGetAuctionBids} from '../hooks/hooks';
import {Loader, SVG} from '../../../storybook';
import AuctionOrder from '../../../components/AuctionOrder';
import {isDarkModeState} from '../../../states';
import {Svg_No_Auction_Dark, Svg_No_Auction_Light} from '../../../assets';
import {
  WonAuctionBidState,
  WonAuctionConfigState,
} from '../../../states/open-orders/states';

export const WonAuctionBids = () => {
  const wonAuctionBid = useRecoilValue(WonAuctionBidState);
  const [WonAuctionConfig, setWonAuctionConfig] = useRecoilState(
    WonAuctionConfigState,
  );
  const isDark = useRecoilValue(isDarkModeState);

  const {getAuctionList, isLoading} = useGetAuctionBids();

  useEffect(() => {
    getAuctionList('won');
  }, []);

  const onRefresh = useCallback(() => {
    getAuctionList('won');
    setWonAuctionConfig(0);
  }, []);

  const endReach = useCallback(() => {
    getAuctionList('won', WonAuctionConfig + 1);
  }, [WonAuctionConfig]);

  const noData = useMemo(() => {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: '',
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

  return (
    <View>
      {isLoading ? (
        <Loader />
      ) : (
        <FlatList
          data={wonAuctionBid}
          renderItem={({item}) => <AuctionOrder auctionBid={item} />}
          refreshing={false}
          onRefresh={onRefresh}
          keyExtractor={(item: any) => item.id}
          onEndReached={endReach}
          ListEmptyComponent={noData}
        />
      )}
    </View>
  );
};
