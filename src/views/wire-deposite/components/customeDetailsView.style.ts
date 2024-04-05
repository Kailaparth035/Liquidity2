import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  detailsView: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginVertical: 5,
  },
  titleText: {fontSize: 14, flex: 0.6},
  detailsText: {
    fontSize: 14,
    fontWeight: '500',
    flex: 1,
    alignSelf: 'flex-start',
    paddingLeft:10
  },
});
