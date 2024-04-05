import {StyleSheet} from 'react-native';
import {COLORS} from '../../assets';

export const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: COLORS['bg-100-dark'],
    flex: 1,
  },
  container: {
    height: '100%',
    backgroundColor: COLORS['bg-100-dark'],
    padding: 16,
  },
  scroll: {
    height: '100%',
  },
  borderLine: {
    height: 1,
    width: '100%',
    alignItems: 'center',
    backgroundColor: COLORS['color-border-dark-100'],
    marginTop: 8,
  },
  noDataText: {
    fontSize: 14,
    fontWeight: '400',
    alignItems: 'center',
    alignSelf: 'center',
    paddingTop: 20,
  },
});
