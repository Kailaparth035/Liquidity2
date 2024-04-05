import { StyleSheet } from 'react-native';
import { COLORS } from '../../assets';

export const AssetsStyles = StyleSheet.create({
  exploreContainer: {
    flex: 1,
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
  graphContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: 70,
    paddingLeft: 4
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 0,
    // padding: 16,
    paddingBottom: 0,
    paddingRight: 0,
    borderBottomWidth: 1,
    borderBottomColor: COLORS['input-border-dark'],
  },
  container: {
    display: 'flex',
    flexDirection: 'row',
    width: '35%',
  },
  rowImage: {
    width: 40,
    height: 40,
    borderRadius: 50,
    marginRight: 12,
    padding: 4,
  },
  symbolView: {
    height: 40,
    width: 40,
    borderRadius: 20,
  },
  symbolViewAndroid: {
    height: 40,
    width: 40,
    borderRadius: 20,
  },
  symbolText: {
    fontSize: 18,
    textTransform: 'uppercase',
    textAlign: 'center',
    justifyContent: 'center',
    position: 'absolute',
    right: '35%',
    marginTop: '25%',
  },
  symbolTextAndroid: {
    fontSize: 18,
    textTransform: 'uppercase',
    textAlign: 'center',
    justifyContent: 'center',
    position: 'absolute',
    right: '36%',
    marginTop: '18%',
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
    flex: 1,
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
    right: 16,
    minWidth: 130,
  },
  containerList: { flex: 1, paddingHorizontal: 16 },
  priceChange: {
    fontWeight: '600',
    fontSize: 16,
    textAlign: 'right',
  },
  pricePercentage: {
    color: COLORS['font-color-light'],
    fontWeight: '600',
    fontSize: 14,
    textAlign: 'right',
    marginTop: 4,
  },
});
