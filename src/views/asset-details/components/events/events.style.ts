import {StyleSheet} from 'react-native';
import {COLORS} from '../../../../assets';

export const eventsStyle = StyleSheet.create({
  eventsContainer: {
    paddingTop: 16,
  },
  eventsCard: {
    marginBottom: 4,
    marginTop: 4,
    paddingRight: 8
  },
  eventsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  eventName: {
    fontSize: 12,
    lineHeight: 18,
    fontWeight: '500',
    color: COLORS['font-color-light'],
  },
  eventDate: {
    fontSize: 12,
    lineHeight: 18,
    fontWeight: '500',
    color: COLORS['font-color-light'],
  },
  eventHeadline: {
    color: COLORS['bg-100-light'],
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '500',
  },
});
