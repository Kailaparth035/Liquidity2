import React, {useCallback, useEffect, useState} from 'react';
import {ScrollView, Text, View} from 'react-native';
import {useRecoilValue} from 'recoil';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useTheme} from '@react-navigation/native';

import {formatNumber} from '../../utils';
import {Loader} from '../../../storybook/loader';
import {SelectScroll} from '../../../storybook';
import {isDarkModeState} from '../../../states';
import {DetailsStyles as styles} from './buy-details.styles';

import {
  pickerSelectStylesNew as dummy,
  pickerSelectStyles,
} from './buy-details.styles';
import {FormatToBM} from '../../../libs';

export const OrderBook = ({orderBook, limit}: any) => {
  const [option, SetOption] = useState('10');
  const [bidsData, setBidsData] = useState([]);
  const [asksData, setAsksData] = useState([]);
  const [isDropDown, setISDropDown] = useState(true);
  const {colors} = useTheme();
  const isDark = useRecoilValue(isDarkModeState);

  useEffect(() => {
    let {bid, ask} = orderBook ?? {bid: [], ask: []};
    const pendingList = new Array(JSON.parse(option)).fill({
      price: 0,
      quantity: 0,
    });

    if (ask) {
      ask = [...ask, ...pendingList];
      ask = ask.slice(0, JSON.parse(option));
    }

    if (bid) {
      bid = [...bid, ...pendingList];
      bid = bid.slice(0, JSON.parse(option));
    }
    setBidsData(bid);
    setAsksData(ask);
  }, [option, orderBook]);

  useEffect(() => {
    if (limit) {
      limit(option);
    }
  }, [option]);
  const numberOption = [
    {
      label: '10',
      value: '10',
    },
    {
      label: '20',
      value: '20',
    },
    {
      label: '30',
      value: '30',
    },
  ];

  const handleChange = useCallback((val: any) => {
    if (val) {
      SetOption(val);
    }
  }, []);

  return (
    <View style={styles.details}>
      <View style={styles.orderText}>
        <Text style={{color: colors.text, fontWeight: '600'}}>Orderbook</Text>

        <View style={[styles.quantityView, {backgroundColor: colors.ground}]}>
          <AntDesign
            name="down"
            size={10}
            color={colors.text}
            style={styles.iconStyle}
          />
          <SelectScroll
            style={isDark === true ? dummy : pickerSelectStyles}
            name="dropdown"
            options={numberOption}
            label="Dropdown"
            selectedItem={option}
            setSelectedItem={val => handleChange(val)}
          />
        </View>
      </View>
      <View style={styles.mainContainer}>
        <View style={styles.headerView}>
          <View style={[styles.subContainer]}>
            <Text style={[styles.subHeading, {color: colors.text}]}>Bid</Text>
            <Text
              style={[
                styles.subHeading,
                {color: colors.text, marginRight: 12},
              ]}>
              Qty
            </Text>
          </View>
          <View style={styles.subContainer}>
            <Text
              style={[styles.subHeading, {color: colors.text, marginLeft: 10}]}>
              Ask
            </Text>
            <Text style={[styles.subHeading, {color: colors.text}]}>Qty</Text>
          </View>
        </View>
        <View style={{height: 150}}>
          <ScrollView contentContainerStyle={{flexGrow: 1}} nestedScrollEnabled>
            <View style={styles.orderbookContainer}>
              <View style={styles.bids}>
                {bidsData?.length > 0 ? (
                  <>
                    {bidsData.map(({price, quantity}: any, ind: any) => (
                      <View style={styles.subContainer} key={`bid_${ind}`}>
                        <Text style={[styles.bidTxt, {marginRight: 70}]}>
                          {price > 1000000
                            ? FormatToBM(price) ?? '-'
                            : formatNumber(price, 4) ?? '-'}
                        </Text>
                        <View style={{flex: 1, position: 'absolute', right: 0}}>
                          <Text style={[styles.values, {color: colors.text}]}>
                            {formatNumber(quantity) ?? '-'}
                          </Text>
                        </View>
                      </View>
                    ))}
                  </>
                ) : (
                  <Loader />
                )}
              </View>

              <View style={styles.asks}>
                {asksData?.length > 0 ? (
                  <>
                    {asksData?.map(({price, quantity}: any, ind: any) => (
                      <View style={styles.subContainer} key={`ask_${ind}`}>
                        <Text style={[styles.askTxt, {marginRight: 70}]}>
                          {price > 1000000
                            ? FormatToBM(price) ?? '-'
                            : formatNumber(price, 4) ?? '-'}
                        </Text>
                        <View style={{flex: 1, position: 'absolute', right: 0}}>
                          <Text style={[styles.values, {color: colors.text}]}>
                            {formatNumber(quantity) ?? '-'}
                          </Text>
                        </View>
                      </View>
                    ))}
                  </>
                ) : (
                  <Loader />
                )}
              </View>
            </View>
          </ScrollView>
        </View>
      </View>
    </View>
  );
};
