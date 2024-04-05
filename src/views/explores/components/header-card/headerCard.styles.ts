import { StyleSheet } from 'react-native';
import { COLORS } from '../../../../assets';

export const headerCardStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    maxHeight: 100,
    paddingVertical: 8,
    paddingHorizontal: 10,
    backgroundColor: COLORS['bg-90-dark'],
    alignItems: 'center',
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 2,

  },
  card: {
    backgroundColor: COLORS['bg-80-dark'],
    height: 84,
    marginHorizontal: 4,
    borderRadius: 4,
    maxWidth: 150,
    minWidth: 80,
  },
  name: {
    padding: 4,
  },
  nameTxt: {
    color: COLORS['font-color-light'],
    fontSize: 12,
    fontWeight: '500',
  },
  rate: {
    color: COLORS['white'],
    fontSize: 14,
    fontWeight: '600',
    marginTop: 2,
  },
  changeIcon: {
    justifyContent: 'center',
  },
  prices: {
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  priceChange: {
    color: COLORS['white'],
    fontSize: 12,
    fontWeight: '500',
  },
  changePercentage: {
    color: COLORS['white'],
    fontSize: 12,
    fontWeight: '500',
    marginTop: 2,
  },
  changeHeader: {
    height: 42,
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
    flexDirection: 'row',
    padding: 4,
    justifyContent: 'flex-end',
  },
});
