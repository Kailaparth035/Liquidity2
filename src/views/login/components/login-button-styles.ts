import {COLORS} from '../../../assets';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  containter: {flex: 0.8, justifyContent: 'center', alignItems: 'center'},
  button: {
    backgroundColor: COLORS['btn-primary-light'],
    paddingVertical: 16,
    paddingHorizontal: 32,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
  },
});
