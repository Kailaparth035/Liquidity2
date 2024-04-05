import {StyleSheet} from 'react-native';
import {COLORS} from '../../../assets';

export const ConnectModalStyles = StyleSheet.create({
  head: {
    backgroundColor: COLORS['bg-90-dark'],
    padding: 12,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    borderBottomWidth: 1,
    borderBottomColor: COLORS['bg-80-dark'],
  },
  createHead: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS['white'],
  },
  title: {
    fontSize: 12,
    lineHeight: 24,
    fontWeight: '500',
  },
  walletAmount: {
    fontSize: 24,
    color: COLORS['color-text-dark-60'],
    fontWeight: '600',
  },
  
  btnArea: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    borderTopWidth: 1,
    borderTopColor: COLORS['bg-80-dark'],
    padding: 12,
  },
  btn: {
    padding: 16,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginRight: 4,
  },
  connectBtn: {
    backgroundColor: COLORS['primary-dark'],
    padding: 16,
    borderRadius: 8,
    marginLeft: 4,
    minWidth: 108,
  },
  btnTxt: {
    color: COLORS['bg-90-light'],
    textAlign: 'center',
    fontWeight: '500',
  },
  amount: {
    color: COLORS['white'],
    textAlign: 'right',
    margin: 8,
    fontWeight: '600',
  },
  reject: {
    backgroundColor: 'rgba(255, 255, 255, 0.06)',
  },
});
