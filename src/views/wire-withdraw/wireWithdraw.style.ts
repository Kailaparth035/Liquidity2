import {StyleSheet} from 'react-native';
import {COLORS} from '../../assets';

export const styles = StyleSheet.create({
  wireContainer: {
    backgroundColor: COLORS.primary,
    flex: 1,
  },
  pageContainer: {marginHorizontal: 16, flex: 1, marginVertical: 10},
  customeButtonView: {
    backgroundColor: COLORS['bg-90-dark'],
    padding: 15,
    paddingBottom: 35,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  buttonextraStyle: {
    marginRight: 7,
    padding: 5,
    borderRadius: 8,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
    minHeight: 50
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
  errorTxt: {
    color: COLORS['red'],
    fontWeight: '500',
    marginTop: 4,
  }
});
