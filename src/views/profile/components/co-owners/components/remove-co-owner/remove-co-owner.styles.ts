import {Platform, StyleSheet} from 'react-native';
import {COLORS} from '../../../../../../assets';

export const RemoveOwnerFooterStyles = StyleSheet.create({
  mainContainer: {maxHeight: '92%'},
  container: {
    flex: 1,
    justifyContent: 'space-between',
    padding: 16,
    marginBottom:Platform.OS == 'android' ? 30 : 10
  },
  headingContainer: {marginBottom: 6},
  headingTxt: {fontSize: 14, fontWeight: '600', marginBottom: 4},
  descriptionTxt: {
    fontSize: 12,
    fontWeight: '400',
    color: COLORS['color-text-light-40'],
  },
  btnContainer: {
    backgroundColor: COLORS['color-red'],
    height: 50,
    marginHorizontal: 4,
    padding: 12,
    borderRadius: 10,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnContainerDisabled: {
    backgroundColor: COLORS['btn-disabled'],
    height: 50,
    marginHorizontal: 4,
    padding: 12,
    borderRadius: 10,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnText: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS['white'],
  },
  footerWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  documentList: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
    paddingVertical: 8,
    marginVertical: 4,
  },
  documentTxt: {fontSize: 14, fontWeight: '600'},
  documentLengthTxt: {
    color: COLORS['color-text-light-50'],
    fontSize: 12,
    fontWeight: '400',
  },
  listContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 6,
    height: 48,
  },
  imageContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  nameContainer: {flex: 3, paddingHorizontal: 16},
  nameTxt: {
    fontSize: 14,
    fontWeight: '500',
  },
  sizeTxt: {
    fontSize: 14,
    fontWeight: '500',
    color: COLORS['color-text-light-50'],
  },
  deleteIcon: {flex: 1, alignItems: 'flex-end'},
  uploadContainer: {
    height: '30%',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: COLORS['color-border-dark-90'],
  },
  uploadBox: {justifyContent: 'center', alignItems: 'center'},
  browseTxt: {
    color: COLORS['primary-dark'],
    fontSize: 14,
    fontWeight: '600',
    marginVertical: 10,
  },
  fileTxt: {fontSize: 14, fontWeight: '500'},
  supportTxt: {
    color: COLORS['color-text-light-50'],
    fontSize: 14,
    fontWeight: '500',
  },
  
});
