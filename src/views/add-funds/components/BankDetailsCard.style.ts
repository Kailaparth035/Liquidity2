import {COLORS} from '../../../assets';
import {StyleSheet} from 'react-native';

export const BankDetailsCardStyles = StyleSheet.create({
  parent: {
    backgroundColor: COLORS['bg-80-dark'],

    borderRadius: 8,
    marginTop: 8,
    borderWidth: 1,
  },
  directionRow: {flexDirection: 'row', padding: 12},
  parent_border: {
    backgroundColor: COLORS['bg-80-dark'],
    padding: 12,
    borderRadius: 8,
    marginTop: 4,
    borderWidth: 1,
  },
  image: {width: 40, height: 40},
  textcontainer: {flex: 1, paddingHorizontal: 16},
  title: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '600',
  },
  subTitleContaoiiner: {flexDirection: 'row'},
  subTitleText: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '500',
  },
  changeButton: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 40,
    marginTop: 8,
  },
  changeButtonLable: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '600',
  },
  CheckCircle: {
    top: -6,
    right: -6,
    position: 'absolute',
  },
  dropDownButton: {
    paddingHorizontal: 8,
    borderRadius: 40,
  },
  RadioButtonContainer: {
    borderRadius: 8,
  },
});
