import { StyleSheet } from 'react-native';
import { COLORS } from '../../../../assets';

export const overviewStyle = StyleSheet.create({
  overViewContainer: {
    paddingTop: 16,
    paddingRight: 8
  },
  company: {
    fontSize: 14,
    color: COLORS['bg-100-light'],
    fontWeight: '600',
    lineHeight: 20,
  },
  companyDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 8,
    paddingBottom: 8,
  },
  companyType: {
    color: COLORS['input-border-focus-dark'],
    lineHeight: 16,
    fontSize: 12,
  },
  bio: {
    color: '#CED0D6',
    fontSize: 12,
    lineHeight: 16,
  },

  largeTable: {
    paddingTop: 16,
    paddingBottom: 16,
  },
  smallTableContainer: {
    flexDirection: 'row',
    width: '100%',
  },
  smallTableLeft: {
    flex: 1,
    marginRight: 12,
  },
  smallTableRight: {
    flex: 1,
    marginLeft: 12,
  },
  label: {
    color: COLORS['bg-100-light'],
    borderBottomColor: COLORS['input-border-dark'],
    borderBottomWidth: 1,
    paddingBottom: 8,
  },
  tableContainer: {
    flexDirection: 'row',
    width: '100%',
  },
  tableColumn: {
    flex: 1,
  },
  tableColumnLeft: {
    marginRight: 12,
    flex: 1,
  },
  tableColumnRight: {
    marginLeft: 12,
    flex: 1,
  },
  dot: {
    width: 4,
    height: 4,
    backgroundColor: COLORS['font-color-light'],
    borderRadius: 4,
    marginLeft: 8,
    marginRight: 8,
  },
  tableCell: {
    paddingTop: 8,
  },
  cellLabel: {
    color: COLORS['font-color-light'],
    fontSize: 12,
    fontWeight: '600',
    lineHeight: 16,
    paddingBottom: 4,
  },
  cellValue: {
    color: COLORS['bg-100-light'],
    fontSize: 12,
    fontWeight: '600',
    lineHeight: 16,
  },
  noddata: {
    fontSize: 14,
    fontWeight: '500',
    color: COLORS['color-text-dark-50'],
    textAlign: 'center',
    marginTop: 30,
  },
  readmore: {
    fontWeight: '600',
    fontSize: 12,
    color: 'rgba(245, 196, 98, 1)',
  }
});
