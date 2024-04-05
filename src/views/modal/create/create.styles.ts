import {StyleSheet} from 'react-native';
import {COLORS} from '../../../assets';

export const styles = StyleSheet.create({
  modalView: {
    margin: 20,
    marginTop: 'auto',
    marginBottom: 'auto',
    backgroundColor: COLORS['bg-90-dark'],
    borderRadius: 8,
    shadowColor: '#000',
    borderColor: COLORS['bg-90-dark'],
    borderWidth: 0.5,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalSize: {
    marginTop: 100,
  },
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
  img: {
    width: 130,
    height: 100,
    elevation: 10,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  container: {
    display: 'flex',
    justifyContent: 'center',
    margin: 16,
  },
  label: {
    color: COLORS['font-color-light'],
    fontSize: 13,
    fontWeight: '500',
  },
  name: {
    color: COLORS['white'],
    fontSize: 14,
    fontWeight: '600',
  },
  imgContain: {
    backgroundColor: COLORS['bg-model'],
    borderRadius: 8,
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
    color: COLORS.white,
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
  formContain: {
    display: 'flex',
    marginBottom: 8,
    marginRight: 8,
  },
});
