import {StyleSheet} from 'react-native';
import {COLORS} from '../../../../assets';
export const styles = StyleSheet.create({
  parent: {
    flex: 1,
    paddingVertical: 8,
  },
  container: {flexDirection: 'row', paddingVertical: 8},
  image: {
    height: 40,
    width: 40,
    borderRadius: 20,
    alignSelf: 'center',
    marginRight: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  boldText: {
    color: COLORS['white'],
    fontWeight: '600',
    fontSize: 14,
    lineHeight: 20,
    paddingBottom: 4,
  },
  subText: {
    color: COLORS['white'],
    fontSize: 12,
    fontWeight: '500',
    lineHeight: 16,
  },
  dot: {color: '#F5AF45', fontSize: 24, marginTop: -8},
  directionRow: {flexDirection: 'row'},
  rowContainer: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
  },
  borderLine: {
    height: 1,
    width: '100%',
    alignItems: 'center',
    backgroundColor: COLORS['color-border-dark-100'],
    marginTop: 8,
  },
  dotContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingRight: 4,
  },
});
