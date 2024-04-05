import React, {FC, useCallback, useMemo, useState, useEffect} from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import {useRecoilState, useRecoilValue, useSetRecoilState} from 'recoil';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useTheme} from '@react-navigation/native';

import {
  IsAddedToWatchListState,
  ProfileDataState,
  SelectedAssetDetailsState,
  SelectedAssetSheetState,
  SelectedMusicAssetDetailsState,
  UserWatchListState,
} from '../../../../states';
import {COLORS} from '../../../../assets';
import {formatNumber} from '../../../utils';
import {headerStyle as styles} from './assetsHeader.style';
import {useNetwork, usePlatform} from '../../../../hooks';
import {APIS, ASSETS} from '../../../../constants';
import {toast, WebSocket} from '../../../../libs';
import {Loader} from '../../../../storybook/loader';
import {ImageView} from '../../../../storybook/image';
import {useWatchList} from '../../../watchlist/hooks/get-watchlist';
import {ForexFlags} from '../../../../components';
import {useCurrency} from '../../../../hooks/use-currency';
import MusicalHeader from '../MusicalHeader';

interface IAssetsHeader {
  symbol: string;
  isLoggedIn: boolean;
}

export const AssetsHeader: FC<IAssetsHeader> = ({symbol, isLoggedIn}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [isInList, setIsInList] = useState<boolean>(false);
  const [assetId, setAssetId] = useState('');
  const [detailsPrice, setDetailsPrice] = useState(0);

  const {colors} = useTheme();
  const {getWatchList} = useWatchList();
  const {get: getSummaries, data: summaries} = useNetwork();
  const { get, data } = useNetwork();
  const {patch} = useNetwork();
  const {isIOS} = usePlatform();
  const {formatCurrency, formatCurrencyNumber, valueAfterDecimal} =
    useCurrency();
  const watchlist = useRecoilValue(UserWatchListState);
  const setStockDetails = useSetRecoilState(SelectedAssetDetailsState);
  const setIsAddedToWAtchlist = useSetRecoilState(IsAddedToWatchListState);
  const assetDetails = useRecoilValue(SelectedAssetDetailsState);
  const [musicSelectedAsset, setMusicSelectedAsset] = useRecoilState(SelectedMusicAssetDetailsState);
  const {
    symbol: assetsSymbol,
    type: assetsType,
    id,
  } = useRecoilValue(SelectedAssetSheetState);
  const profileData = useRecoilValue(ProfileDataState);

  const {profile, detail} = useMemo(
    () => assetDetails[symbol] ?? {},
    [assetDetails, symbol],
  );

  const issuerName = Object.keys(assetDetails);

  const {image, imageFrom, imageTo} = profile ?? {};
  const {COMMODITY, CRYPTO, FOREX, MARKETINDEX, STOCK, PARIVATE, MUSIC} = ASSETS;

  useEffect(() => {
    setDetailsPrice(detail?.assetPrice ?? detail?.price ?? 0);
  }, [detail]);

  useEffect(() => {
    watchlist?.assets.forEach((asset: {symbol: string}) => {
      if (asset.symbol === symbol) {
        setIsInList(true);
      }
    });
  }, [watchlist?.assets]);

  useEffect(() => {
    const tempAssetId =
      watchlist?.assets?.filter(asset => asset.symbol === symbol) ?? [];
    setAssetId(tempAssetId[0]?._id);
  }, [watchlist?.assets, symbol]);

  useEffect(() => {
    if (assetsSymbol && assetsType) {
      switch (assetsType) {
        case STOCK:
          getSummaries(`${APIS.StockSummaries}/${assetsSymbol}`);
          break;
        case CRYPTO:
          getSummaries(`${APIS.CryptoSummaries}/${assetsSymbol}`);
          break;
        case COMMODITY:
          getSummaries(`${APIS.CommoditySummaries}/${assetsSymbol}`);
          break;
        case FOREX:
          getSummaries(`${APIS.ForexSummaries}/${assetsSymbol}`);
          break;
        case MARKETINDEX:
          getSummaries(`${APIS.MarketIndexSummaries}/${assetsSymbol}`);
          break;
        case PARIVATE:
          getSummaries(`${APIS.PrivateSummaries}/${id}`);
          break;
        case MUSIC:
          get(`${APIS.Tokens}/${id}`)

      }
    }
  }, [assetsSymbol, assetsType]);

  useEffect(() => {
    if (summaries && summaries.message === 'ok') {
      setStockDetails(prevState => ({...prevState, [symbol]: summaries.data}));
    }
  }, [summaries]);

  useEffect(() => {
    if(data?.data){
      setMusicSelectedAsset(data.data)
    }
  }, [data])

  const handleAddToWatchlist = useCallback(async () => {
    const payload = {
      assets: [
        {
          symbol: symbol,
          index: (watchlist?.assets?.length ?? 0) + 1,
          type: assetsType,
        },
      ],
    };
    setLoading(true);
    try {
      await patch(`${APIS.AddToWatchlist}${profileData?.watchlistId}`, payload);
      setIsAddedToWAtchlist(preState => !preState);

      await getWatchList(true);
      setIsInList(true);
      setLoading(false);
      toast('Added to list');
    } catch (err) {
      setLoading(false);
      toast('Having issue in connecting to server, might loose data');
    }
  }, [watchlist?.assets]);

  const handleRemoveFromWatchlist = useCallback(async () => {
    const payload = {
      deleteAssets: [assetId],
    };

    setLoading(true);
    try {
      await patch(`${APIS.WatchLists}/${watchlist?._id}`, payload);
      setIsAddedToWAtchlist(preState => !preState);

      await getWatchList(true);
      setIsInList(false);
      setLoading(false);
      toast('Removed from list');
    } catch (err) {
      setLoading(false);
      toast('Having issue in connecting to server, might loose data');
    }
  }, [assetId, watchlist]);

  const img = image ?? imageFrom ?? '';

  const {price = 0, change = 0, changesPercentage = 0} = detail ?? {};

  useEffect(() => {
    WebSocket.emit('subscribe', {symbol: detail?.symbol});
    WebSocket.client.on(detail?.symbol?.toLowerCase?.() ?? '', data => {
      const price: any = data.lp;
      if (price) {
        setDetailsPrice(price);
      }
    });
  }, []);

  return (
    <View>
      {assetsType == 'music' ? (
        <MusicalHeader data={musicSelectedAsset} />
      ) : (
        detail && (
          <View style={styles.header}>
            <View style={{width: 50}}>
              {assetsType === 'forex' ? (
                <ForexFlags
                  imageFrom={imageFrom ?? ''}
                  imageTo={imageTo ?? ''}
                />
              ) : isIOS ? (
                image ? (
                  <ImageView
                    source={{uri: img}}
                    url={img}
                    style={styles.assetLogo}
                    alt={symbol?.[0] ?? ''}
                  />
                ) : (
                  <View
                    style={[
                      styles.symbolView,
                      {backgroundColor: colors.imagebg},
                    ]}>
                    <Text style={[styles.symbolText, {color: colors.text}]}>
                      {symbol?.[0] ?? ''}
                    </Text>
                  </View>
                )
              ) : image ? (
                <ImageView
                  source={{uri: img}}
                  url={img}
                  style={styles.assetLogo}
                  alt={symbol?.[0] ?? ''}
                />
              ) : (
                <View
                  style={[
                    styles.symbolViewAndroid,
                    {backgroundColor: colors.imagebg},
                  ]}>
                  <Text
                    style={[styles.symbolTextAndroid, {color: colors.text}]}>
                    {symbol?.[0] ?? ''}
                  </Text>
                </View>
              )}
            </View>
            <View style={styles.assetDetails}>
              <View style={styles.assetName}>
                <Text style={[styles.symbol, {color: colors.text}]}>
                  {issuerName ?? ''}
                </Text>
                <View style={[styles.dot, {backgroundColor: colors.text}]} />
                <Text
                  style={[
                    styles.name,
                    {color: colors.text, width: 200, paddingRight: 20},
                  ]}
                  numberOfLines={1}
                  ellipsizeMode={'tail'}>
                  {detail.name ?? ''}
                </Text>
              </View>
              <View style={styles.assetPrice}>
                <Text style={[styles.rate, {color: colors.text}]}>
                  {formatCurrency(
                    detailsPrice,
                    valueAfterDecimal(detailsPrice),
                  )}
                </Text>
                <Text
                  style={[
                    styles.percentageChange,
                    {
                      color:
                        detail.change > 0
                          ? COLORS['price-up']
                          : COLORS['price-down'],
                    },
                  ]}>
                  {`${formatCurrencyNumber(change, 2)} (${
                    detail.change > 0 ? '+' : ''
                  }${formatNumber(changesPercentage, 2)}%)`}
                </Text>
              </View>
            </View>
            {isLoggedIn && (
              <>
                {loading ? (
                  <Loader size={20} top={0} />
                ) : isInList ? (
                  <TouchableOpacity
                    onPress={handleRemoveFromWatchlist}
                    style={{marginTop: 18}}>
                    <Icon size={24} color={COLORS['accent-dark']} name="star" />
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    onPress={handleAddToWatchlist}
                    style={{marginTop: 18}}>
                    <Icon size={24} color={colors.text} name="star-outline" />
                  </TouchableOpacity>
                )}
              </>
            )}
          </View>
        )
      )}
    </View>
  );
};
