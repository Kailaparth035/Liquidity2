import {StyleSheet} from 'react-native';
import {COLORS} from '../../../../assets';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,.5)',
  },
  modal: {
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    marginHorizontal: 1,
    padding: 16,
  },
  headerContainer: {flexDirection: 'row'},
  filterHeader: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 24,

    textAlign: 'center',
  },
  statusContainer: {paddingVertical: 16},
  statusText: {
    color: COLORS['font-color-light'],
    fontSize: 14,
    lineHeight: 16,
    fontWeight: '500',
    paddingBottom: 4,
  },
  filterButtonText: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '500',
  },
});
