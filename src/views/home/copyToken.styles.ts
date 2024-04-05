import {StyleSheet} from 'react-native';

export const copyTokenStyles = StyleSheet.create({
  copyContain: {
    padding: 12,
    paddingLeft: 0,
    paddingRight: 0,
    borderRadius: 4,
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  copyTxt: {
    color: '#F5F5F5',
    fontSize: 14,
    fontWeight: '500',
    width: '100%',
  },
  copyBtn: {
    width: 77,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 6,
    backgroundColor: '#272B4F',
    padding: 8,
  },
  copyImg: {
    width: 16,
    height: 18,
    marginRight: 8,
  },
  publicKey: {
    color: '#A6AAC9',
    fontSize: 16,
    fontWeight: 'bold',
    paddingTop: 16,
    marginTop: 50,
  },
  copyImgTxt: {
    color: '#A6AAC9',
    fontSize: 12,
    fontWeight: '500',
  },
  line: {
    height: 1,
    width: '100%',
    backgroundColor: '#272A4E',
    marginTop: 16,
    marginBottom: 8,
  },
});
