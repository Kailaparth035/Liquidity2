import { Platform, StyleSheet } from 'react-native';
import { COLORS } from '../../../../assets';

export const footerStyle = StyleSheet.create({
  sheetFooter: {
    flexDirection: 'row',
    justifyContent: "flex-end",
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    paddingBottom: Platform.OS === "android" ? 10 : 0,
    backgroundColor: COLORS['bg-90-light'],
    shadowColor: COLORS['bg-90-light'],
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  alert: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
  },
  alertText: {
    color: COLORS['bg-100-light'],
    fontSize: 10,
    fontWeight: '400',
    marginTop: 4,
  },
  disabledPrimaryBtn: {
    paddingLeft: 24,
    paddingRight: 24,
    paddingTop: 16,
    paddingBottom: 16,
    backgroundColor: COLORS['price-up'],
    opacity: 0.4,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    width: 140,
  },
  footerBtnPrimary: {
    paddingLeft: 24,
    paddingRight: 24,
    paddingTop: 16,
    paddingBottom: 16,
    backgroundColor: COLORS['price-up'],
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    width: 140,
  },
  footerBtnDanger: {
    paddingLeft: 24,
    paddingRight: 24,
    paddingTop: 16,
    paddingBottom: 16,
    backgroundColor: COLORS['price-down'],
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    width: 140,
    marginRight: 10
  },
  btnText: {
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 21,
    color: COLORS['white'],
  },
});
