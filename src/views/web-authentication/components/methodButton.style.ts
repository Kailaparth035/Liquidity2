import {Platform, StyleSheet} from 'react-native';
import {COLORS} from '../../../assets';

export const methodButtonStyles = StyleSheet.create({
  buttonView: {
    backgroundColor: COLORS['color-transparent-green'],
    padding: 15,
    marginTop: 10,
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'space-between',
    borderRadius: 10,
  },
  buttonText: {
    fontSize: Platform.OS === 'android' ? 18 : 20,
    fontWeight: '600',
    flex: 1,
  },
  imageView: {
    backgroundColor: COLORS['color-transparent-green'],
    width: 50,
    height: 50,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconStyle: {width: 35, height: 35, tintColor: COLORS.green},
  buttonNameView: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingLeft: 15,
    flex: 1,
  },
});
