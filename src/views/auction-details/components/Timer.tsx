// @flow
import React, {useEffect, useRef, useState} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import CircularProgress, {
  CircularProgressBase,
} from 'react-native-circular-progress-indicator';
import {useTheme} from '@react-navigation/native';
import moment from 'moment';
import {
  AUCTION_TYPE,
  calculateRemainingTimeBySec,
  STATUS,
  timeConverter,
} from '../comman/utility';
import {auctionDetailsState} from '../states';
import {useRecoilState, useRecoilValue} from 'recoil';
import {COLORS} from '../../../assets';

type TimerType = {
  type: string;
  endTime: string;
  startDate?: string;
  formList?: boolean;
  status?: any;
  setOuterStatus?: any;
};

const Timer = ({
  type,
  endTime,
  startDate,
  formList,
  status,
  setOuterStatus,
}: TimerType) => {
  const AuctionDetails = useRecoilValue(auctionDetailsState);
  // const {timeStepHours, timeStepMinutes} = AuctionDetails;
  const {colors} = useTheme();
  const [value, setValue] = useState(10);
  const [hour, setHour] = useState(0);
  const [min, setMin] = useState(0);
  const [sec, setSec] = useState(0);
  const [day, setDay] = useState(0);
  const [isTimeEnded, setIsTimeEnded] = useState(false);
  const [dutchTime, setDutchTime] = useState<any>({
    days: 0,
    hours: 0,
    min: 0,
    sec: 0,
  });
  const [dutchsec, setDutchSec] = useState(0);
  const [dutchPer, setDutchPer] = useState(100);
  const [localStatus, setLocalStatus] = useState(status);
  let ref = useRef<any>(null);
  var dutchRef = useRef<any>(null);

  useEffect(() => {
    let leftSeconds =
      status == STATUS.YETTOSTART
        ? moment(startDate).diff(moment(), 'seconds')
        : moment(endTime).diff(moment(), 'seconds');

    if (isTimeEnded) {
      leftSeconds = moment(endTime).diff(moment(), 'seconds');
    }
    increace(leftSeconds < 0 ? 0 : leftSeconds);
    setIsTimeEnded(false);
    return () => {
      clearTimeout(ref.current);
    };
  }, [startDate, endTime, isTimeEnded]);

  const increace = (leftTime: any) => {
    const {days, hours, minutes, remainingSeconds} = timeConverter(
      status === STATUS.YETTOSTART ? startDate : endTime,
    );

    localStatus === STATUS.COMPLETED ? setIsTimeEnded(true) : null;

    if (localStatus === STATUS.LIVE) {
      let totalTime = moment(startDate).diff(moment(endTime));
      let remaining = moment().diff(moment(endTime));

      setValue(Math.floor((remaining / totalTime) * 100));
    } else {
      setValue(100);
    }
    if (leftTime == 0) {
      setSec(0);
      setMin(0);
      setHour(0);
      setDay(0);
      setValue(0);
      setIsTimeEnded(true);
    } else {
      setSec(remainingSeconds);
      setMin(minutes);
      setHour(hours);
      setDay(days);
    }
    ref.current = setTimeout(() => {
      if (leftTime > 0) {
        increace(leftTime - 1);
      } else {
        increace(moment(endTime).diff(moment(), 'seconds'));
        if (STATUS.YETTOSTART === status) {
          setLocalStatus(STATUS.LIVE);
          setOuterStatus(STATUS.LIVE);
        }
        if (localStatus === STATUS.LIVE) {
          setLocalStatus(STATUS.COMPLETED);
          setOuterStatus(STATUS.COMPLETED);
        }
        setIsTimeEnded(true);
      }
    }, 1000);
  };

  //------------- Dutch timer Functionality --------------
  useEffect(() => {
    if (type !== AUCTION_TYPE.CLASSIC) {
      let data = moment(AuctionDetails?.dutchPriceUpdateTime).diff(
        moment(),
        'seconds',
      );

      // setDutchPer(
      //   Math.floor((data / AuctionDetails?.timeStepMinutes) * 60 * 100),
      // );

      if (status === STATUS.LIVE) {
        dutchStepTime(data < 0 ? dutchsec : data);
      }
    }
    return () => clearTimeout(dutchRef.current);
  }, [dutchsec, status]);

  const dutchStepTime = (x: any) => {
    setDutchSec(x);
    const {days, hours, minutes, remainingSeconds} =
      calculateRemainingTimeBySec(x <= 0 ? x : dutchsec);

    setDutchTime({
      days: days,
      hours: hours,
      min: minutes,
      sec: remainingSeconds,
    });

    dutchRef.current = setTimeout(() => {
      setDutchPer((x / (AuctionDetails?.timeStepMinutes * 60)) * 100);
      // useRemainingSecPercentage()

      if (x > 0) {
        dutchStepTime(x - 1);
      } else if (dutchsec > 0) {
        setDutchSec(prevState => prevState - 1);
      } else {
        if (AuctionDetails?.timeStepMinutes) {
          setDutchSec(AuctionDetails?.timeStepMinutes * 60);
        }
      }
    }, 1000);
  };

  const getStatus = (Status: string) => {
    switch (Status) {
      case STATUS.LIVE:
        return 'Ending in';
      case STATUS.COMPLETED:
        return 'Ended';
      default:
        return 'Starting in ';
    }
  };
  return (
    <View style={styles.parent}>
      <View
        style={{
          height: formList ? 40 : 80,
          width: formList ? 40 : 80,

          alignItems: 'center',
          justifyContent: 'center',
        }}>
        {type === AUCTION_TYPE.CLASSIC ? (
          <CircularProgress
            value={value}
            clockwise={false}
            radius={formList ? 20 : 40}
            showProgressValue={false}
            inActiveStrokeOpacity={localStatus == STATUS.COMPLETED ? 1 : 0.3}
            activeStrokeWidth={20}
            inActiveStrokeWidth={15}
            progressValueStyle={{
              fontWeight: '100',
              color: 'black',
              fontSize: 20,
            }}
            activeStrokeColor={status == STATUS.COMPLETED ? 'red' : 'green'}
            // activeStrokeSecondaryColor="green"
            inActiveStrokeColor={
              status == STATUS.COMPLETED ? 'red' : colors.lineBorder
            }
            duration={100}
            dashedStrokeConfig={{
              count: formList ? 25 : 50,
              width: 3,
            }}
          />
        ) : (
          <CircularProgressBase
            activeStrokeWidth={2}
            inActiveStrokeWidth={2}
            inActiveStrokeOpacity={0.2}
            value={dutchPer}
            radius={formList ? 8 : 20}
            activeStrokeColor={'#e84118'}
            inActiveStrokeColor={
              localStatus == STATUS.COMPLETED ? 'red' : colors.lineBorder
            }>
            <CircularProgress
              value={value}
              clockwise={false}
              radius={formList ? 20 : 40}
              showProgressValue={false}
              inActiveStrokeOpacity={localStatus == STATUS.COMPLETED ? 1 : 0.3}
              activeStrokeWidth={20}
              inActiveStrokeWidth={15}
              progressValueStyle={{
                fontWeight: '100',
                color: 'black',
                fontSize: 20,
              }}
              activeStrokeColor={status == STATUS.COMPLETED ? 'red' : 'green'}
              // activeStrokeSecondaryColor="green"
              inActiveStrokeColor={
                localStatus == STATUS.COMPLETED ? 'red' : colors.lineBorder
              }
              duration={100}
              dashedStrokeConfig={{
                count: formList ? 25 : 50,
                width: 3,
              }}
            />
          </CircularProgressBase>
        )}
      </View>
      {formList ? (
        <View style={{paddingHorizontal: 12}}>
          <Text style={styles.timerLabel}>{getStatus(status)}</Text>
          {status !== STATUS.COMPLETED ? (
            <Text
              style={styles.timerText}>{`${day}d ${hour}:${min}:${sec}`}</Text>
          ) : null}
        </View>
      ) : (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            paddingHorizontal: 20,
          }}>
          <Text
            style={[
              {fontSize: 20, lineHeight: 30, fontWeight: '500'},
              {color: colors.text},
            ]}>
            {day}d {hour}:{min}:{sec}
          </Text>
          {type === AUCTION_TYPE.CLASSIC ? null : (
            <View
              style={{
                flexDirection: 'row',
              }}>
              <Text
                style={{
                  fontSize: 14,
                  lineHeight: 16,
                  fontWeight: '500',
                  color: colors.lightText,
                }}>
                Time left to next step
              </Text>
              {status == STATUS.YETTOSTART ? (
                <Text
                  style={{
                    fontSize: 14,
                    lineHeight: 16,
                    fontWeight: '500',
                    color: colors.text,
                    paddingLeft: 8,
                  }}>
                  00:00:00
                </Text>
              ) : (
                <Text
                  style={{
                    fontSize: 14,
                    lineHeight: 16,
                    fontWeight: '500',
                    color: colors.text,
                    paddingLeft: 8,
                  }}>
                  {dutchTime.hours}:{dutchTime.min}:{dutchTime.sec}
                </Text>
              )}
            </View>
          )}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  parent: {flexDirection: 'row'},
  timerLabel: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '400',
    color: COLORS['white'],
  },
  timerText: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '600',
    color: COLORS['white'],
  },
});
export default Timer;
