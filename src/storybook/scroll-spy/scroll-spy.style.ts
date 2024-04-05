import {StyleSheet} from 'react-native';

export const scrollSpy = StyleSheet.create({
  tabBarWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  scrollSpyItems: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
  },
  backIcon: {
    paddingRight: 8,
  },
  forwardIcon: {
    paddingLeft: 8,
  },
});
