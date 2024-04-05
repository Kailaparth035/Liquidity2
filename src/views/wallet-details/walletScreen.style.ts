import {StyleSheet} from 'react-native';
import {COLORS} from '../../assets';
export const styles = StyleSheet.create({
  parent: {flex: 1, margin: 16},
  button: {
    backgroundColor: COLORS['primary-light'],
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
  },
  buttonText: {
    fontSize: 14,
    lineHeight: 24,
    textAlign: 'center',
    color: COLORS['white'],
    paddingHorizontal: 16,
    paddingVertical: 8,
    fontWeight: '500',
  },
  headerText: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '600',
    paddingTop: 15,
  },
  ammountText: {
    color: COLORS.white,
    fontSize: 24,
    lineHeight: 32,
    fontWeight: '600',
    paddingBottom: 16,
  },
  text: {
    paddingBottom: 4,
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '400',
  },
  card: {
    backgroundColor: COLORS['bg-80-dark'],
    alignItems: 'center',
    borderRadius: 4,
    paddingVertical: 24,
  },
  noDataText: {
    fontSize: 14,
    fontWeight: '400',
    alignItems: 'center',
    alignSelf: 'center',
    paddingTop: 20,
  },
});
