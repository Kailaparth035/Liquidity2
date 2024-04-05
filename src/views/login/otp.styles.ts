import {Platform, StyleSheet} from 'react-native';
import {COLORS} from '../../assets';

export const otpStyles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: COLORS['bg-100-dark'],
    width: '100%',
  },
  loaderView: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    flex: 1,
  },
  imageContainer: {
    width: '100%',
    top: Platform.OS === 'android' ? 50 : 32,
  },
  contain: {
    width: '100%',
    flex: 0.4,
    marginTop: 54,
    paddingLeft: 24,
    marginBottom: Platform.OS === 'android' ? 300 : 0,
  },
  headingTxt: {
    color: COLORS['white'],
    fontSize: 32,
    fontWeight: '600',
  },
  headingTxt2: {
    color: COLORS['white'],
    fontSize: 32,
    fontWeight: '600',
  },
  verificationTxt: {
    color: COLORS['font-color-light'],
    fontWeight: '500',
  },
  edit: {
    color: COLORS['input-border-focus-dark'],
    fontWeight: '600',
    marginRight: 10,
  },
  otp: {
    width: '65%',
    alignSelf: 'center',
  },
  underlineStyleBase: {
    width: 54,
    height: 54,
    borderRadius: 12,
    borderWidth: 2,
    fontSize: 16,
    fontWeight: '600',
    color: COLORS['bg-90-light'],
  },
  underlineStyleHighLighted: {
    borderColor: COLORS['input-border-light'],
  },
  btn: {
    backgroundColor: COLORS['primary-dark'],
    padding: 16,
    borderRadius: 4,
    width: '90%',
    alignSelf: 'center',
  },
  txt: {
    color: COLORS['white'],
    textAlign: 'center',
    fontWeight: 'bold',
  },
  editBtn: {
    color: COLORS['accent-dark'],
    fontWeight: '600',
  },
  logoSize: {
    width: '100%',
    height: 100,
    resizeMode: 'contain',
    // left: 16,
  },
  resend: {
    color: COLORS['font-color-light'],
    fontSize: 14,
    fontWeight: '500',
  },
  disabledBtn: {
    backgroundColor: COLORS['primary-dark'],
    padding: 16,
    borderRadius: 4,
    width: '90%',
    alignSelf: 'center',
    opacity: 0.5,
  },
  disabledTxt: {
    color: COLORS['white'],
    textAlign: 'center',
    fontWeight: 'bold',
    opacity: 0.5,
  },
  otpNotReceiveView: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  editNumberView: {
    marginTop: 12,
    flexDirection: 'row',
  },
});
