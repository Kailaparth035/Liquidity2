import {StyleSheet} from 'react-native';
import {COLORS} from '../../assets';

export const SettingStyles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: COLORS['primary'],
  },
  tabs: {
    width: '100%',
    height: 54,
    borderBottomColor: COLORS['color-border-dark-100'],
    borderBottomWidth: 1,
    paddingLeft: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  txt: {
    color: COLORS['white'],
    fontSize: 14,
    fontWeight: '500',
    marginLeft: 8,
  },
  container: {
    flexDirection: 'row',
    width: '70%',
    justifyContent: 'space-between',
    height: 54,
  },
  titleContainer: {
    flex: 0.5,
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    flex: 0.5,
    justifyContent: 'flex-end',
    alignItems: 'center',
    flexDirection: 'row',
  },
  titleTxt: {
    fontSize: 14,
    fontWeight: '500',
    paddingRight: 4,
    color: COLORS['color-text-dark-70'],
  },
  iconContainer: {
    height: 36,
    width: 36,
    backgroundColor: COLORS['color-transparent-dark-white'],
    borderRadius: 24,
    alignItems:'center',
    justifyContent: 'center'
  },
});
