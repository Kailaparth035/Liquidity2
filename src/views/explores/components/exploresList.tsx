import React, {useCallback, useMemo, useState} from 'react';
import {RefreshControl, Text, View} from 'react-native';
import {useRecoilState, useRecoilValue} from 'recoil';

import {Default_Watchlist} from '../../../assets';
import {FlatListScroll} from '../../../storybook/flatlist';
import {Loader} from '../../../storybook/loader';
import {SVG} from '../../../storybook/svg';
import ExploreRow from './exploreRow';
import HeaderCard from './header-card/header-card';
import {
  CommoditiesExploresState,
  CryptoExploresState,
  ExploresPaginationLoading,
  ForexExploresState,
  isDarkModeState,
  PrivateExploresState,
  StocksExploresState,
} from '../../../states';
import {usePaginationExplore} from '../../watchlist/hooks/get-watchlist';
import {MULTI_ASSETS} from '../../../constants';
import {exploreStyles as styles} from '../explore.styles';
import {useTheme} from '@react-navigation/native';
import {Default_Watchlist_Light} from '../../../assets/icon/default-watchlist-light';
import {useWatchList} from '../../watchlist/hooks/get-watchlist';

interface IEndReachedEvent {
  distanceFromEnd: number;
}

const ExploreList = ({tab: data, type, marketIndexes, navigation}: any) => {
  const privateExplores = useRecoilValue(PrivateExploresState);
  const forexExplores = useRecoilValue(ForexExploresState);
  const cryptoExplores = useRecoilValue(CryptoExploresState);
  const stocksExplores = useRecoilValue(StocksExploresState);
  const [darkApp, setDarkApp] = useRecoilState(isDarkModeState);
  const commoditiesExplores = useRecoilValue(CommoditiesExploresState);
  const paginationLoading = useRecoilValue(ExploresPaginationLoading);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const {getSingleTab} = usePaginationExplore();
  const {colors} = useTheme();
  const {getWatchList} = useWatchList();

  const {CRYPTO, STOCKS, COMMODITIES, FOREX, PRIVATES} = MULTI_ASSETS;
  const assets = [CRYPTO, STOCKS, COMMODITIES, FOREX];

  const tab = useMemo(() => {
    switch (type) {
      case CRYPTO:
        if (cryptoExplores.length > 0) {
          return cryptoExplores;
        }
        return data;
      case STOCKS:
        if (stocksExplores.length > 0) {
          return stocksExplores;
        }
        return data;
      case COMMODITIES:
        if (commoditiesExplores.length > 0) {
          return commoditiesExplores;
        }
        return data;
      case FOREX:
        if (forexExplores.length > 0) {
          return forexExplores;
        }
        return data;
      case PRIVATES:
        if (privateExplores.length > 0) {
          return privateExplores;
        }
        return data;
      default:
        return data;
    }
  }, [
    type,
    cryptoExplores,
    stocksExplores,
    commoditiesExplores,
    forexExplores,
    privateExplores,
  ]);

  const onEndReached = useCallback(
    (e: IEndReachedEvent) => {
      if (type != 'privates') {
        if (-100 < e.distanceFromEnd) {
          getSingleTab(type);
        }
      }
    },
    [type, getSingleTab],
  );

  const refreshing = useCallback(() => {
    setIsRefreshing(true);
    getWatchList(true);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 1000);
  }, []);

  let markets = tab;
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.background,
      }}>
      <View
        style={[styles.exploreContainer, {backgroundColor: colors.background}]}>
        {tab?.length > 0 && marketIndexes?.length > 0 && (
          <HeaderCard tab={markets} type={type} navigation={navigation} />
        )}
        {tab?.length > 0 ? (
          <FlatListScroll
            data={tab}
            renderItem={({item, index}) => (
              <>
                <ExploreRow
                  row={item}
                  type={type}
                  navigation={navigation}
                  index={index}
                />
                {index === tab.length - 1 &&
                paginationLoading &&
                assets.includes(type) ? (
                  <Loader />
                ) : null}
              </>
            )}
            keyExtractor={(item, i) => `${item.name}__${i}`}
            style={{flex: 0.9, paddingBottom: 16}}
            onEndReached={onEndReached}
            refreshControl={
              <RefreshControl
                refreshing={isRefreshing}
                onRefresh={refreshing}
                title="Pull to refresh"
                tintColor={colors.text}
                titleColor={colors.text}
              />
            }
          />
        ) : (
          <View style={styles.noData}>
            {darkApp === true ? (
              <SVG name={Default_Watchlist} height={280} />
            ) : (
              <SVG name={Default_Watchlist_Light} height={280} />
            )}
            <Text style={styles.noDataTxt}>Data not found</Text>
          </View>
        )}
      </View>
    </View>
  );
};

export default ExploreList;
