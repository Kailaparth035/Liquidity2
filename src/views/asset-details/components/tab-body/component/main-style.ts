import { StyleSheet } from 'react-native';
import { COLORS } from '../../../../../assets';

export const mainStyle = StyleSheet.create({
  wrapper: {
    justifyContent: 'space-around',
  },
  headerWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  line: {
    width: 24,
    height: 4,
    backgroundColor: '#F5C462',
    borderRadius: 16,
  },
  heading: {
    color: '#F5C462',
    fontSize: 16,
    fontWeight: '500',
    paddingHorizontal: 8,
  },
  title: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 20,
    marginTop: 0,
    marginBottom: 0
  },
  description: {
    color: '#BCC3D6',
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 16,
    marginTop: 6,
    marginBottom: 0
  },
  row: {
    flexDirection: 'row',
    paddingVertical: 16,
    width: '100%',
  },
  mediaCoverageBlogLeft: {
    paddingLeft: 16,
    width: '100%',
  },
  spaceBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  mediaCoverageBlogHeading: {
    color: '#fff',
  },
  date: {
    fontSize: 10,
    color: '#878C99',
  },
  readMore: {
    fontSize: 10,
    color: '#F5C462',
  },
  mediaCoverageTextWrapper: {
    backgroundColor: '#36383D',
    padding: 16,
    width: '100%',
    borderBottomEndRadius: 4,
    borderBottomStartRadius: 4,
    marginTop: 10
  },
  boldInfo: {
    color: '#fff',
    fontWeight: '600',
  },
  mt_16: {
    marginTop: 16,
  },
  days_left: {
    position: 'absolute',
    top: 12,
    right: 20,
    color: '#F5BA45',
  },
  overViewWrapper: {
    marginHorizontal: -16,
    position: 'relative',
  },
  overViewTextContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  overViewFooterWrapper: {
    backgroundColor: '#36383D',
    height: 180,
    width: '90%',
    borderRadius: 16,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: 16,
  },
  overViewBoldContent: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  overViewNormalContent: {
    color: '#878C99',
    fontSize: 12,
    fontWeight: '600',
  },
  additionalInfo: {
    color: '#BCC3D6',
    textAlign: 'center',
    marginTop: 16,
  },
  orgName: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  overViewDesc: {
    color: '#BCC3D6',
    fontSize: 12,
    fontWeight: '400',
    marginVertical: 8,
  },
  row_50: {
    width: '48%',
    padding: 4,
  },
  partnershipImage: {
    width: '100%',
    height: 72,
    borderRadius: 4,
    marginBottom: 0,
  },
  rowWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  name: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '600',
    fontSize: 14,
    marginVertical: 8,
  },
  designation: {
    color: '#878C99',
    textAlign: 'center',
    fontSize: 12,
    fontWeight: '500',
  },
  company: {
    color: '#878C99',
    textAlign: 'center',
    fontSize: 12,
    fontWeight: '500',
  },
  chartWrapper: {
    flex: 1,
    height: 410,
    marginHorizontal: -16,
    backgroundColor: COLORS['bg-90-dark'],
  },
});
