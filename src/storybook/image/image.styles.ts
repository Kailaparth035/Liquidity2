import {StyleSheet} from 'react-native';
import {COLORS} from '../../assets';

export const ImageStyles = StyleSheet.create({
  loader: {
    borderRadius: 50,
    marginRight: 12,
    backgroundColor: COLORS['bg-90-dark'],
    alignItems: 'center',
    justifyContent: 'center',
  },
  firstTxt: {
    fontSize: 18,
    color: COLORS['color-text-dark-70'],
    textTransform: 'uppercase',
    textAlign: 'center'
  },
});
