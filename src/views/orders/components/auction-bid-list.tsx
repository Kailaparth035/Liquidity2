import React, {FC, useMemo} from 'react';
import {View} from 'react-native';
import {OpenAuctionBids} from './open-auction-bids';
import {OutbidAuctionBids} from './outbid-auction-bids';
import {WonAuctionBids} from './won-auction-bids';

interface IAuctionBidsList {
  tab: string;
  navigation: any;
}

export const AuctionBidList: FC<IAuctionBidsList> = ({tab, navigation}) => {
  const renderList = useMemo(() => {
    switch (tab) {
      case 'Outbid':
        return <OutbidAuctionBids />;
      case 'Won':
        return <WonAuctionBids />;
      default:
        return <OpenAuctionBids navigation={navigation}/>;
    }
  }, [tab]);

  return <View style={{flex: 1}}>{renderList}</View>;
};
