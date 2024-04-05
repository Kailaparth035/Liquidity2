import {StyleSheet} from 'react-native';
import {COLORS} from '../../../assets';

export const customButtonStyles = StyleSheet.create({
  parent: {},
  blueButton: {
    backgroundColor: COLORS['primary-light'],
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
  },
  DarkButton: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
  },
  diabledDarkButton: {
    fontSize: 14,
    lineHeight: 24,
    textAlign: 'center',
    color: COLORS['white'],
    paddingHorizontal: 16,
    paddingVertical: 8,
    fontWeight: '500',
    opacity: 0.5,
  },
  buttonText: {
    fontSize: 14,
    lineHeight: 24,
    textAlign: 'center',
    color: COLORS['white'],
    paddingHorizontal: 16,
    paddingVertical: 8,
    fontWeight: '500',
  },
});
