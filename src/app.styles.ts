import {StyleSheet} from 'react-native';
import {COLORS} from './assets';

export const appStyles = StyleSheet.create({
  appContainer: {
    flex: 1,
    height: '100%',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 24,
  },
});
