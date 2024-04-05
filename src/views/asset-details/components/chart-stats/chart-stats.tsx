import React, {FC, useCallback, useMemo} from 'react';
import {Text, View} from 'react-native';
import {useRecoilValue} from 'recoil';
import {useTheme} from '@react-navigation/native';
import {useCurrency} from '../../../../hooks/use-currency';

import {SelectedAssetDetailsState} from '../../../../states';
import {chartStatsStyle as styles} from './chart-stats.style';

interface IChartStats {
  symbol: string;
  assetType: string;
}

export const ChartStats: FC<IChartStats> = ({symbol, assetType}) => {
  const assetDetails = useRecoilValue(SelectedAssetDetailsState);
  const {formatCurrencyNumber} = useCurrency();
  const {colors} = useTheme();

  const {detail} = useMemo(() => assetDetails[symbol] ?? {}, []);

  const formatValue = useCallback(data => {
    return Number(
      new Intl.NumberFormat('en', {notation: 'compact'}).format(data ?? 0),
    ).toFixed(2);
  }, []);

  return (
    <View style={{marginBottom: 20}}>
      {detail && (
        <View style={styles.chartAnalysis}>
          <View style={styles.chartRow}>
            <Text style={[styles.chartLabel, {color: colors.text}]}>Open</Text>
            <Text style={[styles.chartValue, {color: colors.text}]}>
              {formatCurrencyNumber(detail?.open, 2)}
            </Text>
          </View>
          <View style={styles.chartRow}>
            <Text style={[styles.chartLabel, {color: colors.text}]}>High</Text>
            <Text style={[styles.chartValue, {color: colors.text}]}>
              {formatCurrencyNumber(detail?.dayHigh, 2)}
            </Text>
          </View>
          <View style={styles.chartRow}>
            <Text style={[styles.chartLabel, {color: colors.text}]}>Low</Text>
            <Text style={[styles.chartValue, {color: colors.text}]}>
              {formatCurrencyNumber(detail?.dayLow, 2)}
            </Text>
          </View>
          <View style={styles.chartRow}>
            <Text style={[styles.chartLabel, {color: colors.text}]}>
              Prev. Close
            </Text>
            <Text style={[styles.chartValue, {color: colors.text}]}>
              {formatCurrencyNumber(detail?.previousClose?.toFixed(2), 2)}
            </Text>
          </View>
        </View>
      )}
    </View>
  );
};
