import {StyleSheet} from 'react-native';
import {COLORS} from '../../../../assets';

export const MintedAssetStyles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: COLORS['bg-100-dark'],
  },
  container: {flex: 1},
  listContainer: {flex: 1},
  asset: {
    width: '100%',
    height: 70,
    borderBottomColor: COLORS['input-border-dark'],
    borderBottomWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  details: {flexDirection: 'row'},
  imageContainer: {
    width: 40,
    height: 40,
    borderRadius: 24,
    backgroundColor: COLORS['bg-dark']
  },
  image: {width: 40, height: 40, borderRadius: 24},
  symbol: {left: 10},
  symbolTxt: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS['white'],
    marginBottom: 4,
  },
  nameTxt: {
    fontSize: 12,
    fontWeight: '500',
    color: COLORS['font-color-light'],
  },
  price: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS['white'],
    textAlign: 'right',
    marginBottom: 4,
  },
  quantity: {
    fontSize: 12,
    fontWeight: '500',
    textAlign: 'right',
    color: COLORS['font-color-light'],
  },
});
