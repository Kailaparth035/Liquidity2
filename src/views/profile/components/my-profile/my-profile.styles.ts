import {StyleSheet} from 'react-native';
import {COLORS} from '../../../../assets/theme/index';

export const myProfileStyles = StyleSheet.create({
  emailEditModal: {
    borderWidth: 1,
    margin: 20,
    borderRadius: 8,
    padding: 10,
  },
  profileUploadModal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileUploadModalMainView: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 5,
    marginHorizontal: 15,
    width: '90%',
    shadowColor: 'black',
    shadowRadius: 10,
    shadowOpacity: 0.6,
    elevation: 8,
    shadowOffset: {
      width: 0,
      height: 4,
    },
  },

  takePhotoButton: {
    borderWidth: 1,
    borderColor: COLORS['bg-80-light'],
    borderRadius: 5,
    padding: 7,
    marginVertical: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cameraIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  takePhotoText: {
    color: 'black',
    fontSize: 15,
    alignSelf: 'center',
  },
  chooseImageText: {
    color: 'black',
    fontSize: 15,
    alignSelf: 'center',
  },
});
