import {Storages} from './../../../constants/storages';
import {useAsyncStorage} from '@react-native-async-storage/async-storage';
import {useCallback, useEffect} from 'react';
import {useRecoilState, useRecoilValue, useSetRecoilState} from 'recoil';

import {APIS, API_HOST, ASSETS, ENVIRONMENT} from '../../../constants';
import {useNetwork} from '../../../hooks';
import {
  ExploresState,
  IsExploresState,
  AllExploreAssets,
  IAllExploreAssets,
  UserWatchListState,
  ExploresConfigState,
  ExploresPaginationLoading,
  PrivateExploresState,
  ForexExploresState,
  CryptoExploresState,
  StocksExploresState,
  CommoditiesExploresState,
  MusicExploresState,
  Sba7ExploresState,
} from '../../../states';
import {toast} from '../../../libs';

export const useWatchList = () => {
  const [explores, setExplores] = useRecoilState(ExploresState);
  const setPrivateExplores = useSetRecoilState(PrivateExploresState);
  const setForexExplores = useSetRecoilState(ForexExploresState);
  const setCryptoExplores = useSetRecoilState(CryptoExploresState);
  const setStocksExplores = useSetRecoilState(StocksExploresState);
  const setCommoditiesExplores = useSetRecoilState(CommoditiesExploresState);
  const setMusicExplores = useSetRecoilState(MusicExploresState);
  const setSba7Explores = useSetRecoilState(Sba7ExploresState);
  const setIsLoading = useSetRecoilState(IsExploresState);
  const setAllExploreAssets = useSetRecoilState(AllExploreAssets);
  const setWatchlist = useSetRecoilState(UserWatchListState);
  const {getItem: getToken} = useAsyncStorage(Storages.Token);
  const {setItem: setWatchlistStorage} = useAsyncStorage(Storages.Watchlist);
  const {setItem: exploreStorage} = useAsyncStorage(Storages.Explores);

  const {get: getExplore} = useNetwork();

  useEffect(() => {
    var assetsType = <IAllExploreAssets[]>[];
    Object.keys(explores ?? {}).forEach(explore => {
      explores?.[explore]?.forEach((types: IAllExploreAssets) => {
        const newState = JSON.parse(JSON.stringify(types));
        let type = '';
        switch (explore) {
          case 'privates':
            type = ASSETS.PARIVATE;
            break;
          case 'crypto':
            type = ASSETS.CRYPTO;
            break;
          case 'commodities':
            type = ASSETS.COMMODITY;
            break;
          case 'forex':
            type = ASSETS.FOREX;
            break;
          case 'marketIndexes':
            type = ASSETS.MARKETINDEX;
            break;
          case 'music':
            type = ASSETS.MUSIC;
            break;
          default:
            type = ASSETS.STOCK;
        }
        newState.type = type;
        assetsType.push(newState);
      });
    });
    setAllExploreAssets(assetsType);
  }, [explores]);

  const getWatchList = (isHideLoader?: boolean) => {
    if (!isHideLoader) {
      setIsLoading(true);
    }
    return getToken()
      .then(() => {
        return getExplore(APIS.Explorers)
          .then(res => {
            if (res?.message && !res?.data) {
              toast(res.message);
            }

            if (res?.data) {
              let explore;
              let randomeData = res.data.music;

              randomeData.map((item, index) => {
                randomeData[index] = {
                  ...item,
                  randomePrice: (Math.random() * 10.52).toFixed(2),
                  randomePricePercentage: (Math.random() * 36.4).toFixed(2),
                };
              });

              let keysofArray = Object.keys(res.data)[0];

              explore = {
                [keysofArray]: res.data[keysofArray],
                commodities: res.data.commodities,
                crypto: res.data.crypto,
                forex: res.data.forex,
                marketIndexes: res.data.marketIndexes,
                music: randomeData,
                privates: res.data.privates,
                stocks: res.data.stocks,
              };
              if ( !ENVIRONMENT.isProduction ) {
                explore.sba7 = res.data.sba7;
              }
              setIsLoading(false);
              const watchlistName = Object.keys(explore ?? {})?.[0];
              if (watchlistName) {
                const watchlistAssets = explore[watchlistName] ?? [];
                delete explore[watchlistName];
                const payload = {
                  name: watchlistName,
                  assets: watchlistAssets,
                  _id: watchlistAssets[0]?.watchlist,
                };
                setWatchlist(payload);
                setWatchlistStorage(JSON.stringify(payload));
              }
              const {
                privates,
                forex,
                crypto,
                commodities,
                stocks,
                music,
                sba7,
              } = explore;
              setPrivateExplores(privates);
              setForexExplores(forex);
              setCryptoExplores(crypto);
              setStocksExplores(stocks);
              setCommoditiesExplores(commodities);
              setMusicExplores(music);
              setSba7Explores(sba7);
              setExplores(explore);
              exploreStorage(JSON.stringify(explore));
            }
            return res;
          })
          .finally(() => {
            setIsLoading(false);
          });
      })
      .catch(() => {
        setIsLoading(false);
      });
  };
  return {getWatchList};
};

export const usePaginationExplore = () => {
  const explores = useRecoilValue(ExploresState);
  const setPrivateExplores = useSetRecoilState(PrivateExploresState);
  const setForexExplores = useSetRecoilState(ForexExploresState);
  const setCryptoExplores = useSetRecoilState(CryptoExploresState);
  const setStocksExplores = useSetRecoilState(StocksExploresState);
  const setCommoditiesExplores = useSetRecoilState(CommoditiesExploresState);
  const setMusicExplores = useSetRecoilState(MusicExploresState);
  const [exploreConfig, setExploreConfig] = useRecoilState(ExploresConfigState);
  const [explorePaginationLoading, setExplorePaginationLoading] =
    useRecoilState(ExploresPaginationLoading);

  const setAppendData = useCallback((type: string, data: any[]) => {
    switch (type) {
      case 'crypto':
        return setCryptoExplores(prev => [...prev, ...data]);
      case 'stocks':
        return setStocksExplores(prev => [...prev, ...data]);
      case 'commodities':
        return setCommoditiesExplores(prev => [...prev, ...data]);
      case 'forex':
        return setForexExplores(prev => [...prev, ...data]);
      case 'privates':
        return setPrivateExplores(prev => [...prev, ...data]);
      case 'music': {
        return setMusicExplores(prev => [...prev, ...data]);
      }
      default:
        return data;
    }
  }, []);

  const {get: getExplore} = useNetwork();

  const getSingleTab = useCallback(
    (tab: string) => {
      if (!Object.keys(explores).length || explorePaginationLoading) {
        return;
      }
      const config = (exploreConfig as any)[tab];
      if (!config) {
        return;
      }
      const {limit, offset} = config;
      setExplorePaginationLoading(true);
      return getExplore(
        APIS.Explorers + `?limit=${limit}&offset=${offset + 1}&include=${tab}`,
      )
        .then(res => {
          if (res?.data) {
            const data = res?.data?.[tab];
            if (data) {
              setAppendData(tab, data);
              setExploreConfig(prev => {
                const config = JSON.parse(JSON.stringify(prev));
                const tabConfig = config[tab];
                config[tab] = {
                  ...tabConfig,
                  offset: tabConfig.offset + 1,
                };
                return {...config};
              });
            }
          }
          setExplorePaginationLoading(false);
          return res;
        })
        .catch(err => {
          setExplorePaginationLoading(false);
        });
    },
    [explorePaginationLoading, explores, exploreConfig],
  );

  return {getSingleTab};
};

export const useTabExplore = () => {
  const explores = useRecoilValue(ExploresState);
  const setPrivateExplores = useSetRecoilState(PrivateExploresState);
  const setForexExplores = useSetRecoilState(ForexExploresState);
  const setCryptoExplores = useSetRecoilState(CryptoExploresState);
  const setStocksExplores = useSetRecoilState(StocksExploresState);
  const setCommoditiesExplores = useSetRecoilState(CommoditiesExploresState);
  const setWatchlist = useSetRecoilState(UserWatchListState);
  const setMusicExplores = useSetRecoilState(MusicExploresState);
  const setSba7Explores = useSetRecoilState(Sba7ExploresState);

  const setData = useCallback((type: string, data: any[]) => {
    switch (type) {
      case 'crypto':
        return setCryptoExplores(data);
      case 'stocks':
        return setStocksExplores(data);
      case 'commodities':
        return setCommoditiesExplores(data);
      case 'forex':
        return setForexExplores(data);
      case 'privates':
        return setPrivateExplores(data);
      case 'watchlist': {
        return setWatchlist(data);
      }
      case 'music': {
        return setMusicExplores(data);
      }
      case 'sba7': {
        return setSba7Explores(data);
      }

      default:
        return data;
    }
  }, []);

  const {get: getExplore} = useNetwork(false);

  const getTabAssets = (tab: string) => {
    if (!Object.keys(explores ?? {}).length) {
      return;
    }

    return getExplore(APIS.Explorers + `?include=${tab}`)
      .then(res => {
        let watchlist = Object.keys(res?.data ?? {});

        if (res?.data) {
          const data = res?.data?.[tab];
          if (data) {
            setData(tab, data);
          } else if (res?.data[watchlist[0]]) {
            let watchlistObj = {
              _id: res?.data[watchlist[0]][0].watchlist,
              name: watchlist[0],
              assets: res?.data[watchlist[0]],
            };

            setData(tab, watchlistObj);
          }
        }
        return res;
      })
      .catch(err => {});
  };

  return {getTabAssets};
};
