import {useCallback, useState} from 'react';
import {useRecoilValue} from 'recoil';

import {API_HOST_CLOUD} from '../../../constants';
import {XORCipher} from '../../../libs';
import {ProfileDataState, SelectedTransactionMemoState} from '../../../states';

export const useFetchKycData = () => {
  const selectedMemo = useRecoilValue(SelectedTransactionMemoState);
  const profileData = useRecoilValue(ProfileDataState);

  const [loading, setLoading] = useState(false);
  const [parsedMemo, setParsedMemo] = useState({});

  const setKycData = useCallback((memo: string) => {
    try {
      if (profileData?.id) {
        const memoDetail = XORCipher.decode(profileData.id, memo);
        if (memoDetail && typeof memoDetail === 'string') {
          const kycDetail = JSON.parse(memoDetail);
          if (kycDetail && typeof kycDetail === 'object') {
            setParsedMemo(kycDetail);
          }
        }
      }
      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  }, []);

  const fetchKyc = () => {
    fetch(`${API_HOST_CLOUD}${selectedMemo}`)
      .then(res => res.json())
      .then(data => {
        setKycData(data?.memo);
      })
      .catch(err => {
        setLoading(false);
      });
  };

  return {fetchKyc, loading, setKycData, parsedMemo, setLoading};
};
