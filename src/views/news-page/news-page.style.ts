import {StyleSheet} from 'react-native';
import {COLORS} from '../../assets';

export const newsPageStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS['bg-90-dark'],
  },
  scroll: {
    flex: 1,
    zIndex: 12,
    width: '100%',
  },
  contentScroll: {
    paddingTop: 260,
  },
  newPage: {
    flex: 1,
  },
  newsImageContainer: {
    top: 40,
  },
  titleContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },

  title: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS['bg-100-light'],
    lineHeight: 24,
  },
  publishedDate: {
    fontSize: 10,
    fontWeight: '500',
    color: COLORS['font-color-light'],
    lineHeight: 12,
    textAlign: 'right',
  },
  btn: {
    borderWidth: 1,
    borderColor: COLORS['font-color-light'],
    marginTop: 16,
    marginBottom: 36,
    width: 120,
    padding: 6,
    borderRadius: 4,
    alignSelf: 'center',
  },
  dot: {
    width: 4,
    height: 4,
    backgroundColor: '#51545C',
    borderRadius: 4,
    marginLeft: 8,
    marginRight: 8,
  },
  dateView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingTop: 8,
  },
});
