import {Platform, StyleSheet} from 'react-native';
import {COLORS} from '../../../../assets';

export const AuthUsersStyles = StyleSheet.create({
  wrapper: {flex: 1},
  mainContainer: {paddingHorizontal: 12, marginBottom: 80},
  container: {
    marginTop: 10,
    height: 70,
    borderRadius: 8,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1, 
  },
  secondColomn: {paddingBottom: 4, flex: 1, marginHorizontal: 10},
  row: {paddingBottom: 4},
  ImageContainer: {
    borderRadius: 50,
    width: 40,
    height: 40,
    backgroundColor: COLORS['font-color-light'],
    marginRight: 12,
    justifyContent: 'center',
  },
  firstTxt: {
    fontSize: 18,
    color: COLORS['color-text-dark-70'],
    textTransform: 'uppercase',
    textAlign: 'center',
  },
  loader: {
    borderRadius: 50,
    marginRight: 12,
    backgroundColor: COLORS['bg-90-dark'],
    alignItems: 'center',
    justifyContent: 'center',
  },
  dataContainer: {flex: 6, justifyContent: 'space-between'},
  image: {width: 40, height: 40, borderRadius: 50},
  txtName: {
    fontSize: 18,
    fontWeight: '600',
  },
  statusContainer: {flexDirection: 'row', alignItems: 'center'},
  divider: {
    borderColor: COLORS['font-color-light'],
    borderWidth: 0.5,
    marginHorizontal: 6,
    height: 10,
  },
  txtStatus: {
    fontSize: 12,
    color: COLORS['font-color-light'],
    fontWeight: '500',
  },
  txtType: {
    fontSize: 12,
    color: COLORS['font-color-light'],
    fontWeight: '500',
  },
  listContainer: {paddingHorizontal: 12, height:Platform.OS =="ios" ? '80%' : "75%"},
  cardArrow: {
    flex: 0.8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statusIndicator: {
    width: 5,
    height: 5,
    borderRadius: 50,
    marginRight: 6,
  },
  btnContainer: {
    backgroundColor: COLORS.button_blue,
    height: 50,
    width: '100%',
    marginHorizontal: 12,
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnText: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS['white'],
  },
  goodTillcancelView: {
    flexDirection: 'row',
    marginTop: 20,
    paddingHorizontal: 7,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  goodTillcancelTextView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  goodTillCancelText: {
    fontSize: 14,
    fontWeight: '500',
    color: COLORS['white'],
  },
  toggleView: {
    padding: 2,
    paddingHorizontal: 5,
    borderRadius: 12,
    width: 40,
    height: 20,
    justifyContent: 'center',
  },
  toggleButton: {
    backgroundColor: COLORS['white'],
    width: 12,
    height: 12,
    borderRadius: 12,
  },
  formContainer: {
    height: 600,
    borderRadius: 12,
  },
  formHeader: {
    width: '100%',
    height: '10%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 15,
    flexDirection: 'row',
  },
  headingTxt: {fontSize: 16, fontWeight: '600', flex: 1.5, textAlign: 'right'},
  formInputContainer: {flex: 5, padding: 15},
  inputWrapper: {flexDirection: 'row'},
  firstInput: {paddingBottom: 0, flex: 1},
  closeBtn: {
    textAlign: 'right',
    paddingRight: 20,
    fontWeight: '600',
  },
  keyTxt: {
    fontSize: 12,
    fontWeight: '500',
    color: '#A2A7B8',
    paddingBottom: 6,
  },
  inputContainer: {fontSize: 12, fontWeight: '500', color: '#A2A7B8'},
  inputField: {
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderRadius: 8,
  },
  errorMessage: {
    color: COLORS['color-red'],
    fontWeight: '500',
    marginTop: 4,
  },
  head: {
    alignItems: 'center',
    alignContent: 'center',
    flexDirection: 'row',
    borderWidth: 1,
    width: '100%',
    height: 40,
    paddingLeft: 12,
    paddingVertical: 12,
    borderRadius: 4,
    borderColor: COLORS['font-color-light'],
  },
  countrySelect: {
    width: Platform.OS === 'ios' ? 110 : 126,
    position: 'absolute',
    flexDirection: 'row',
    height: 40,
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
  footerContainer: {
    flex: 1,
    paddingTop: 15,
    borderTopWidth: 1,
  },
  footerWrapper: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 12,
  },
});
