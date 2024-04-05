import {Dimensions, StyleSheet} from 'react-native';
import {COLORS} from '../../../assets';

export const OrderFooterStyles = StyleSheet.create({
  accessory: {
    width: Dimensions.get('window').width,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS['bg-90-dark'],
    paddingBottom: 12,
  },
  contain: {
    backgroundColor: COLORS['bg-80-dark'],
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  left: {
    flexDirection: 'row',
    marginHorizontal: 16,
    marginVertical: 8,
  },
  total: {
    color: COLORS['color-text-dark-60'],
    fontSize: 12,
    fontWeight: '500',
    marginRight: 8,
  },
  price: {
    color: COLORS.white,
    fontSize: 12,
    fontWeight: '500',
  },
  btn: {
    padding: 16,
    width: '90%',
    backgroundColor: COLORS.buy,
    borderRadius: 12,
    marginTop: 20,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
  btnTxt: {
    color: COLORS['white'],
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },
  disabledBtn: {
    padding: 16,
    width: '90%',
    backgroundColor: '#cccccc',
    borderRadius: 12,
    marginTop: 20,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    opacity: 0.4,
  },
});
