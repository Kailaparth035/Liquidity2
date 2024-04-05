import moment from 'moment';

export const timeConverter = (dateTime: any) => {
  let leftSeconds = moment(dateTime).diff(moment(), 'seconds');

  if (leftSeconds <= 0) {
    return {
      days: 0,
      hours: 0,
      minutes: 0,
      remainingSeconds: 0,
    };
  } else {
    let time = {
      days: Math.floor(leftSeconds / (24 * 60 * 60)),
      hours: Math.floor((leftSeconds / 3600) % 24),
      minutes: Math.floor((leftSeconds % 3600) / 60),
      remainingSeconds: leftSeconds % 60,
    };
    const {days, hours, minutes, remainingSeconds} = time;
    return {
      days: days < 10 ? '0' + days : days,
      hours: hours < 10 ? '0' + hours : hours,
      minutes: minutes < 10 ? '0' + minutes : minutes,
      remainingSeconds:
        remainingSeconds < 10 ? '0' + remainingSeconds : remainingSeconds,
    };
  }
};

export const calculateRemainingTimeBySec = (leftSeconds: any) => {
  let time = {
    days: Math.floor(leftSeconds / (24 * 60 * 60)),
    hours: Math.floor((leftSeconds / 3600) % 24),
    minutes: Math.floor((leftSeconds % 3600) / 60),
    remainingSeconds: leftSeconds % 60,
  };
  const {days, hours, minutes, remainingSeconds} = time;
  return {
    days: days < 10 ? '0' + days : days,
    hours: hours < 10 ? '0' + hours : hours,
    minutes: minutes < 10 ? '0' + minutes : minutes,
    remainingSeconds:
      remainingSeconds < 10 ? '0' + remainingSeconds : remainingSeconds,
  };
};

export const manupulate = (
  name: string,
  isWinner?: boolean,
  heading = false,
) => {
  if (!name) {
    return '';
  }

  let array = heading ? name.split('.') : name.split(' ');

  if (isWinner) {
    return `${array[0]} ${array[1]}`;
  } else {
    let fName = '';
    let LName = '';
    for (let i = 0; i < array[0].length; i++) {
      if (i == 0) {
        fName = fName + array[0][0];
      } else {
        fName = fName + '*';
      }
    }
    for (let i = 0; i < array[1].length; i++) {
      if (i == 0) {
        LName = LName + array[1][0];
      } else {
        LName = LName + '*';
      }
    }

    return `${fName} ${LName}`;
  }
};

export const STATUS = {
  COMPLETED: 'completed',
  LIVE: 'live',
  YETTOSTART: 'yet-to-start',
};

export const AUCTION_TYPE = {
  CLASSIC: 'classic',
  DUTCH: 'dutch',
};
