import {Dimensions, StyleSheet} from 'react-native';

export const portfolioAssetsStyle = StyleSheet.create({
  container: {
    flex: 1,
  },
  loaderView: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    left: Dimensions.get('window').width / 2.2,
  },
});
