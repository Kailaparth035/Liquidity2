import {StyleSheet} from 'react-native';
import {COLORS} from '../../assets';

export const styles = StyleSheet.create({
  parent: {flex: 1},
  crossButton: {marginTop: 20, padding: 16, alignSelf: 'flex-end'},
  modalConatiner: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    padding: 16,
  },
  headerText: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '600',
  },
  descriptionText: {fontSize: 12, lineHeight: 20, fontWeight: '400'},
  footerButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 24,
    width: '100%',
  },
  DocumentTextContainer: {
    flexDirection: 'row',
    padding: 16,
    justifyContent: 'space-between',
    width: '100%',
  },
  fileText: {
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 16,
    color: COLORS['color-text-light-50'],
    alignSelf: 'flex-start',
  },
  iconContaner: {
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  subTitle: {
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 20,
  },
  ViewButton: {
    flexDirection: 'row',
    alignSelf: 'flex-end',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: COLORS['primary-dark'],
    borderRadius: 4,
  },
});
