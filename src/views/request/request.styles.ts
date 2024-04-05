import {StyleSheet} from 'react-native';
import {COLORS} from '../../assets/theme/dark';

export const RequestStyles = StyleSheet.create({
  mainContainer: {
    backgroundColor: COLORS['bg-100-dark'],
    marginBottom: 68,
  },
  scroll: {
    height: '100%',
  },
  container: {
    width: '94%',
    alignSelf: 'center',
    minHeight: 100,
    paddingTop: 20,
    paddingBottom: 20,
    borderBottomColor: COLORS['btn-cancel'],
    borderBottomWidth: 0.5,
  },
  imageTxt: {
    textAlign: 'center',
    fontSize: 34,
    paddingVertical: 10,
    color: COLORS['white'],
  },
  request: {
    height: 76,
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
  },
  image: {
    height: 64,
    width: 64,
    backgroundColor: COLORS['input-border-dark'],
    borderRadius: 8,
  },
  header: {
    marginLeft: 20,
    width: '70%',
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
    marginRight: 10,
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
  value: {
    color: COLORS.white,
  },
  buttons: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingTop: 14,
  },
  denyBtn: {
    width: 80,
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 12,
    paddingRight: 12,
    marginRight: 10,
    color: COLORS.white,
    textAlign: 'center',
    backgroundColor: COLORS['input-border-dark'],
    fontWeight: '600',
  },
  approveBtn: {
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 12,
    paddingRight: 12,
    color: COLORS.white,
    display: 'flex',
    textAlign: 'center',
    backgroundColor: COLORS['primary-dark'],
    fontWeight: '600',
  },
  noPending: {
    color: COLORS['font-color-light'],
    textAlign: 'center',
    marginTop: 24,
  },
  activityIndicator: {
    marginTop: 20,
  },
  blockchain: {
    color: COLORS['font-color-light'],
  },
  requestDoneTxt: {
    color: COLORS['font-color-light'],
  },
});
