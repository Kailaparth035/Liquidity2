import {StyleSheet} from 'react-native';

import {COLORS} from '../../assets';

export const assetsDetailsStyle = StyleSheet.create({
  assetDetailsPage: {
    flex: 1,
    backgroundColor: COLORS['bg-100-dark'],
  },
  container: {
    flex: 1,
  },
  topNavigation: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: COLORS['bg-90-dark'],
  },
  tabTitle: {
    color: COLORS['bg-100-light'],
    paddingLeft: 12,
    fontWeight: '600',
    fontSize: 16,
  },
  scrollBody: {
    flex: 1,
  },
  navigationContainer: {
    marginTop: 16,
    flex: 1,
    height: 650,
  },
  loaderContainer: {
    flex: 1,
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabsContain: {
    marginHorizontal: 16,
    marginTop: 50,
  },
});
