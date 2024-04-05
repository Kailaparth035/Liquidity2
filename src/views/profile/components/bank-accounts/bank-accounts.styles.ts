import {StyleSheet} from 'react-native';
import {COLORS} from '../../../../assets';

export const BankAccountsStyles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: COLORS['bg-100-dark'],
  },
  bottomSheet: {
    width: '100%',
    padding: 20,
    position: 'absolute',
    bottom: 0,
    backgroundColor: COLORS['bg-90-dark'],
  },
  btnContainer: {
    backgroundColor: COLORS.button_blue,
    height: 50,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnText: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS['white'],
  },
});
