import React, {useState} from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {useRecoilValue, useSetRecoilState} from 'recoil';

import {NO_DATA} from '../../../../constants';
import {useCurrency} from '../../../../hooks/use-currency';
import {SelectedAssetSheetState} from '../../../../states';
import {
  IsBuyOpenOrderState,
  IsCancelConfirmationState,
  IsExtraModalState,
  IsOptionsSheetOpenState,
  IsOrderModifyingState,
  SelectedOrderState,
} from '../../../../states/open-orders/states';
import {Loader} from '../../../../storybook/loader';
import {Routes} from '../../../routes/constants';
import {formatNumber} from '../../../utils';
import {OrderOptionsStyles as styles} from './order-options-sheet.styles';

export const OrderOptionsSheet = ({navigation, isBuySell}: any) => {
  const selectedOrder = useRecoilValue(SelectedOrderState);
  const isOrderModifying = useSetRecoilState(IsOrderModifyingState);
  const setSelectedAsset = useSetRecoilState(SelectedAssetSheetState);
  const setIsCancelModal = useSetRecoilState(IsCancelConfirmationState);
  const setExtraModal = useSetRecoilState(IsExtraModalState);
  const setIsOptionsSheetOpen = useSetRecoilState(
    isBuySell ? IsBuyOpenOrderState : IsOptionsSheetOpenState,
  );

  const [isLoader, setIsLoader] = useState(false);

  const {formatCurrencyMB} = useCurrency();
  const {colors} = useTheme();

  const {
    symbol = '---',
    name,
    logo,
    price,
    initialQuantity,
    totalamount,
    quantity,
    type,
  } = selectedOrder ?? {};

  const handleCancelOrder = () => {
    setIsLoader(true);
    setIsOptionsSheetOpen(false);
    setExtraModal(true);
    setTimeout(() => {
      setIsCancelModal(true);
      setIsLoader(false);
      setExtraModal(false);
    }, 500);
  };

  const handleModify = () => {
    const {assetId, symbol, category} = selectedOrder;
    const tab = type;
    const obj = {
      id: assetId,
      symbol: symbol,
      type: category,
    };
    setSelectedAsset(obj);
    isOrderModifying(true);
    setIsOptionsSheetOpen(false);
    if (isBuySell) {
      navigation.navigate('Place Order');
      navigation.navigate(Routes.BuySell, {tab});
    } else {
      navigation.navigate(Routes.BuySell, {tab});
    }
  };

  return (
    <View>
      <View style={styles.detailContainer}>
        <View style={styles.imageContainer}>
          <Image source={{uri: logo}} style={styles.image} />
        </View>
        <View style={styles.listContainer}>
          <View style={styles.details}>
            <View style={styles.symbol}>
              <Text style={[styles.symbolTxt, {color: colors.text}]}>
                {symbol}
              </Text>
              <View style={styles.dot} />
              <Text
                style={[styles.nameTxt, {color: colors.text, width: 100}]}
                numberOfLines={1}
                ellipsizeMode={'tail'}>
                {name ?? NO_DATA}
              </Text>
            </View>
            <View>
              <Text style={[styles.priceTxt, {color: colors.text}]}>
                {formatCurrencyMB(price ?? 0, 6)}
              </Text>
            </View>
          </View>
          <View style={styles.amountDetails}>
            <Text style={[styles.quantityTxt, {color: colors.text}]}>
              {`${quantity ?? 0}/${initialQuantity ?? 0}`}
            </Text>
            <View style={styles.row}>
              <Text
                style={[
                  styles.amount,
                  {color: colors.text},
                ]}>{`Total Amount `}</Text>
              <Text style={[styles.amountTxt, {color: colors.text}]}>
                {formatCurrencyMB(totalamount ?? 0, 2)}
              </Text>
            </View>
          </View>
        </View>
      </View>
      <View style={styles.containerBtn}>
        <TouchableOpacity
          style={[styles.cancel, {backgroundColor: colors.box}]}
          onPress={handleCancelOrder}
          disabled={isLoader}>
          {isLoader ? (
            <Loader top={0} size="small" />
          ) : (
            <Text style={[styles.cancelText, {color: colors.text}]}>
              Cancel
            </Text>
          )}
        </TouchableOpacity>
        <TouchableOpacity style={styles.modify} onPress={handleModify}>
          <Text style={styles.modifyText}>Modify</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
