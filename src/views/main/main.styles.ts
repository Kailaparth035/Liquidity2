import {StyleSheet} from 'react-native';
import {COLORS} from '../../assets/theme/dark';

export const mainStyles = StyleSheet.create({
  container: {
    display: 'flex',
    height: '100%',
    justifyContent: 'space-between',
    backgroundColor: COLORS['bg-100-dark'],
  },
  header: {
    height: 60,
    elevation: 10,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    justifyContent: 'space-between',
  },
  headerLeft: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  line: {
    marginBottom: 10,
    borderBottomColor: COLORS['light_blue'],
    borderBottomWidth: 0.5,
    padding: 4,
    marginLeft: 12,
    marginRight: 12,
    borderRadius: 4,
  },
  containCenter: {
    height: '100%',
    display: 'flex',
    justifyContent: 'space-around',
  },
  contain: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  develop: {
    width: '80%',
    height: 200,
  },
  logoutBtn: {
    borderRadius: 24,
    borderWidth: 1,
    borderColor: COLORS['primary-dark'],
    padding: 6,
    paddingLeft: 18,
    paddingRight: 18,
    marginRight: 16,
    marginLeft: 16,
  },
  logoutTxt: {
    color: COLORS['primary-dark'],
    fontWeight: '500',
  },
  desc: {
    color: COLORS['input-border-focus-dark'],
    textAlign: 'center',
  },
  headerImg: {
    width: 190,
    height: 36,
    marginLeft: 24,
  },
  headRight: {
    display: 'flex',
    flexDirection: 'row',
    left: 12,
  },
  menuIcon: {
    transform: [{rotate: '180deg'}],
  },
  activityIndicator: {
    height: '100%',
    justifyContent: 'center',
    backgroundColor: COLORS['bg-100-dark'],
  },
  mainRouteContainer: {
    height: '92%',
  },
});
