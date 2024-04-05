import {useCallback, useState, useEffect} from 'react';
import {useAsyncStorage} from '@react-native-async-storage/async-storage';

import {useNetwork} from '../../../hooks';
import {APIS, Storages} from '../../../constants';
import {toast} from '../../../libs';
import {
  APPROVED,
  APPROVE_ISSUE,
  REJECTED,
  TOAST_APPROVED,
  TOAST_REJECTED,
} from '../constants';

export const UseRequestApis = () => {
  const [requestsList, setRequestsList] = useState<any>([]);
  const [requestLoading, setRequestLoading] = useState<boolean>(false);
  const {get, patch, post} = useNetwork();
  const {getItem: getToken} = useAsyncStorage(Storages.Token);


  useEffect(() => {
    getRequestList();
  }, []);

  const getRequestList = useCallback(() => {
    setRequestLoading(true);
    getToken().then(() => {
      get(APIS.Requests)
        .then(resp => {
          setRequestsList(resp.data);
          setRequestLoading(false);
        })
        .catch(err => {
          setRequestLoading(false);
        });
    });
  }, []);

  const reject = useCallback((data: any, index: number) => {
    const {_id} = data;
    const body = {
      status: REJECTED,
    };
    patch(`${APIS.Requests}/${_id}`, body)
      .then((auth: any) => {
        setRequestsList((prevState: any) => {
          const cloneState = JSON.parse(JSON.stringify(prevState));
          cloneState[index].status = REJECTED;
          return [...cloneState];
        });
        toast(TOAST_REJECTED);
      })
      .catch(err => {});
  }, []);

  const approve = useCallback((data, index) => {
    const {blockchain, symbol, secret, _id} = data;
    const body = {
      blockchain: blockchain,
      symbol: symbol,
      secret: secret,
    };

    const payload = {
      status: APPROVED,
    };

    post(APIS.Trust, body)
      .then(resp => {
        setRequestsList((prevState: any) => {
          const cloneState = JSON.parse(JSON.stringify(prevState));
          cloneState[index].status = APPROVED;
          return [...cloneState];
        });
        toast(TOAST_APPROVED);
      })
      .catch(err => {
        toast(APPROVE_ISSUE);
      });

    patch(`${APIS.Requests}/${_id}`, payload)
      .then((auth: any) => {
        toast(TOAST_APPROVED);
      })
      .catch(err => {});
  }, []);

  return {requestsList, reject, approve, requestLoading, setRequestLoading,getRequestList};
};
