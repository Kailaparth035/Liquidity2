import {StyleSheet} from 'react-native';
import {COLORS} from '../../assets/theme/dark';

export const bottomNavigationStyles = StyleSheet.create({
  tabBar: {
    paddingVertical: 4,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    backgroundColor: COLORS['bg-90-dark'],
    position: 'absolute',
    borderTopWidth: 0,
    borderTopColor: COLORS['bg-90-dark'],
    shadowColor: COLORS['bg-90-light'],
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.2,
    shadowRadius: 8,
    borderLeftWidth:0,
    borderRightWidth:0,
    borderLeftColor:COLORS['bg-90-dark'],
    borderRightColor:COLORS['bg-90-dark']
  },
  tabBarItem: {
    paddingTop: 8,
    shadowColor: COLORS.white,
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.2,
    shadowRadius: 8,
    color:"green"
  },
  tabBarLabel: {
    paddingTop: 4,
  },
});
