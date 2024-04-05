import { StyleSheet } from 'react-native';
import { COLORS } from '../../../../assets';

export const allPortfolioStyles = StyleSheet.create({
  mainContainer: {
    backgroundColor: COLORS['primary'],
    flex: 1,
    marginBottom: 30
  },
  container:{paddingHorizontal: 10, marginTop: 10},
  overall: {
    flex: 0.4,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    height: '25%',
    flex: 0.2,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS['bg-80-dark'],
  },
  iconColor: {
    color: COLORS['color-text-dark-60'],
  },
  biSection: {
    flex: 0.5,
  },
  graphContainer: {
    flex: 0.6,
    height: '80%',
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: COLORS['input-border-dark'],
    borderWidth: 1,
    borderRadius: 180,
  },
  details: {
    width: '100%',
    flex: 1,
    justifyContent: "center",
  },
  title: {
    color: COLORS['font-color-light'],
    fontWeight: '500',
    fontSize: 12,
  },
  value: {
    color: COLORS['white'],
    paddingBottom: 4,
    fontWeight: '600',
    fontSize: 12,
    marginTop: 4,
  },
  listContainer: {
    flex: 1,
  },
  listItem: {
    width: '100%',
    padding: 12,
    marginTop: 12,
    backgroundColor: COLORS['color-bg-dark-90'],
    borderRadius: 8,
    borderColor: COLORS['color-border-dark-100'],
    borderWidth: 1,
  },
  listTitle: {
    width: '100%',
    flex: 0.5,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderLeftWidth: 3,
    marginBottom: 8,
  },
  listTxt: {
    color: COLORS['white'],
    fontSize: 14,
    fontWeight: '600',
    paddingLeft: 8,
  },
  imageContainer: {
    flex: 0.35,
    height: '100%',
    justifyContent: 'center',
  },
  image: {
    backgroundColor: COLORS['bg-90-dark'],
    height: 70,
    width: 70,
    borderRadius: 12,
    justifyContent: 'center',
  },
  currentContainer: {
    flex: 1,

    borderTopWidth: 1,
    borderTopColor: COLORS['color-border-dark-100'],
  },
  current: {
    height: '100%',
    flex: 1,
    flexDirection: 'row',
    marginTop: 6
  },
  invested: {
    alignItems: 'center',
    height: '100%',
    flex: 1,
    flexDirection: 'row',
    marginTop: 8,
  },
  imgContain: {
    display: 'flex',
    flexDirection: 'row',
    flex: 0.5,
    marginLeft: 20
  },
  img: {
    backgroundColor: COLORS['color-bg-dark-90'],
    width: 26,
    marginRight: 2,
    height: 26,
    borderRadius: 50,
    display: 'flex',
  },
  // Transaction
  headerText: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '600',
    paddingTop: 15,
  },
  noDataText: {
    fontSize: 14,
    fontWeight: '400',
    alignItems: 'center',
    alignSelf: 'center',
    paddingTop: 20,
  },
  // Deposit and withdraw buttonView
  customeButtonView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: 10,
    marginTop: 20,
  },
  bankDetailsButtonView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
  },
  buttonText: {
    fontSize: 14,
    lineHeight: 24,
    textAlign: 'center',
    color: COLORS['white'],
    paddingHorizontal: 16,
    paddingVertical: 8,
    fontWeight: '500',
  },
  cashtxt: {
    fontSize: 14,
    color: COLORS['font-color-light'],
  },
  balancetxt: {
    fontSize: 18,
    marginTop: 5,
    fontWeight: 'bold',
  },
  recentView: {
    borderBottomWidth: 1,
    borderBottomColor: COLORS['color-text-light-90'],
    marginHorizontal: 15,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
