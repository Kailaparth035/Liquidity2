import {StyleSheet} from 'react-native';
import {COLORS} from '../../../assets';

export const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
  },
  buttonText: {
    fontSize: 14,
    lineHeight: 24,
    textAlign: 'center',
    color: COLORS['white'],
    paddingHorizontal: 16,
    paddingVertical: 8,
    fontWeight: '500',
  },
  ammountText: {
    color: COLORS.white,
    fontSize: 24,
    lineHeight: 32,
    fontWeight: '600',
    paddingBottom: 16,
  },
  text: {
    paddingBottom: 4,

    fontSize: 14,
    lineHeight: 20,
    fontWeight: '400',
  },
  card: {
    // backgroundColor: COLORS['bg-80-dark'],
    alignItems: 'flex-start',
    borderRadius: 4,
    paddingVertical: 24,
  },

  // buttonView
  customeButtonView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  bankDetailsButtonView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 20,
  },
});
