import React, {useCallback, useEffect} from 'react';
import {View} from 'react-native';
import {useRecoilValue, useSetRecoilState} from 'recoil';
import {useAsyncStorage} from '@react-native-async-storage/async-storage';

import {useNetwork} from '../../hooks';
import {
  AssetsState,
  InfoDataState,
  IsConnectState,
  ProfileDataState,
  KeyChainDataState,
  useInfo,
  PortfolioState,
  LoadingPortfolioState,
  IsInfoLoaderState,
} from '../../states';
import {useSolana} from './hooks/useSolana';
import {APIS, Storages} from '../../constants';
import {mainStyles as styles} from './main.styles';
import MainRoute from './renderRoute';

const MainPage = ({navigation}: any) => {
  const setIsConnection = useSetRecoilState(IsConnectState);
  const keyChainData = useRecoilValue(KeyChainDataState);
  const profileData = useRecoilValue(ProfileDataState);
  const setAssets = useSetRecoilState(AssetsState);
  const setPortfolio = useSetRecoilState(PortfolioState);
  const setLoadingPortfolio = useSetRecoilState(LoadingPortfolioState);
  const infoData = useRecoilValue(InfoDataState);
  const {get: portfolioGet, data} = useNetwork();
  const setIsLoader = useSetRecoilState(IsInfoLoaderState);

  useEffect(() => {
    setLoadingPortfolio(true);
    if (data?.data) {
      setPortfolio(data.data);
      setLoadingPortfolio(false);
      setIsLoader(false);
    }
  }, [data]);

  useEffect(() => {
    if (profileData?.id) {
      portfolioGet(APIS.Portfolio + `?limit=20&offset=0`);
    }
  }, [profileData?.id]);

  const {get} = useNetwork();
  const {getSolanaPrice} = useSolana();
  const {getItem} = useAsyncStorage(Storages.IsConnection);
  const {fetchInfoData} = useInfo();

  const {solana, stellar} = infoData ?? {};

  const checkConnection = useCallback(async () => {
    const isConnect = await getItem();
    if (isConnect) {
      setIsConnection(!!isConnect);
    }
  }, []);

  useEffect(() => {
    checkConnection();
  }, []);

  const getAssets = async () => {
    if (profileData?.id) {
      const assetsData = await get(APIS.TokensUserId + profileData.id);
      if (assetsData?.data) {
        setAssets(assetsData);
      }
    }
  };

  useEffect(() => {
    getAssets();
  }, [profileData?.id, solana, stellar]);

  useEffect(() => {
    getSolanaPrice(keyChainData?.solana?.username);
  }, [keyChainData]);

  useEffect(() => {
    if (profileData?.id) {
      fetchInfoData();
    }
  }, [profileData, keyChainData]);

  return (
    <View style={styles.container}>
      <MainRoute navigation={navigation} />
    </View>
  );
};

export default MainPage;
