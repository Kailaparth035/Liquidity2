import {StyleSheet} from 'react-native';

export const modalStyles = StyleSheet.create({
  parent: {flex: 1},
  container: {
    flex: 1,
    padding: 18,
    justifyContent: 'center',
    alignItems: 'center',
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
  button: {
    marginTop: 12,
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  byttonLabel: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '500',
  },
});
