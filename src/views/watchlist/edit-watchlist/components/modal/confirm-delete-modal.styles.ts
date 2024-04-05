import {StyleSheet} from 'react-native';

import {COLORS} from '../../../../../assets';

export const confirmDeleteModalStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  body: {
    backgroundColor: '#36383D',
    borderRadius: 14,
    elevation: 2,
    width: '85%',
  },
  deleteLabel: {
    padding: 16,
    paddingBottom: 0,
    fontWeight: '600',
    color: COLORS.white,
    textAlign: 'center',
  },
  deleteDesc: {
    padding: 16,
    paddingBottom: 24,
    color: COLORS.white,
    textAlign: 'center',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderTopWidth: 1,
    height: 48,
    borderColor: '#545458',
  },
  cancelBtn: {
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomLeftRadius: 4,
  },
  cancelTxt: {
    color: 'rgba(10, 132, 255, 1)',
  },
  footerLine: {
    borderRightWidth: 1,
    borderColor: '#545458',
  },
  deleteBtn: {
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomRightRadius: 4,
  },
  deleteTxt: {
    color: 'rgba(245, 69, 69, 1)',
  },
});
