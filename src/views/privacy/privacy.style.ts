import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {flex: 1, justifyContent: 'center'},
  loaderContainer: {
    padding: 30,
    position: 'absolute',
    backgroundColor: 'rgba(91, 92, 94,.8)',
    borderRadius: 20,
  },
  webView: {opacity: 0.99},
  loader: {paddingTop: 0},
});
