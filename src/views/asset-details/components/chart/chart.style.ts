import {StyleSheet} from 'react-native';
import { COLORS } from '../../../../assets';

export const chartStyle = StyleSheet.create({
  body: {
    minHeight: 270,
    paddingLeft: 16,
    paddingRight: 16,
  },
  header:{
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20
  },
  chartHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  activeChartTab: {
    marginRight: 8,
    paddingLeft: 12,
    paddingRight: 12,
    paddingTop: 4,
    paddingBottom: 4,
    borderRadius: 12,
  },
  activeTabText: {
    fontSize: 12,
    lineHeight: 16,
  },
  chartBody: {
    padding: 8,
    paddingTop: 0,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  noDataTxt: {
    color: COLORS['white']
  }
});
