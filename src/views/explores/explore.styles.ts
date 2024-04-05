import {StyleSheet} from 'react-native';
import {COLORS} from '../../assets';

export const exploreStyles = StyleSheet.create({
  exploreContainer: {
    flex: 1,
    backgroundColor: COLORS['bg-100-dark'],
  },
  exploreHeader: {
    backgroundColor: COLORS['bg-90-dark'],
    elevation: 1,
  },
  noExploreData: {
    textAlign: 'center',
    color: 'gray',
    marginTop: 40,
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    paddingRight: 0,
    borderBottomWidth: 1,
    borderBottomColor: COLORS['input-border-dark'],
  },
  container: {
    display: 'flex',
    flexDirection: 'row',
    width: '40%',
  },
  rowImage: {
    width: 40,
    height: 40,
    borderRadius: 50,
    marginRight: 12,
    padding: 4,
  },
  noImage: {
    width: 40,
    height: 40,
    borderRadius: 50,
    marginRight: 12,
    backgroundColor: COLORS['bg-90-dark'],
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  noImageText: {
    fontSize: 18,
    color: 'gray',
  },
  tokenExplore: {
    width: '60%',
  },
  tokenSymbol: {
    color: COLORS['white'],
    fontWeight: '600',
    fontSize: 16,
  },
  tokenName: {
    color: COLORS['font-color-light'],
    fontWeight: '500',
    fontSize: 14,
    marginTop: 4,
  },
  tokenPrices: {
    marginLeft: 16,
    right: 16,
    minWidth: 130,
  },
  priceChange: {
    fontWeight: '600',
    fontSize: 16,
    textAlign: 'right',
  },
  pricePercentage: {
    color: COLORS['font-color-light'],
    fontWeight: '600',
    fontSize: 16,
    textAlign: 'right',
    marginTop: 4,
  },
  noData: {
    flex: 0.8,
    justifyContent: 'center',
  },
  noDataTxt: {
    color: COLORS['font-color-light'],
    textAlign: 'center',
  },
});
