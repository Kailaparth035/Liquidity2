import Clipboard from '@react-native-community/clipboard';
import {DrawerActions} from '@react-navigation/native';
import {
  Svg_Icon_Csv,
  Svg_Icon_Doc,
  Svg_Icon_Ppt,
  Svg_Pdf_Doc,
  Svg_Xsl_Doc,
} from '../assets';
import numeral from 'numeral';

export const dateCalculate = (date: any) => {
  let seconds = Math.floor(((new Date() as any) - date) / 1000);

  let interval = seconds / 31536000;

  if (interval > 1) {
    return Math.floor(interval) + 'y';
  }
  interval = seconds / 2592000;
  if (interval > 1) {
    return Math.floor(interval) + 'm';
  }
  interval = seconds / 86400;
  if (interval > 1) {
    return Math.floor(interval) + 'd';
  }
  interval = seconds / 3600;
  if (interval > 1) {
    return Math.floor(interval) + 'h';
  }
  interval = seconds / 60;
  if (interval > 1) {
    return Math.floor(interval) + 'min';
  }
  return Math.floor(seconds) + 's';
};

export const openDrawer = (navigation: any) => {
  return navigation.dispatch(DrawerActions.openDrawer());
};

export const copyText = (message: string) => {
  if (message) {
    Clipboard.setString(message);
  }
};

export const capitalize = (txt: string) => {
  return txt.charAt(0).toUpperCase() + txt.slice(1);
};

export const alphaNumeric = (txt: any) => {
  return txt.replace(/[^a-zA-Z0-9]/g, '');
};

export const formatedDate = (date: string) => {
  return new Date(date).toDateString();
};

export const formatNumber = (value: number | string, decimal = 2) => {
  if (decimal === 2) {
    return numeral(value ?? 0).format('0,0.00');
  }
  return numeral(value ?? 0).format('0,0.0000');
};

export const formatPercentage = (value: number | string) => {
  return numeral(value ?? 0).format('(0.00%)');
};
export const formatNumberToLong = (value: number | string) => {
  return numeral(value).format('0.[0]a');
};

export const formatNumberInShort = (num: string) => {
  let number = parseFloat(num);
  if (Math.abs(number) >= 1e9) {
    return (number / 1e9).toFixed(2) + 'B';
  } else if (Math.abs(number) >= 1e6) {
    return (number / 1e6).toFixed(2) + 'M';
  } else if (Math.abs(number) >= 1e3) {
    return (number / 1e3).toFixed(2) + 'K';
  } else {
    return number.toString();
  }
};

export const formatNumberInShortForDecimal = (num: string) => {
  let number = parseFloat(num);
  if (Math.abs(number) >= 1e9) {
    return (number / 1e9).toFixed(0) + 'B';
  } else if (Math.abs(number) >= 1e6) {
    return (number / 1e6).toFixed(0) + 'M';
  } else {
    return number.toFixed(2);
  }
};

export const getRandomNumber = (min: any, max: any) => {
  if (min >= max) {
    throw new Error('The minimum value must be less than the maximum value.');
  }

  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const handleDocTypeIcon = (type: string) => {
  const getDoc = type.split('.');

  const docType = getDoc[getDoc?.length - 1];
  switch (docType) {
    case 'pdf':
      return Svg_Pdf_Doc;
    case 'doc':
    case 'docx':
      return Svg_Icon_Doc;
    case 'csv':
      return Svg_Icon_Csv;
    case 'xlsx':
      return Svg_Xsl_Doc;
    case 'xls':
      return Svg_Xsl_Doc;
    case 'ppt':
      return Svg_Icon_Ppt;
    default:
      return Svg_Icon_Doc;
  }
};
