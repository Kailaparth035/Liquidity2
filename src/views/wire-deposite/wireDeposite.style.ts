import {StyleSheet} from 'react-native';
import {COLORS} from '../../assets';

export const styles = StyleSheet.create({
  wireContainer: {
    backgroundColor: COLORS.primary,
    flex: 1,
  },
  pageContainer: {marginHorizontal: 16, flex: 1, marginVertical: 10},
  headerText: {
    fontSize: 14,
    marginHorizontal: 16,
    marginTop: 10,
  },
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

  // note view
  noteView: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    margin: 16,
    borderColor: '#F5AF45',
    borderWidth: 1,
    padding: 7,
    borderRadius: 10,
    backgroundColor: 'rgba(245, 175, 69, 0.1)',
  },
  exclaimnationImage: {
    width: 14,
    height: 14,
  },
  noteText: {
    alignSelf: 'flex-start',
    fontSize: 14,
    marginLeft: 7,
    top: -3,
  },
});
