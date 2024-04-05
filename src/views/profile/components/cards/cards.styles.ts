import {Dimensions, StyleSheet} from 'react-native';
import {COLORS} from '../../../../assets';

export const CardsStyles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: COLORS['primary'],
  },
  addBtn: {
    width: Dimensions.get('window').width / 1.1,
    height: 52,
    marginTop: 8,
    alignSelf: 'center',
  },
  addBtnText: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '500',
  },
  dots: {
    fontSize: 18,
    fontWeight: '500',
    marginLeft: 10,
  },

  //    card details view
  renderItem_mainview: {
    marginHorizontal: 15,
    padding: 16,

    borderRadius: 8,
    marginTop: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  firstView: {
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    flex: 1,
  },
  imageView: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 60,
    height: 60,
    borderRadius: 40,
  },
  image: {height: 40, width: 40},
  detailsView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  doteImage: {width: 140, height: 8},
  expiryText: {
    fontSize: 16,
    color: COLORS['font-color-light'],
    marginTop: 8,
  },
  menuImage: {
    height: 25,
    width: 25,
  },

  //   rbsheet
  rbsheetBottomView: {
    marginTop: 30,
    borderTopColor: COLORS['color-border-dark-90'],
    borderTopWidth: 1,
    padding: 15,
  },
  closeImage: {width: 40, height: 40},
  closeButton: {
    flex: 0.12,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  rbsheetHeaderText: {fontSize: 18, fontWeight: '600'},
  headerMiddleView: {flex: 1, alignItems: 'center', justifyContent: 'center'},
  headerMainView: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
  },
});
