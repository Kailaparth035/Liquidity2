import {StyleSheet} from 'react-native';
import {COLORS} from '../../../../assets';

export const PortfolioAssetStyles = StyleSheet.create({
  mainContainer: {
    padding: 16,
    borderBottomColor: COLORS['bg-80-dark'],
    borderBottomWidth: 1,
  },
  container: {
    flexDirection: 'row',
    marginBottom: 1,
    justifyContent: 'space-between',
    marginTop: 4,
  },
  row: {
    flexDirection: 'row',
  },
  title: {
    color: COLORS['color-text-dark-60'],
    fontSize: 12,
    marginRight: 6,
    fontWeight: '500',
  },
  investedTxt: {
    color: COLORS['color-text-dark-80'],
    fontSize: 12,
    fontWeight: '500',
  },
  rows: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: 50,
    height: 50,
    marginRight: 4,
    borderRadius: 50,
  },
  imgContainer: {
    width: 50,
    height: 50,
    borderRadius: 50,
  },
  percentTxt: {
    textAlign: 'right',
  },
  detailsContainer: {
    marginLeft: 8,
    width: '84%',
    justifyContent: 'space-between',
  },
  symbol: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  symbolTxt: {
    color: COLORS['white'],
    fontSize: 14,
    fontWeight: '600',
  },
  valueTxt: {
    color: COLORS['white'],
  },
  valueContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 2,
  },
  nameTxt: {
    color: COLORS['color-text-dark-60'],
    fontSize: 12,
    fontWeight: '500',
    flex: 0.4,
  },
  ltpContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    flex: 0.5,
    justifyContent: 'flex-end',
  },
  ltp: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 4,
  },
  priceTxt: {
    color: COLORS['color-text-dark-80'],
    fontSize: 12,
    fontWeight: '500',
    textAlign: 'right',
    marginRight: 6,
  },
  quantityContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 2,
  },
  quantity: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 4,
  },
  qntTxt: {
    color: COLORS['color-text-dark-80'],
    fontSize: 12,
    fontWeight: '500',
    textAlign: 'right',
  },
});
