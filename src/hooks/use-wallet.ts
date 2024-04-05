import {useCallback} from 'react';
import { APIS } from '../constants';
import {useNetwork} from './use-network';

export const useWallet = () => {
  const {post} = useNetwork();

  const generateWallet = useCallback(async (blockchain) => {
      const res = await post(APIS.Wallets, { blockchain });
      return res[blockchain]
  }, [post]);

  return {generateWallet};
};
