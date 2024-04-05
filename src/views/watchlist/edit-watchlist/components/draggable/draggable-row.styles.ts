import { StyleSheet } from 'react-native';
import { COLORS } from '../../../../../assets';

export const draggableRowStyles = StyleSheet.create({
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    paddingRight: 0,
    borderBottomWidth: 1,
    borderBottomColor: COLORS['input-border-dark'],
  },
  rowContainerActive: {
    borderBottomWidth: 2,
    backgroundColor: 'rgba(0,0, 0, 0.6)',
    borderBottomColor: COLORS.white,
    paddingRight: 16,
    paddingLeft: 24,
  },
  container: {
    display: 'flex',
    flexDirection: 'row',
    width: '80%',
  },
  rowImage: {
    width: 40,
    height: 40,
    borderRadius: 50,
    marginRight: 12,
    padding: 4,
  },
  imageContainer: {
    width: 40,
    height: 40,
    borderRadius: 50,
    marginRight: 12,
  },
  noImage: {
    width: 40,
    height: 40,
    borderRadius: 50,
    marginRight: 12,
    backgroundColor: COLORS['bg-90-dark'],
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  noImageText: {
    fontSize: 18,
    color: 'gray',
  },
  tokenExplore: {
    width: '60%',
  },
  tokenSymbol: {
    color: COLORS['white'],
    fontWeight: '600',
    fontSize: 16,
  },
  tokenName: {
    color: COLORS['font-color-light'],
    fontWeight: '500',
    fontSize: 14,
    marginTop: 4,
  },
});
