import {StyleSheet} from 'react-native';

export const balanceStyles = StyleSheet.create({
  contain: {
    marginTop: 0,
  },
  balance: {
    color: '#9EA3D1',
    fontWeight: '500',
    fontSize: 14,
  },
  balanceContain: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginTop: 2,
  },
  first: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#fff',
  },
  dot: {
    color: '#fff',
    fontSize: 36,
  },
  digit: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 2,
  },
  usd: {
    fontSize: 22,
    color: '#3579DE',
    fontWeight: 'bold',
    marginBottom: 2,
    marginLeft: 4,
  },
  verified: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  refreshBtn: {
    padding: 2,
  },
  balanceRef: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
});
