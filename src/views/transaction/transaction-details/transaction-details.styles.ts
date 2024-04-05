import {Platform, StyleSheet} from 'react-native';
import {COLORS} from '../../../assets/theme/dark';

export const transactionStyles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    display: 'flex',
    alignSelf: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    padding: 20,
    borderBottomColor: COLORS['input-border-dark'],
    borderBottomWidth: 1,
  },
  heading: {
    fontSize: 20,
    marginLeft: 20,
    justifyContent: 'center',
    color: COLORS['white'],
    fontWeight: '700',
  },
  close: {
    padding: 16,
  },
  sender: {
    borderColor: COLORS['input-border-dark'],
    width: '90%',
    borderRadius: 12,
    borderWidth: 1,
    marginTop: 20,
    paddingTop: 10,
    paddingLeft: 20,
    paddingRight: 20,
  },
  senderHeading: {
    borderBottomColor: COLORS['input-border-dark'],
    borderBottomWidth: 1,
    display: 'flex',
    flexDirection: 'row',
    paddingBottom: 10,
    alignItems: 'center',
  },
  icons: {
    backgroundColor: 'rgba(39, 118, 236, 0.12)',
    height: 40,
    width: 40,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 20,
    borderRadius: 24,
  },
  iconsRecipient: {
    backgroundColor: 'rgba(26, 158, 79, 0.12)',
    height: 40,
    width: 40,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 20,
    borderRadius: 24,
  },
  recipient: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS['font-color-light'],
  },
  detailsContainer: {
    marginTop: Platform.OS == 'android' ? 0 : 20,
    display: 'flex',
    justifyContent: 'space-between',
  },
  details: {
    paddingTop: 8,
    paddingBottom:Platform.OS == 'android' ? 2 : 8,
  },
  title: {
    fontSize: 14,
    color: COLORS['font-color-light'],
  },
  detail: {
    fontSize: 15,
    color: COLORS['white'],
  },
  activityIndicator: {
    marginTop: 20,
  },
});
