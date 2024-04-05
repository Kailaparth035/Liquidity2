import {StyleSheet} from 'react-native';
import {COLORS} from '../../../assets';

export const newsStyle = StyleSheet.create({
  newsContainer: {
    paddingTop: 16,
  },
  newsCard: {
    display: 'flex',
    flexDirection: 'row',
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 16,
    paddingRight: 16,
    borderBottomColor: '#51545C',
    borderBottomWidth: 1,
  },
  newsImage: {
    height: 48,
    width: 80,
    marginRight: 8,
    borderRadius: 4,
  },
  dot: {
    width: 4,
    height: 4,
    backgroundColor: '#51545C',
    borderRadius: 4,
    marginLeft: 8,
    marginRight: 8,
  },
  errorImage: {
    height: 48,
    width: 80,
    backgroundColor: 'gray',
  },
  news: {
    paddingLeft: 4,
    paddingRight: 4,
    flex: 1,
  },
  newsFooter: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingTop: 4,
  },
  headline: {
    color: 'white',
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '500',
  },
  date: {
    fontSize: 10,
    lineHeight: 12,
    color: '#6C707A',
    fontWeight: '500',
  },
  location: {
    fontSize: 10,
    lineHeight: 12,
    color: '#6C707A',
    fontWeight: '500',
  },
  noNews: {
    marginTop: 60,
    alignSelf: 'center',
  },
  noNewsTxt: {
    alignSelf: 'center',
    color: COLORS.white,
  },
  foterDetailsView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 15,
    marginTop: 8,
  },
  readFullArticleText: {
    color: '#F5C462',
    fontSize: 12,
    fontWeight: '500',
  },
  footerView: {flexDirection: 'row', alignItems: 'center'},
  firstItemView: {
    flex: 1,
    paddingBottom: 20,
    borderBottomWidth: 1,
  },
  imageStyle: {
    width: '100%',
    height: 220,
  },
  withoutImageView: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: 220,
  },
});
