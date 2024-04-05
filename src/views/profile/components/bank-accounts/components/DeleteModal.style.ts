import {StyleSheet} from 'react-native';
import {COLORS} from '../../../../../assets';

export const deleteModalStyle = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  body: {
    backgroundColor: COLORS['input-border-dark'],
    borderRadius: 14,
    elevation: 2,
    width: '85%',
  },
  deleteLabel: {
    padding: 16,
    paddingBottom: 0,
    fontSize: 16,
    fontWeight: '600',
    color: COLORS['white'],
    textAlign: 'center',
  },
  deleteDesc: {
    padding: 16,
    paddingBottom: 24,
    color: COLORS['white'],
    textAlign: 'center',
    fontSize: 12,
    fontWeight: '400',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderTopWidth: 1,
    height: 48,
    borderColor: COLORS['btn-cancel'],
  },
  cancelBtn: {
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomLeftRadius: 4,
  },
  cancelTxt: {
    color: COLORS['btn-primary-light'],
    fontSize: 16,
    fontWeight: '400',
  },
  footerLine: {
    borderRightWidth: 1,
    borderColor: COLORS['btn-cancel'],
  },
  deleteBtn: {
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomRightRadius: 4,
  },
  deleteTxt: {
    color: COLORS['color-red'],
    fontSize: 16,
    fontWeight: '600',
  },
});
