import {Platform, StyleSheet} from 'react-native';
import {COLORS} from '../../../../../assets';

export const editWatchlistFooterStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingVertical:Platform.OS == 'android' ? 30 : 8,
    paddingHorizontal: 16,
    backgroundColor: COLORS['bg-90-dark'],
    paddingTop:10
  },
  cancelBtn: {
    paddingVertical: 16,
    paddingHorizontal: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.12)',
    borderRadius: 8,
  },
  cancelTxt: {
    color: '#CCCFE0',
    fontWeight: '500',
  },
  saveBtn: {
    paddingVertical: 16,
    paddingHorizontal: 24,
    backgroundColor: COLORS['primary-dark'],
    borderRadius: 8,
    marginLeft: 8,
    minWidth: 100,
  },
  saveTxt: {
    color: '#CCCFE0',
    fontWeight: '500',
    textAlign: 'center',
  },
});
