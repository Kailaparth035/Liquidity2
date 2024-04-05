import {StyleSheet} from 'react-native';
import {COLORS} from '../../../../assets';

export const chartStatsStyle = StyleSheet.create({
  chartAnalysis: {
    height: 90,
    width: '100%',
    paddingLeft: 16,
    paddingRight: 16,
  },
  chartRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
    width: '100%',
  },
  chartLabel: {
    color: COLORS['font-color-light'],
    fontSize: 12,
    fontWeight: '500',
    lineHeight: 16,
    textAlign: 'center',
    marginBottom: 2,
  },
  chartValue: {
    color: COLORS['bg-100-light'],
    fontSize: 12,
    fontWeight: '600',
    lineHeight: 16,
    textAlign: 'center',
  },
});
