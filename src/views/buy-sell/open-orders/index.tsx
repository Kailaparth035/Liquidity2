import React, {useCallback, useEffect, useState} from 'react';
import {RefreshControl, Text, TouchableOpacity, View} from 'react-native';
import {useRecoilState, useRecoilValue, useSetRecoilState} from 'recoil';
import {useTheme} from '@react-navigation/native';
import moment from 'moment';

import {NoData} from '../../../components';
import {COLORS, Svg_Calendar_Line, Svg_Time_Line} from '../../../assets';
import {SelectedAssetSheetState, SelectedCurrencyState} from '../../../states';
import {FlatListScroll} from '../../../storybook/flatlist';
import {ImageView} from '../../../storybook/image';
import {Sheet} from '../../../storybook/sheet';
import {SVG} from '../../../storybook/svg';
import {capitalize} from '../../utils';
import {OpenOrderStyles as styles} from './open-orders.styles';
import {useOpenOrder} from './hooks';
import {
  IsBuyOpenOrderState,
  OpenOrderState,
  SelectedOrderState,
} from '../../../states/open-orders/states';
import {Sell} from '../../../constants';
import {OrderOptionsSheet} from '../../transaction/components/order-option-sheet';
import ConfirmCancelModal from '../../transaction/components/confirm-cancel-modal/confirm-cancel-modal';
import {useCurrency} from '../../../hooks/use-currency';
import {FormatToBM} from '../../../libs';

interface IOpen {
  type: 'pending' | 'completed';
  navigation: any;
  Symbol: string;
}

interface IAsset {
  logo: string;
  name: string;
  code: string;
}

export interface ITrade {
  id: string;
  baseAsset: IAsset;
  counterAsset: IAsset;
  orderdate: number;
  type: string;
  category: string;
  quantity: number;
  initialQuantity: number;
  remaining: number;
  totalamount: number;
  price: number;
  pagingToken: string;
  logo: string;
  Symbol: string;
  name: string;
}

const OpenOrders = ({type, navigation, Symbol}: IOpen) => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [{id}] = useRecoilState(SelectedAssetSheetState);
  const setSelectedOrder = useSetRecoilState(SelectedOrderState);
  const [isOpen, setIsOpen] = useRecoilState(IsBuyOpenOrderState);
  const [orders, setOrders] = useRecoilState(OpenOrderState);
  const {getOpenOrder} = useOpenOrder();
  const currency = useRecoilValue(SelectedCurrencyState);
  const {symbol} = currency ?? {};
  const {colors} = useTheme();

  useEffect(() => {
    getOpenOrder(id);
  }, [type, id]);

  const options: ITrade[] = [...orders];
  // type === 'completed' ? orders?.executeOrder : orders?.openOrder;

  const handleOpenOptions = useCallback((item: any) => {
    setSelectedOrder(item);
    setIsOpen(true);
  }, []);

  const refreshing = useCallback(() => {
    setIsRefreshing(true);
    getOpenOrder(id);
    setIsRefreshing(false);
  }, []);

  const renderItem = (item: ITrade) => {
    const {
      logo,
      initialQuantity,
      quantity,
      totalamount,
      price,
      category,
      type: orderType,
      name,
      orderdate,
    } = item ?? {};

    return (
      <TouchableOpacity
        onPress={() => handleOpenOptions(item)}
        style={styles.card}
        disabled={type !== 'pending'}>
        <View style={styles.cardItem}>
          <View style={styles.imageContainer}>
            <ImageView
              source={{uri: logo}}
              url={logo}
              style={styles.rowImage}
              alt={Symbol ?? ''}
            />
          </View>
          <View style={styles.width}>
            <View style={styles.labelContainer}>
              <View style={styles.labelContain}>
                <Text style={[styles.labelTxt, {color: colors.text}]}>
                  {Symbol}
                </Text>
                <View style={styles.point} />
                <Text
                  style={[styles.name, {color: colors.text, width: 140}]}
                  numberOfLines={1}
                  ellipsizeMode={'tail'}>
                  {name}
                </Text>
              </View>
              <View>
                <Text style={[styles.price, {color: colors.text}]}>
                  {symbol + FormatToBM(price)}
                </Text>
              </View>
            </View>
            <View style={styles.labelContainer}>
              <View style={styles.labelContain}>
                <Text style={[styles.count, {color: colors.text}]}>
                  {type === 'pending'
                    ? `${quantity ?? 0}/${initialQuantity ?? 0}`
                    : quantity ?? 0}
                </Text>
              </View>
              <View style={styles.labelContain}>
                <Text style={[styles.amountTxt, {color: colors.text}]}>
                  Total Amount:
                </Text>
                <Text style={[styles.amount, {color: colors.text}]}>
                  {symbol + FormatToBM(totalamount)}
                </Text>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.footer}>
          <View>
            <View style={styles.labelContain}>
              <View style={styles.timeContain}>
                <SVG
                  name={Svg_Time_Line}
                  width={14}
                  height={14}
                  color={COLORS['color-text-dark-50']}
                />
                <Text style={styles.time}>
                  {moment(orderdate).format('hh:mm:ss')}
                </Text>
              </View>
              <View style={styles.point} />

              <View style={styles.labelContain}>
                <View style={styles.dateContain}>
                  <SVG
                    name={Svg_Calendar_Line}
                    width={14}
                    height={14}
                    color={COLORS['color-text-dark-50']}
                  />
                  <Text style={styles.date}>
                    {moment(orderdate).format('DD MMM YY')}
                  </Text>
                </View>
              </View>
            </View>
          </View>

          <View style={styles.labelContain}>
            <View style={[styles.footerBtn, {backgroundColor: colors.border}]}>
              <Text style={[styles.footerBtnTxt, {color: colors.text}]}>
                {capitalize(category)}
              </Text>
            </View>
            <View style={[styles.footerBtn, {backgroundColor: colors.border}]}>
              <Text
                style={
                  orderType === 'SELL'
                    ? styles.footerBtnSell
                    : styles.footerBtnBuy
                }>
                {capitalize(orderType)}
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={[styles.container, {backgroundColor: colors.background}]}>
      {options?.length > 0 ? (
        <FlatListScroll
          data={options}
          renderItem={({item}) => renderItem(item)}
          keyExtractor={(item, i) => `${item.name}__${i}`}
          style={{flex: 0.92}}
          refreshControl={
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={refreshing}
              title="Pull to refresh"
              tintColor={colors.text}
              titleColor={colors.text}
            />
          }
        />
      ) : (
        <NoData />
      )}

      <Sheet isModal={isOpen} setIsModal={setIsOpen} height={206}>
        <OrderOptionsSheet navigation={navigation} isBuySell={true} />
      </Sheet>
      <ConfirmCancelModal
        orders={orders}
        setOrders={setOrders}
        getOpenOrder={() => ({})}
        isForm="assetDetails"
      />
    </View>
  );
};

export default OpenOrders;
