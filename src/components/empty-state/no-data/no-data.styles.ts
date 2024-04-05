import {StyleSheet} from 'react-native';
import {COLORS} from '../../../assets';

export const noDataStyles = StyleSheet.create({
  noListContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  noList: {
    flex: 0.8,
    justifyContent: 'center',
  },
  noListTxt: {
    marginTop: 12,
    textAlign: 'center',
    color: COLORS['font-color-light'],
  },
  noListDesc: {
    marginTop: 12,
    textAlign: 'center',
    fontWeight: '500',
    color: COLORS['font-color-light'],
  },
});
