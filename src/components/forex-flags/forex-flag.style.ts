import {StyleSheet} from 'react-native';
import {COLORS} from '../../assets';

export const ForexImageStyles = StyleSheet.create({
  container: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: COLORS['color-bg-dark-80'],
    flexDirection: 'row',
    padding: 6,
  },
  imageFrom: {
    width: 24,
    height: 24,
    transform: [{scaleY: 1.5}, {scaleX: 1.5}],
  },
  imageTo: {
    height: 24,
    width: 24,
    transform: [{scaleY: 1.5}, {scaleX: 1.5}],
  },
  imageFromContainer: {
    width: 24,
    height: 24,
    overflow: 'hidden',
    borderRadius: 100,
    zIndex: 10,
  },
  imageToContainer: {
    width: 24,
    height: 24,
    overflow: 'hidden',
    borderRadius: 100,
    left: -12,
    top: 10,
  },
});
