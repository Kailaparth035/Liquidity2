import {StyleSheet} from 'react-native';
import {COLORS} from '../../assets';

export const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    borderWidth: 1,
    borderRadius: 6,
    width: '100%',
    padding: 12,
    color: COLORS['black'],
    fontSize: 16,
  },
  inputAndroid: {
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    borderWidth: 1,
    borderRadius: 6,
    width: '100%',
    padding: 12,
    color: COLORS['black'],
    fontSize: 16,
  },
});
