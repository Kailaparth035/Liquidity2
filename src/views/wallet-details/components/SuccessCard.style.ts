import {StyleSheet} from 'react-native';
import {COLORS} from '../../../assets';
export const styles = StyleSheet.create({
  container: {flexDirection: 'row', marginTop: 16},
  image: {
    width: 40,
    height: 40,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  arrowIcon: {width: 15, height: 16},
  textContainer: {flex: 1, paddingLeft: 8},
  titleText: {
    fontWeight: '600',
    fontSize: 15,
    lineHeight: 20,
  },
  processStatusView: {
    borderRadius: 50,
    marginRight: 10,
    padding: 4,
  },
  subTitle: {
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 16,
    marginTop: 4,
  },
  successContainer: {flexDirection: 'row', alignItems: 'center'},
  successDotStyle: {
    color: COLORS.green_dot,
    // fontSize: 32,
    alignSelf: 'center',
  },
  failDotStyle: {color: COLORS.red},
  successText: {fontSize: 14, lineHeight: 20},
  bankDetailsView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 5,
  },
});
