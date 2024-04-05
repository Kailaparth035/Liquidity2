import {useState} from 'react';
import {useSetRecoilState} from 'recoil';

import {APIS, ORDER_TYPE} from '../../../constants';
import {useNetwork} from './../../../hooks';
import {
  AllOpenOrdersState,
  CanceledOrderState,
  CanceledOrdersConfigState,
  ExecutedOrderState,
  ExecutedOrdersConfigState,
  OpenOrderState,
  OpenOrdersConfigState,
} from './../../../states/open-orders/states';

export const useOpenOrder = () => {
  const setOrders = useSetRecoilState(OpenOrderState);
  const setAllOpenOrders = useSetRecoilState(AllOpenOrdersState);
  const setExecutedOrders = useSetRecoilState(ExecutedOrderState);
  const setCanceledOrders = useSetRecoilState(CanceledOrderState);
  const [isLoading, setIsLoading] = useState(false);
  const [paginationLoading, setPaginationLoading] = useState(false);
  const setOpenOrderConfig = useSetRecoilState(OpenOrdersConfigState);
  const setExecutedOrderConfig = useSetRecoilState(ExecutedOrdersConfigState);
  const setCancelledOrderConfig = useSetRecoilState(CanceledOrdersConfigState);

  const {get, isLoaded, loading} = useNetwork();
  const {get: fetchOrders} = useNetwork();

  const getOpenOrder = async (id?: string) => {
    let url = APIS.ExchangeOrders + `?limit=20&offset=${0}&type=${'PENDING'}`;

    if (id) {
      url += `&assetId=${id}`;
    }

    return get(url).then(res => {
      if (res?.data) {
        setOrders(res.data);
      }
      return res;
    });
  };

  const getOrders = async (type: string, offset = 0) => {
    if (!offset) {
      setIsLoading(true);
      setOpenOrderConfig(0);
      setExecutedOrderConfig(0);
      setCancelledOrderConfig(0);
    } else setPaginationLoading(true);

    return fetchOrders(
      `${APIS.ExchangeOrders}?limit=20&offset=${offset}&type=${type}`,
    )
      .then(resp => {
        if (resp?.data) {
          if (type === ORDER_TYPE.executed) {
            setExecutedOrders((prev: any) => {
              let newState = [];
              if (!!offset) return (newState = [...prev, ...resp.data]);
              return (newState = resp.data);
            });
            if (!!offset) setExecutedOrderConfig((prev: number) => prev + 1);
          } else if (type === ORDER_TYPE.cancelled) {
            setCanceledOrders((prev: any) => {
              let newState = [];
              if (!!offset) return (newState = [...prev, ...resp.data]);
              return (newState = resp.data);
            });
            if (!!offset) setCancelledOrderConfig((prev: number) => prev + 1);
          } else {
            setAllOpenOrders((prev: any) => {
              let newState = [];
              if (!!offset) return (newState = [...prev, ...resp.data]);
              return (newState = resp.data);
            });
            if (!!offset) setOpenOrderConfig((prev: number) => prev + 1);
          }
        }
        return resp;
      })
      .catch((err: any) => {
        console.log('ERROR', err);
      })
      .finally(() => {
        setIsLoading(false);
        setPaginationLoading(false);
      });
  };

  return {
    getOpenOrder,
    isLoaded,
    loading,
    getOrders,
    isLoading,
    paginationLoading,
  };
};
