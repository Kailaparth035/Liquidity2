import React, {useEffect, useCallback, useMemo, useState, useRef} from 'react';
import {Text, View, TouchableOpacity, StyleSheet, Platform} from 'react-native';
import {useRecoilValue, useSetRecoilState} from 'recoil';
import {Transition, Transitioning} from 'react-native-reanimated';
import moment from 'moment';
import {useTheme} from '@react-navigation/native';
import {AssetsStyles as styles} from './assets-row.styles';
import {formatNumber} from '../../views/utils';
import {
  SelectedAssetDetailsState,
  SelectedAssetSheetState,
  StocksExploresState,
} from '../../states';
import {ASSET_CATEGORIES} from '../../constants';
import {COLORS} from '../../assets';
import {useTrackEvents} from '../../helpers';
import {ForexFlags} from '../../components';
import {ImageView} from '../image';
import {EVENTS, WebSocket} from '../../libs';
import {LineChart} from '../../storybook/assets-row/components/LineChart';
import {useCurrency} from '../../hooks/use-currency';
import {usePlatform} from '../../hooks';

interface IAssetsRow {
  id: string;
  image: string;
  symbol: string;
  name: string;
  type: string;
  color: string;
  price: number;
  dynamic: number;
  dynamicRate: number;
  perDay: any;
  rawSymbol?: string;
  watchlistType?: string;
  onNavigate: () => void;
  imageFrom?: string;
  imageTo?: string;
  image_url?: string;
  index: number;
}

export const AssetsRow = ({
  id,
  image,
  symbol,
  name,
  perDay,
  type,
  color,
  price,
  dynamic,
  dynamicRate,
  rawSymbol,
  onNavigate,
  watchlistType,
  imageFrom,
  imageTo,
  image_url,
  index,
  randomePrice,
  randomePricePercentage,
  acct_name,
  loan_number,
  interest,
  payment_amount,
  amount,
  _id,
  lender_loan_number,
  borrower_name
}: IAssetsRow) => {
  const ref: any = useRef(null);
  // const [isFlash, setIsFlash] = useState(false);
  const {colors} = useTheme();
  const {
    formatCurrency,
    formatCurrencyNumber,
    valueAfterDecimal,
    currencyConvertInNumber,
  } = useCurrency();
  const {isIOS} = usePlatform();

  const transition = isIOS ? (
    <Transition.Together>
      <Transition.In type="fade" durationMs={240} />
      <Transition.Out type="fade" durationMs={240} />
    </Transition.Together>
  ) : null;

  const setSelectedSheet = useSetRecoilState(SelectedAssetSheetState);
  const stockChartsData = useRecoilValue(StocksExploresState);
  const {trackEvents} = useTrackEvents();

  const assetType = watchlistType ?? type;
  const [current, setCurrent] = useState({
    type: '',
    price,
    color,
  });
  const chartData = useRecoilValue(SelectedAssetDetailsState);

  //commenting this as this is not required for now commented by @avinashSatschel
  const getChartBody = useCallback(() => {
    const labels: string[] = [];
    const values: number[] = [];
    const volumes: number[] = [];
    const dateTimes: any[] = [];
    const updatesCharts =
      type === 'music'
        ? stockChartsData?.[index]?.perDay ?? stockChartsData?.[0]?.perDay ?? []
        : type === 'privates'
        ? stockChartsData?.[index]?.perDay ?? stockChartsData?.[0]?.perDay ?? []
        : perDay;

    const intervalPrice = (updatesCharts?.[0] as any)?.open ?? 0;
    updatesCharts?.forEach(({value, time, volume}) => {
      let format = 'MMM DD';

      const momentDate = moment(time).format(format);
      labels.push(momentDate);

      dateTimes.push({
        time: moment(time).format('h:mm:ss A'),
        date: moment(time).format('MMMM DD YYYY'),
      });
      values.push(currencyConvertInNumber(value));
      volumes.push(volume);
    });

    const datasets = {
      labels,
      values,
      volumes,
      dateTimes,
    };
    const color =
      Number(chartData?.[symbol]?.detail?.change ?? 0) > 0
        ? COLORS['price-up']
        : COLORS['price-down'];
    return (
      <View style={styles.graphContainer}>
        {updatesCharts?.length > 0 && datasets.dateTimes.length > 0 ? (
          <LineChart
            intervalPrice={intervalPrice}
            datasets={datasets}
            color={color}
            symbol={symbol}
          />
        ) : null}
      </View>
    );
  }, [perDay]);

  // useEffect(() => {
  //   EVENTS.socket.addListener(rawSymbol ?? symbol, data => {
  //     setCurrent({
  //       ...data,
  //       color: data.type === 'loss' ? COLORS['price-down'] : COLORS['price-up'],
  //     });
  //     setIsFlash(true);
  //   });
  // }, [symbol]);

  const onPress = useCallback(() => {
    const obj = {
      symbol,
      type: ASSET_CATEGORIES[assetType] ?? assetType,
      id,
    };
    trackEvents('home-assets-details', obj);
    setSelectedSheet(obj);
    onNavigate();
  }, [symbol, assetType, id]);

  // useEffect(() => {
  //   if (isFlash) {
  //     setTimeout(() => {
  //       if (ref.current) {
  //         ref.current.animateNextTransition();
  //       }
  //       setIsFlash(p => !p);
  //     }, 140);
  //   }
  // }, [isFlash]);

  let img = image;
  if (type === 'forex' && imageFrom) {
    img = imageFrom;
  }

  const isPositive = useMemo(() => Number(dynamic) > 0, []);

  useEffect(() => {
    WebSocket.emit('subscribe', {symbol: rawSymbol ?? symbol});
    WebSocket.client.on((rawSymbol ?? symbol)?.toLowerCase?.() ?? '', data => {
      const price = data.lp;
      if (price) {
        setCurrent({price: price, color, type: ''});
      }
    });
  }, [rawSymbol, symbol, type]);

  const renderPrice = useMemo(
    () => (
      <View style={{width: 110}}>
        <Text
          style={[styles.priceChange, {color: colors.text}]}
          numberOfLines={1}>
          {type === 'sba7'
            ? formatCurrency(payment_amount, valueAfterDecimal(payment_amount))
            : type === 'music'
            ? formatCurrency(amount, valueAfterDecimal(amount))
            : formatCurrency(current.price, valueAfterDecimal(current.price))}
        </Text>
        {type === 'sba7' ? (
          <Text
            style={[styles.pricePercentage, {color: COLORS['price-up']}]}
            numberOfLines={1}>
            0.00 {interest === 0 ? '0.00' : interest} ({'+'}
            {'0.0'}
            %)
          </Text>
        ) : (
          <Text style={[styles.pricePercentage, {color}]}>
            {formatCurrencyNumber(dynamic ?? 0, type === 'music' ? 3 : 2)} (
            {formatNumber(dynamicRate ?? 0)}
            %)
          </Text>
        )}
      </View>
    ),
    [current, dynamicRate, isPositive, valueAfterDecimal, formatCurrency],
  );

  return !isIOS ? (
    <View style={styles.containerList}>
      {/* {isFlash && (
        <View
          style={{
            ...StyleSheet.absoluteFillObject,
            backgroundColor: current.color,
            opacity: 0.5,
          }}
        />
      )} */}

      {/* <View
        style={{
          flex: 1,
          backgroundColor: 'red',
          height: 20,
          marginTop: 5,
        }}></View> */}
      <TouchableOpacity
        activeOpacity={0.6}
        style={[styles.rowContainer, {borderBottomColor: colors.border}]}
        onPress={onPress}>
        <View style={styles.container}>
          <View style={{width: 52}}>
            {type === 'forex' || imageTo ? (
              <ForexFlags imageFrom={imageFrom ?? ''} imageTo={imageTo ?? ''} />
            ) : image || image_url ? (
              <ImageView
                source={{uri: img}}
                url={img}
                style={styles.rowImage}
                alt={symbol?.[0] ?? ''}
              />
            ) : (
              <View
                style={[
                  styles.symbolViewAndroid,
                  {backgroundColor: colors.imagebg},
                ]}>
                <Text style={[styles.symbolTextAndroid, {color: colors.text}]}>
                  {type === 'sba7' ? acct_name?.[0] ?? '' : symbol?.[0] ?? ''}
                </Text>
              </View>
            )}
          </View>

          <View style={styles.tokenExplore}>
            <Text
              style={[styles.tokenSymbol, {color: colors.text}]}
              numberOfLines={1}>
              {type === 'sba7' ? loan_number : symbol}
            </Text>
            <Text
              style={[styles.tokenName, {color: colors.text}]}
              numberOfLines={1}>
              {type === 'sba7' ? acct_name : name}
            </Text>
          </View>
        </View>
        {getChartBody()}
        {renderPrice}
      </TouchableOpacity>
    </View>
  ) : (
    <Transitioning.View style={styles.containerList} {...{ref, transition}}>
      {/* {isFlash && (
        <View
          style={{
            ...StyleSheet.absoluteFillObject,
            backgroundColor: current.color,
            opacity: 0.5,
          }}
        />
      )} */}
      <TouchableOpacity
        activeOpacity={0.6}
        style={[styles.rowContainer, {borderBottomColor: colors.border}]}
        onPress={onPress}>
        <View style={styles.container}>
          <View style={{width: 52}}>
            {type === 'forex' || imageTo ? (
              <ForexFlags imageFrom={imageFrom ?? ''} imageTo={imageTo ?? ''} />
            ) : (
              <>
                {image || image_url ? (
                  <ImageView
                    source={{uri: img}}
                    url={img}
                    style={[styles.rowImage]}
                    alt={symbol?.[0] ?? ''}
                  />
                ) : (
                  <View
                    style={[
                      styles.symbolView,
                      {backgroundColor: colors.imagebg},
                    ]}>
                    <Text style={[styles.symbolText, {color: colors.text}]}>
                      {type === 'sba7'
                        ? borrower_name?.[0] ?? ''
                        : symbol?.[0] ?? ''}
                    </Text>
                  </View>
                )}
              </>
            )}
          </View>

          <View style={styles.tokenExplore}>
            <Text
              style={[
                styles.tokenSymbol,
                {color: colors.text, width: type === 'sba7' ? 200 : 70},
              ]}
              numberOfLines={1}>
              {type === 'sba7' ? lender_loan_number : symbol}
            </Text>
            <Text
              style={[
                styles.tokenName,
                {color: colors.text, width: type === 'sba7' ? 200 : 70},
              ]}
              numberOfLines={1}>
              {type === 'sba7' ? borrower_name : name}
            </Text>
          </View>
        </View>
        <View style={styles.graphContainer}>{getChartBody()}</View>
        {renderPrice}
      </TouchableOpacity>
    </Transitioning.View>
  );
};
