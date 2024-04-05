import {StyleSheet} from 'react-native';
import {COLORS} from '../../../../assets';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 16,
    borderBottomColor: COLORS['input-border-dark'],
    borderBottomWidth: 1,
  },
  crossConatiner: {
    height: 40,
    width: 40,
    backgroundColor: COLORS['input-border-dark'],
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
    marginRight: 8,
  },
  text: {fontSize: 14, lineHeight: 20, fontWeight: '600'},
  subText: {fontSize: 12, lineHeight: 16, fontWeight: '500'},
  buttonContainer: {
    backgroundColor: COLORS['primary-dark'],
    paddingVertical: 8,
    paddingHorizontal: 16,
    alignSelf: 'flex-start',
    borderRadius: 4,
    marginTop: 8,
  },
  dot: {height: 8, width: 8, borderRadius: 4, margin: 4},
  statusContainer: {flexDirection: 'row', marginTop: 8},
});
