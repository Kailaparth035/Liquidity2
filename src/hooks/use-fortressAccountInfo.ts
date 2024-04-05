// @flow
import React, {useEffect, useState} from 'react';
import {useNetwork} from './use-network';
import {APIS} from '../constants';

export const useFortressAccountInfo = () => {
  const {get} = useNetwork();
  const [AccountInfo, setAccountInfo] = useState('0');
  useEffect(() => {
    get(APIS.fortressAccountInfo)
      .then(res => {
        if (res.data) {
          setAccountInfo(res.data);
        }
      })
      .catch(e => {
        console.log('Error=', e);
      });
  }, []);
  return {AccountInfo};
};
