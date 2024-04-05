import {COLORS} from '../../assets';
import {StyleSheet} from 'react-native';

export const addNewAccountDeoposite = StyleSheet.create({
  pageContainer: {margin: 16, flex: 1},
  balanceSheetContainer: {
    backgroundColor: COLORS.primary,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  customeButtonView: {
    backgroundColor: COLORS['bg-90-dark'],
    padding: 15,
    paddingBottom: 35,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  closeButton: {
    height: 20,
    width: 20,
    position: 'absolute',
    borderRadius: 10,
    top: 20,
    right: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageContainer: {
    width: 80,
    height: 80,

    borderRadius: 50,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageStyle: {width: 40, height: 40},
  text: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '500',
    paddingTop: 12,
  },
  btnContainer: {
    backgroundColor: COLORS.button_blue,
    height: 50,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    width: 260,
  },
  btnText: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS['white'],
  },
});
