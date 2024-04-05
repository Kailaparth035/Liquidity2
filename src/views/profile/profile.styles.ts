import {StyleSheet} from 'react-native';
import {COLORS} from '../../assets';

export const profileStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS['bg-100-dark'],
  },
  profileTxt: {
    color: COLORS['white'],
    fontSize: 14,
    fontWeight: '600',
    paddingBottom: 6,
  },
  contain: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: '90%',
  },
  appleContainer: {
    padding: 16,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: COLORS['white'],
    borderWidth: 1,
  },
  btnTxt: {
    color: COLORS['white'],
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 8,
  },
  balanceContainer: {
    padding: 16,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: COLORS['white'],
    borderWidth: 1,
    marginBottom: 16,
  },
  balanceSheetContainer: {
    backgroundColor: COLORS.primary,
    flex: 1,
  },
  profileLogout: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: COLORS['bg-100-dark'],
  },
  profileContain: {
    height: '100%',
  },
  noteComment: {
    borderRadius: 5,
    borderWidth: 1,
    padding: 15,
    paddingTop: 15,
    height: 150,
    marginTop: 10,
    textAlignVertical: 'top',
  },
});
