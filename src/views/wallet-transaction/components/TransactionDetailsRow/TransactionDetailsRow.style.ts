import {StyleSheet} from 'react-native';
import {COLORS} from '../../../../assets';

export const styles = StyleSheet.create({
  container: {
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: COLORS['color-border-dark-100'],
  },
  textStyle: {fontSize: 14, lineHeight: 20, fontWeight: '500'},
});
