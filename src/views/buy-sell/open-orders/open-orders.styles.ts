import {StyleSheet} from 'react-native';
import {COLORS} from '../../../assets';

export const OpenOrderStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS['bg-100-dark'],
  },
  card: {
    padding: 16,
    borderBottomColor: COLORS['color-border-dark-80'],
    borderBottomWidth: 0.4,
  },
  cardItem: {
    flexDirection: 'row',
    width: '100%',
  },
  imageContainer: {
    backgroundColor: COLORS['color-bg-dark-90'],
    height: 40,
    width: 40,
    borderRadius: 24,
    marginRight: 6,
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
  width: {width: '85%'},
  labelContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  labelContain: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  labelTxt: {
    color: COLORS.white,
    fontWeight: '600',
    fontSize: 14,
  },
  point: {
    height: 4,
    width: 4,
    backgroundColor: COLORS['color-text-dark-60'],
    borderRadius: 4,
    marginHorizontal: 4,
  },
  name: {
    color: COLORS['color-text-dark-70'],
    fontSize: 12,
    fontWeight: '500',
  },
  price: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: '600',
    position:"absolute",
    right:0,
    top:-8
  },
  count: {
    color: COLORS['color-text-dark-80'],
    fontWeight: '600',
    fontSize: 14,
  },
  amountTxt: {
    color: COLORS['color-text-dark-60'],
    fontSize: 12,
    fontWeight: '500',
    marginRight: 4,
  },
  amount: {
    color: COLORS['color-text-dark-80'],
    fontSize: 12,
    fontWeight: '500',
  },
  footer: {
    marginTop: 6,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  timeContain: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 6,
  },
  time: {
    color: COLORS['color-text-dark-70'],
    marginLeft: 6,
    fontSize: 12,
    fontWeight: '500',
  },
  dateContain: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 6,
  },
  date: {
    color: COLORS['color-text-dark-70'],
    marginLeft: 6,
    fontSize: 12,
    fontWeight: '500',
  },
  footerBtn: {
    backgroundColor: COLORS['bg-90-dark'],
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 4,
    marginLeft: 8,
  },
  footerBtnTxt: {
    color: COLORS['color-text-dark-70'],
    fontSize: 12,
    fontWeight: '500',
  },
  footerBtnSell: {
    color: COLORS.red,
    fontSize: 12,
    fontWeight: '500',
  },
  footerBtnBuy: {
    color: COLORS.green,
    fontSize: 12,
    fontWeight: '500',
  },
});
