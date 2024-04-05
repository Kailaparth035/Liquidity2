import {StyleSheet} from 'react-native';
import {COLORS} from '../../assets';

export const transactionStyles = StyleSheet.create({
  mainContainer: {
    backgroundColor: COLORS['bg-100-dark'],
    flex: 1,
  },
  container: {
    height: '100%',
    backgroundColor: COLORS['bg-100-dark'],
  },
  scroll: {
    height: '100%',
  },
  portTxt: {
    color: COLORS['white'],
    fontSize: 14,
    fontWeight: '600',
    paddingBottom: 6,
  },
  views: {
    borderBottomColor: COLORS['input-border-dark'],
    borderBottomWidth: 1,
    height: 100,
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 12,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headingContainer: {
    backgroundColor: COLORS['bg-90-dark'],
    padding: 16,
    paddingLeft: 26,
  },
  imageSymbol: {
    backgroundColor: COLORS['bg-90-dark'],
    height: 60,
    width: 60,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageSymbolTxt: {
    fontSize: 28,
    textAlign: 'center',
    color: COLORS['font-color-light'],
  },
  symbol: {
    width: '70%',
  },
  symbolTxt: {
    fontSize: 16,
    color: 'white',
    fontWeight: '600',
    marginBottom: 2,
  },
  signTxt: {
    fontSize: 12,
    color: 'white',
    width: '100%',
    marginTop: 2,
  },
  dateTxt: {
    color: COLORS['font-color-light'],
    marginTop: 2,
  },
  noDataTxt: {
    fontSize: 14,
    fontWeight: '600',
    color: 'white',
  },
  price: {width: '15%'},
  priceTxt: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 5,
    textAlign: 'right',
  },
  memo: {
    backgroundColor: COLORS['primary-light'],
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
    marginTop: 4,
  },
  memoTxt: {
    color: COLORS['white'],
    textAlign: 'center',
    fontSize: 14,
  },
  noDataContainer:{
    height: 650,
  },
});
