import React, {useCallback, useEffect, useState} from 'react';
import {useRecoilValue} from 'recoil';

import ConfirmCancelModal from './confirm-cancel-modal/confirm-cancel-modal';
import {ORDER_TABS, ORDER_TYPE} from '../../../constants';
import {ModifiedOrderState} from '../../../states/open-orders/states';
import {ProfileDataState} from '../../../states';
import {OpenOrders} from './openOrders';
import {CanceledOrders} from './canceledOrders';
import {ExecutedOrders} from './executedOrders';
import {useOpenOrder} from '../../../views/buy-sell/open-orders/hooks';

export const OrderedAssets = ({tab, navigation, index}: any) => {
  const [orders, setOrders] = useState<any>({});
  const modifiedOrder = useRecoilValue(ModifiedOrderState);
  const profileData = useRecoilValue(ProfileDataState);

  const {getOrders} = useOpenOrder();

  const refreshOrders = useCallback(() => {
    getOrders(ORDER_TYPE.pending);
    getOrders(ORDER_TYPE.cancelled);
  }, []);

  const ordersList =
    index === 0 ? orders?.openOrder ?? [] : orders?.executeOrder ?? [];

  useEffect(() => {
    ordersList.forEach((order: any) => {
      if (order.id === modifiedOrder.id) {
        order.quantity = modifiedOrder.quantity;
      }
    });
  }, [modifiedOrder, ordersList]);

  return (
    <>
      {tab === ORDER_TABS.cancelled ? (
        <CanceledOrders navigation={navigation} tab={tab} />
      ) : tab === ORDER_TABS.executed ? (
        <ExecutedOrders navigation={navigation} tab={tab} />
      ) : (
        <OpenOrders navigation={navigation} tab={tab} />
      )}
      {(tab === ORDER_TABS.open ||
        tab === profileData?.settings?.language?.orders?.topNav?.open) && (
        <ConfirmCancelModal
          orders={orders}
          setOrders={setOrders}
          getOpenOrder={refreshOrders}
          isForm="orders"
        />
      )}
    </>
  );
};
