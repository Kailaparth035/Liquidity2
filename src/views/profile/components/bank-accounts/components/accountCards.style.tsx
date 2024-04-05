import {StyleSheet} from 'react-native';

export const style = StyleSheet.create({
  cardContainer: {paddingHorizontal: 16, paddingTop: 16, flex: 1},
  imageContainer: {padding: 16},
  cardStyle: {
    flexDirection: 'row',
    borderRadius: 8,
  },
  loaderStyle: {
    marginRight: 16,
    alignItems: 'center',
    flex: 1,
  },
  deleteButton: {
    alignItems: 'flex-end',
    paddingRight: 16,
    marginTop: 16,
  },
  subTitle: {
    fontSize: 14,
    color: '#7C8398',
    lineHeight: 20,
    fontWeight: '500',
  },
  dots: {
    fontSize: 20,
    color: '#7C8398',
    marginTop: 0,
    lineHeight: 20,
  },
  title: {
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 24,
  },
  image: {height: 48, width: 48, borderRadius: 100},
  container: {
    flexDirection: 'row',
    flex: 1,
  },
  textContainer: {flex: 1, paddingVertical: 16},
  accountNumberContainer: {flexDirection: 'row', paddingTop: 4},
});
