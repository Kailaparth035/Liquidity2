export const numberWithCommas = (num: string | number = 0) => {
  if (num) {
    let commaNum = Number(Number(num).toFixed(2)).toLocaleString('en-US');
    const isDecimal = Number(commaNum) % 1 != 0;

    if (!isDecimal) {
      commaNum = commaNum.concat('.00');
    }
    return commaNum;
  }

  return (0.0).toFixed(2);
};

export const numberFormat = (number: number) => {
  if (number) {
    const num: any = Number(
      new Intl.NumberFormat('en-GB', {
        notation: 'compact',
        compactDisplay: 'short',
      }).format(Number(numberDecimalFormat(number))) ?? 0,
    );

    if (isNaN(num) && number) {
      return (Number(number) || 0).toFixed(2);
    }
    return num;
  }
  if (number) {
    return Number(number).toFixed(2);
  } else {
    return 0;
  }
};

export const numberDecimalFormat = (number: number = 0, decimal?: number) => {
  if (number) {
    return Number(number)?.toFixed(decimal ?? 2);
  }
  return number?.toFixed(2) ?? 0;
};

export const FormatToBM = (num: number = 0) => {
  if (num > 1000000 && num < 1000000000) {
    return (num / 1000000).toFixed(2) + 'M';
  } else if (num > 1000000000 && num < 1000000000000) {
    return (num / 1000000000).toFixed(2) + 'B';
  } else if (num > 1000000000000 && num < 1000000000000000000) {
    return (num / 1000000000000).toFixed(2) + 'T';
  } else {
    return num;
  }
};

export const formatBytes = (bytes: number) => {
  if (bytes < 1024) {
    return bytes + ' B';
  } else if (bytes < 1024 * 1024) {
    return (bytes / 1024).toFixed(2) + ' KB';
  } else if (bytes < 1024 * 1024 * 1024) {
    return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
  } else {
    return (bytes / (1024 * 1024 * 1024)).toFixed(2) + ' GB';
  }
};
