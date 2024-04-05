import {useMemo} from 'react';
import {useRecoilValue} from 'recoil';

import {AccessTokenState} from '../../../states';

export const useLoginAuth = () => {
  const accessToken = useRecoilValue(AccessTokenState);

  const isLoggedIn = useMemo(() => {
    return !!accessToken.length;
  }, [accessToken]);

  return {isLoggedIn};
};
