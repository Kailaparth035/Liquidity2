import {StyleSheet} from 'react-native';
import {COLORS} from '../../../assets';

export const styles = StyleSheet.create({
  bankDetailsButton: {
    backgroundColor: COLORS['bg-80-dark'],
    padding: 12,
    alignItems: 'flex-start',
    justifyContent: 'center',
    flex: 1,
    borderRadius: 4,
  },
  bankIcon: {tintColor: COLORS['white'], width: 32, height: 32},
  bankNameText: {
    fontWeight: '500',
    fontSize: 16,
    color: COLORS['white'],
    marginTop: 12,
  },
  accountText: {
    fontWeight: '500',
    fontSize: 12,
    color: COLORS['primary-dark'],
    marginTop: 5,
  },
});
