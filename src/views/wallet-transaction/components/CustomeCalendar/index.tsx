// @flow
import React, {Dispatch, SetStateAction, useCallback, useState} from 'react';
import {View, Text} from 'react-native';
import {Calendar} from 'react-native-calendars';
import moment from 'moment';
import {useTheme} from '@react-navigation/native';

import {COLORS} from '../../../../assets';
import DateContainer from './components/DateContainer';
import FilterButton from './components/CustomeFilterButton';
import DateComponent from './components/DateComponent';
import {styles} from './CustomeCalendar.style';

type CustomeCalendarType = {
  setSelected: Dispatch<SetStateAction<string>>;
};

const CustomeCalendar = ({setSelected}: CustomeCalendarType) => {
  const {colors} = useTheme();
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState(moment().format('yyyy-MM-DD'));

  const reset = () => {
    setStartDate('');
    setEndDate(moment().format('yyyy-MM-DD'));
    setSelected('');
  };

  const handleDate = useCallback(
    (date: any) => {
      if (startDate == '') {
        if (!moment(date.timestamp).isAfter(endDate)) {
          setStartDate(moment(date.timestamp).format('yyyy-MM-DD'));
        }
      } else if (endDate == '') {
        if (!moment(date.timestamp).isBefore(startDate)) {
          if (!moment(date.timestamp).isAfter(moment())) {
            setEndDate(moment(date.timestamp).format('yyyy-MM-DD'));
          }
        }
      } else if (startDate == date.dateString) {
        setStartDate('');
      } else if (endDate == date.dateString) {
        setEndDate('');
      }
    },
    [startDate, endDate],
  );
  return (
    <View>
      <Text style={styles.headerText}>Date Range</Text>
      <View style={[styles.dateRangeContainer]}>
        <DateContainer date={startDate} />
        <DateContainer date={endDate} />
      </View>
      <View style={styles.calenderContainer}>
        <Calendar
          style={{backgroundColor: "COLORS['bg-80-dark']"}}
          theme={{
            calendarBackground: colors.headerCard,
            textSectionTitleColor: colors.text,
            selectedDayBackgroundColor: COLORS['primary-dark'],
            todayTextColor: colors.text,
            todayBackgroundColor: COLORS['primary-dark'],
            dayTextColor: colors.text,
            monthTextColor: colors.text,
            arrowColor: colors.text,
            textMonthFontSize: 16,
            textMonthFontWeight: '600',
          }}
          minDate={startDate}
          maxDate={endDate}
          enableSwipeMonths={true}
          hideExtraDays={true}
          markingType={'period'}
          dayComponent={day => {
            return (
              <DateComponent
                day={JSON.stringify(day.date?.day)}
                onPress={() => handleDate(day.date)}
                customeStyle={
                  day.date?.dateString === startDate ||
                  day.date?.dateString === endDate
                    ? styles.activeDate
                    : styles.inactievDate
                }
                labelStyle={{color: colors.text}}
              />
            );
          }}
        />
      </View>
      <View style={styles.buttonContainer}>
        <FilterButton
          labelStyle={[styles.filterLabel, {color: colors.text}]}
          label={'Reset'}
          onPress={() => {
            reset();
          }}
          customestyle={{
            backgroundColor: colors.box,
            marginRight: 4,
          }}
        />
        <FilterButton
          labelStyle={[styles.filterLabel, {color: colors.text}]}
          label={'Filter'}
          onPress={() => {
            console.log('filter press');
          }}
          customestyle={{
            backgroundColor: COLORS['primary-dark'],
            marginLeft: 4,
          }}
        />
      </View>
    </View>
  );
};

export default CustomeCalendar;
