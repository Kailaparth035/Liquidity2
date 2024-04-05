import React, {useCallback, useEffect, useMemo} from 'react';
import {FlatList, Text, TouchableOpacity, View} from 'react-native';
import {useRecoilState, useRecoilValue} from 'recoil';
import { TabActions } from '@react-navigation/native';

import {useGetAuctionBids} from '../hooks/hooks';
import {Loader, SVG} from '../../../storybook';
import AuctionOrder from '../../../components/AuctionOrder';
import {isDarkModeState} from '../../../states';
import {
  COLORS,
  Svg_No_Auction_Dark,
  Svg_No_Auction_Light,
} from '../../../assets';
import {
  OpenAuctionBidState,
  OpenAuctionConfigState,
} from '../../../states/open-orders/states';

export const OpenAuctionBids = ({navigation}: any) => {
  const openAuctionBid = useRecoilValue(OpenAuctionBidState);
  const [openAuctionConfig, setOpenAuctionConfig] = useRecoilState(
    OpenAuctionConfigState,
  );
  const isDark = useRecoilValue(isDarkModeState);

  const {getAuctionList, isLoading} = useGetAuctionBids();

  useEffect(() => {
    getAuctionList('open');
  }, []);

  const handleStartBidding = useCallback(() => {
    const jump = TabActions.jumpTo("Auction");
    navigation.dispatch(jump);
  }, [navigation]);

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
        <TouchableOpacity
          style={{
            paddingVertical: 12,
            paddingHorizontal: 24,
            backgroundColor: COLORS['primary-dark'],
            borderRadius: 4,
            marginTop: 20,
          }}
          onPress={handleStartBidding}>
          <Text
            style={{
              fontWeight: '500',
              fontSize: 14,
              color: isDark ? COLORS['black'] : COLORS['white'],
            }}>
            Start Bidding
          </Text>
        </TouchableOpacity>
      </View>
    );
  }, [isDark]);

  const onRefresh = useCallback(() => {
    getAuctionList('open');
    setOpenAuctionConfig(0);
  }, []);

  const endReach = useCallback(() => {
    getAuctionList('open', openAuctionConfig + 1);
  }, [openAuctionConfig]);

  return (
    <View>
      {isLoading ? (
        <Loader />
      ) : (
        <View
          style={{
            height: '100%',
            width: '100%',
            backgroundColor: '',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <FlatList
            data={openAuctionBid}
            renderItem={({item}) => <AuctionOrder auctionBid={item} />}
            refreshing={false}
            onRefresh={onRefresh}
            keyExtractor={(item: any) => item.id}
            onEndReached={endReach}
            ListEmptyComponent={noData}
          />
        </View>
      )}
    </View>
  );
};
