import {Dimensions, StyleSheet} from 'react-native';
import {COLORS} from '../../../../../assets';

export const customeTextInputeStyles = StyleSheet.create({
  headerText: {
    fontSize: 16,
    fontWeight: '500',
    marginTop: 15,
  },
  textInpute: {
    padding: 0,
    paddingHorizontal: 10,
    fontSize: 15,
    flex: 1,
  },
  textInputView: {
    borderRadius: 8,
    borderWidth: 2,
    padding: 15,
    borderColor: COLORS['color-border-dark-90'],
    marginTop: 10,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
