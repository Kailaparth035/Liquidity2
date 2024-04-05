import {StyleSheet,Platform} from 'react-native';

import {COLORS} from '../../../../assets/theme/dark';

export const tokenDetailsStyles = StyleSheet.create({
  mainContainer: {
    minHeight: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    backgroundColor: COLORS.primary,
  },
  container: {
    width: '100%',
    marginTop: 20,
    marginBottom: 26,
    minHeight: '90%',
    display: 'flex',
    flex: 1,
    alignItems: 'center',
    alignSelf: 'center',
  },
  scroll: {
    height: '100%',
  },
  token: {
    height: 100,
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
  },
  image: {
    height: 100,
    width: 100,
    backgroundColor: COLORS['btn-cancel'],
    borderRadius: 16,
  },
  header: {
    marginLeft: 20,
    paddingTop: 4,
    width: '60%',
  },
  title: {
    color: COLORS['white'],
    fontSize: 18,
    fontWeight: '600',
  },
  desc: {
    display: 'flex',
    flexDirection: 'row',
  },
  description: {
    color: COLORS['font-color-light'],
    fontSize: 16,
    marginLeft: 6,
  },
  data: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    marginTop: 2,
    justifyContent: 'space-between',
  },
  heading: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.white,
  },
  subHeading: {
    marginTop: 8,
    MaxWidth: '100%',
    height: 36,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS['btn-cancel'],
    paddingLeft: 8,
    paddingRight: 8,
  },
  headingText: {
    color: COLORS['font-color-light'],
  },
  contentContainer: {
    paddingBottom: 20,
  },
  elips: {
    maxWidth: '75%',
    color: COLORS['white'],
  },
  memoKey: {
    color: COLORS['bg-80-light'],
  },
  value: {
    color: COLORS['white'],
  },
  content: {
    marginTop: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  sections: {
    width: '100%',
    minHeight: '8%',
    borderRadius: 12,
    marginTop: 20,
    paddingTop: 10,
  },
  noData: {
    color: COLORS['white'],
    textAlign: 'center',
    marginTop: 10,
  },
  headerTitle: {
    display: 'flex',
    gridGap: 4,
    marginLeft: 14,
  },
  formTitle: {
    color: COLORS['white'],
    fontSize: 16,
    fontWeight: '600',
  },
  headerView: {
    marginTop:Platform.OS == 'ios' ? 30 : 50,
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  loading: {
    marginTop: 20,
  },
});
