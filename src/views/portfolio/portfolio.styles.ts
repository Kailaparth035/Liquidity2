import { StyleSheet,Platform } from 'react-native';
import { COLORS } from '../../assets';

export const portfolioStyles = StyleSheet.create({
  container: {
    overflow: 'scroll',
    paddingTop:Platform.OS == 'android' ? 20 : 0
  },

  headingContainer: {
    backgroundColor: COLORS['bg-90-dark'],
    padding: 16,
    paddingLeft: 26,
  },
  portTxt: {
    color: COLORS['white'],
    fontSize: 14,
    fontWeight: '600',
    paddingBottom: 6,
  },
  views: {
    borderColor: COLORS['font-color-light'],
    display: 'flex',
    flexDirection: 'row',
    padding: 8,
    paddingLeft: 0,
    marginLeft: 8,
    paddingTop: 12,
    alignItems: 'center',
  },
  img: {
    backgroundColor: COLORS['font-color-light'],
    width: 36,
    height: 36,
    borderRadius: 50,
  },
  rightSide: {
    marginLeft: 12,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '85%',
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  name: {
    color: COLORS['white'],
    fontSize: 16,
    fontWeight: '600',
  },
  symbol: {
    color: COLORS['font-color-light'],
    fontWeight: '500',
    fontSize: 12,
  },
  dollar: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS['white'],
    textAlign: 'right',
  },
  qltContain: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  qlt: {
    color: COLORS['font-color-light'],
    fontSize: 12,
  },
  qltTxt: {
    color: COLORS['white'],
    fontSize: 13,
  },
  noPortTxt: {
    color: COLORS['font-color-light'],
    textAlign: 'center',
    marginTop: 24,
  },
  portfolioContainer: {
    flex: 1,
    backgroundColor: COLORS['bg-100-dark']
  },
  loading: {
    marginTop: 20,
  },
  portScroll: {
    flexGrow: 0,
  },
  contain: {
    height: '100%'
  },
  empty: {
    color: '#FFFFFF',
    alignSelf: 'center',
    marginTop: 10,
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 20,
  },
  subTitle: {
    color: '#878899',
    width: 320,
    textAlign: 'center',
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '500',
  },
  StartBtn: {
    backgroundColor: '#4574F5',
    width: 150,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 5,
  },
  noPortfolio: {
    flex: 1,
    justifyContent: 'center',
    marginTop: -150
  }
});
