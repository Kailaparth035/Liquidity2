import React, {useCallback} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {useRecoilValue, useSetRecoilState} from 'recoil';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useTheme} from '@react-navigation/native';

import {PortfolioAssetStyles as styles} from './assets.styles';

import {COLORS} from '../../../../assets';
import {ImageView} from '../../../../storybook/image';
import {formatNumber, formatNumberInShortForDecimal} from '../../../utils';
import {Routes} from '../../../routes/constants';
import {MusicExploresState, SelectedAssetSheetState} from '../../../../states';

export const PortASset = ({item, navigation, tab}: any) => {
  const setSelectedSheet = useSetRecoilState(SelectedAssetSheetState);
  const musicalData = useRecoilValue(MusicExploresState);
  const {colors} = useTheme();

  const totalValueChange = item?.gainLossPercentage;

  const changeColor =
    item?.changePercentage > 0
      ? COLORS['price-up']
      : item?.changePercentage < 0
      ? COLORS['price-down']
      : colors.text;

  const totalValuChangeColor =
  totalValueChange > 0
  ? COLORS['price-up']
  : totalValueChange < 0
  ? COLORS['price-down']
  : colors.text;

  const iconName = totalValueChange > 0 ? 'arrow-drop-up' : 'arrow-drop-down';

  const toBuySell = useCallback(() => {
    const obj = {
      symbol: item?.symbol ?? '',
      type: tab?.toLowerCase() ?? '',
      id: item?.assetId ?? '',
    };

    setSelectedSheet(obj);
    navigation.navigate(Routes.AssetDetail);
  }, [navigation, item, musicalData]);

  return (
    <TouchableOpacity style={[styles.mainContainer,{borderBottomColor:colors.border}]} onPress={toBuySell}>
      <View style={styles.rows}>
        <View style={styles.imgContainer}>
          <ImageView
            source={{uri: item.logo}}
            url={item.logo}
            style={styles.image}
            alt={''}
          />
        </View>
        <View style={styles.detailsContainer}>
          <View style={styles.symbol}>
            <Text style={[styles.symbolTxt, {color: colors.text}]}>
              {item.symbol}
            </Text>
            <View style={styles.quantity}>
              <Text style={[styles.title, {color: colors.text}]}>Qty.</Text>
              <Text style={[styles.qntTxt, {color: colors.text}]}>
                {formatNumberInShortForDecimal(item.quantity)}
              </Text>
            </View>
          </View>
          <View style={styles.valueContainer}>
            <Text
              style={[styles.nameTxt, {color: colors.text}]}
              numberOfLines={1}>
              {item.name}
            </Text>
            <View style={styles.rows}>
              <Text style={[styles.title, {color: colors.text}]}>
                Total P&L
              </Text>
              <Text style={[styles.qntTxt, {color: colors.text}]}>
                ${formatNumberInShortForDecimal(item?.gainLoss ?? 0)}
              </Text>
              <Icon size={20} color={item?.gainLossPercentage ? totalValuChangeColor :colors.text} name={iconName} />
              <Text
                style={[
                  styles.percentTxt,
                  {
                    color: totalValuChangeColor,
                  },
                ]}>
                {formatNumber(
                 totalValueChange ?? 0,
                  2,
                )}
                %
              </Text>
            </View>
          </View>
        </View>
      </View>
      <View style={styles.container}>
        <View style={styles.row}>
          <Text style={[styles.title, {color: colors.text}]}>Invested</Text>
          <Text style={[styles.investedTxt, {color: colors.text}]}>
            ${formatNumberInShortForDecimal(item?.investedValue ?? 0)}
          </Text>
        </View>
        <View style={styles.rows}>
          <Text style={[styles.title, {color: colors.text}]}>Current</Text>
          <Text style={[styles.priceTxt, {color: colors.text}]}>
            ${formatNumberInShortForDecimal(item?.currentValue ?? 0)}
          </Text>
        </View>
      </View>
      <View style={styles.quantityContainer}>
        <View style={styles.row}>
          <Text style={[styles.title, {color: colors.text}]}>Avg.</Text>
          <Text style={[styles.investedTxt, {color: colors.text}]}>
            ${formatNumberInShortForDecimal(item?.averagePrice ?? 0)}
          </Text>
        </View>
        <View style={styles.ltpContainer}>
          <View style={styles.ltp}>
            <Text style={[styles.title, {color: colors.text}]}>LTP</Text>
            <Text style={[styles.priceTxt, {color: colors.text}]}>
              ${formatNumberInShortForDecimal(item?.currentPrice ?? 0)}
            </Text>
          </View>
          <View style={styles.rows}>
            <Text
              style={[
                styles.percentTxt,
                {
                  color: changeColor,
                },
              ]}>
              ({item.changePercentage > 0 ? '+' : ''}
              {formatNumberInShortForDecimal(item?.changePercentage ?? 0)}
              %)
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};
