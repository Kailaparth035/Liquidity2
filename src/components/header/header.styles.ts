import {StyleSheet} from 'react-native';
import {COLORS} from '../../assets';

export const headerStyles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    borderBottomColor: COLORS['input-border-dark'],
    borderBottomWidth: 0,
    backgroundColor: COLORS['bg-90-dark'],
  },
  heading: {
    flex: 1,
    fontSize: 14,
    justifyContent: 'center',
    color: COLORS['white'],
    fontWeight: '600',
  },
  btn: {
    paddingRight: 20,
    padding: 20,
  },
  svgContianer: {
    height: 30,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  toggleContainer: {
    width: 80,
    height: 30,
    borderRadius: 100,
    flexDirection: 'row',
  },
});
