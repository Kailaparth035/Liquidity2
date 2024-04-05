import {StyleSheet} from 'react-native';
import {COLORS} from '../../../assets';

export const styles = StyleSheet.create({
  // button

  methodButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: COLORS['bg-80-dark'],
    padding: 18,
    borderRadius: 8,
  },
  methodIconView: {
    backgroundColor: COLORS.dark_button,
    padding: 8,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  methodIcon: {
    width: 24,
    height: 24,
    alignSelf: 'center',
    tintColor: COLORS['white'],
  },
  methodNameText: {
    color: COLORS['white'],
    fontSize: 16,
    fontWeight: '500',
    marginLeft: 10,
    alignSelf: 'center',
  },
});
