import { Platform, StyleSheet } from 'react-native';
import { COLORS } from '../../../../assets';

export const headerStyles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 20,
    paddingTop: Platform.OS === "ios" ? 8 : 16,
    paddingBottom: 0,
  },
  title: {
    color: COLORS['white'],
    fontWeight: '600',
    fontSize: 16,
  },
  buttons: {
    flexDirection: 'row',
  },
  btnToRequest: {
    marginRight: 2,
    padding: 12,
  },
});
