import {StyleSheet} from 'react-native';
import {COLORS} from '../../../../assets';

export const styles = StyleSheet.create({
  headerText: {
    color: COLORS['font-color-light'],
    fontSize: 14,
    lineHeight: 16,
    fontWeight: '500',
    paddingBottom: 4,
  },
  dateRangeContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  filterLabel: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '500',
  },

  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingBottom: 16,
  },
  calenderContainer: {marginVertical: 16},
  activeDate: {
    backgroundColor: COLORS['primary-dark'],
    borderRadius: 24,
    width: 28,
    height: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inactievDate: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 28,
    height: 28,
  },
});
