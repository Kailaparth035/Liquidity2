// @flow
import {useTheme} from '@react-navigation/native';
import moment from 'moment';
import React, {useEffect, useRef, useState} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {STATUS, timeConverter} from '../comman/utility';

type TimerStatusType = {
  currentBidPrice: string;
  endTime: any;
  startTime: any;
  status: any;
};

const TimerStatus = ({
  currentBidPrice,
  endTime,
  startTime,
  status,
}: TimerStatusType) => {
  const {colors} = useTheme();
  const [time, setTime] = useState({});
  let ref = useRef<any>(null);

  const increace = x => {
    const {days, hours, minutes, remainingSeconds} = timeConverter(
      status == STATUS.YETTOSTART ? startTime : endTime,
    );

    setTime({
      days: days,
      hours: hours,
      minutes: minutes,
      remainingSeconds: remainingSeconds,
    });
    ref.current = setTimeout(() => {
      if (x > 0) {
        increace(x - 1);
      } else {
      }
    }, 1000);
  };
  useEffect(() => {
    let leftSeconds =
      status == STATUS.YETTOSTART
        ? moment(startTime).diff(moment(), 'seconds')
        : moment(endTime).diff(moment(), 'seconds');

    increace(leftSeconds);

    return () => clearTimeout(ref.current);
  }, [endTime, status]);
  return (
    <View>
      <View style={[styles.parent, {backgroundColor: colors.ground}]}>
        <View style={{flexDirection: 'row'}}>
          <Text style={{color: colors.lightText}}>
            {status === STATUS.YETTOSTART ? 'Starting in ' : 'Ending in '}
          </Text>
          <Text style={{color: colors.text, fontWeight: 'bold'}}>
            {time.days}d:{time.hours}h:{time.minutes}m:{time.remainingSeconds}s
          </Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <Text style={{color: colors.lightText}}>Current bid </Text>
          <Text style={{color: colors.text,fontWeight: 'bold'}}>{currentBidPrice}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  parent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
});
export default TimerStatus;
