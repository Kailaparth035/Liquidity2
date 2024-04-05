import {Dimensions, StyleSheet} from 'react-native';

export const selectBankstyles = StyleSheet.create({
  listContainer: {flex: 1, padding: 16},
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
  selectBtn: {
    width: Dimensions.get('window').width / 2.24,
    height: 52,
    marginTop: 8,
    marginRight: 16,
  },
  selectLabel: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '500',
  },
});
