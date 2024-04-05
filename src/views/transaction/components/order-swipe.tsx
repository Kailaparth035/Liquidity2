import React, {useCallback, useMemo} from 'react';
import {Image, Platform, Text, TouchableOpacity, View} from 'react-native';
import {useRecoilValue, useSetRecoilState} from 'recoil';
import moment from 'moment';
import {useTheme} from '@react-navigation/native';

import {COLORS, Svg_Calendar_Line, Svg_Time_Line} from '../../../assets';
import {BUY, NO_DATA, ORDER_TABS, SELL} from '../../../constants';
import {SVG} from '../../../storybook/svg';
import {capitalize, formatNumber} from '../../utils';
import {
  IsOptionsSheetOpenState,
  ModifiedOrderState,
  SelectedOrderState,
} from '../../../states/open-orders/states';
import {Routes} from '../../routes/constants';
import {ProfileDataState, SelectedTransactionMemoState} from '../../../states';
import {useCurrency} from '../../../hooks/use-currency';
import {selectedAuthUserState} from '../../../views/profile/components/co-owners/states';
import {OrderedAssetStyles as styles} from './ordered-assets.styles';
import {FormatToBM} from '../../../libs';

const OrderSwipe = ({item, navigation, tab, topNav, isCancelled}: any) => {
  const modifiedOrder = useRecoilValue(ModifiedOrderState);
  const setSelectedTransactionMemo = useSetRecoilState(
    SelectedTransactionMemoState,
  );
  const setSelectedOrder = useSetRecoilState(SelectedOrderState);
  const setIsOptionsOpen = useSetRecoilState(IsOptionsSheetOpenState);
  const LoggedAccount = useRecoilValue(selectedAuthUserState);
  const profileData = useRecoilValue(ProfileDataState);
  const {formatCurrencyMB} = useCurrency();
  const {colors} = useTheme();

  const {
    symbol = '---',
    name,
    logo,
    totalamount,
    metaData,
    quantity,
    category,
    initialQuantity,
    price,
    type,
    id,
    orderdate,
  } = item ?? {};
  const {memo} = metaData ?? {};

  const latestQuantity =
    modifiedOrder.id === id ? modifiedOrder.quantity : quantity;

  const onMemoSelect = useCallback(() => {
    setSelectedTransactionMemo(memo);
    navigation.navigate(Routes.TransactionDetails);
  }, [memo, navigation]);

  const handleOpenOptions = useCallback(() => {
    setSelectedOrder(item);
    setIsOptionsOpen(true);
  }, [item]);
  const isDisabled = useMemo(() => {
    return (
      tab !==
        (topNav?.open ??
          profileData?.settings?.language?.orders?.topNav?.open ??
          ORDER_TABS.open) || LoggedAccount?.isTradeEnabled === false
    );
  }, [tab, LoggedAccount, topNav, profileData]);

  return (
    <TouchableOpacity
      onPress={handleOpenOptions}
      disabled={isDisabled}
      style={[styles.mainContainer, {borderBottomColor: colors.border}]}>
      <View style={styles.detailContainer}>
        <View style={styles.imageContainer}>
          {logo ? (
            <Image source={{uri: logo}} style={styles.image} />
          ) : (
            <View
              style={[styles.symbolView, {backgroundColor: colors.imagebg}]}>
              <Text
                style={[
                  Platform.OS === 'ios'
                    ? styles.symbolText
                    : styles.symbolTextAndroid,
                  {color: colors.text},
                ]}>
                {type === 'sba7' ? acct_name?.[0] ?? '' : symbol?.[0] ?? ''}
              </Text>
            </View>
          )}
        </View>
        <View style={styles.listContainer}>
          <View style={styles.details}>
            <View style={styles.symbol}>
              <Text style={[styles.symbolTxt, {color: colors.text}]}>
                {symbol}
              </Text>
              <View style={styles.dot} />
              <Text
                style={[styles.nameTxt, {color: colors.text, flex: 1}]}
                numberOfLines={1}
                ellipsizeMode={'tail'}>
                {name ?? NO_DATA}
              </Text>
            </View>
            <View
              style={styles.priceView}>
              <Text
                style={[styles.priceTxt, {color: colors.text}]}
                numberOfLines={1}>
                {formatCurrencyMB(price, 4)}
              </Text>
            </View>
          </View>
          <View style={styles.amountDetails}>
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.qty}>Qty. </Text>
              <Text style={[styles.quantityTxt, {color: colors.text}]}>
                {tab === 'Open' ? `${latestQuantity ?? 0}/${initialQuantity ?? 0}` : FormatToBM(latestQuantity)}
              </Text>
              {isCancelled && (
                <>
                  <View style={[styles.dot, styles.dotMemo]} />
                  <Text style={styles.cancelled}>Cancelled</Text>
                </>
              )}
              {/* Removed MEMO button for now as discussed with puja. */}

              {/* <TouchableOpacity onPress={onMemoSelect} style={styles.memo}>
                <Text style={styles.memoTxt}>{topNav?.memo ?? 'Memo'}</Text>
              </TouchableOpacity> */}
            </View>
            <View style={styles.row}>
              <Text style={[styles.amount, {color: colors.text}]}>
                {topNav?.total_amount ?? 'Total Amount '}
              </Text>
              <Text style={[styles.amountTxt, {color: colors.text}]}>
                {` ${formatCurrencyMB(totalamount, 2)}`}
              </Text>
            </View>
          </View>
        </View>
      </View>
      <View style={[styles.dateDetailContainer, {flex: 1, marginTop: 10}]}>
        <View style={[styles.dateContainer, {flex: 1}]}>
          <SVG
            name={Svg_Time_Line}
            width={16}
            height={16}
            color={COLORS['color-text-dark-50']}
          />
          <Text style={styles.timeTxt}>
            {moment(orderdate).format('hh:mm:ss')}
          </Text>
          <View style={styles.dot} />
          <SVG
            name={Svg_Calendar_Line}
            width={16}
            height={16}
            color={COLORS['color-text-dark-50']}
          />
          <Text style={[styles.timeTxt, {flex: 1}]}>
            {moment(orderdate).format('MMMM DD YYYY')}
          </Text>
        </View>
        <View style={[styles.row, {flex: 1, alignItems: 'center'}]}>
          <View
            style={[
              styles.assetType,
              {backgroundColor: colors.border, flex: 1, alignItems: 'center'},
            ]}>
            <Text style={[styles.categoryTxt, {color: colors.text}]}>
              {capitalize(category === 'privates' ? 'Pre-IPO' : category)}
            </Text>
          </View>
          <View
            style={[
              styles.txnType,
              {backgroundColor: colors.border, flex: 1, alignItems: 'center'},
            ]}>
            <Text
              style={
                type === 'BUY' ? styles.footerBtnBuy : styles.footerBtnSell
              }>
              {type === 'BUY' ? BUY : SELL}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default OrderSwipe;
