import React, {FC, useMemo} from 'react';
import {DatePickerIOS, View} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

import {Sheet} from '../sheet';
import {usePlatform} from '../../hooks/use-platform';
import {datePicker as styles} from './datePicker.styles';

interface IDatePickerProps {
  defaultDate: Date;
  setDate: (date?: Date) => void;
  isOpen: boolean;
  setIsOpen: () => void;
}

export const DatePicker: FC<IDatePickerProps> = ({
  defaultDate,
  setDate,
  isOpen,
  setIsOpen,
}) => {
  const {isAndroid} = usePlatform();

  const maxDate = useMemo(() => new Date(), []);

  return (
    <View>
      {isAndroid ? (
        isOpen && (
          <View style={styles.container}>
            <DateTimePicker
              value={defaultDate}
              onChange={(e, date) => setDate(date)}
              maximumDate={maxDate}
            />
          </View>
        )
      ) : (
        <Sheet isModal={isOpen} setIsModal={setIsOpen}>
          <View style={styles.container}>
            <DatePickerIOS
              date={defaultDate}
              onDateChange={date => setDate(date)}
              mode="date"
              maximumDate={maxDate}
            />
          </View>
        </Sheet>
      )}
    </View>
  );
};
