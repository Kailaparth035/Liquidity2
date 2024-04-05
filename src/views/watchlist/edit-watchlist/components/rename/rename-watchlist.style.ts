import {StyleSheet} from 'react-native';
import {COLORS} from '../../../../../assets';

export const renameWatchlistStyles = StyleSheet.create({
  container: {
    height: 52,
    justifyContent: 'space-between',
    backgroundColor: COLORS['bg-90-dark'],
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputRight: {
    paddingLeft: 16,
  },
  icons: {
    flexDirection: 'row',
  },
  input: {
    padding: 16,
    paddingLeft: 4,
    color: COLORS['accent-dark'],
    minWidth: 120,
    maxWidth: 260,
  },
  line: {
    borderRightWidth: 1,
    borderColor: '#43464D',
    alignItems: 'center',
    justifyContent: 'center',
  },
  area: {
    padding: 16
  }
});
