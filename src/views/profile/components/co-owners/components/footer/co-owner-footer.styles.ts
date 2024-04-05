import { StyleSheet } from 'react-native';
import { COLORS } from '../../../../../../assets';

export const CoOwnerFooterStyles = StyleSheet.create({
  btnContainer: {
    backgroundColor: COLORS.button_blue,
    height: 58,
    marginHorizontal: 4,
    padding: 12,
    borderRadius: 10,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnContainerDisabled: {
    backgroundColor: '#FFFFFF1F',
    height: 50,
    marginHorizontal: 4,
    padding: 12,
    borderRadius: 10,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnText: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS['white'],
  },
  footerWrapper: {
    flexDirection: 'row',
    backgroundColor: '',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,

  },
});
