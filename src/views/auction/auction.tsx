import React, {useCallback, useEffect, useState} from 'react';
import {FlatList, RefreshControl, View} from 'react-native';
import {useRecoilValue} from 'recoil';
import {useTheme} from '@react-navigation/native';

import {Header} from '../../components';
import {auctionStyles as styles} from './auction.styles';
import {Loader} from '../../storybook';
import {Svg_Search} from '../../assets';
import {auctionListState} from './states';
import {AuctionList} from './components';
import {Routes} from '../../views/routes/constants';
import {useNetwork} from '../../hooks';

export const Auction = ({navigation}: any) => {
  const auctionList = useRecoilValue(auctionListState);
  const [auctionsList, setAuctionsList] = useState([]);
  const [refreshing, setRefreshing] = React.useState(false);
  const [loader, setLoader] = React.useState(true);
  const {colors} = useTheme();
  const {get} = useNetwork();
  const goBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  useEffect(() => {
    setRefreshing(true);
    get('/auction?limit=20&offset=0')
      .then(res => {
        setAuctionsList(res?.data);
      })
      .catch(e => {
        console.log('Error in list', e);
      })
      .finally(() => {
        setRefreshing(false);
        setLoader(false);
      });
  }, []);
  const handleSearch = useCallback(() => {
    navigation.navigate(Routes.Search, {isAuction: true});
  }, []);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    get('/auction?limit=20&offset=0')
      .then(res => {
        setRefreshing(false);
        setAuctionsList(res?.data);
      })
      .catch(e => {
        setRefreshing(false);
        console.log('Error in Latest bids=', e);
      });
  }, []);

  return (
    <View style={styles.mainContainer}>
      <Header
        title="Auctions"
        rightIcon={Svg_Search}
        rightFunction={handleSearch}
      />

      {refreshing ? (
        <Loader top={30} />
      ) : (
        <View
          style={[styles.mainContainer, {backgroundColor: colors.headerCard}]}>
          <FlatList
            data={auctionsList}
            refreshControl={
              <RefreshControl
                tintColor={colors.text}
                refreshing={refreshing}
                onRefresh={onRefresh}
              />
            }
            renderItem={({item, index}) => (
              <AuctionList navigation={navigation} item={item} index={index} />
            )}
            keyExtractor={(item, index) => `${item}-${index}`}
          />
        </View>
      )}
    </View>
  );
};
