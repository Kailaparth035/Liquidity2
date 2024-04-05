import {Dimensions, Platform, StyleSheet} from 'react-native';
import {COLORS} from '../../assets';
const {height} = Dimensions.get('window');
export const numberVerifiedStyles = StyleSheet.create({
  mainView: {
    height: Platform.OS === 'android' ? height : height - 100,
    justifyContent: 'center',
  },
  verifiedImage: {
    width: 90,
    height: 90,
    alignSelf: 'center',
  },
  headerText: {
    fontSize: 25,
    fontWeight: '600',
    textAlign: 'center',
    marginTop: 20,
  },
  descriptionText: {
    textAlign: 'center',
    fontSize: 14,
    marginTop: 10,
  },
  skipForNowText: {
    fontSize: 14,
    textAlign: 'center',
  },
  loginText: {
    fontSize: 14,
    color: COLORS['color-yellow'],
    textAlign: 'center',
    marginLeft: 5,
    fontWeight: '500',
    textDecorationLine: 'underline',
  },
  btn: {
    backgroundColor: COLORS['btn-primary-light'],
    width: '80%',
    borderRadius: 8,
    alignItems: 'center',
    paddingVertical: 14,
    marginHorizontal: 16,
    alignSelf: 'center',
    marginBottom: 16,
    marginTop: 30,
  },
  txt: {
    color: COLORS['white'],
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 20,
  },
  textView: {flexDirection: 'row', justifyContent: 'center'},
});
