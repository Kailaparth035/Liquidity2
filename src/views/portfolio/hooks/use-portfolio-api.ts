import { useCallback } from 'react';
import { useSetRecoilState } from 'recoil';
import { APIS } from '../../../constants';
import { useNetwork } from '../../../hooks';
import { IsInfoLoaderState, PortfolioState } from '../../../states';

export const usePortfolioApi = () => {
  const setPortfolio = useSetRecoilState(PortfolioState);
  const setIsLoader = useSetRecoilState(IsInfoLoaderState);

  const { get: portfolioGet } = useNetwork(false);

  const getPortfolios = useCallback(async () => {
    const data = await portfolioGet(APIS.Portfolio);
    if (data?.data) {
      setPortfolio(data.data);
      setIsLoader(false)
    }
  }, []);

  return { getPortfolios };
};
