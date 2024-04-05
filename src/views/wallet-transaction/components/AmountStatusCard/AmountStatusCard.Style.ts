import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {paddingVertical: 32, alignItems: 'center'},
  amountText: {
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 20,
  },
  balanceText: {
    fontSize: 24,
    fontWeight: '600',
    lineHeight: 32,
  },
  statusContainer: {flexDirection: 'row', alignItems: 'center'},
  statusText: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '500',
    paddingLeft: 4,
  },
});
