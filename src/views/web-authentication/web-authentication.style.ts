import {Dimensions, Platform, StyleSheet} from 'react-native';
import {COLORS} from '../../assets';
const {height} = Dimensions.get('window');
export const webAuthenticationStyles = StyleSheet.create({
  mainView: {
    height: Platform.OS === 'android' ? height : height - 100,
    paddingHorizontal: 16,
    paddingTop: Platform.OS === 'android' ? 30 : 0,
  },
  headerText: {
    fontSize: 25,
    fontWeight: '600',
    marginTop: 20,
  },
  descriptionText: {
    fontSize: 14,
    marginTop: 7,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
    width: '100%',
  },
  buttonModal: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
    width: '100%',
    alignSelf: 'center',
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
  buttonextraStyle: {
    marginRight: 7,
    padding: 5,
    borderRadius: 8,
  },
  numberEditText: {
    fontSize: 16,
    textDecorationLine: 'underline',
  },
  loaderView: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    width: '100%',
    left: 20,
  },
  modalBackground: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    opacity: 0.95,
  },

  // modal
  modalMainView: {
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 10,
  },
  modalView: {
    padding: 15,
    borderRadius: 10,
  },
  activityView: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  cancelButtonView: {
    justifyContent: 'flex-end',
    marginTop: 10,
  },
});
