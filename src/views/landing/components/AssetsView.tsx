// @flow
import React, {useCallback, useEffect, useState} from 'react';
import {View, FlatList, Text, RefreshControl} from 'react-native';

import {useRecoilSnapshot, useRecoilState, useRecoilValue} from 'recoil';
import {
  CommoditiesExploresState,
  ExploresPaginationLoading,
  ForexExploresState,
  MusicExploresState,
  PrivateExploresState,
  Sba7ExploresState,
  StocksExploresState,
  UserWatchListState,
  isDarkModeState,
  ExploresConfigState,
} from '../../../states';
import ExploreRow from '../../explores/components/exploreRow';
import HeaderCard from '../../../views/explores/components/header-card/header-card';
import {
  usePaginationExplore,
  useTabExplore,
} from '../../../views/watchlist/hooks/get-watchlist';
import {Loader} from '../../../storybook';
import {MULTI_ASSETS, NO_ASSET, SUB_NO_ASSET} from '../../../constants';
import {styles} from './AssetView.style';
import {useTheme} from '@react-navigation/native';
import {SVG} from '../../../storybook/svg';
import {SVG_NO_ASSET_DARK} from '../../../assets/icon/svg/no-asset-dark';
import {SVG_NO_ASSET_LIGHT} from '../../../assets/icon/svg/no-asset';
import EmptyWatchlist from '../../../views/watchlist/components/empty-watchlist';
type AssetsViewType = {
  assetType?: any;
  navigation?: any;
  index?: any;
  watchlistName: string;
};
interface IEndReachedEvent {
  distanceFromEnd: number;
}
const AssetsView = ({
  watchlistName,
  index,
  assetType,
  navigation,
}: AssetsViewType) => {
  const [assetData, setAssetData] = useState<any>([]);
  const commoditiesExplores = useRecoilValue(CommoditiesExploresState);
  const watchlist = useRecoilValue(UserWatchListState);
  const forexExplores = useRecoilValue(ForexExploresState);
  const stocksExplores = useRecoilValue(StocksExploresState);
  const privateExplores = useRecoilValue(PrivateExploresState);
  const musicExplores = useRecoilValue(MusicExploresState);
  const sba7Explores = useRecoilValue(Sba7ExploresState);
  const paginationLoading = useRecoilValue(ExploresPaginationLoading);
  const {getSingleTab} = usePaginationExplore();
  const {getTabAssets} = useTabExplore();
  const {colors} = useTheme();
  const [isDark] = useRecoilState(isDarkModeState);
  const {CRYPTO, STOCKS, COMMODITIES, FOREX, PRIVATES} = MULTI_ASSETS;
  const [exploreConfig, setExploreConfig] = useRecoilState(ExploresConfigState);
  const assets = [CRYPTO, STOCKS, COMMODITIES, FOREX, PRIVATES];
  const [refreshing, setRefreshing] = React.useState(false);
  const getAssetData = useCallback(() => {
    switch (assetType) {
      case watchlistName:
        setAssetData(watchlist?.assets);
        break;
      case 'stocks':
        setAssetData(stocksExplores);
        break;
      case 'privates':
        setAssetData(privateExplores);
        break;
      case 'commodities':
        setAssetData(commoditiesExplores);
        break;
      case 'forex':
        setAssetData(forexExplores);
        break;
      case 'music':
        setAssetData(musicExplores);
        break;
      case 'sba7':
        setAssetData(sba7Explores);
        break;
      default:
        setAssetData([]);
    }
  }, [
    index,
    stocksExplores,
    forexExplores,
    commoditiesExplores,
    watchlist?.assets,
    musicExplores,
    privateExplores,
  ]);

  useEffect(() => {
    getAssetData();
  }, [
    index,
    stocksExplores?.length,
    forexExplores?.length,
    commoditiesExplores?.length,
    watchlist,
    musicExplores,
    sba7Explores,
    privateExplores,
  ]);

  const onEndReached = useCallback(
    (e: IEndReachedEvent) => {
      if (-100 < e.distanceFromEnd) {
        getSingleTab(assetType);
      }
    },
    [assetType, getSingleTab],
  );

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setExploreConfig(prev => {
      const config = JSON.parse(JSON.stringify(prev));
      config['privates'] = {
        limit: 20,
        offset: 0,
      };
      return {...config};
    });

    getTabAssets('privates')
      ?.then(res => {
        setRefreshing(false);
      })
      .catch(e => {
        setRefreshing(false);
      });
  }, []);

  return assetData?.length === 0 ? (
    assetType === watchlistName ? (
      <EmptyWatchlist />
    ) : (
      <View style={styles.noAsset}>
        <SVG
          name={isDark ? SVG_NO_ASSET_DARK : SVG_NO_ASSET_LIGHT}
          width={120}
          height={120}
        />
        <Text
          style={[styles.momentText, {color: colors.text}]}
          numberOfLines={2}>
          {NO_ASSET}
        </Text>
        <Text style={styles.subMomentText} numberOfLines={3}>
          {SUB_NO_ASSET}
        </Text>
      </View>
    )
  ) : (
    <View style={[styles.conatainer, {backgroundColor: colors.background}]}>
      <HeaderCard tab={assetData} type={assetType} navigation={navigation} />
      <FlatList
        contentContainerStyle={styles.flatListStyle}
        data={assetData}
        refreshControl={
          <RefreshControl
            tintColor={colors.text}
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
        renderItem={({item, index}) => {
          return (
            <>
              <ExploreRow
                row={item}
                type={assetType}
                navigation={navigation}
                index={index}
              />
              {index === assetData.length - 1 &&
              paginationLoading &&
              assets.includes(assetType) ? (
                <Loader />
              ) : null}
            </>
          );
        }}
        onEndReached={onEndReached}
      />
    </View>
  );
};

export default AssetsView;
