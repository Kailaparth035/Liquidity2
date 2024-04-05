import {StyleSheet} from 'react-native';
import {COLORS} from '../../../../assets';

export const chartControlStyle = StyleSheet.create({
  ipoBtn: {
    color: COLORS['accent-dark'],
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 16,
  },
  disabled: {
    opacity: 0.4,
  },
  toggle: {
    display: 'flex',
    flexDirection: 'row',
    width: 72,
    height: 36,
    borderRadius: 12,
    padding: 4,
    backgroundColor: 'rgba(54, 56, 61, 1)',
    opacity: 0.4,
    justifyContent: 'space-between',
  },
  toggleItem1: {
    padding: 2,
    height: 28,
    width: 28,
    borderRadius: 8,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 4,
    position: 'relative'
  },
  toggleItem2: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 2,
    height: 28,
    width: 28,
    borderRadius: 8,
  },
  toggleActive: {
    backgroundColor: COLORS['bg-100-dark'],
  },
});
