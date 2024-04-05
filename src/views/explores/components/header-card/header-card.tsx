import React, {useCallback, useMemo} from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {useRecoilValue, useSetRecoilState} from 'recoil';

import {COLORS} from '../../../../assets';
import {useTrackEvents} from '../../../../helpers';
import {useCurrency} from '../../../../hooks/use-currency';
import {
  CryptoSocketState,
  SelectedAssetSheetState,
  SelectedMusicAssetDetailsState,
  StockSocketState,
} from '../../../../states';
import {Routes} from '../../../routes/constants';
import {formatNumber} from '../../../utils';
import {headerCardStyles as styles} from './headerCard.styles';

const HeaderCard = ({tab, type, navigation}: any) => {
  const cryptos = useRecoilValue(CryptoSocketState);
  const stocks = useRecoilValue(StockSocketState);
  const setSelectedSheet = useSetRecoilState(SelectedAssetSheetState);
  const setSelectedMusicAssetDetailsState = useSetRecoilState(
    SelectedMusicAssetDetailsState,
  );
  const {formatCurrencyNumber} = useCurrency();
  const {trackEvents} = useTrackEvents();
  const {colors} = useTheme();

  let assets = [...tab];

  const appendAssets = useCallback(
    (assetName: string, allAssets: any[], assetsList: any[]) => {
      const foundAsset = allAssets.find(asset => asset.symbol === assetName);
      if (foundAsset) {
        assetsList.push(foundAsset);
      }
    },
    [],
  );
  switch (type) {
    case 'crypto': {
      const cryptoAssets: any[] = [];
      appendAssets('BTC', assets, cryptoAssets);
      appendAssets('ETH', assets, cryptoAssets);
      appendAssets('BNB', assets, cryptoAssets);
      appendAssets('SOL', assets, cryptoAssets);
      assets = cryptoAssets;
      break;
    }
    case 'stocks': {
      // const stockAssets: any[] = [];
      // appendAssets('^DJI', assets, stockAssets);
      // appendAssets('^NDX', assets, stockAssets);
      // appendAssets('^GSPC', assets, stockAssets);
      // appendAssets('^RUA', assets, stockAssets);
      // assets = stockAssets;
    }
  }

  const onOpenDetails = (asset: any) => {
    const {symbol, id, type: watchlistType} = asset ?? {};
    setSelectedMusicAssetDetailsState(asset);
    const obj = {
      symbol,
      type: watchlistType ?? type,
      id,
    };

    trackEvents('home-assets-details', obj);
    setSelectedSheet(obj);
    navigation.navigate(Routes.AssetDetail);
  };

  const headAssets = [...assets.slice(0, 4)];
  const isDisabled = useMemo(() => type === 'stocks', [type]);

  return (
    <View
      style={[
        styles.container,
        {backgroundColor: colors.background, shadowColor: colors.primary},
      ]}>
      {headAssets.map((bit: any, idx: number) => {
        const {
          change,
          symbol,
          marketPrice,
          rawSymbol,
          changesPercentage,
          randomePrice,
          randomePricePercentage,
          acct_name,
          loan_number,
          interest,
          payment_amount,
          priceChange,
          priceChangesPercentage,
          amount,
        } = bit;
        const rateType =
          type === 'music' ? /-/gi.test(priceChange) : /-/gi.test(change);
        let price = type === 'music' ? amount : marketPrice;
        if (/stock/gi.test(type)) {
          price = stocks[symbol] ?? price;
        } else if (/crypto/gi.test(type)) {
          price = cryptos[rawSymbol ?? symbol] ?? price;
        }

        const rmvMinusSignChangesPercentage = JSON.stringify(changesPercentage)

        return (
          <View
            style={[
              styles.card,
              {backgroundColor: colors.headerCard},
              {width: `${92 / headAssets.length}%`},
            ]}
            key={`${bit.name}_${idx}`}>
            <TouchableOpacity onPress={() => onOpenDetails(bit)}>
              <View style={styles.name}>
                <Text
                  numberOfLines={1}
                  style={[styles.nameTxt, {color: colors.lightText}]}>
                  {type === 'sba7' ? acct_name : bit.name}
                </Text>
                <Text
                  style={[styles.rate, {color: colors.text}]}
                  numberOfLines={1}>
                  {type === 'sba7'
                    ? formatCurrencyNumber(payment_amount ?? payment_amount, 2)
                    : formatCurrencyNumber(price ?? bit.price, 2)}
                </Text>
              </View>
              <View
                style={[
                  styles.changeHeader,
                  {
                    backgroundColor:
                      type === 'sba7'
                        ? COLORS['price-up']
                        : rateType
                        ? COLORS['price-down']
                        : COLORS['price-up'],
                  },
                ]}>
                <View style={styles.prices}>
                  <Text style={[styles.priceChange]} numberOfLines={1}>
                    {type === 'music'
                      ? formatCurrencyNumber(priceChange, 3)
                      : type === 'sba7'
                      ? '0.0'
                      : formatCurrencyNumber(change, 2)}
                  </Text>
                  <Text style={styles.changePercentage} numberOfLines={1}>
                    (
                    {type === 'music'
                      ? formatNumber(priceChangesPercentage, 2)
                      : formatNumber(
                          rmvMinusSignChangesPercentage?.replace('-', ' '),
                          2,
                        )}
                    %)
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        );
      })}
    </View>
  );
};

export default HeaderCard;
