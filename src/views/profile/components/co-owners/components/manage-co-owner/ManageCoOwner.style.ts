import {StyleSheet} from 'react-native';
import {COLORS} from '../../../../../../assets';

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {flexDirection: 'row', padding: 10},
  footerWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },
  borderLine: {
    width: '95%',
    height: 1,
    marginVertical: 6,
    alignSelf: 'center',
  },
  subText: {
    fontSize: 14,
    padding: 10,
  },
  headerText: {
    fontSize: 14,
    fontWeight: '600',
    padding: 10,
  },
  btnText: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS['white'],
  },
  btnContainer: {
    backgroundColor: COLORS['color-red'],
    height: 50,
    marginHorizontal: 4,
    padding: 12,
    borderRadius: 10,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',

    padding: 10,
    borderRadius: 20,
  },
});
