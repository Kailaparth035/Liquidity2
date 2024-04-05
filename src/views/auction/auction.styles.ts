import {StyleSheet} from 'react-native';
import {COLORS} from '../../assets/theme/dark';

export const auctionStyles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    paddingBottom: 10,
  },
  tagKey: {
    fontSize: 12,
    fontWeight: '500',
    color: COLORS['color-text'],
    marginBottom: 6,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
  },
  separator: {
    height: 4,
    width: 4,
    backgroundColor: COLORS['color-text'],
    alignSelf: 'flex-end',
    marginBottom: 3,
    borderRadius: 4,
  },
  textContainer: {flexDirection: 'row', alignItems: 'center'},
  detail: {
    fontSize: 14,
    fontWeight: '500',
    color: COLORS['color-text'],
  },
  values: {
    marginBottom: 10,
    fontSize: 14,
    fontWeight: '500',
  },
  upperRow: {
    flexDirection: 'row',
    marginBottom: 10,
    // borderBottomColor: COLORS['color-bg-light-80'],
    // borderBottomWidth: 1,
    paddingBottom: 4,
  },
  row: {
    flexDirection: 'row',
  },

  // list styles
  listWrapper: {
    marginBottom: 8,
    padding: 16,
  },
  imageWrapper: {
    height: 200,
  },
  imageContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: '100%',
    flex: 1,
    borderRadius: 4,
    position: 'relative',
  },
  heroImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    borderRadius: 4,
  },
  headingContainer: {flexDirection: 'row', marginVertical: 12},
  profileImageContainer: {
    height: 40,
    width: 40,
    marginRight: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileImage: {height: 40, width: 40, borderRadius: 4},
  nameWrapper: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
  },
  timerContainer: {
    padding: 8,
    margin: 8,
    alignItems: 'center',
    alignSelf: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.69)',
    borderRadius: 30,
    flexDirection: 'row',
  },
  timerLabel: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '400',
    color: COLORS['white'],
  },
  timerText: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '600',
    color: COLORS['white'],
  },
  flagContainer: {
    top: 20,
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
  },
  flagText: {
    paddingHorizontal: 10,
    lineHeight: 20,
    backgroundColor: '#F5AF45',
  },
});
