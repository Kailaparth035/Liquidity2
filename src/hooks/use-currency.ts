import react from 'react';
import numeral from 'numeral';
import {useRecoilValue} from 'recoil';

import {SelectedCurrencyState} from '../states';
import {NO_DATA} from '../constants';
import {Value} from 'react-native-reanimated';
import {FormatToBM} from '../libs';
import {jsonStringify} from '@datadog/browser-core';
export const useCurrency = () => {
  const currency = useRecoilValue(SelectedCurrencyState);
  const {
    symbolOnLeft,
    spaceBetweenAmountAndSymbol,
    symbol,
    rate = 0,
    code: currencyCode,
  } = currency ?? {};

  const formatCurrency = (value: string | number, decimal: number) => {
    if (value == null) {
      return NO_DATA;
    }

    const convertedValue = Number(value) * Number(rate);
    const valueType = /-/gi.test(convertedValue.toString());
    const modifiedValue = valueType && convertedValue.toString().split('-');

    const format = () => {
      const decimalLength = new Array(decimal ?? 2).fill('0').join('');
      return `0,0.${decimalLength}`;
    };

    const numValue = numeral(
      !valueType ? convertedValue ?? 0 : modifiedValue?.[1] ?? 0,
    ).format(format());

    if (symbolOnLeft) {
      if (spaceBetweenAmountAndSymbol) {
        return `${valueType ? '-' : ''}${symbol}${numValue}`;
      }
      return `${valueType ? '-' : ''}${symbol}${numValue}`;
    } else {
      if (spaceBetweenAmountAndSymbol) {
        return `${valueType ? '-' : ''}${numValue}${symbol}`;
      }
      return `${valueType ? '-' : ''}${numValue}${symbol}`;
    }
  };

  const formatCurrencyMB = (value: string | number, decimal: number) => {
    if (value == null) {
      return NO_DATA;
    }

    const convertedValue = Number(value) * Number(rate);
    const valueType = /-/gi.test(convertedValue.toString());
    const modifiedValue = valueType && convertedValue.toString().split('-');

    const format = () => {
      const decimalLength = new Array(decimal ?? 2).fill('0').join('');
      return `0,0.${decimalLength}`;
    };

    var numValue: any = numeral(
      !valueType ? convertedValue ?? 0 : modifiedValue?.[1] ?? 0,
    ).format(format());

    numValue = FormatToBM(Number(numValue.replace(/,/g, '')));

    if (symbolOnLeft) {
      if (spaceBetweenAmountAndSymbol) {
        return `${valueType ? '-' : ''}${symbol}${numValue}`;
      }
      return `${valueType ? '-' : ''}${symbol}${numValue}`;
    } else {
      if (spaceBetweenAmountAndSymbol) {
        return `${valueType ? '-' : ''}${numValue}${symbol}`;
      }

      return `${valueType ? '-' : ''}${numValue}${symbol}`;
    }
  };
  const formatCurrencyNumber = (
    value: string | number,
    decimal: number | boolean,
  ) => {
    if (value == null) {
      return NO_DATA;
    }

    const convertedValue = Number(value) * Number(rate);

    if (typeof decimal === 'number') {
      const format = () => {
        const decimalLength = new Array(decimal ?? 2).fill('0').join('');
        return `0,0.${decimalLength}`;
      };
      const numValue = numeral(convertedValue ?? 0).format(format());
      return numValue;
    }
    return numeral(convertedValue ?? 0)
      .value()
      ?.toString();
  };

  const addSymbolCurrency = (value: string | number, decimal: number) => {
    const format = () => {
      const decimalLength = new Array(decimal ?? 2).fill('0').join('');
      return `0,0.${decimalLength}`;
    };
    const numValue = numeral(value ?? 0).format(format());

    return `${symbol}${numValue}`;
  };

  const convertToUSD = (currentPrice: number | string) => {
    return Number((Number(currentPrice) / Number(rate)).toFixed(4));
  };

  const currencyConvertInNumber = (value: string | number) => {
    return Number(numeral(Number(value) * Number(rate) ?? 0).format('0.0000'));
  };

  const valueAfterDecimal = (value: string | number) => {
    const price = Number(value);
    if (price < 1) return 8;
    if (price >= 1 && price <= 100) return 4;
    return 2;
  };

  return {
    formatCurrency,
    formatCurrencyMB,
    formatCurrencyNumber,
    addSymbolCurrency,
    currencyCode,
    convertToUSD,
    currencySymbol: symbol,
    currencyConvertInNumber,
    valueAfterDecimal,
  };
};
