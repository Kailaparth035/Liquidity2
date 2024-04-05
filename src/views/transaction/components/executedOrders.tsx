import React, {FC, useCallback, useEffect} from 'react';
import {RefreshControl, View} from 'react-native';
import {useRecoilValue} from 'recoil';
import {useTheme} from '@react-navigation/native';

import {NO_DATA_AVAILABLE, ORDER_TYPE} from '../../../constants';
import {FlatListScroll, Loader} from '../../../storybook';
import OrderSwipe from './order-swipe';
import {ExecutedOrderState, ExecutedOrdersConfigState} from '../../../states/open-orders/states';
import {useOpenOrder} from '../../../views/buy-sell/open-orders/hooks';
import {Svg_No_Transaction} from '../../../assets';
import {Svg_No_Transaction_light} from '../../../assets/icon/svg/noTransactions-light';
import {isDarkModeState} from '../../../states';
import {NoData} from '../../../components/empty-state';
import {OrderedAssetStyles as styles} from './ordered-assets.styles';

interface IExecutedOrders {
  navigation: any;
  tab: string;
}
export const ExecutedOrders: FC<IExecutedOrders> = ({navigation, tab}) => {
  const executedOrders = useRecoilValue(ExecutedOrderState);
  const isDarkMode = useRecoilValue(isDarkModeState);
  const executedOrderConfig = useRecoilValue(ExecutedOrdersConfigState);

  const {getOrders, isLoading, paginationLoading} = useOpenOrder();
  const {colors} = useTheme();

  useEffect(() => {
    getOrders(ORDER_TYPE.executed);
  }, []);

  const refreshing = useCallback(() => {
    getOrders(ORDER_TYPE.executed);
  }, []);

  const onEndReached = useCallback(() => {
    getOrders(ORDER_TYPE.executed, executedOrderConfig+1);
  }, [executedOrderConfig])

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : executedOrders?.length === 0 ? (
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
            data={executedOrders}
            renderItem={({item}) => (
              <OrderSwipe item={item} navigation={navigation} tab={tab} />
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
