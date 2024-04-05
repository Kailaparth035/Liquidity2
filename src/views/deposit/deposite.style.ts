import {COLORS} from '../../assets';
import {StyleSheet} from 'react-native';

export const depositeStyles = StyleSheet.create({
  pageContainer: {margin: 16, flex: 1},
  balanceSheetContainer: {
    backgroundColor: COLORS.primary,
    flex: 1,
  },
  customeButtonView: {
    backgroundColor: COLORS['bg-90-dark'],
    padding: 15,
    paddingBottom: 35,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  buttonextraStyle: {
    marginRight: 7,
    padding: 5,
    borderRadius: 8,
  },
});
