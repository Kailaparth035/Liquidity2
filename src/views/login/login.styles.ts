import {Platform, StyleSheet} from 'react-native';
import {COLORS} from '../../assets/theme/dark';
import {useNetwork, usePlatform} from '../../hooks';
import {Dimensions} from 'react-native';

const {height} = Dimensions.get('window');
export const loginStyles = StyleSheet.create({
  contain: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  mainView: {
    height: Platform.OS === 'android' ? height : height - 100,
    justifyContent: 'space-between',
  },
  head: {
    alignItems: 'center',
    alignContent: 'center',
    flexDirection: 'row',
    borderWidth: 2,
    marginBottom: 20,
    width: '90%',
    height: 60,
    paddingLeft: 12,
    borderRadius: 4,
    borderColor: COLORS['font-color-light'],
  },
  container: {
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    width: '90%',
  },
  btn: {
    backgroundColor: COLORS['btn-primary-light'],
    width: '90%',
    borderRadius: 8,
    alignItems: 'center',
    paddingVertical: 16,
    marginHorizontal: 16,
    alignSelf: 'center',
    marginBottom: 16,
  },
  txt: {
    color: COLORS['white'],
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 20,
  },
  mobileTxt: {
    fontSize: 32,
    width: '90%',
    fontWeight: '600',
    color: COLORS['white'],
  },
  verificationTxt: {
    paddingTop: 5,
    textAlign: 'left',
    width: '90%',
    paddingBottom: 20,
    fontSize: 14,
    fontWeight: '500',
    color: COLORS['input-border-dark'],
  },
  countrySelect: {
    width: Platform.OS === 'ios' ? 110 : 126,
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'center',
    borderRightColor: COLORS['btn-cancel'],
    borderRightWidth: 1,
    paddingHorizontal: 4,
  },
  countryCode: {
    position: 'absolute',
    left: Platform.OS === 'ios' ? 126 : 130,
    color: COLORS['bg-80-light'],
    fontSize: 18,
  },
  loginInput: {
    color: COLORS['bg-90-light'],
    marginTop: 1.5,
    fontSize: 18,
    marginLeft: 135,
    paddingLeft: 40,
    borderBottomEndRadius: 12,
    borderTopEndRadius: 12,
    width: '70%',
  },
  size: {
    width: 24,
    height: 24,
  },
  logoSize: {
    width: '100%',
    height: 100,
    marginTop: 32,
  },
  loginContain: {
    flex: 1,
    height: '100%',
  },
  activityIndicator: {
    marginTop: -34,
  },
  disabledBtn: {
    backgroundColor: COLORS['btn-primary-light'],
    width: '90%',
    borderRadius: 8,
    alignItems: 'center',
    paddingVertical: 16,
    opacity: 0.7,
    alignSelf: 'center',
    marginBottom: 16,
  },
  disabledTxt: {
    color: COLORS['white'],
    textAlign: 'center',
    fontWeight: 'bold',
    paddingBottom: 8,
    opacity: 0.7,
  },
  logoContainer: {
    flexDirection: 'row',
    aligntItems: 'center',
    justifyContent: 'space-between',
    paddingRight: 10,
    marginTop: Platform.OS === 'android' ? 65 : 0,
  },
  skip: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  skipTxt: {
    color: COLORS['color-text-dark-70'],
    fontSize: 14,
    fontWeight: '500',
  },
  skipIcon: {marginHorizontal: 14},
});

export const pickerSelectStylesNew = StyleSheet.create({
  inputIOS: {
    backgroundColor: COLORS['bg-80-dark'],
    borderWidth: 1,
    borderRadius: 6,
    width: '100%',
    padding: 12,
    color: COLORS['white'],
    fontSize: 16,
  },
  inputAndroid: {
    backgroundColor: COLORS['bg-80-dark'],
    borderWidth: 1,
    borderRadius: 6,
    width: '100%',
    padding: 10,
    color: COLORS['white'],
    fontSize: 18,
  },
});
