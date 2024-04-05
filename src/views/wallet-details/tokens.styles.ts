import {StyleSheet} from 'react-native';
import {COLORS} from '../../assets';

export const tokenStyles = StyleSheet.create({
  container: {
    marginTop: 20,
    height: '100%',
    padding: 16,
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  left: {
    display: 'flex',
    justifyContent: 'center',
  },
  flexRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  priceHead: {
    color: COLORS['input-border-focus-dark'],
    fontWeight: '500',
    marginRight: 8,
    fontSize: 12,
    marginBottom: 5,
  },
  priceTxt: {
    color: COLORS['white'],
    fontWeight: '500',
    fontSize: 12,
    marginBottom: 5,
  },
  solTxt: {
    fontSize: 20,
    fontWeight: '600',
    color: COLORS['white'],
  },
  solana: {
    color: COLORS['input-border-focus-dark'],
    fontSize: 16,
    fontWeight: '500',
    marginTop: 5,
  },
  icon: {
    width: 40,
    height: 40,
    marginRight: 8,
  },
  right: {},
  rateContain: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  qlt: {
    color: COLORS['white'],
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'right',
  },
  price: {
    color: COLORS['input-border-focus-dark'],
    fontWeight: '500',
    fontSize: 14,
    marginTop: 5,
    textAlign: 'right',
  },
  wallets: {
    marginTop: 8,
  },
  walletContain: {
    width: '80%',
  },
  walletLabel: {
    color: COLORS['input-border-focus-dark'],
    marginTop: 12,
    fontWeight: '500',
  },
  walletTxt: {
    color: COLORS['bg-90-light'],
    marginTop: 5,
  },
  copyBtn: {
    backgroundColor: 'rgba(255, 255, 255, 0.06)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 6,
    paddingLeft: 16,
    paddingRight: 16,
  },
  copyIcon: {
    transform: [{rotateY: '180deg'}],
  },
  line: {
    height: 1,
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.12)',
    marginTop: 16,
    marginBottom: 10,
  },
  activityIndicator: {
    marginTop: 20
  },
  disconnectBtn: {
    padding: 12,
    borderRadius: 8,
    borderColor: COLORS['font-color-light'],
    borderWidth: 0.6,
    width: 150,
    alignItems: 'center',
  },
  disconnectTxt: {
    color: COLORS['font-color-light'],
    fontWeight: '500',
    fontSize: 12,
  },
});
