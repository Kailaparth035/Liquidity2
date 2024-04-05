import { StyleSheet } from 'react-native';
import { COLORS } from '../../../../assets';

export const headerStyle = StyleSheet.create({
  header: {
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 16,
    paddingRight: 16,
    marginTop: 24,
  },
  assetLogo: {
    width: 40,
    height: 40,
    borderRadius: 50,
    marginRight: 12,
  },
  rowImage: {
    width: 40,
    height: 40,
    borderRadius: 100,
    marginRight: 12,
    padding: 4,
  },
  disabled: {
    opacity: 0.4,
  },
  dummyAssetLogo: {
    width: 40,
    height: 40,
    borderRadius: 50,
    marginRight: 12,
    backgroundColor: COLORS['bg-90-dark'],
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoInitials: {
    fontSize: 16,
    color: 'gray',
    fontWeight: '600',
  },
  logo: {
    width: '12%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'green',
  },
  assetDetails: {
    paddingLeft: 2,
    paddingRight: 8,
    flex: 1,
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
  assetName: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  assetPrice: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    flexWrap: 'wrap',
  },
  dot: {
    width: 4,
    height: 4,
    backgroundColor: COLORS['font-color-light'],
    borderRadius: 4,
    marginLeft: 8,
    marginRight: 8,
  },
  name: {
    fontSize: 12,
    color: COLORS['input-border-focus-dark'],
    textTransform: 'capitalize',
  },
  symbol: {
    fontWeight: '700',
    fontSize: 16,
    color: COLORS['bg-100-light'],
  },
  rate: {
    color: COLORS['bg-100-light'],
    fontWeight: '700',
    fontSize: 14,
    lineHeight: 24,
    marginRight: 4,
  },
  percentageChange: {
    fontSize: 12,
    fontWeight: '500',
  },
  bookmark: {
    width: '8%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
