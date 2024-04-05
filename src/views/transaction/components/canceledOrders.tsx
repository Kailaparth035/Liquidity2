import React, {FC, useCallback, useEffect} from 'react';
import {RefreshControl, View} from 'react-native';
import {useRecoilValue} from 'recoil';
import {useTheme} from '@react-navigation/native';

import {FlatListScroll, Loader} from '../../../storybook';
import OrderSwipe from './order-swipe';
import {useOpenOrder} from '../../../views/buy-sell/open-orders/hooks';
import {CanceledOrderState, CanceledOrdersConfigState} from '../../../states/open-orders/states';
import {Svg_No_Transaction} from '../../../assets';
import {Svg_No_Transaction_light} from '../../../assets/icon/svg/noTransactions-light';
import {NO_DATA_AVAILABLE, ORDER_TYPE} from '../../../constants';
import {NoData} from '../../../components/empty-state';
import {isDarkModeState} from '../../../states';
import {OrderedAssetStyles as styles} from './ordered-assets.styles';

interface ICanceledOrders {
  navigation: any;
  tab: string;
}
export const CanceledOrders: FC<ICanceledOrders> = ({navigation, tab}) => {
  const canceledOrders = useRecoilValue(CanceledOrderState);
  const isDarkMode = useRecoilValue(isDarkModeState);
  const cancelledOrderConfig = useRecoilValue(CanceledOrdersConfigState);

  const {getOrders, isLoading, paginationLoading} = useOpenOrder();
  const {colors} = useTheme();

  useEffect(() => {
    getOrders(ORDER_TYPE.cancelled);
  }, []);

  const refreshing = useCallback(() => {
    getOrders(ORDER_TYPE.cancelled);
  }, []);

  const onEndReached = useCallback(() => {
    getOrders(ORDER_TYPE.cancelled, cancelledOrderConfig+1);
  }, [cancelledOrderConfig])

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : canceledOrders?.length === 0 ? (
        <NoData
          svg={
            isDarkMode === true ? Svg_No_Transaction : Svg_No_Transaction_light
          }
          msg={NO_DATA_AVAILABLE}
          height={240}
        />
      ) : (
        <View style={{flex: 1}}>
          <FlatListScroll
            data={canceledOrders}
            renderItem={({item}) => (
              <OrderSwipe item={item} navigation={navigation} tab={tab} isCancelled={true}/>
            )}
            keyExtractor={(item, i) => `${item.name}__${i}`}
            style={styles.listContainer}
            refreshControl={
              <RefreshControl
                refreshing={false}
                onRefresh={refreshing}
                title="Pull to refresh"
                tintColor={colors.text}
                titleColor={colors.text}
              />
            }
            onEndReachedThreshold={0.5}
            onEndReached={onEndReached}
          />
          {paginationLoading && <Loader />}
        </View>
      )}
    </>
  );
};
