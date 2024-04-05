import {useCallback, useEffect} from 'react';
import {useSetRecoilState} from 'recoil';

import {CoOwnersState} from '../components/co-owners/states';
import {APIS} from '../../../constants';
import {useNetwork} from '../../../hooks';

export const useFetchOweners = () => {
  const setCoOwners = useSetRecoilState(CoOwnersState);

  const {get, loading, data} = useNetwork();

  useEffect(() => {
    if (data?.data) {
      setCoOwners(data.data);
    }
  }, [data]);

  const fetchOwners = useCallback(() => {
    return get(APIS.coOwners);
  }, []);

  return {fetchOwners, loading};
};
