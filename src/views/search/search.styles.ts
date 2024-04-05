import {Platform, StyleSheet} from 'react-native';
import {COLORS} from '../../assets';

export const styles = StyleSheet.create({
  searchContainer: {
    backgroundColor: COLORS['bg-90-dark'],
    elevation: 1,
    flex: 1,
    alignItems: 'center',
    paddingTop: Platform.OS == 'ios' ? 20 : 30,
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    padding: 20,
    paddingBottom: 5,
    borderBottomColor: COLORS['input-border-dark'],
    borderBottomWidth: 1,
  },
  heading: {
    fontSize: 18,
    marginLeft: 20,
    justifyContent: 'center',
    color: COLORS['white'],
    fontWeight: '500',
  },
  searchList: {
    flex: 0.95,
  },
  inputTxt: {
    marginLeft: 20,
    alignSelf: 'center',
    fontSize: 16,
    width: '70%',
    color: COLORS.white,
    fontWeight: '500',
  },
  noDataContainer: {
    flex: 1,
  },
  noData: {
    color: COLORS['font-color-light'],
    textAlign: 'center',
  },
  listContainer: {width: '100%', flex: 1},
  noDataWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
});
