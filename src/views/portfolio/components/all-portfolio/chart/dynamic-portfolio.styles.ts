import {StyleSheet} from 'react-native';

import {COLORS} from '../../../../../assets';

export const dynamicPortfolioStyles = StyleSheet.create({
  container: {
    paddingVertical: 16,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
    flex: 1,
    paddingVertical:10
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  current: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  currentLabel: {
    color: COLORS['color-text-dark-60'],
    fontSize: 16,
    fontWeight: '500',
    marginRight: 8,
  },
  currentValue: {
    color: COLORS['color-text-dark-100'],
    fontSize: 16,
    fontWeight: '600',
  },
  label: {
    color: COLORS['font-color-light'],
    fontSize: 12,
    fontWeight: '500',
    marginRight: 8,
  },
  value: {
    color: COLORS['color-text-dark-100'],
    fontSize: 12,
    fontWeight: '700',
  },
  dynamic: {
    color: 'red',
    fontSize: 12,
    fontWeight: '500',
    marginLeft: 4,
  },
  line: {
    borderLeftWidth: 3,
    paddingLeft: 8,
    marginTop: 12,
  },
  title: {
    color: '#4E5969',
    fontSize: 12,
    paddingTop: 2,
  },
  dynamicValue: {
    color: COLORS['color-text-dark-100'],
    fontSize: 16,
    fontWeight: '600',
    marginTop: 2,
    paddingBottom: 2,
  },
  viewContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '95%',
  },
  viewBalance: {
    flex: 1,
    marginVertical: 20,
    width: '100%',
    // height: 70,
    alignSelf: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    paddingVertical: 12,
  },
  balance: {
    textAlign: 'center',
    fontWeight: '700',
    fontSize: 20,
  },
  walletText: {
    textAlign: 'center',
    marginTop: 5,
  },
  verticleLine: {
    height: 1,
    marginHorizontal: 15,
    opacity: 0.4,
    marginVertical: 10,
  },
  dot: {
    height: 4,
    width: 4,
    borderRadius: 24,
    marginVertical: 6,
    marginHorizontal: 10,
    backgroundColor: COLORS['font-color-light'],
    alignSelf: 'center',
  },
});
