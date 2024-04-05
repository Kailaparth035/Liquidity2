import {StyleSheet} from 'react-native';
import {COLORS} from '../../../../assets';

export const newsStyle = StyleSheet.create({
  newsContainer: {
    paddingTop: 16,
  },
  noNews: {
    fontSize: 14,
    fontWeight: '500',
    color: COLORS['color-text-dark-50'],
    textAlign: 'center',
    marginTop: 30,
  },
  newsCard: {
    flexDirection: 'row',
    marginTop: 6,
    marginBottom: 6,
  },
  noImage: {
    width: 40,
    height: 40,
    borderRadius: 50,
    marginRight: 12,
    backgroundColor: COLORS['bg-90-dark'],
    alignItems: 'center',
    justifyContent: 'center',
  },
  noImageText: {
    fontSize: 18,
    color: COLORS['bg-100-light'],
  },

  newsImage: {
    height: 48,
    width: 80,
    borderRadius: 4,
  },
  dot: {
    width: 4,
    height: 4,
    backgroundColor: COLORS['color-text-dark-40'],
    borderRadius: 4,
    marginLeft: 8,
    marginRight: 8,
  },
  news: {
    paddingLeft: 12,
    paddingRight: 4,
    flex: 1,
  },
  newLocation: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 4,
  },
  headline: {
    color: COLORS['color-text-dark-80'],
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '500',
  },
  date: {
    fontSize: 10,
    lineHeight: 12,
    color: COLORS['color-text-dark-60'],
    fontWeight: '500',
  },
  location: {
    fontSize: 10,
    lineHeight: 12,
    color: COLORS['color-text-dark-60'],
    fontWeight: '500',
    width: 120
  },
});
