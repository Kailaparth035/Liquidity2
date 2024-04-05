import React, {FC, useCallback, useEffect, useMemo, useState} from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import {useRecoilValue} from 'recoil';
import moment from 'moment';

import {COLORS, Svg_No_Chart} from '../../../../assets';
import {useNetwork} from '../../../../hooks';
import {
  ChartToggleState,
  isDarkModeState,
  SelectedAssetDetailsState,
} from '../../../../states';
import {Loader} from '../../../../storybook/loader';
import {CandleChart} from '../../../../storybook/charts-kit/candle/candle';
import {LineChart} from '../../../../storybook/charts-kit/line/line';
import {
  CHART_TABS,
  CHART_INTERVALS,
  MOMENT_TYPES,
  CHART_INTERVALS_TYPE,
} from '../../../../constants';
import {chartStyle as styles} from './chart.style';
import {ChartControl} from '../chart-control';
import {useCurrency} from '../../../../hooks/use-currency';
import {NoData} from '../../../../components/empty-state';
import {useTheme} from '@react-navigation/native';
import {Svg_No_Chart_Light} from '../../../../assets/icon/svg/no-chart-light';
import {DUMMY_MUSIC_PERDAY} from './constant';

interface IChart {
  id: string;
  symbol: string;
  assetType: string;
}

const mapApiUrl: {[type: string]: string} = {
  stocks: 'stock',
  cryptos: 'crypto',
  commodities: 'Commodity',
  privates: 'privates',
};

export const Chart: FC<IChart> = ({id, symbol, assetType}) => {
  const dark = useRecoilValue(isDarkModeState);
  const chartData = useRecoilValue(SelectedAssetDetailsState);
  const chartToggle = useRecoilValue(ChartToggleState);

  const [activeTab, setActiveTab] = useState(CHART_INTERVALS.MONTH);
  const perDay = chartData?.[symbol]?.perDay ?? DUMMY_MUSIC_PERDAY;

  const [chartPerDay, setChartPerDay] = useState([]);
  const {get, data, loading} = useNetwork();
  const {colors} = useTheme();

  const {currencyConvertInNumber} = useCurrency();

  useEffect(() => {
    if (perDay.length && !chartPerDay.length) {
      handleChangeChartInterval(CHART_INTERVALS.MONTH);
    }
  }, [perDay]);

  const handleChangeChartInterval = useCallback(
    (tab: string) => {
      const toDate = moment().subtract(1, 'day');
      const momentType: any = MOMENT_TYPES[tab];
      let count = 1;
      if (CHART_INTERVALS['2YEAR'] === tab) {
        count = 2;
      } else if (CHART_INTERVALS['5YEAR'] === tab) {
        count = 5;
      }
      const fromDate = moment(toDate).subtract(count, momentType);
      const from = fromDate.format('YYYY-MM-DD');
      const to = toDate.format('YYYY-MM-DD');
      const urlSymbol = /private/gi.test(assetType) ? id : symbol;
      if (mapApiUrl[assetType] ?? assetType) {
        get(
          `/${
            mapApiUrl[assetType] ?? assetType
          }-history/${urlSymbol}?from=${from}&to=${to}&interval=${
            CHART_INTERVALS_TYPE[tab]
          }`,
        );
      }
      setActiveTab(tab);
    },
    [assetType],
  );

  useEffect(() => {
    if (data?.data && data?.data?.length) {
      setChartPerDay(data.data);
    }
  }, [data]);

  const candleChartData = useMemo(
    () =>
      chartPerDay.map(({time, open, high, low, value: close, volume}: any) => [
        time,
        currencyConvertInNumber(open),
        currencyConvertInNumber(high),
        currencyConvertInNumber(low),
        currencyConvertInNumber(close),
        volume,
      ]),
    [chartPerDay],
  );

  const getChartBody = useCallback(() => {
    if (loading) {
      return (
        <View style={{height: 280, justifyContent: 'center'}}>
          <Loader />
        </View>
      );
    }
    const labels: number[] = [];
    const values: number[] = [];
    const volumes: number[] = [];
    const dateTimes: any[] = [];
    const intervalPrice = (chartPerDay?.[0] as any)?.open ?? 0;
    chartPerDay?.forEach(({value, time, volume}) => {
      let format = 'MMM DD';
      switch (activeTab) {
        case '1M': {
          format = 'MMM DD';
          break;
        }
        case '1D': {
          format = 'hh:mm';
          break;
        }
        case '1W': {
          format = 'ddd';
          break;
        }
        case '1Y': {
          format = 'MMM';
          break;
        }
        case '2Y': {
          format = 'MMM';
          break;
        }
      }
      const momentDate = moment(time).format(format);
      labels.push(momentDate);

      dateTimes.push({
        time: moment(time).format('h:mm:ss A'),
        date: moment(time).format('MMM DD YYYY'),
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
      <>
        {perDay?.length > 0 && datasets.dateTimes.length > 0 ? (
          chartToggle === 'line' ? (
            <LineChart
              intervalPrice={intervalPrice}
              datasets={datasets}
              color={color}
              symbol={symbol}
            />
          ) : (
            <CandleChart symbol={symbol} chartData={candleChartData} />
          )
        ) : perDay?.length === 0 && datasets.dateTimes.length === 0 ? (
          <NoData
            svg={dark ? Svg_No_Chart : Svg_No_Chart_Light}
            height={120}
            msg="Chart is not available at the moment"
          />
        ) : (
          <NoData
            svg={dark ? Svg_No_Chart : Svg_No_Chart_Light}
            height={120}
            msg="Chart is not available at the moment"
          />
        )}
      </>
    );
  }, [activeTab, chartPerDay, loading, chartToggle, perDay]);

  return (
    <View style={styles.body}>
      <View style={styles.header}>
        <View style={styles.chartHeader}>
          {CHART_TABS.map((tab, index) => (
            <TouchableOpacity
              onPress={() => handleChangeChartInterval(tab)}
              key={index}>
              <View
                style={[
                  styles.activeChartTab,
                  {
                    backgroundColor:
                      activeTab === tab ? colors.box : colors.background,
                  },
                ]}>
                <Text
                  style={[
                    styles.activeTabText,
                    {
                      color: activeTab === tab ? colors.text : colors.text,
                    },
                  ]}>
                  {tab}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
        <ChartControl />
      </View>
      <View style={styles.chartBody}>{getChartBody()}</View>
    </View>
  );
};
