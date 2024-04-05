import type {IHistorical, IHistorical2} from '../../../../states';

import React, {FC, useCallback, useEffect, useMemo, useState} from 'react';
import {ScrollView, Text, View} from 'react-native';
import { useTheme } from '@react-navigation/native';
import {useRecoilValue} from 'recoil';
import moment from 'moment';

import {BLOCKCHAIN_TERMS} from '../../../../constants';
import {SelectedAssetDetailsState} from '../../../../states';
import {eventsStyle as styles} from './events.style';

interface IEvents {
  symbol: string;
  assetType: string;
}

type EventTypes = 'dividend' | 'split';

type Event = Omit<IHistorical, 'date'> & Omit<IHistorical2, 'date'>;

interface IEvent extends Partial<Event> {
  date: number;
  type: EventTypes;
}

export const Events: FC<IEvents> = ({symbol, assetType}) => {
  const assetDetails = useRecoilValue(SelectedAssetDetailsState);
  const [allEvents, setAllEvents] = useState<IEvent[]>([]);
  const {colors} = useTheme()

  const {events} = useMemo(() => assetDetails[symbol] ?? {}, []);
  const {CASH_DIVIDEND, DIVIDEND, RECORD_DATE, SHARE_SPLIT, EX_DATE} =
    useMemo(() => BLOCKCHAIN_TERMS, []);

  useEffect(() => {
    if (events) {
      const data: IEvent[] = [];
      events.historicalSplits?.historical?.forEach(value => {
        data.push({
          ...value,
          type: 'split',
          date: moment.utc(value.date).valueOf(),
        });
      });
      events.historicalDividends?.historical?.forEach(value => {
        data.push({
          ...value,
          type: 'dividend',
          date: moment.utc(value.date).valueOf(),
        });
      });
      const newData = data.sort((a, b) => b.date - a.date);
      setAllEvents(newData);
    }
  }, [events]);

  const getEventName = useCallback(
    (type: EventTypes) => (type === DIVIDEND ? CASH_DIVIDEND : SHARE_SPLIT),
    [],
  );

  const getDateLabel = useCallback(
    (type: EventTypes) => (type === DIVIDEND ? RECORD_DATE : EX_DATE),
    [],
  );

  const getDate = useCallback(
    (date: number) => moment(date).format('DD MMM YY'),
    [moment],
  );

  const mapEvents = useMemo(
    () =>
      allEvents.map((card, index) => (
        <View style={styles.eventsCard} key={index}>
          <View style={styles.eventsHeader}>
            <Text style={[styles.eventName,{color:colors.text}]}>{getEventName(card.type)}</Text>
            <Text style={[styles.eventDate,{color:colors.text}]}>{getDateLabel(card.type)}</Text>
          </View>
          <View style={styles.eventsHeader}>
            <Text style={[styles.eventHeadline,{color:colors.text}]}>
              {card.type === DIVIDEND
                ? `${card.adjDividend ?? 0}/Share`
                : `${card.numerator} for ${card.denominator}`}
            </Text>
            <Text style={[styles.eventHeadline,{color:colors.text}]}>{getDate(card.date)}</Text>
          </View>
        </View>
      )),
    [allEvents, getEventName, getDateLabel, getDate],
  );

  return (
    <View style={styles.eventsContainer}>
      <ScrollView>{mapEvents}</ScrollView>
    </View>
  );
};
