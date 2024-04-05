import React, {
  FC,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {useTheme} from '@react-navigation/native';
import {Alert, Platform, View, Dimensions} from 'react-native';
import {useRecoilState, useRecoilValue, useSetRecoilState} from 'recoil';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import {DetailsStyles as styles} from './buy-details.styles';
import {useNetwork} from '../../../hooks/use-network';
import {
  APIS,
  BUY,
  Buy,
  ORDER_TYPE,
  SOMETHING_IS_WRONG,
} from '../../../constants';
import {
  BuyLoadingState,
  KeyChainDataState,
  SelectedAssetDetailsState,
  SelectedAssetSheetState,
  SelectedMusicAssetDetailsState,
  SellLoadingState,
  useInfo,
} from '../../../states';
import {AssetsHeader} from '../../asset-details/components';
import {toast} from '../../../libs';
import {OrderFooter} from './orderFooter';
import {OrderBook} from './orderBook';
import {useInterval} from '../../../hooks';
import {OrderForm} from './orderForm';
import {useKeyboard} from '../../../hooks/use-keyboard';
import {useOpenOrder} from '../open-orders/hooks';
import {
  IsOrderModifyingState,
  ModifiedOrderState,
  SelectedOrderState,
} from '../../../states/open-orders/states';
import {useCurrency} from '../../../hooks/use-currency';
import {formatNumber} from '../../utils';
import {Button} from 'storybook/button';
import {isAndroid} from 'react-native-draggable-flatlist/lib/constants';
import {usePortfolioApi} from '../../../views/portfolio/hooks/use-portfolio-api';

interface IDetails {
  tab: string;
  Symbol: string;
  navigation: any;
  isMusicalType: string;
}

interface IForm {
  type: string;
  quantity: string;
  price: string;
  targetPrice: string;
}

const ORDER_PLACED = 'Order placed, please check status in open order section';
const ORDER_EXECUTED =
  'Order executed successfully, please check the status in executed section';
const ORDER_PARTIALLY =
  'Order partially executed, please check status in open order section';
const ERROR_MESSAGE =
  'We are unable to place the order right now, please try again later';

export const BuyDetails: FC<IDetails> = ({
  tab,
  Symbol,
  isMusicalType,
  navigation,
}) => {
  const keyChainData = useRecoilValue(KeyChainDataState);
  const assetDetails = useRecoilValue(SelectedAssetDetailsState);
  const setBuyLoading = useSetRecoilState(BuyLoadingState);
  const setSellLoading = useSetRecoilState(SellLoadingState);
  const [{id}] = useRecoilState(SelectedAssetSheetState);
  const [isOrderModifying, setIsOrderModifying] = useRecoilState(
    IsOrderModifyingState,
  );
  const musicSelectedAsset = useRecoilState(SelectedMusicAssetDetailsState);
  const selectedOrder = useRecoilValue(SelectedOrderState);
  const setModifiedOrder = useSetRecoilState(ModifiedOrderState);
  const [orderComplete, setOrderComplete] = useState(false);
  const [apiLimit, SetApiLimit] = useState();
  const [goodTillCancelValue, setGoodTillCancelValue] = useState(true);
  const [orderBook, setOrderBook] = useState({});
  const {post} = useNetwork();
  const {colors} = useTheme();
  const {get, data} = useNetwork();
  const {put} = useNetwork();
  const {isKeyboardVisible} = useKeyboard();
  const {getOrders} = useOpenOrder();
  const {fetchInfoData} = useInfo();

  // portfolio api call for updating executing order
  const {getPortfolios} = usePortfolioApi();

  const form: IForm = {
    type: 'market',
    quantity: '1',
    price: '',
    targetPrice: '',
  };
  const [buySellForm, setBuySellForm] = useState(form);

  const {width, height} = Dimensions.get('window');

  const SECRET_KEY = keyChainData?.stellar?.password;

  const apiCall = useCallback(() => {
    if (id) {
      get(`${APIS.OrderBookBuy}${id}&status=PENDING&limit=${apiLimit}`);
    }
  }, [id, tab, apiLimit]);

  useEffect(() => {
    apiCall();
  }, [id]);

  useEffect(() => {
    return () => {
      setIsOrderModifying(false);
    };
  }, []);

  useInterval(apiCall, 5000);

  const {convertToUSD, currencyConvertInNumber} = useCurrency();

  useEffect(() => {
    if (data?.data) {
      setOrderBook(data.data);
    }
  }, [data]);

  const isOrderModifyFnc = useCallback(() => {
    let tempForm = buySellForm;
    const formatCurrentPrice = currencyConvertInNumber(
      selectedOrder?.price ?? buySellForm?.price ?? 0,
    );
    tempForm.price = String(formatCurrentPrice ?? 0);
    tempForm.quantity = String(selectedOrder?.quantity ?? buySellForm.quantity);
    setBuySellForm(tempForm);
  }, [buySellForm, selectedOrder]);

  useEffect(() => {
    if (buySellForm?.type === 'market') {
      let tempForm = buySellForm;
      const currentPrice =
        assetDetails?.[Symbol]?.detail?.assetPrice ??
        assetDetails?.[Symbol]?.marketPrice ??
        assetDetails?.[Symbol]?.detail?.price ??
        0;
      const formatCurrentPrice = currencyConvertInNumber(currentPrice);
      tempForm.price = isMusicalType
        ? String(musicSelectedAsset[0]?.amount)
        : String(formatCurrentPrice);
      setBuySellForm(tempForm);
    }
    if (isOrderModifying) {
      isOrderModifyFnc();
    }
  }, [
    buySellForm?.type,
    assetDetails?.marketPrice,
    isOrderModifying,
    musicSelectedAsset?.price,
    selectedOrder,
  ]);

  // we need to remount our state due to calling useInterval.
  useMemo(() => {
    if (isOrderModifying) {
      let tempForm = buySellForm;
      const formatCurrentPrice = currencyConvertInNumber(
        selectedOrder.price ?? 0,
      );
      tempForm.price = String(formatCurrentPrice ?? 0);
      tempForm.quantity = String(selectedOrder.quantity);
      return tempForm;
    }
  }, [selectedOrder, isOrderModifying]);

  const handleForm = useCallback(
    (key: string, value: string) => {
      setBuySellForm((prevState: any) => {
        return {...prevState, [key]: value};
      });
    },
    [setBuySellForm],
  );

  const handleGoback = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const handleBuySell = useCallback(async () => {
    let sellAssetAddress = '';
    let buyAssetAddress = '';
    let url = isOrderModifying
      ? APIS.EditOrders + selectedOrder?.id ?? ''
      : APIS.Offers;

    if (tab === Buy || tab === BUY) {
      setBuyLoading(true);
      buyAssetAddress = id;
      const payload = isOrderModifying
        ? {
            quantity: Number(buySellForm.quantity),
            price: convertToUSD(buySellForm.price) ?? '0',
          }
        : {
            assetId: id,
            quantity: Number(buySellForm.quantity),
            price: convertToUSD(buySellForm.price) ?? '0',
            type: 'BUY',
            goodTillCancelled: `${goodTillCancelValue}`,
          };

      try {
        isOrderModifying
          ? put(url, payload)
              .then(res => {
                if (res.data) {
                  const result = res?.data?.offerResults?.[0] ?? res;
                  getPortfolios();
                  setOrderComplete(true);
                  fetchInfoData();
                  setSellLoading(false);
                  setIsOrderModifying(false);
                  if (isOrderModifying && selectedOrder?.id) {
                    setModifiedOrder({
                      id: selectedOrder.id,
                      quantity: buySellForm.quantity,
                    });
                  }
                  getOrders(ORDER_TYPE.pending)
                  if (!result.message) {
                    Alert.alert('Success', ORDER_PLACED);
                    handleGoback();
                  } else {
                    Alert.alert('Error', result.message);
                  }
                } else {
                  Alert.alert(res.message);
                  setSellLoading(false);
                }
              })
              .catch(error => {
                setSellLoading(false);
              })
          : post(url, payload)
              .then(res => {
                if (res) {
                  const result = res?.offerResults?.[0] ?? res;
                  //when sell and buy button pressed sell button to visible sell button when its not minted.
                  getPortfolios();
                  setOrderComplete(true);
                  fetchInfoData();
                  setBuyLoading(false);
                  setIsOrderModifying(false);
                  if (isOrderModifying && selectedOrder?.id) {
                    setModifiedOrder({
                      id: selectedOrder.id,
                      quantity: buySellForm.quantity,
                    });
                  }
                  getOrders(ORDER_TYPE.pending)
                  if (!result?.message) {
                    Alert.alert('Success', ORDER_PLACED);
                    handleGoback();
                  } else {
                    Alert.alert('Error', result.message);
                  }
                }
                return;
              })
              .catch(() => {
                toast(ERROR_MESSAGE);
                setIsOrderModifying(false);
                setBuyLoading(false);
              });
      } catch (error) {
        toast(SOMETHING_IS_WRONG);
        setIsOrderModifying(false);
        setBuyLoading(false);
      }
    } else {
      setSellLoading(true);
      sellAssetAddress = id;
      const payload = isOrderModifying
        ? {
            quantity: Number(buySellForm.quantity),
            price: convertToUSD(buySellForm.price) ?? '0',
          }
        : {
            assetId: id,
            quantity: Number(buySellForm.quantity),
            price: convertToUSD(buySellForm.price) || 0,
            type: 'SELL',
            goodTillCancelled: `${goodTillCancelValue}`,
          };
      try {
        isOrderModifying
          ? put(url, payload)
              .then(res => {
                if (res.data) {
                  const result = res?.data?.offerResults?.[0] ?? res;
                  getPortfolios();
                  setOrderComplete(true);
                  fetchInfoData();
                  setSellLoading(false);
                  setIsOrderModifying(false);
                  if (isOrderModifying && selectedOrder?.id) {
                    setModifiedOrder({
                      id: selectedOrder.id,
                      quantity: buySellForm.quantity,
                    });
                  }
                  getOrders(ORDER_TYPE.pending)
                  if (result.message === 'ok') {
                    Alert.alert('Success', ORDER_PLACED);
                    handleGoback();
                  } else {
                    Alert.alert('Error', result.message);
                  }
                } else {
                  Alert.alert('Error', res.message);
                  setSellLoading(false);
                }
              })
              .catch(error => {
                setSellLoading(false);
              })
          : post(url, payload).then(res => {
              if (res) {
                const result = res?.offerResults?.[0] ?? res;
                getPortfolios();
                setOrderComplete(true);
                fetchInfoData();
                setSellLoading(false);
                setIsOrderModifying(false);
                if (isOrderModifying && selectedOrder?.id) {
                  setModifiedOrder({
                    id: selectedOrder.id,
                    quantity: buySellForm.quantity,
                  });
                }
                getOrders(ORDER_TYPE.pending)
                if (!result.message) {
                  Alert.alert('Success', ORDER_PLACED);
                  handleGoback();
                } else {
                  Alert.alert('Error', result.message);
                }
              }
            });
      } catch (error) {
        toast(SOMETHING_IS_WRONG);
        setIsOrderModifying(false);
      }
    }
  }, [Symbol, id, buySellForm, navigation, isOrderModifying, tab]);

  const getDataFromOrderBook = data => {
    SetApiLimit(data);
  };

  const totalPrice = useCallback(() => {
    var totalPriceval;
    if (buySellForm.quantity === '' || buySellForm.price === '') {
      totalPriceval = '0';
    } else {
      totalPriceval =
        Number(buySellForm.quantity ?? 0) * Number(buySellForm.price ?? 0);
    }
    return totalPriceval;
  }, [buySellForm]);

  return (
    <View style={[styles.container, {backgroundColor: colors.background}]}>
      <KeyboardAwareScrollView
        style={styles.keyboardHeight}
        keyboardShouldPersistTaps={'handled'}
        accessible={false}
        nestedScrollEnabled
        extraScrollHeight={0}
        showsVerticalScrollIndicator={false}>
        <View style={styles.detailsContainer}>
          <View>
            <AssetsHeader symbol={Symbol} isLoggedIn={true} />
            {<OrderBook orderBook={orderBook} limit={getDataFromOrderBook} />}
            <OrderForm
              tab={tab}
              buySellForm={buySellForm}
              handleForm={handleForm}
              totalPrice={totalPrice()}
              handleBuySell={handleBuySell}
              setTogglevalue={() =>
                setGoodTillCancelValue(!goodTillCancelValue)
              }
              goodTillCancelValue={goodTillCancelValue}
              isOrderModifying={isOrderModifying}
            />
          </View>
        </View>
        {Platform.OS == 'ios' && isKeyboardVisible ? (
          <View style={styles.footer}>
            <OrderFooter
              tab={tab}
              totalPrice={totalPrice()}
              handleBuySell={handleBuySell}
              orderComplete={orderComplete}
              resetHandleForm={() => isOrderModifyFnc()}
            />
          </View>
        ) : null}
      </KeyboardAwareScrollView>
      {Platform.OS !== 'ios' || !isKeyboardVisible ? (
        <View style={styles.footer}>
          <OrderFooter
            tab={tab}
            totalPrice={totalPrice()}
            handleBuySell={handleBuySell}
            orderComplete={orderComplete}
            resetHandleForm={() => isOrderModifyFnc()}
          />
        </View>
      ) : null}
    </View>
  );
};
