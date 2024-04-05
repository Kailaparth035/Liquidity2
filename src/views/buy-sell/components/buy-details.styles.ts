import {Dimensions, Platform, StyleSheet} from 'react-native';
import {isAndroid} from 'react-native-draggable-flatlist/lib/constants';
import {COLORS} from '../../../assets';

const {height} = Dimensions.get('window');

export const DetailsStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS['primary'],
  },
  keyboardHeight: {
    flex: 1,
    marginBottom: Platform.OS === 'android' ? 30 : 0,
  },
  detailsContainer: {
    justifyContent: 'space-between',
    marginBottom: 60,
  },
  form: {
    padding: 10,
    paddingBottom: 0,
  },
  formContain: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-around',
  },
  details: {
    paddingHorizontal: 12,
    height: 220
  },
  DefaultText: {

    marginTop: 4,
    paddingLeft: 10,
    width: 30,
    fontWeight: '600',
  },
  dropdownView: {
    position: 'absolute',
    right: 0,
    marginTop: 25,
    width: 60,
    height: 70,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'darkgrey',
  },
  selectedText: {
    textAlign: 'center',
    marginTop: 5,
    fontWeight: '600',
  },
  orderText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10
  },
  optionText: {
    flexDirection: 'row',
    borderRadius: 5,
  },
  orderbookContainer: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 10
  },
  mainContainer: {
    marginBottom: 10
  },
  subContainer: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    flex: 1,
  },
  bids: {
    flex: 0.5,
    minHeight: 200,
    marginRight: 12,
  },
  headerView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 20,
  },
  subHeading: {
    fontSize: 14,
    fontWeight: '500',
    color: COLORS['font-color-light'],
    marginBottom: 8,
  },
  asks: {
    flex: 0.5,
    minHeight: 200,
    marginLeft: 12,
  },
  values: {
    color: COLORS['white'],
  },
  bidTxt: {
    color: COLORS['price-up'],
  },
  askTxt: {
    color: COLORS['price-down'],
  },
  footer: {
    // marginTop: 68
  },
  buyBtn: {
    width: '90%',
    backgroundColor: COLORS['buy'],
    borderRadius: 4,
    marginTop: 20,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  sellBtn: {
    width: '90%',
    backgroundColor: COLORS['sell'],
    borderRadius: 4,
    marginTop: 20,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  disabled: {
    width: '90%',
    backgroundColor: COLORS['buy'],
    flex: 0.35,
    borderRadius: 12,
    marginTop: 20,
    justifyContent: 'center',
    opacity: 0.4,
  },
  radioBox: {
    backgroundColor: COLORS['bg-100-dark'],
    width: '30%',
    borderRadius: 8,
    height: 80,
    borderColor: COLORS['input-border-dark'],
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioBoxActive: {
    borderColor: '#ffffff',
    backgroundColor: COLORS['bg-90-dark'],
  },
  radioBoxDisable: {
    backgroundColor: COLORS['bg-90-dark'],
    borderColor: COLORS['input-border-dark'],
  },
  radioView: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 32,
  },
  typeTxt: {
    color: '#878C99',
    fontSize: 12,
    fontWeight: '500',
  },
  formInput: {
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    borderColor: COLORS['input-border-dark'],
    borderWidth: 0.25,
    borderRadius: 6,
    width: '100%',
    padding: 12,
    color: COLORS['white'],
    fontSize: 14,
    fontWeight: '500',
    paddingRight: 50,
  },
  label: {
    display: 'flex',
    flexDirection: 'row',
    gridGap: 2,
  },
  labelText: {
    color: COLORS['input-border-focus-dark'],
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 4,
  },
  checkbox: {
    right: 8,
    top: 4,
    display: 'flex',
    height: '30%',
    zIndex: 1,
    position: 'absolute',
  },

  // goodTillcancel view

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
  exclaimanationIcon: {
    width: 13,
    height: 13,
    marginLeft: 10,
  },
  toggleView: {
    padding: 2,
    paddingHorizontal: 5,
    borderRadius: 12,
    width: 40,
    height: 20,
    justifyContent: 'center',
  },
  dropView: {
    position: 'absolute',
    right: -25,
    width: '15%',
    marginRight: 30,
    paddingLeft: 8,
    borderRadius: 3,
  },
  iconStyle: {
    right: 0,
    marginTop: 5,
    padding: 3,
    position:"absolute",
    marginRight:5
  },
  toggleButton: {
    backgroundColor: COLORS['white'],
    width: 12,
    height: 12,
    borderRadius: 12,
  },
  orderCloseTimeText: {
    fontSize: 12,
    fontWeight: '400',
    margin: 7,
    marginTop: 2,
    color: COLORS['input-border-focus-dark'],
  },
  quantityView: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
    flex: 1,
    position: 'absolute',
    right: 0,
    height: 25,
    width:58,
    paddingLeft:Platform.OS == 'android' ? 3 : 8,
    borderRadius:5
  },
});

export const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    color: COLORS['black'],
    fontSize: 14,
  },
  inputAndroid: {
    color: COLORS['black'],
    fontSize: 14,
  },
});

export const pickerSelectStylesNew = StyleSheet.create({
  inputIOS: {
    color: COLORS['white'],
    fontSize: 14,
    paddingVertical: 8,
  },
  inputAndroid: {
    color: COLORS['white'],
    fontSize: 14,
    paddingVertical: 0,
  },
});
