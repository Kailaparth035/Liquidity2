import {COLORS} from '../../assets';
import {Dimensions, StyleSheet} from 'react-native';

export const addFundsStyles = StyleSheet.create({
  parent: {flex: 1, padding: 16},
  inputField: {
    flex: 1,
    fontSize: 14,
    fontWeight: '500',
    padding: 0,
  },
  amountInputeView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 10,
  },
  maxButton: {
    padding: 5,
    borderRadius: 20,
    paddingHorizontal: 10,
  },
  listHeader: {
    paddingTop: 16,
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '500',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 5,
  },
  backBtn: {
    width: Dimensions.get('window').width / 2.24,
    height: 52,
    marginTop: 8,
    marginLeft: 16,
  },
  addBtn: {
    width: Dimensions.get('window').width / 2.24,
    height: 52,
    marginTop: 8,
    marginRight: 16,
  },
  addBtnText: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '500',
  },

  //  withdraw view
  dotedLine: {
    borderStyle: 'dashed',
    borderWidth: 1,
    borderRadius: 1,
    borderColor: COLORS['color-text-dark-40'],
    marginBottom: 10,
    marginTop: 5,
  },
  balanceText: {fontSize: 14, fontWeight: '700'},
  withdrawView: {
    padding: 18,
    borderRadius: 8,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
