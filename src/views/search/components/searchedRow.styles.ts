import {StyleSheet} from 'react-native';
import {COLORS} from '../../../assets';

export const styles = StyleSheet.create({
  searchedContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    padding: 16,
    paddingRight: 0,
    borderBottomWidth: 1,
    borderBottomColor: COLORS['input-border-dark'],
  },
  imageContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 50,
    marginRight: 12,
    padding: 4,
  },
  imageError: {
    width: 40,
    height: 40,
    borderRadius: 50,
    marginRight: 12,
    backgroundColor: COLORS['bg-90-dark'],
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageTxt: {
    fontSize: 18,
    color: COLORS['font-color-light'],
  },
  detailContainer: {
    width: '75%',
  },
  symbolTxt: {
    color: COLORS['white'],
    fontWeight: '600',
    fontSize: 16,
  },
  nameTxt: {
    color: COLORS['font-color-light'],
    fontWeight: '500',
    fontSize: 14,
    marginTop: 4,
  },
  actionContainer: {
    width: 50,
    right: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  priceTxt: {
    fontWeight: '600',
    fontSize: 16,
    textAlign: 'right',
  },
  pricePercent: {
    color: COLORS['font-color-light'],
    fontWeight: '600',
    fontSize: 16,
    textAlign: 'right',
    marginTop: 4,
  },
  addIcon: {
    fontSize: 22
  },
  loader: {
    borderRadius: 50,
    marginRight: 12,
    backgroundColor: COLORS['bg-90-dark'],
    alignItems: 'center',
    justifyContent: 'center',
  },
  firstTxt: {
    fontSize: 18,
    color: COLORS['color-text-dark-70'],
    textTransform: 'uppercase',
    textAlign: 'center'
  },
});
