import {COLORS} from '../../../assets';
import {StyleSheet} from 'react-native';

export const transactionDetails = StyleSheet.create({
  //   center view
  centerView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomColor: COLORS['color-text-light-90'],
    borderBottomWidth: 1,
    padding: 14,
  },
  statusText: {
    color: COLORS['font-color-light'],
    fontSize: 14,
  },
  statusView: {
    height: 8,
    width: 8,
    borderRadius: 8,
    marginRight: 10,
  },
  processStatusView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    flex: 1,
  },
});
