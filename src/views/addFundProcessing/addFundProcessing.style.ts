import {COLORS} from '../../assets';
import {Platform, StyleSheet} from 'react-native';

export const addFundProcessingStyles = StyleSheet.create({
  balanceSheetContainer: {
    backgroundColor: COLORS.primary,
    flex: 1,
  },

  addBtn: {
    width: 155,
    height: 52,
    marginTop: 40,
    marginRight: 16,
    alignSelf: 'center',
  },
  addBtnText: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '500',
    width:250
  },
  closeIcon: {
    width: 40,
    height: 40,
    alignSelf: 'flex-end',
  },
  mainView: {
    flex: 1,
    justifyContent: 'center',
    paddingBottom:30
  },
  closeIconButton: {top: Platform.OS === 'android' ? 40 : 0, padding: 15},
});
