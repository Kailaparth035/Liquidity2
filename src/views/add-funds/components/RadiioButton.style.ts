import {StyleSheet} from 'react-native';
import {COLORS} from '../../../assets';

export const RadioButtonComponentstyles = StyleSheet.create({
  parent: {flexDirection: 'row', paddingTop: 16},
  radioButtonCenter: {
    borderColor: COLORS['primary-light'],
    borderWidth: 1,
    borderRadius: 24,
    width: 8,
    height: 8,
    backgroundColor: COLORS['primary-light'],
    alignItems: 'center',
    justifyContent: 'center',
  },
  borderCircle: {
    borderColor: COLORS['primary-light'],
    borderWidth: 2,
    borderRadius: 24,
    width: 16,
    height: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  accountText: {color: COLORS['white'], paddingLeft: 8},
});
